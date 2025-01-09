import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './ExploreAll.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Path } from '../../utils/constants';
import image from '../../images/images.jpg';
import { EventsContext } from '../../store/EventsContex';
import { ProgressBar } from '../ProgressBar';
import search from '../../images/icons/search.svg';
import { FilterSelection } from '../../types/FilterType';
import { Filters } from '../Filters';
import { EventType } from '../../types/EventType';
import { filteredEv } from '../../helpers/getSortedEvents';

export const ExploreAll = () => {
  const { pathname } = useLocation();
  const { events } = useContext(EventsContext);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterSelection>({});
  const [filteredEvent, setFilteredEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilteredEvent(events);

    if (filters) {
      const filtered = filteredEv(events, filters, query);

      setFilteredEvent(filtered);
    }
  }, [events, filters, query]);

  const openFilters = () => {
    setIsFiltersOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (newFilters: FilterSelection) => {
    setFilters(newFilters);
  };

  return (
    <section className={styles.explore}>
      <div
        className={cn(styles['explore__content-top'], {
          [styles['explore__content-top--visible']]: isVisible,
          [styles['explore__content-top--scrolled']]: isScrolled,
        })}
      >
        <h2 className={styles.explore__title}>
          Explore Your Opportunities To Make A Positive Impact On The World
        </h2>
        <p className={styles.explore__subtitle}>
          Discover a world of opportunities to make a difference. Explore our
          catalog of open wishes, fundraisers, and volunteering events. Use the
          search bar and filters to find the perfect match for your skills,
          passions, or resources. Whether you want to donate, fulfill a wish, or
          volunteer your time, there’s something here for everyone ready to take
          action.
        </p>
        <div
          className={cn(styles['explore__buttons-main'], {
            [styles['explore__buttons-main--visible']]: isVisible,
          })}
        >
          <Link
            to={Path.Wishes}
            className={cn(styles.explore__button, {
              [styles['explore__button--active']]: pathname === Path.Wishes,
            })}
          >
            <span>Wishes</span>
          </Link>
          <Link
            to={Path.Volunteering}
            className={cn(styles.explore__button, {
              [styles['explore__button--active']]:
                pathname === Path.Volunteering,
            })}
          >
            <span>Volunteering</span>
          </Link>
          <Link
            to={Path.Explore}
            className={cn(styles.explore__button, {
              [styles['explore__button--active']]: pathname === Path.Explore,
            })}
          >
            <span>Explore All</span>
          </Link>
        </div>
      </div>
      <div
        className={cn(styles.explore__footer, {
          [styles['explore__footer--visible']]: isVisible,
          [styles['explore__footer--scrolled']]: isScrolled,
        })}
      >
        <div
          className={cn(styles.explore__buttons, {
            [styles['explore__buttons--visible']]: isVisible,
            [styles['explore__buttons--is-filters']]: isFiltersOpen,
          })}
        >
          <Link
            to={Path.Wishes}
            className={cn(styles.explore__button, {
              [styles['explore__button--active']]: pathname === Path.Wishes,
            })}
          >
            <span>Wishes</span>
          </Link>
          <Link
            to={Path.Volunteering}
            className={cn(styles.explore__button, {
              [styles['explore__button--active']]:
                pathname === Path.Volunteering,
            })}
          >
            <span>Volunteering</span>
          </Link>
          <Link
            to={Path.Explore}
            className={cn(styles.explore__button, {
              [styles['explore__button--active']]: pathname === Path.Explore,
            })}
          >
            <span>Explore All</span>
          </Link>
        </div>
        <div
          className={cn(styles['explore__collaps-line'], {
            [styles['explore__collaps-line--is-filters']]: isFiltersOpen,
          })}
        ></div>
      </div>
      <div
        className={cn(styles['explore__content-bottom'], {
          [styles['explore__content-bottom--visible']]: isVisible,
          [styles['explore__content-bottom--is-filters']]: isFiltersOpen,
        })}
      >
        <div
          className={cn(styles['explore__search-block'], {
            [styles['explore__search-block--scrolled']]: isScrolled,
            [styles['explore__search-block--is-filters']]: isFiltersOpen,
          })}
        >
          <div
            className={cn(styles['explore__block-input'], {
              [styles['explore__block-input--is-filters']]: isFiltersOpen,
            })}
          >
            <img
              src={search}
              alt="Search"
              className={styles['explore__search-img']}
            />
            <input
              type="text"
              placeholder="Search opportunities"
              value={query}
              onChange={handleSearchChange}
              className={styles.explore__input}
            />
            <div className={styles.explore__line}></div>
          </div>
          <div className={styles['explore__buttons-search']}>
            <button
              className={cn(styles['explore__button-search'], {
                [styles['explore__button-search--active']]:
                  query.trim().length > 0,
                [styles['explore__button-search--isFilters']]: isFiltersOpen,
              })}
            >
              <span>Search</span>
            </button>
            {!isFiltersOpen && (
              <button
                className={styles['explore__button-search']}
                onClick={openFilters}
              >
                <span>Filters</span>
              </button>
            )}
          </div>
        </div>
        <div
          className={cn(styles['explore__filters-panel'], {
            [styles['explore__filters-panel--open']]: isFiltersOpen,
          })}
        >
          <Filters
            onFilterChange={handleFilterChange}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
        <div
          className={cn(styles['explore__events-block'], {
            [styles['explore__events-block--visible']]: isVisible,
            [styles['explore__events-block--is-filters']]: isFiltersOpen,
          })}
        >
          {filteredEvent.length > 0 ? (
            filteredEvent.map(event => (
              <div key={event.id} className={styles.explore__event}>
                <div className={styles['explore__event-container-img']}>
                  <img
                    src={image}
                    alt="Event"
                    className={styles['explore__event-img']}
                  />
                  <span className={styles['explore__event-help-type']}>
                    {event.assistanceType}
                  </span>
                </div>
                <h4 className={styles['explore__event-title']}>
                  {event.title}
                </h4>
                <ProgressBar
                  goal={event.goal}
                  currentProgress={event.currentProgress}
                  opportunityType={event.opportunityType}
                />
                <div className={styles['explore__event-types']}>
                  <p>{event.opportunityType}</p> / <p>{event.assistanceType}</p>
                </div>
                <div className={styles['explore__event-details']}>
                  <p>{event.location}</p> /
                  <p>{new Date(event.date).toLocaleString('uk-UA')}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.explore__error}>No Matched Events</div>
          )}
        </div>
      </div>
    </section>
  );
};
