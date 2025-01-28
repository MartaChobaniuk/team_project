import React, { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import cn from 'classnames';
import { filterOptions } from '../../helpers/filtersData';
import arrow_down from '../../images/icons/arrow_down_white.svg';
import arrow_up from '../../images/icons/arrow_up_white.svg';
import calendar from '../../images/icons/calendar-filled.svg';
import { FilterSelection } from '../../types/FilterType';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { usePathChecker } from '../../helpers/usePathChecker';

interface FiltersProps {
  onFilterChange: (newFilters: FilterSelection) => void;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  setIsFiltersOpen,
}) => {
  const { isVolunteering, isWishes, isDonate } = usePathChecker();
  const [dropdownState, setDropdownState] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<FilterSelection>({});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calendarStartOpen, setCalendarStartOpen] = useState(false);
  const [calendarEndOpen, setCalendarEndOpen] = useState(false);
  const [isApplyActive, setApplyActive] = useState(false);
  const [isCancelActive, setCancelActive] = useState(false);

  useEffect(() => {
    if (isVolunteering && !selectedOptions.assistanceType) {
      const volunteeringFilter = { assistanceType: 'Volunteering' };

      setSelectedOptions(prev => ({
        ...prev,
        ...volunteeringFilter,
      }));

      const filtersToApply = {
        ...selectedOptions,
        ...volunteeringFilter,
        startDate,
        endDate,
      };

      onFilterChange(filtersToApply);
      setApplyActive(true);
    }
  }, [isVolunteering, selectedOptions, startDate, endDate, onFilterChange]);

  useEffect(() => {
    if (isWishes && !selectedOptions.assistanceType) {
      const wishesFilter = { assistanceType: 'Donation' };

      setSelectedOptions(prev => ({
        ...prev,
        ...wishesFilter,
      }));

      const filtersToApply = {
        ...selectedOptions,
        ...wishesFilter,
        startDate,
        endDate,
      };

      onFilterChange(filtersToApply);
      setApplyActive(true);
    }
  }, [isWishes, selectedOptions, startDate, endDate, onFilterChange]);

  useEffect(() => {
    if (isDonate && !selectedOptions.assistanceType) {
      const donateFilter = { assistanceType: 'Donation' };

      setSelectedOptions(prev => ({
        ...prev,
        ...donateFilter,
      }));

      const filtersToApply = {
        ...selectedOptions,
        ...donateFilter,
        startDate,
        endDate,
      };

      onFilterChange(filtersToApply);
      setApplyActive(true);
    }
  }, [isDonate, selectedOptions, startDate, endDate, onFilterChange]);

  const toggleDropdown = (filterId: string) => {
    setDropdownState(prevState => ({
      ...prevState,
      [filterId]: !prevState[filterId],
    }));
  };

  const selectOption = (filterId: keyof FilterSelection, option: string) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = { ...prevSelectedOptions, [filterId]: option };

      return newSelectedOptions;
    });

    setDropdownState(prevState => ({
      ...prevState,
      [filterId]: false,
    }));
  };

  const applyFilters = () => {
    const filtersToApply = {
      ...selectedOptions,
      startDate,
      endDate,
    };

    onFilterChange(filtersToApply);
    setApplyActive(true);
    setCancelActive(false);
    setIsFiltersOpen(false);
  };

  const cancelFilters = () => {
    setSelectedOptions({});
    setDropdownState({});
    setStartDate(null);
    setEndDate(null);
    onFilterChange({});
    setApplyActive(false);
    setCancelActive(true);
    setIsFiltersOpen(false);
  };

  const handleHideFilters = () => {
    setIsFiltersOpen(false);
  };

  const renderDatePicker = (
    date: Date | null,
    setDate: React.Dispatch<React.SetStateAction<Date | null>>,
    calendarOpen: boolean,
    setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    label: string,
  ) => (
    <div>
      <button
        className={styles['filters__toggle-button']}
        onClick={e => {
          e.preventDefault();
          setCalendarOpen(true);
        }}
      >
        <p
          className={cn(styles.filters__select, {
            [styles['filters__select--chosen']]: date,
          })}
        >
          {date ? date.toLocaleDateString('en-GB') : label}
        </p>
        <img
          className={styles.filters__img}
          src={calendar}
          alt="Toggle dropdown"
        />
      </button>
      <div className={styles.filters__line}></div>
      {calendarOpen && (
        <>
          <div className={styles.filters__calendar}>
            <DatePicker
              selected={date}
              onChange={selectedDate => {
                setDate(selectedDate);
                setCalendarOpen(false);
              }}
              inline
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={styles.filters}>
      <div className={styles.filters__content}>
        {filterOptions.map(filter => (
          <div key={filter.id} className={styles.filters__group}>
            <p className={styles.filters__name}>{filter.nameOfFilter}</p>
            {filter.id === 'startDate' ? (
              renderDatePicker(
                startDate,
                setStartDate,
                calendarStartOpen,
                setCalendarStartOpen,
                'Select start date',
              )
            ) : filter.id === 'endDate' ? (
              renderDatePicker(
                endDate,
                setEndDate,
                calendarEndOpen,
                setCalendarEndOpen,
                'Select end date',
              )
            ) : (
              <>
                <button
                  className={styles['filters__toggle-button']}
                  onClick={() => toggleDropdown(filter.id)}
                >
                  <p
                    className={cn(styles.filters__select, {
                      [styles['filters__select--chosen']]:
                        selectedOptions[filter.id],
                    })}
                  >
                    {selectedOptions[filter.id] || 'Select an option'}
                  </p>
                  <img
                    className={styles.filters__img}
                    src={dropdownState[filter.id] ? arrow_up : arrow_down}
                    alt="Toggle dropdown"
                  />
                </button>
                <div className={styles.filters__line}></div>
                {dropdownState[filter.id] && filter.value && (
                  <>
                    <ul className={styles.filters__list}>
                      {Array.isArray(filter.value) &&
                        filter.value.map(option => {
                          if (typeof option === 'string') {
                            return (
                              <li
                                key={option}
                                onClick={() => selectOption(filter.id, option)}
                                className={cn(styles.filters__item, {
                                  [styles['filters__item--active']]:
                                    selectedOptions[filter.id] === option,
                                })}
                              >
                                <label
                                  className={styles['filters__dropdown-label']}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedOptions[filter.id] === option
                                    }
                                    onChange={() =>
                                      selectOption(filter.id, option)
                                    }
                                    className={
                                      styles['filters__dropdown-checkbox']
                                    }
                                  />
                                  {option}
                                </label>
                              </li>
                            );
                          }

                          if (typeof option === 'object' && option !== null) {
                            const [key, value] = Object.entries(option)[0];

                            return (
                              <li
                                key={key}
                                onClick={() => selectOption(filter.id, value)}
                                className={cn(styles.filters__item, {
                                  [styles['filters__item--active']]:
                                    selectedOptions[filter.id] === value,
                                })}
                              >
                                <label
                                  className={styles['filters__dropdown-label']}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedOptions[filter.id] === value
                                    }
                                    onChange={() =>
                                      selectOption(filter.id, value)
                                    }
                                    className={
                                      styles['filters__dropdown-checkbox']
                                    }
                                  />
                                  {value}
                                </label>
                              </li>
                            );
                          }

                          return null;
                        })}
                    </ul>
                    <div className={styles.filters__line}></div>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.filters__buttons}>
        <button
          className={cn(styles.filters__button, {
            [styles['filters__button--active']]: isApplyActive,
          })}
          onClick={applyFilters}
        >
          <span>Apply</span>
        </button>
        <button
          className={cn(styles.filters__button, {
            [styles['filters__button--active']]: isCancelActive,
          })}
          onClick={cancelFilters}
        >
          <span>Clear</span>
        </button>
        <button className={styles.filters__button} onClick={handleHideFilters}>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};
