import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './StepTwo.module.scss';
import { Path } from '../../utils/constants';
import {
  categories,
  opportunityType,
  assistanceType,
  region,
  timeDemands,
} from '../../helpers/dropdownsInfo';
import arrow from '../../images/icons/arrow_back.svg';
import arrow_up from '../../images/icons/arrow_up_white (2).svg';
import arrow_down from '../../images/icons/arrow_down_white.svg';

type DropdownId = 'categories' | 'opportunityType' | 'assistanceType' | 'region' | 'timeDemands';

export const StepTwo = () => {
  const navigate = useNavigate();

  const [dropdownStates, setDropdownStates] = useState({
    categories: false,
    opportunityType: false,
    assistanceType: false,
    region: false,
    timeDemands: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    categories: '',
    opportunityType: '',
    assistanceType: '',
    region: '',
    timeDemands: '',
  });

  const toggleDropdown = (dropdownId: DropdownId) => {
    setDropdownStates(prevState => ({
      ...prevState,
      [dropdownId]: !prevState[dropdownId],
    }));
  };

  const selectOption = (dropdownId: string, option: string) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [dropdownId]: option,
    }));

    setDropdownStates(prevState => ({
      ...prevState,
      [dropdownId]: false,
    }));
  };

  return (
    <div className={styles.two}>
      <div className={styles.two__nav}>
        <div className={styles['two__right-side']}>
          <div
            className={styles['two__bllock-top']}
            onClick={() => navigate(Path.StepOne)}
          >
            <img src={arrow} alt="arrow" className={styles.two__img} />
            <p className={styles.two__back}>Go Back</p>
          </div>
          <div className={styles['two__bllock-bottom']}>
            <h1 className={styles.two__title}>New Opportunity</h1>
            <h3 className={styles.two__subtitle}>Step 2/3. Event Overview</h3>
          </div>
        </div>
        <div className={styles['two__left-side']}>
          <p className={styles.two__content}>
            Provide key details about the opportunity. These details are all
            required as they will make your opportunity easy to find through our
            filters and search tools.
          </p>
          <div className={styles.two__form}>
            <form action="">
              <input
                className={styles.two__input}
                type="text"
                placeholder="Opportunity Name"
              />
              <div className={styles.two__line}></div>
              <div className={styles['two__dropdowns-block']}>
                <div className={styles['two__dropdown-categories']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={() => toggleDropdown('categories')}
                  >
                    {selectedOptions.categories || 'Category'}
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={dropdownStates.categories ? arrow_up : arrow_down}
                      alt="Arrow Down"
                    />
                  </div>
                  <div className={styles.two__line}></div>
                </div>
                {dropdownStates.categories && (
                  <ul className={styles['two__dropdown-list']}>
                    {categories.map(category => (
                      <li
                        key={category}
                        onClick={() => selectOption('categories', category)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.categories === category,
                        })}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles['two__dropdown-opport']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={() => toggleDropdown('opportunityType')}
                  >
                    {selectedOptions.opportunityType || 'Opportunity Type'}
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={dropdownStates.opportunityType ? arrow_up : arrow_down}
                      alt="Arrow Down"
                    />
                  </div>
                </div>
                {dropdownStates.opportunityType && (
                  <ul className={styles['two__dropdown-list']}>
                    {opportunityType.map(type => (
                      <li
                        key={type}
                        onClick={() => selectOption('opportunityType', type)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.opportunityType === type,
                        })}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                )}
                <div className={styles.two__line}></div>
              </div>
              <div className={styles.two__buttons}>
                <button
                  className={styles['two__button-prev']}
                  onClick={() => navigate(Path.StepOne)}
                >
                  Previous Step
                </button>
                <button
                  className={styles['two__button-continue']}
                  onClick={() => navigate(Path.StepThree)}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
