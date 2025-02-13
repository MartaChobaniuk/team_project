import { useEffect, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import cn from 'classnames';
import styles from './ProfileOpportunities.module.scss';
import { Path } from '../../utils/constants';
import search from '../../images/icons/search.svg';
import arrow_up from '../../images/icons/arrow_up_white (2).svg';
import arrow_down from '../../images/icons/arrow_down_white.svg';

export const ProfileOpportunities = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { profile } = auth.user || {};
  const [query, setQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);
      setIsFixed(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleOpen = (index: number) => {
    setOpenDropdown(prev => (prev === index ? null : index));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.opport}>
      <div className={styles.opport__nav}>
        <div
          className={cn(styles.opport__top, {
            [styles['opport__top--scrolled']]: isScrolled,
            [styles['opport__top--fixed']]: isFixed,
          })}
        >
          <p
            className={cn(styles.opport__greeting, {
              [styles['opport__greeting--scrolled']]: isScrolled,
            })}
          >
            Hello, {profile?.name}
          </p>
          <h1
            className={cn(styles.opport__title, {
              [styles['opport__title--scrolled']]: isScrolled,
              [styles['opport__title--fixed']]: isFixed,
            })}
          >
            All You Need, In One Place
          </h1>
          <div
            className={cn(styles.opport__buttons, {
              [styles['opport__buttons--scrolled']]: isScrolled,
              [styles['opport__buttons--fixed']]: isFixed,
            })}
          >
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
                onClick={e => {
                  e.preventDefault();
                  navigate(Path.StepOne);
                }}
              >
                Create an opportunity
              </button>
            </div>
            <div className={styles.opport__content}>
              <div className={styles.opport__grid}>
                <div className={styles.opport__header}>
                  <span className={styles['opport__detail-name']}>Name</span>
                  <span className={styles['opport__detail-name']}>
                    Submission Date
                  </span>
                  <span className={styles['opport__detail-name']}>
                    Opportunity Type
                  </span>
                  <span className={styles['opport__detail-name']}>Status</span>
                  <span className={styles['opport__detail-name']}>Details</span>
                </div>
                <div className={styles['opport__line-grid']}></div>
                <div className={styles.opport__row}>
                  <span className={styles['opport__detail-value']}>Wish</span>
                  <span className={styles['opport__detail-value']}>
                    25/02/2025
                  </span>
                  <span className={styles['opport__detail-value']}>
                    Donation
                  </span>
                  <span className={styles['opport__detail-value']}>
                    On Rewiew
                  </span>
                  <button className={styles['opport__button-detail']}>
                    Opportunity Information
                  </button>
                </div>
              </div>
              <div className={styles.opport__dropdown}>
                <button
                  className={styles['opport__dropdown-button']}
                  onClick={e => {
                    e.preventDefault();
                    toggleOpen(1);
                  }}
                >
                  <span className={styles.opport__select}>Wish</span>
                </button>
                <div className={styles['opport__dropdown-img-container']}>
                  <img
                    className={styles['opport__dropdown-img']}
                    src={openDropdown === 1 ? arrow_up : arrow_down}
                    alt="Arrow Down"
                  />
                </div>
              </div>
              <div className={styles.opport__line}></div>
              {openDropdown === 1 && (
                <>
                  <div className={styles.opport__info}>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Submission Date:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        25/02/2025
                      </span>
                    </div>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Opportunity Type:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        Donation
                      </span>
                    </div>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Status:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        On Rewiew
                      </span>
                    </div>
                    <button className={styles['opport__button-detail']}>
                      Opportunity Information
                    </button>
                  </div>
                </>
              )}

              <div className={styles.opport__dropdown}>
                <button
                  className={styles['opport__dropdown-button']}
                  onClick={e => {
                    e.preventDefault();
                    toggleOpen(2);
                  }}
                >
                  <span className={styles.opport__select}>Help Sasha</span>
                </button>
                <div className={styles['opport__dropdown-img-container']}>
                  <img
                    className={styles['opport__dropdown-img']}
                    src={openDropdown === 2 ? arrow_up : arrow_down}
                    alt="Arrow Down"
                  />
                </div>
              </div>
              <div className={styles.opport__line}></div>
              {openDropdown === 2 && (
                <>
                  <div className={styles.opport__info}>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Submission Date:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        25/02/2025
                      </span>
                    </div>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Opportunity Type:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        Donation
                      </span>
                    </div>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Status:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        On Rewiew
                      </span>
                    </div>
                    <button className={styles['opport__button-detail']}>
                      Opportunity Information
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.opport__block}>
            <h2 className={styles.opport__subtitle}>Posted Opportunities</h2>
            <div className={styles['opport__search-block']}>
              <div className={styles['opport__block-input']}>
                <img
                  src={search}
                  alt="Search"
                  className={styles['opport__search-img']}
                />
                <input
                  type="text"
                  placeholder="Search opportunities"
                  value={query}
                  onChange={handleSearchChange}
                  className={styles.opport__input}
                />
                <div className={styles['opport__line-search']}></div>
              </div>
              <div className={styles['opport__buttons-search']}>
                <button className={styles['opport__button-search']}>
                  <span>Search</span>
                </button>
                <button className={styles['opport__button-search']}>
                  <span>Filters</span>
                </button>
              </div>
            </div>
            <div className={styles.opport__content}>
              <div className={styles.opport__grid}>
                <div className={styles.opport__header}>
                  <span>Name</span>
                  <span>Type</span>
                  <span>Main Assistance Progress</span>
                  <span>Status</span>
                  <span>Leave Feedback</span>
                </div>
                <div className={styles['opport__line-grid']}></div>
                <div className={styles.opport__row}>
                  <span>Wish</span>
                  <span>Donation</span>
                  <span>14/25 participants</span>
                  <span>Report Needed</span>
                  <button className={styles['opport__button-detail']}>
                    Submit a report
                  </button>
                </div>
              </div>
              <div className={styles.opport__dropdown}>
                <button
                  className={styles['opport__dropdown-button']}
                  onClick={e => {
                    e.preventDefault();
                    toggleOpen(3);
                  }}
                >
                  <span className={styles.opport__select}>Wish</span>
                </button>
                <div className={styles['opport__dropdown-img-container']}>
                  <img
                    className={styles['opport__dropdown-img']}
                    src={openDropdown === 3 ? arrow_up : arrow_down}
                    alt="Arrow Down"
                  />
                </div>
              </div>
              <div className={styles.opport__line}></div>
              {openDropdown === 3 && (
                <>
                  <div className={styles.opport__info}>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Type:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        Donation
                      </span>
                    </div>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Main Assistance Progress:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        14/25 participants
                      </span>
                    </div>
                    <div>
                      <span className={styles['opport__detail-name']}>
                        Status:
                      </span>
                      <span className={styles['opport__detail-value']}>
                        Report Needed
                      </span>
                    </div>
                    <button className={styles['opport__button-detail']}>
                      Submit a report
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
