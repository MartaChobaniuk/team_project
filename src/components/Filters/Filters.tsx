import React, { useState, useCallback, useEffect } from 'react';
import styles from './Filters.module.scss';
import cn from 'classnames';
import { filterOptions } from '../../helpers/filtersData';
import arrow_down from '../../images/icons/arrow_down_white.svg';
import arrow_up from '../../images/icons/arrow_up_white.svg';
import { FilterSelection } from '../../types/FilterType';

interface FiltersProps {
  onFilterChange: (newFilters: FilterSelection) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [dropdownState, setDropdownState] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [initialSelectedOptions, setInitialSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setInitialSelectedOptions(initialSelectedOptions);
  }, []);

  const toggleDropdown = useCallback((filterId: string) => {
    setDropdownState(prevState => ({
      ...prevState,
      [filterId]: !prevState[filterId],
    }));
  }, []);

  const selectOption = useCallback((filterId: string, option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [filterId]: option,
    }));

    setDropdownState(prevState => ({
      ...prevState,
      [filterId]: false,
    }));
  }, []);

  const applyFilters = () => {
    onFilterChange(selectedOptions);
  };

  const cancelFilters = () => {
    setSelectedOptions({ ...initialSelectedOptions });
    setDropdownState({});
    onFilterChange(initialSelectedOptions);
  };

  return (
    <div className={styles.filters}>
      {filterOptions.map(filter => (
        <div key={filter.id} className={styles.filters__group}>
          <p className={styles.filters__name}>{filter.nameOfFilter}</p>
          <button
            className={styles.filters__button}
            onClick={() => toggleDropdown(filter.id)}
          >
            {selectedOptions[filter.id] || 'Select an option'}
            <img
              className={styles.filters__img}
              src={dropdownState[filter.id] ? arrow_up : arrow_down}
              alt="Toggle dropdown"
            />
          </button>
          {dropdownState[filter.id] && filter.value && (
            <ul className={styles.filters__list}>
              {Array.isArray(filter.value) &&
                filter.value.map(option => (
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
                ))}
            </ul>
          )}
        </div>
      ))}

      {/* Кнопки "Apply" та "Cancel" */}
      <div className={styles.filters__actions}>
        <button className={styles.filters__apply} onClick={applyFilters}>
          Apply
        </button>
        <button className={styles.filters__cancel} onClick={cancelFilters}>
          Cancel
        </button>
      </div>
    </div>
  );
};
