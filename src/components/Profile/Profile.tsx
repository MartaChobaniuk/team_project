import { NavLink, useLocation } from 'react-router-dom';
import styles from './Profile.module.scss';
import { Path } from '../../utils/constants';
import cn from 'classnames';

export const Profile = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.profile}>
      <div className={styles.profile__nav}>
        <div className={styles.profile__top}>
          <h1 className={styles.profile__title}>All You Need, In One Place</h1>
          <div className={styles.profile__buttons}>
            <NavLink
              to={Path.ProfileInfo}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.profile__button, {
                  [styles['profile__button--active']]:
                    isActive && pathname === Path.ProfileInfo,
                })
              }
            >
              Profile Information
            </NavLink>
            <NavLink
              to={Path.Activity}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.profile__button, {
                  [styles['profile__button--active']]:
                    isActive && pathname === Path.Activity,
                })
              }
            >
              My Activity
            </NavLink>
            <NavLink
              to={Path.Opportunities}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.profile__button, {
                  [styles['profile__button--active']]:
                    isActive && pathname === Path.Opportunities,
                })
              }
            >
              My Opportunities
            </NavLink>
          </div>
        </div>

        <div className={styles.profile__bottom}></div>
      </div>
    </div>
  );
};
