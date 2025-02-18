/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../store/UserContex';
import styles from './ProfileInfo.module.scss';
import { Path } from '../../utils/constants';
import cn from 'classnames';
import default_user from '../../images/icons/profile-default.svg';
import { Loader } from '../Loader';

export const ProfileInfo = () => {
  const { user, setUser, error, loading } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bottomRef.current) {
        setIsScrolled(bottomRef.current.scrollTop > 50);
      }
    };

    const bottomDiv = bottomRef.current;

    bottomDiv?.addEventListener('scroll', handleScroll);

    return () => bottomDiv?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      window.history.replaceState({}, '', window.location.pathname);
      navigate('/profile/info', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    localStorage.setItem(
      'accessToken',
      localStorage.getItem('accessToken') || '',
    );
    localStorage.setItem('email', user.email);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      return;
    }

    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleProfileImageChange = (newImageUrl: string) => {
    if (!user) {
      return;
    }

    setUser({ ...user, profileImage: newImageUrl });
    localStorage.setItem('profileImage', newImageUrl);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setErrorMessage('Please select a file to upload!');

      return;
    }

    setErrorMessage(null);

    const validTypes = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/webp',
    ];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        'Only PNG, JPG, SVG, or WebP image formats are supported!',
      );

      return;
    }

    if (file.size > maxSize) {
      setErrorMessage('File size should not exceed 2MB!');

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleProfileImageChange(reader.result);
      } else {
        setErrorMessage('Error loading image. Please try again.');
      }
    };

    reader.readAsDataURL(file);
  };

  const handleEditClick = () => setIsEditing(prev => !prev);

  const handleSaveClick = async () => {
    if (!user || !user.name || !user.phone) {
      setErrorMessage('Name and phone are required!');

      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage(null);
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.warn('No access token found');
        setErrorMessage('Authorization failed. Please log in again.');
        setIsSaving(false);

        return;
      }

      const response = await fetch(
        'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: user.name, phone: user.phone }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      localStorage.setItem('name', user.name);
      localStorage.setItem('phone', user.phone);

      setIsEditing(false);
    } catch (errorMes) {
      setErrorMessage('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.info}>
      <div className={styles.info__nav}>
        <div
          className={cn(styles.info__top, {
            [styles['info__top--scrolled']]: isScrolled,
          })}
        >
          <p
            className={cn(styles.info__greeting, {
              [styles['info__greeting--scrolled']]: isScrolled,
            })}
          >
            Hello, {user?.name || 'User'}!
          </p>
          <h1
            className={cn(styles.info__title, {
              [styles['info__title--scrolled']]: isScrolled,
            })}
          >
            All You Need, In One Place
          </h1>
          <div className={styles.info__buttons}>
            <NavLink
              to={Path.ProfileInfo}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.info__button, {
                  [styles['info__button--active']]:
                    isActive && pathname === Path.ProfileInfo,
                })
              }
            >
              Profile Information
            </NavLink>
            <NavLink
              to={Path.Activity}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.info__button, {
                  [styles['info__button--active']]:
                    isActive && pathname === Path.Activity,
                })
              }
            >
              My Activity
            </NavLink>
            <NavLink
              to={Path.Opportunities}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.info__button, {
                  [styles['info__button--active']]:
                    isActive && pathname === Path.Opportunities,
                })
              }
            >
              My Opportunities
            </NavLink>
          </div>
        </div>

        <div
          ref={bottomRef}
          className={cn(styles.info__bottom, {
            [styles['info__bottom--scrolled']]: isScrolled,
          })}
        >
          <div className={styles.info__block}>
            <h2 className={styles.info__subtitle}>Profile Information</h2>
            <div className={styles['info__buttons-bottom']}>
              <button
                type="button"
                className={styles['info__button-edit']}
                onClick={handleEditClick}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className={styles['info__button-edit']}
                  onClick={handleSaveClick}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
          </div>
          {errorMessage && <p className={styles.info__error}>{errorMessage}</p>}
          {error && <p className={styles.info__error}>{error}</p>}
          {loading && <Loader />}
          <div className={styles.info__details}>
            <div className={styles['info__photo-container']}>
              {isEditing ? (
                <>
                  <input
                    ref={fileInputRef}
                    className={styles['info__photo--upload']}
                    type="file"
                    id="profileImage"
                    accept=".jpg,.jpeg,.png,.svg"
                    onChange={handleFileChange}
                    title="Click for change photo"
                    hidden
                  />
                  <label
                    htmlFor="profileImage"
                    className={`${styles['custom-file-label']} ${!user?.profileImage ? styles['no-file-selected'] : ''}`}
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="profile"
                        className={styles.info__photo}
                      />
                    ) : (
                      'Choose a photo for your profile'
                    )}
                  </label>
                </>
              ) : (
                <img
                  src={user?.profileImage || default_user}
                  alt="profile"
                  className={styles.info__photo}
                />
              )}
            </div>
            <div className={styles.info__inputs}>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={user?.name}
                  onChange={handleInputChange}
                  className={styles.info__input}
                />
              ) : (
                <p className={styles.info__input}>{user?.name || 'Name'}</p>
              )}
              <div className={styles.info__line}></div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user?.email}
                  onChange={handleInputChange}
                  className={styles.info__input}
                />
              ) : (
                <p className={styles.info__input}>{user?.email || 'Email'}</p>
              )}
              <div className={styles.info__line}></div>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={user?.phone}
                  onChange={handleInputChange}
                  className={styles.info__input}
                />
              ) : (
                <p className={styles.info__input}>
                  {user?.phone || 'Phone Number'}
                </p>
              )}
              <div className={styles.info__line}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
