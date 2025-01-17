import { NavLink, useLocation } from 'react-router-dom';
import styles from './ProfileActivity.module.scss';
import { Path } from '../../utils/constants';
import cn from 'classnames';
import { useAuth } from 'react-oidc-context';

export const ProfileActivity = () => {
  const { pathname } = useLocation();
  const auth = useAuth();
  const { profile } = auth.user || {};

  return (
    <div className={styles.activity}>
      <div className={styles.activity__nav}>
        <div className={styles.activity__top}>
          <p className={styles.activity__greeting}>Hello, {profile?.name}</p>
          <h1 className={styles.activity__title}>All You Need, In One Place</h1>
          <div className={styles.activity__buttons}>
            <NavLink
              to={Path.ProfileInfo}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.activity__button, {
                  [styles['activity__button--active']]:
                    isActive && pathname === Path.ProfileInfo,
                })
              }
            >
              Profile Information
            </NavLink>
            <NavLink
              to={Path.Activity}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.activity__button, {
                  [styles['activity__button--active']]:
                    isActive && pathname === Path.Activity,
                })
              }
            >
              My Activity
            </NavLink>
            <NavLink
              to={Path.Opportunities}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.activity__button, {
                  [styles['activity__button--active']]:
                    isActive && pathname === Path.Opportunities,
                })
              }
            >
              My Opportunities
            </NavLink>
          </div>
        </div>

        <div className={styles.activity__bottom}></div>
      </div>
    </div>
  );
};
