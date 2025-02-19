/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProfileOpportunities.module.scss';
import { Path } from '../../utils/constants';
import search from '../../images/icons/search.svg';
import arrow_up from '../../images/icons/arrow_up_white (2).svg';
import arrow_down from '../../images/icons/arrow_down_white.svg';
import { Loader } from '../Loader';

export const ProfileOpportunities = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState(
    localStorage.getItem('name') || 'user',
  );
  // eslint-disable-next-line max-len, prettier/prettier
  const [postedOpportunities, setPostedOpportunities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('name') || 'user');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
    const getUserAccountDetails = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setError('You need to be logged in to view your account details.');

        return;
      }

      setLoading(true);
      setError(null);

      try {
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
          if (response.status === 401) {
            setError('Unauthorized: Please login again.');
          } else if (response.status === 404) {
            setError('Account not found.');
          } else if (response.status === 500) {
            setError('Server error. Please try again later.');
          } else {
            setError(`Unexpected error: ${response.statusText}`);
          }

          return;
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.postedOpportunities)) {
          setError('Error: Invalid data structure received.');

          return;
        }

        setPostedOpportunities(data.postedOpportunities);
      } catch (errorMes) {
        setError('Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    getUserAccountDetails();
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
          })}
        >
          <p
            className={cn(styles.opport__greeting, {
              [styles['opport__greeting--scrolled']]: isScrolled,
            })}
          >
            Hello, {userName}!
          </p>
          <h1
            className={cn(styles.opport__title, {
              [styles['opport__title--scrolled']]: isScrolled,
            })}
          >
            All You Need, In One Place
          </h1>
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

        <div
          ref={bottomRef}
          className={cn(styles.opport__bottom, {
            [styles['opport__bottom--scrolled']]: isScrolled,
          })}
        >
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
            {error && <p className={styles.opport__error}>{error}</p>}
            {loading && <Loader />}
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
                {postedOpportunities.length > 0 ? (
                  postedOpportunities.map((event: any, index: number) => (
                    <div key={index} className={styles.opport__row}>
                      <span>{event.name}</span>
                      <span>{event.type}</span>
                      <span>{event.mainAssistance}</span>
                      <span>{event.status}</span>
                      <button className={styles['opport__button-detail']}>
                        Submit a report
                      </button>
                    </div>
                  ))
                ) : (
                  <div>No opportunities available.</div>
                )}
              </div>
              <div className={styles.opport__dropdown}>
                {postedOpportunities.length > 0 ? (
                  postedOpportunities.map((event: any, index: number) => (
                    <div key={event.id}>
                      <button
                        className={styles['opport__dropdown-button']}
                        onClick={e => {
                          e.preventDefault();
                          toggleOpen(index);
                        }}
                      >
                        <span className={styles.opport__select}>
                          {event.name}
                        </span>
                      </button>
                      <div className={styles['opport__dropdown-img-container']}>
                        <img
                          className={styles['opport__dropdown-img']}
                          src={openDropdown === index ? arrow_up : arrow_down}
                          alt="Arrow Down"
                        />
                      </div>

                      {openDropdown === index && (
                        <div className={styles.opport__info}>
                          <div>
                            <span className={styles['opport__detail-name']}>
                              Type:
                            </span>
                            <span className={styles['opport__detail-value']}>
                              {event.type}
                            </span>
                          </div>
                          <div>
                            <span className={styles['opport__detail-name']}>
                              Main Assistance Progress:
                            </span>
                            <span className={styles['opport__detail-value']}>
                              {event.mainAssistance}
                            </span>
                          </div>
                          <div>
                            <span className={styles['opport__detail-name']}>
                              Status:
                            </span>
                            <span className={styles['opport__detail-value']}>
                              {event.status}
                            </span>
                          </div>
                          <button className={styles['opport__button-detail']}>
                            Submit a report
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No opportunities available</p>
                )}
              </div>
              <div className={styles.opport__line}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
