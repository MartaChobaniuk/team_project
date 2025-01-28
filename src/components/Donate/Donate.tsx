import { useCallback, useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Donate.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Path } from '../../utils/constants';
import { EventsContext } from '../../store/EventsContex';
import search from '../../images/icons/search.svg';
import to_top from '../../images/icons/arrow_back_to_top.svg';
import { FilterSelection } from '../../types/FilterType';
import { Filters } from '../Filters';
import { EventType } from '../../types/EventType';
import { filteredEv } from '../../helpers/getSortedEvents';
import { EventCard } from '../EventCard';
import { Loader } from '../Loader';

export const Donate = () => {
  const { pathname } = useLocation();
  const { events, loading, errorMessage } = useContext(EventsContext);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterSelection>({});
  const [filteredEvent, setFilteredEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);
      setIsFixed(scrollY > 100);
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

  const filteredEvents = useCallback(() => {
    if (filters || query) {
      const filtered = filteredEv(events, filters, query);

      setFilteredEvent(filtered);
    } else {
      setFilteredEvent(events);
    }
  }, [events, filters, query]);

  useEffect(() => {
    filteredEvents();
  }, [filteredEvents]);

  const handleFilterChange = (newFilters: FilterSelection) => {
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
        return newFilters;
      }

      return prevFilters;
    });
  };

  const openFilters = () => {
    setIsFiltersOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className={cn(styles.donate, {
        [styles['donate--visible']]: isVisible,
      })}
    >
      <div
        className={cn(styles['donate__content-top'], {
          [styles['donate__content-top--visible']]: isVisible,
          [styles['donate__content-top--scrolled']]: isScrolled,
        })}
      >
        <h2
          className={cn(styles.donate__title, {
            [styles['donate__title--visible']]: isVisible,
          })}
        >
          Donate
        </h2>
        <p
          className={cn(styles.donate__subtitle, {
            [styles['donate__subtitle--visible']]: isVisible,
            [styles['donate__subtitle--is-filters']]: isFiltersOpen,
          })}
        >
          Use the search bar and filters to find the perfect match for your
          skills, passions or resources.
        </p>
        <div
          className={cn(styles.donate__footer, {
            [styles['donate__footer--visible']]: isVisible,
            [styles['donate__footer--scrolled']]: isScrolled,
          })}
        >
          <div
            className={cn(styles.donate__buttons, {
              [styles['donate__buttons--is-filters']]: isFiltersOpen,
            })}
          >
            <Link
              to={Path.Wishes}
              className={cn(styles.donate__button, {
                [styles['donate__button--active']]: pathname === Path.Donate,
              })}
            >
              <span>Donate</span>
            </Link>
            <Link
              to={Path.Volunteering}
              className={cn(styles.donate__button, {
                [styles['donate__button--active']]:
                  pathname === Path.Volunteering,
              })}
            >
              <span>Volunteering</span>
            </Link>
            <Link
              to={Path.Explore}
              className={cn(styles.donate__button, {
                [styles['donate__button--active']]: pathname === Path.Explore,
              })}
            >
              <span>Explore All</span>
            </Link>
          </div>
          <div
            className={cn(styles['donate__collaps-line'], {
              [styles['donate__collaps-line--visible']]: isVisible,
              [styles['donate__collaps-line--is-filters']]: isFiltersOpen,
            })}
          ></div>
        </div>
      </div>
      <div
        className={cn(styles['donate__content-bottom'], {
          [styles['donate__content-bottom--visible']]: isVisible,
          [styles['donate__content-bottom--is-filters']]: isFiltersOpen,
        })}
      >
        <div
          className={cn(styles['donate__search-block'], {
            [styles['donate__search-block--scrolled']]: isScrolled,
            [styles['donate__search-block--fixed']]: isFixed,
            [styles['donate__search-block--is-filters']]: isFiltersOpen,
          })}
        >
          <div
            className={cn(styles['donate__block-input'], {
              [styles['donate__block-input--is-filters']]: isFiltersOpen,
            })}
          >
            <img
              src={search}
              alt="Search"
              className={styles['donate__search-img']}
            />
            <input
              type="text"
              placeholder="Search opportunities"
              value={query}
              onChange={handleSearchChange}
              className={styles.donate__input}
            />
            <div className={styles.donate__line}></div>
          </div>
          <div className={styles['donate__buttons-search']}>
            <button
              className={cn(styles['donate__button-search'], {
                [styles['donate__button-search--active']]:
                  query.trim().length > 0,
                [styles['donate__button-search--isFilters']]: isFiltersOpen,
              })}
            >
              <span>Search</span>
            </button>
            {!isFiltersOpen && (
              <button
                className={styles['donate__button-search']}
                onClick={openFilters}
              >
                <span>Filters</span>
              </button>
            )}
          </div>
        </div>
        <div
          className={cn(styles['donate__filters-panel'], {
            [styles['donate__filters-panel--open']]: isFiltersOpen,
          })}
        >
          <Filters
            onFilterChange={handleFilterChange}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>
        <div
          className={cn(styles['donate__events-block'], {
            [styles['donate__events-block--visible']]: isVisible,
            [styles['donate__events-block--is-filters']]: isFiltersOpen,
          })}
        >
          {loading && (
            <div className={styles.donate__loader}>
              <Loader />
            </div>
          )}
          {events.length === 0 && errorMessage && (
            <div className={styles.donate__error}>
              <p className={styles['donate__error-text']}>{errorMessage}</p>
            </div>
          )}
          {filteredEvent.length > 0 ? (
            filteredEvent.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className={styles.donate__error}>
              <p className={styles['donate__error-text']}>No matched events</p>
            </div>
          )}
        </div>

        <div
          className={cn(styles['donate__top-container'], {
            [styles['donate__top-container--visible']]: isVisible,
            [styles['donate__top-container--is-filters']]: isFiltersOpen,
          })}
        >
          <button
            className={styles['donate__top-button']}
            onClick={handleClickToTop}
          >
            <img
              src={to_top}
              alt="to top"
              className={styles['donate__top-img']}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
