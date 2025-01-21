import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProfileOpportunities.module.scss';
import { useAuth } from 'react-oidc-context';
import { NavLink } from 'react-router-dom';
import { Path } from '../../utils/constants';
import cn from 'classnames';

export const ProfileOpportunities = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { profile } = auth.user || {};

  return (
    <div className={styles.opport}>
      <div className={styles.opport__nav}>
        <div className={styles.opport__top}>
          <p className={styles.opport__greeting}>Hello, {profile?.name}</p>
          <h1 className={styles.opport__title}>All You Need, In One Place</h1>
          <div className={styles.opport__buttons}>
            <NavLink
              to={Path.ProfileInfo}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.opport__button, {
                  [styles['opport__button--active']]:
                    isActive && pathname === Path.ProfileInfo,
                })
              }
            >
              Profile Information
            </NavLink>
            <NavLink
              to={Path.Activity}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.opport__button, {
                  [styles['opport__button--active']]:
                    isActive && pathname === Path.Activity,
                })
              }
            >
              My Activity
            </NavLink>
            <NavLink
              to={Path.Opportunities}
              className={({ isActive }: { isActive: boolean }) =>
                cn(styles.opport__button, {
                  [styles['opport__button--active']]:
                    isActive && pathname === Path.Opportunities,
                })
              }
            >
              My Opportunities
            </NavLink>
          </div>
        </div>

        <div className={styles.opport__bottom}>
          <div className={styles.opport__block}>
            <div className={styles.opport__shell}>
              <h2 className={styles.opport__subtitle}>
                Submitted Opportunities
              </h2>
              <button
                className={styles['opport__create-button']}
                onClick={() => navigate(Path.StepOne)}
              >
                Create an opportunity
              </button>
            </div>
          </div>
          <div className={styles.opport__block}>
            <h2 className={styles.opport__subtitle}>Posted Opportunities</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
