/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable max-len */
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './ProfileInfo.module.scss';
import { Path } from '../../utils/constants';
import cn from 'classnames';
import default_user from '../../images/icons/profile-default.svg';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { deleteImgFromIndexedDB } from '../../helpers/deleteImageFromIndexedDB';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  profileImage: File | null;
  profileImageUrl?: string;
}

export const ProfileInfo = () => {
  const { pathname } = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    profileImage: default_user,
  });
  const [originalProfileData, setOriginalProfileData] =
    useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code =
      searchParams.get('code') ||
      new URLSearchParams(window.location.hash.split('?')[1]).get('code');

    if (code) {
      window.history.replaceState({}, '', window.location.pathname);
      navigate('/profile/info', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) {
      return;
    }

    const updateProfile = async () => {
      try {
        const accessToken = auth.user?.access_token;

        if (!accessToken) {
          setErrorMessage('Authorization token is missing');

          throw new Error('Authorization token is missing');
        }

        const response = await fetch(
          'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setProfileData(prev => ({
          ...prev,
          name: data.name,
          email: data.email,
          phone: data.phone,
          profileImage: default_user || data.profileImage,
        }));

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', data.email);
      } catch (error) {
        console.error('Error loading profile:', error);
        setErrorMessage('Failed to load profile. Please try again later.');
      }
    };

    updateProfile();
  }, [auth.isAuthenticated, auth.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData(prevData => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);

    const file = event.target.files?.[0];

    if (!file) {
      setErrorMessage('Please select a file to upload!');

      return;
    }

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

    const imageUrl = URL.createObjectURL(file);

    setProfileData(prev => ({
      ...prev,
      profileImage: file,
      profileImageUrl: imageUrl,
    }));

    return () => URL.revokeObjectURL(imageUrl);
  };

  const handleEditClick = () => {
    if (isEditing) {
      if (originalProfileData) {
        setProfileData(originalProfileData);
      }

      setErrorMessage(null);
    } else {
      setOriginalProfileData(profileData);
    }

    setIsEditing(prev => !prev);
  };

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  const handleSaveClick = async () => {
    if (!profileData.name || !profileData.phone) {
      setErrorMessage('Name and phone are required!');

      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage(null);

      const accessToken = getAccessToken();

      if (!accessToken) {
        console.warn('No access token found');
        setErrorMessage('Authorization failed. Please log in again.');
        setIsSaving(false);

        return;
      }

      const userInfo = {
        name: profileData.name.trim(),
        phone: profileData.phone.trim(),
      };

      const formData = new FormData();

      formData.append(
        'account',
        new Blob([JSON.stringify(userInfo)], { type: 'application/json' }),
      );

      if (profileData.profileImage instanceof File) {
        formData.append('profileImageFile', profileData.profileImage);
      }

      // Виведення перед відправкою
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(
        'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage('Session expired. Please log in again.');
          localStorage.removeItem('accessToken');

          return;
        }

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Profile updated:', data);
      console.log('token:', accessToken);

      setProfileData(prev => ({
        ...prev,
        name: prev.name.trim(),
        phone: prev.phone.trim(),
      }));

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);

      const err = error as Error;

      if (err.message.includes('Failed to fetch')) {
        setErrorMessage('Network error. Check your connection.');
      } else {
        setErrorMessage(
          err.message || 'Failed to save profile. Please try again.',
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);

    if (!auth.user?.access_token) {
      setErrorMessage('User is not authenticated');

      return;
    }

    const accessToken = auth.user.access_token;

    try {
      const response = await fetch(
        'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error deleting account. Status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Account successfully deleted:', data);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhone');
      localStorage.removeItem('email');

      await deleteImgFromIndexedDB('profileImage');

      await auth.removeUser();

      navigate(Path.Home);
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('Failed to delete account. Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  const storedName = localStorage.getItem('userName');
  const storedPhone = localStorage.getItem('userPhone');
  const storedEmail = localStorage.getItem('email');

  return (
    <div className={styles.info}>
      <div className={styles.info__nav}>
        <div className={styles.info__top}>
          <p className={styles.info__greeting}>Hello, {profileData.name}</p>
          <h1 className={styles.info__title}>All You Need, In One Place</h1>
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

        <div className={styles.info__bottom}>
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
              <button
                type="button"
                className={styles['info__button-delete']}
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
          {errorMessage && <p className={styles.info__error}>{errorMessage}</p>}
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
                    hidden
                  />
                  <label
                    htmlFor="profileImage"
                    className={`${styles['custom-file-label']} ${!profileData.profileImage ? styles['no-file-selected'] : ''}`}
                  >
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImageUrl}
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
                  src={profileData.profileImageUrl}
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
                  value={profileData.name}
                  onChange={handleInputChange}
                  className={styles.info__input}
                />
              ) : (
                <p className={styles.info__input}>
                  {profileData.name || storedName || 'Name'}
                </p>
              )}
              <div className={styles.info__line}></div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={styles.info__input}
                />
              ) : (
                <p className={styles.info__input}>
                  {profileData.email || storedEmail || 'Email'}
                </p>
              )}
              <div className={styles.info__line}></div>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className={styles.info__input}
                />
              ) : (
                <p className={styles.info__input}>
                  {profileData.phone || storedPhone || 'Phone Number'}
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
