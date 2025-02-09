/* eslint-disable no-console */
/* eslint-disable max-len */
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './ProfileInfo.module.scss';
import { Path } from '../../utils/constants';
import cn from 'classnames';
import default_user from '../../images/icons/profile-default.svg';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

export const ProfileInfo = () => {
  const { pathname } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    profileImage: default_user,
  });

  const navigate = useNavigate();

  useEffect(() => {
    let code: string | null = null;

    if (window.location.search) {
      // Якщо code є у search (рідко буває при хеш-роутингу)
      const searchParams = new URLSearchParams(window.location.search);

      code = searchParams.get('code');
    }

    if (!code) {
      // Якщо code немає у search, шукаємо в хеші (hash routing issue)
      const hash = window.location.hash;
      const hashParams = new URLSearchParams(hash.split('?')[1]);

      code = hashParams.get('code');
    }

    console.log('Code from URL:', code); // Дивимось, чи знайшли код

    if (code) {
      localStorage.setItem('accessToken', code);

      console.log(
        'Saved to localStorage:',
        localStorage.getItem('accessToken'),
      );

      // Очищаємо URL від `code`
      navigate('/profile/info', { replace: true });
    }
  }, [navigate]);

  const fetchProfileData = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.warn('No access token found');

      return;
    }

    try {
      const response = await fetch(
        'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();

      if (!text) {
        console.warn('Empty response body');

        return;
      }

      const data = JSON.parse(text);

      const updatedProfile = {
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        profileImage:
          data.profileImage ||
          localStorage.getItem('profileImage') ||
          'default_user.png',
      };

      setProfileData(updatedProfile);

      localStorage.setItem('userName', updatedProfile.name);
      localStorage.setItem('userEmail', updatedProfile.email);
      localStorage.setItem('userPhone', updatedProfile.phone);
      localStorage.setItem('profileImage', updatedProfile.profileImage);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData(prevData => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
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
      alert('Only PNG, JPG, SVG, or WebP image formats are supported!');

      return;
    }

    if (file.size > maxSize) {
      alert('File size should not exceed 2MB!');

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      localStorage.setItem('profileImage', imageUrl);

      setProfileData(prevData => ({
        ...prevData,
        profileImage: imageUrl,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    if (isEditing) {
      setProfileData(prevData => ({
        ...prevData,
        profileImage: default_user,
      }));
    }

    setIsEditing(prev => !prev);
  };

  const handleSaveClick = async () => {
    if (!profileData.name || !profileData.phone) {
      alert('Name and phone are required!');

      return;
    }

    const updatedProfile = {
      name: profileData.name.trim(),
      email: profileData.email.trim(),
      phone: profileData.phone.trim(),
      profileImage: profileData.profileImage,
    };

    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.warn('No access token found');

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
          body: JSON.stringify(updatedProfile),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Profile updated:', data);

      localStorage.setItem('userName', updatedProfile.name);
      localStorage.setItem('userEmail', updatedProfile.email);
      localStorage.setItem('userPhone', updatedProfile.phone);
      localStorage.setItem('profileImage', updatedProfile.profileImage);

      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

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
                className={styles['info__button-edit']}
                onClick={handleEditClick}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  className={styles['info__button-edit']}
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              )}
              <button className={styles['info__button-delete']}>
                Delete Account
              </button>
            </div>
          </div>
          <div className={styles.info__details}>
            <div className={styles['info__photo-container']}>
              {isEditing ? (
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className={styles['info__photo--upload']}
                  accept=".png, .jpg, .jpeg, .svg"
                  placeholder="Choose an image (PNG, JPG, or SVG)"
                />
              ) : (
                <img
                  src={profileData.profileImage || default_user}
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
                  {profileData.name || 'Name'}
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
                  {profileData.email || 'Email'}
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
                  {profileData.phone || 'Phone Number'}
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
