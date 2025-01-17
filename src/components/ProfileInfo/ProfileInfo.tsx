import { NavLink, useLocation } from 'react-router-dom';
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

  // Fetch the profile data when the component is mounted
  useEffect(() => {
    fetch('https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Use your token here
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          profileImage: data.profileImage || default_user,
        });
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];

      if (!validTypes.includes(file.type)) {
        alert('Only PNG, JPG, or SVG image formats are supported!');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileData(prevData => ({
          ...prevData,
          picture: imageUrl,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Reset picture when canceling the edit
      setProfileData(prevData => ({
        ...prevData,
        picture: default_user,
      }));
    }

    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    const accessToken = localStorage.getItem('accessToken'); // отримуємо token з localStorage
    const storedName = localStorage.getItem('userName') || profileData.name; // отримуємо ім'я або використовуємо те, що є в профілі
    const storedPhone = localStorage.getItem('userPhone') || profileData.phone; // отримуємо номер телефону або використовуємо те, що є в профілі
    const storedPicture = localStorage.getItem('userPicture') || profileData.profileImage; // отримуємо картинку або використовуємо поточну

    fetch('https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/account/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // додаємо token в заголовок
      },
      body: JSON.stringify({
        name: storedName,
        phone: storedPhone,
        profileImage: storedPicture,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile updated:', data);
      })
      .catch(error => {
        console.error('Error saving profile:', error);
      });
    setIsEditing(false);
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
                  src={default_user}
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
