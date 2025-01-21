import React, { useState } from 'react';
import styles from './Filters.module.scss';
import cn from 'classnames';
import { filterOptions } from '../../helpers/filtersData';
import arrow_down from '../../images/icons/arrow_down_white.svg';
import arrow_up from '../../images/icons/arrow_up_white.svg';
import { FilterSelection } from '../../types/FilterType';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

interface FiltersProps {
  onFilterChange: (newFilters: FilterSelection) => void;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  setIsFiltersOpen,
}) => {
  const [dropdownState, setDropdownState] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<FilterSelection>({});
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isApplyActive, setApplyActive] = useState(false);
  const [isCancelActive, setCancelActive] = useState(false);

  const toggleDropdown = (filterId: string) => {
    setDropdownState(prevState => ({
      ...prevState,
      [filterId]: !prevState[filterId],
    }));

    if (filterId === 'date') {
      setCalendarOpen(true);
    }
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

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const applyFilters = () => {
    const dateFilter =
      startDate && endDate
        ? `${startDate.toLocaleDateString('en-GB')} - ${endDate.toLocaleDateString('en-GB')}`
        : startDate
          ? `${startDate.toLocaleDateString('en-GB')}`
          : null;

    const filtersToApply = {
      ...selectedOptions,
      ...(dateFilter && { date: dateFilter }),
    };

    onFilterChange(filtersToApply);

    setApplyActive(true);
    setCancelActive(false);
    setIsFiltersOpen(false);
  };

  const cancelFilters = () => {
    setSelectedOptions({});
    setDropdownState({});
    setStartDate(new Date());
    setEndDate(null);
    onFilterChange({});
    setApplyActive(false);
    setCancelActive(true);
    setIsFiltersOpen(false);
  };

  const handleHideFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__content}>
        {filterOptions.map(filter => (
          <div key={filter.id} className={styles.filters__group}>
            <p className={styles.filters__name}>{filter.nameOfFilter}</p>
            <button
              className={styles['filters__toggle-button']}
              onClick={() => toggleDropdown(filter.id)}
            >
              {filter.id === 'date' ? (
                <p>
                  {startDate && endDate
                    ? `${startDate.toLocaleDateString('en-GB')} - ${endDate.toLocaleDateString('en-GB')}`
                    : startDate
                      ? `${startDate.toLocaleDateString('en-GB')}`
                      : 'Select date range'}
                </p>
              ) : (
                <p>{selectedOptions[filter.id] || 'Select an option'}</p>
              )}
              <img
                className={styles.filters__img}
                src={dropdownState[filter.id] ? arrow_up : arrow_down}
                alt="Toggle dropdown"
              />
            </button>
            {dropdownState[filter.id] && filter.value && (
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
                          {option}
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
                          {value}
                        </li>
                      );
                    }

                    return null;
                  })}
              </ul>
            )}
            <div className={styles.filters__line}></div>
            {calendarOpen &&
              dropdownState[filter.id] &&
              // eslint-disable-next-line
              filter.id === 'date' &&
              (
                <div className={styles.filters__calendar}>
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    dateFormat="yyyy/mm/dd"
                  />
                </div>
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
