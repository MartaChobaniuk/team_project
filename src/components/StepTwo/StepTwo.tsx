import { useEffect, useState } from 'react';
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
import calendar from '../../images/icons/calendar-filled.svg';
import DatePicker from 'react-datepicker';
import { useOpportunityContext } from '../../store/OpportunityContex';

type DropdownId =
  | 'categories'
  | 'opportunityType'
  | 'assistanceType'
  | 'region'
  | 'timeDemands';

export const StepTwo = () => {
  const navigate = useNavigate();
  const { stepTwoData, setStepTwoData } = useOpportunityContext();

  const [dropdownStates, setDropdownStates] = useState({
    categories: false,
    opportunityType: false,
    assistanceType: false,
    region: false,
    timeDemands: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    categories: stepTwoData.categories || '',
    opportunityType: stepTwoData.opportunityType || '',
    assistanceType: stepTwoData.assistanceType || '',
    region: stepTwoData.region || '',
    timeDemands: stepTwoData.timeDemands || '',
  });

  const [startDate, setStartDate] = useState<Date | null>(
    stepTwoData.startDate || null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    stepTwoData.endDate || null,
  );
  const [showDatePickerStart, setShowDatePickerStart] = useState(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
  const [startHour, setStartHour] = useState(stepTwoData.startHour || '');
  const [startMinute, setStartMinute] = useState(stepTwoData.startMinute || '');
  const [startPeriod, setStartPeriod] = useState(
    stepTwoData.startPeriod || 'AM',
  );
  const [endHour, setEndHour] = useState(stepTwoData.endHour || '');
  const [endMinute, setEndMinute] = useState(stepTwoData.endMinute || '');
  const [endPeriod, setEndPeriod] = useState(stepTwoData.endPeriod || 'AM');

  useEffect(() => {
    const storedData = localStorage.getItem('stepTwoData');
    const storedEndDate = localStorage.getItem('endDate');
    const storedStartDate = localStorage.getItem('startDate');

    if (storedData) {
      setStepTwoData(JSON.parse(storedData));
    }

    if (storedEndDate) {
      const [year, month, day] = storedEndDate.split('-');

      const parsedEndDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
      );

      setEndDate(parsedEndDate);
      setStepTwoData(prevState => ({
        ...prevState,
        endDate: parsedEndDate,
      }));
    }

    if (storedStartDate) {
      const [year, month, day] = storedStartDate.split('-');

      const parsedStartDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
      );

      setStepTwoData(prevState => ({
        ...prevState,
        startDate: parsedStartDate,
      }));
    }
  }, [setStepTwoData]);

  useEffect(() => {
    if (stepTwoData) {
      localStorage.setItem('stepTwoData', JSON.stringify(stepTwoData));
    }
  }, [stepTwoData]);

  const toggleStartPeriod = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setStartPeriod(prevPeriod => {
      const newPeriod = prevPeriod === 'AM' ? 'PM' : 'AM';

      setStepTwoData(prevState => ({
        ...prevState,
        startPeriod: newPeriod,
      }));

      return newPeriod;
    });
  };

  const toggleEndPeriod = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setEndPeriod(prevPeriod => {
      const newPeriod = prevPeriod === 'AM' ? 'PM' : 'AM';

      setStepTwoData(prevState => ({
        ...prevState,
        endPeriod: newPeriod,
      }));

      return newPeriod;
    });
  };

  const handleStartHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || (Number(value) >= 0 && Number(value) <= 23)) {
      setStartHour(value);
      setStepTwoData(prevState => ({
        ...prevState,
        startHour: value,
      }));
    }
  };

  const handleStartHourBlur = () => {
    if (startHour !== '' && startHour.length < 2) {
      const paddedHour = startHour.padStart(2, '0');

      setStartHour(paddedHour);
      setStepTwoData(prevState => ({
        ...prevState,
        startHour: paddedHour,
      }));
    }
  };

  const handleStartMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || (Number(value) >= 0 && Number(value) <= 59)) {
      setStartMinute(value);
      setStepTwoData(prevState => ({
        ...prevState,
        startMinute: value,
      }));
    }
  };

  const handleStartMinuteBlur = () => {
    if (startMinute !== '' && startMinute.length < 2) {
      const paddedMinute = startMinute.padStart(2, '0');

      setStartMinute(paddedMinute);
      setStepTwoData(prevState => ({
        ...prevState,
        startMinute: paddedMinute,
      }));
    }
  };

  const handleEndHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || (Number(value) >= 0 && Number(value) <= 23)) {
      setEndHour(value);
      setStepTwoData(prevState => ({
        ...prevState,
        endHour: value,
      }));
    }
  };

  const handleEndHourBlur = () => {
    if (endHour !== '' && endHour.length < 2) {
      const paddedHour = endHour.padStart(2, '0');

      setEndHour(paddedHour);
      setStepTwoData(prevState => ({
        ...prevState,
        endHour: paddedHour,
      }));
    }
  };

  const handleEndMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || (Number(value) >= 0 && Number(value) <= 59)) {
      setEndMinute(value);
      setStepTwoData(prevState => ({
        ...prevState,
        endMinute: value,
      }));
    }
  };

  const handleEndMinuteBlur = () => {
    if (endMinute !== '' && endMinute.length < 2) {
      const paddedMinute = endMinute.padStart(2, '0');

      setEndMinute(paddedMinute);
      setStepTwoData(prevState => ({
        ...prevState,
        endMinute: paddedMinute,
      }));
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    if (date instanceof Date) {
      const normalizedDate = new Date(date);

      normalizedDate.setHours(0, 0, 0, 0);
      setStartDate(normalizedDate);
      setStepTwoData(prevState => ({
        ...prevState,
        startDate: normalizedDate,
      }));

      const dateToStore = normalizedDate.toISOString().split('T')[0];

      localStorage.setItem('startDate', dateToStore);
      setShowDatePickerStart(false);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date instanceof Date) {
      const normalizedDate = new Date(date);

      normalizedDate.setHours(0, 0, 0, 0);

      setEndDate(normalizedDate);
      setStepTwoData(prevState => ({
        ...prevState,
        endDate: normalizedDate,
      }));

      const dateToStore = normalizedDate.toISOString().split('T')[0];

      localStorage.setItem('endDate', dateToStore);
      setShowDatePickerEnd(false);
    }
  };

  const toggleDropdown = (dropdownId: DropdownId) => {
    setDropdownStates(prevState => ({
      ...prevState,
      [dropdownId]: !prevState[dropdownId],
    }));
  };

  const selectOption = (category: string, value: string) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [category]: value,
    }));

    setStepTwoData(prevState => ({
      ...prevState,
      [category]: value,
    }));

    setDropdownStates(prevState => ({
      ...prevState,
      [category]: false,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStepTwoData(prev => ({ ...prev, [name]: value }));
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
                name="oppotunityName"
                value={stepTwoData.oppotunityName}
                onChange={handleChange}
              />
              <div className={styles.two__line}></div>
              <p className={styles.two__remark}>*Required</p>
              <div className={styles['two__dropdowns-block']}>
                <div className={styles['two__dropdown-categories']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown('categories');
                    }}
                  >
                    <span
                      className={cn(styles.two__select, {
                        [styles['two__select--chosen']]:
                          selectedOptions.categories,
                      })}
                    >
                      {selectedOptions.categories || 'Category'}
                    </span>
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={dropdownStates.categories ? arrow_up : arrow_down}
                      alt="Arrow Down"
                    />
                  </div>
                </div>
                {dropdownStates.categories && (
                  <ul className={styles['two__dropdown-list-categories']}>
                    {categories.map(category => (
                      <li
                        key={category}
                        onClick={() => selectOption('categories', category)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.categories === category,
                        })}
                      >
                        <label className={styles['two__dropdown-label']}>
                          <input
                            type="checkbox"
                            checked={selectedOptions.categories === category}
                            onChange={() =>
                              selectOption('categories', category)
                            }
                            className={styles['two__dropdown-checkbox']}
                          />
                          {category}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles['two__dropdown-opport']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown('opportunityType');
                    }}
                  >
                    <span
                      className={cn(styles.two__select, {
                        [styles['two__select--chosen']]:
                          selectedOptions.opportunityType,
                      })}
                    >
                      {selectedOptions.opportunityType || 'Opportunity Type'}
                    </span>
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={
                        dropdownStates.opportunityType ? arrow_up : arrow_down
                      }
                      alt="Arrow Down"
                    />
                  </div>
                </div>
                {dropdownStates.opportunityType && (
                  <ul className={styles['two__dropdown-list-opport']}>
                    {opportunityType.map(type => (
                      <li
                        key={type}
                        onClick={() => selectOption('opportunityType', type)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.opportunityType === type,
                        })}
                      >
                        <label className={styles['two__dropdown-label']}>
                          <input
                            type="checkbox"
                            checked={selectedOptions.opportunityType === type}
                            onChange={() =>
                              selectOption('opportunityType', type)
                            }
                            className={styles['two__dropdown-checkbox']}
                          />
                          {type}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.two__lines}>
                <div className={styles['two__line--left']}></div>
                <div className={styles['two__line--right']}></div>
              </div>
              <div className={styles['two__dropdowns-block']}>
                <div className={styles['two__dropdown-assist']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown('assistanceType');
                    }}
                  >
                    <span
                      className={cn(styles.two__select, {
                        [styles['two__select--chosen']]:
                          selectedOptions.assistanceType,
                      })}
                    >
                      {selectedOptions.assistanceType || 'Assistance Type'}
                    </span>
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={
                        dropdownStates.assistanceType ? arrow_up : arrow_down
                      }
                      alt="Arrow Down"
                    />
                  </div>
                </div>
                {dropdownStates.assistanceType && (
                  <ul className={styles['two__dropdown-list-assist']}>
                    {assistanceType.map(type => (
                      <li
                        key={type}
                        onClick={() => selectOption('assistanceType', type)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.assistanceType === type,
                        })}
                      >
                        <label className={styles['two__dropdown-label']}>
                          <input
                            type="checkbox"
                            checked={selectedOptions.assistanceType === type}
                            onChange={() =>
                              selectOption('assistanceType', type)
                            }
                            className={styles['two__dropdown-checkbox']}
                          />
                          {type}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  type="text"
                  className={styles['two__input--target']}
                  placeholder="Target"
                  name="target"
                  value={stepTwoData.target}
                  onChange={handleChange}
                />
              </div>
              <div className={styles['two__lines--assist']}>
                <div className={styles['two__line--left']}></div>
                <div className={styles['two__line--right']}></div>
              </div>
              <div className={styles['two__remark--container']}>
                <p className={styles['two__remark--target']}>
                  Mesurable goal for progress tracking.
                </p>
              </div>
              <div className={styles['two__block-region']}>
                <div className={styles['two__dropdown-region']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown('region');
                    }}
                  >
                    <span
                      className={cn(styles.two__select, {
                        [styles['two__select--chosen']]: selectedOptions.region,
                      })}
                    >
                      {selectedOptions.region || 'Region'}
                    </span>
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={dropdownStates.region ? arrow_up : arrow_down}
                      alt="Arrow Down"
                    />
                  </div>
                </div>
                {dropdownStates.region && (
                  <ul className={styles['two__dropdown-list-region']}>
                    {region.map(reg => (
                      <li
                        key={reg}
                        onClick={() => selectOption('region', reg)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.region === reg,
                        })}
                      >
                        <label className={styles['two__dropdown-label']}>
                          <input
                            type="checkbox"
                            checked={selectedOptions.region === reg}
                            onChange={() => selectOption('region', reg)}
                            className={styles['two__dropdown-checkbox']}
                          />
                          {reg}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.two__line}></div>
              <input
                className={styles.two__input}
                type="text"
                placeholder="Adress"
                name="adress"
                value={stepTwoData.adress}
                onChange={handleChange}
              />
              <div className={styles.two__line}></div>
              <p className={styles.two__remark}>
                Give a full address. If there can be difficulties in finding it,
                provide instructions.
              </p>
              <div className={styles['two__block-calendar']}>
                <div className={styles.two__calendar}>
                  <input
                    type="text"
                    placeholder="Choose a starting date"
                    className={styles.two__input}
                    name="startDate"
                    value={
                      stepTwoData.startDate instanceof Date
                        ? stepTwoData.startDate.toLocaleDateString('en-US')
                        : ''
                    }
                    readOnly
                    onClick={() => setShowDatePickerStart(true)}
                  />
                  {showDatePickerStart && (
                    <div className={styles.two__picker}>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        inline
                        minDate={new Date()}
                      />
                    </div>
                  )}
                  <img
                    src={calendar}
                    alt="calendar"
                    className={styles['two__calendar-img']}
                    onClick={() => setShowDatePickerStart(true)}
                  />
                </div>
                <div className={styles['two__block-hour']}>
                  <input
                    value={startHour}
                    onChange={handleStartHourChange}
                    onBlur={handleStartHourBlur}
                    type="number"
                    className={styles['two__input--calendar']}
                    placeholder="HH"
                    maxLength={2}
                  />
                </div>
                <div className={styles['two__block-dots']}>
                  <span className={styles.two__dots}>:</span>
                </div>
                <div className={styles['two__block-min']}>
                  <input
                    value={startMinute}
                    onChange={handleStartMinuteChange}
                    onBlur={handleStartMinuteBlur}
                    type="number"
                    className={styles['two__input--calendar']}
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>
                <button
                  className={styles['two__button--calendar']}
                  onClick={toggleStartPeriod}
                >
                  {startPeriod}
                </button>
              </div>
              <div className={styles['two__lines--calendar']}>
                <div className={styles['two__line--big']}></div>
                <div className={styles['two__line--small']}></div>
                <div className={styles['two__line--small']}></div>
              </div>
              <div className={styles['two__block-calendar']}>
                <div className={styles.two__calendar}>
                  <input
                    type="text"
                    placeholder="Choose an ending date"
                    className={styles.two__input}
                    name="endDate"
                    value={
                      stepTwoData.endDate instanceof Date
                        ? stepTwoData.endDate.toLocaleDateString('en-GB')
                        : ''
                    }
                    readOnly
                    onClick={() => setShowDatePickerEnd(true)}
                  />
                  {showDatePickerEnd && (
                    <div className={styles.two__picker}>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        inline
                        minDate={new Date()}
                      />
                    </div>
                  )}
                  <img
                    src={calendar}
                    alt="calendar"
                    className={styles['two__calendar-img']}
                    onClick={() => setShowDatePickerEnd(true)}
                  />
                </div>
                <div className={styles['two__block-hour']}>
                  <input
                    value={endHour}
                    onChange={handleEndHourChange}
                    onBlur={handleEndHourBlur}
                    type="number"
                    className={styles['two__input--calendar']}
                    placeholder="HH"
                    maxLength={2}
                  />
                </div>
                <div className={styles['two__block-dots']}>
                  <span className={styles.two__dots}>:</span>
                </div>
                <div className={styles['two__block-min']}>
                  <input
                    value={endMinute}
                    onChange={handleEndMinuteChange}
                    onBlur={handleEndMinuteBlur}
                    type="number"
                    className={styles['two__input--calendar']}
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>
                <button
                  className={styles['two__button--calendar']}
                  onClick={toggleEndPeriod}
                >
                  {endPeriod}
                </button>
              </div>
              <div className={styles['two__lines--calendar']}>
                <div className={styles['two__line--big']}></div>
                <div className={styles['two__line--small']}></div>
                <div className={styles['two__line--small']}></div>
              </div>
              <div className={styles['two__block-demands']}>
                <div className={styles['two__dropdown-demands']}>
                  <button
                    className={styles.two__dropdown}
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown('timeDemands');
                    }}
                  >
                    <span
                      className={cn(styles.two__select, {
                        [styles['two__select--chosen']]:
                          selectedOptions.timeDemands,
                      })}
                    >
                      {selectedOptions.timeDemands || 'Time Demands'}
                    </span>
                  </button>
                  <div className={styles['two__dropdown-img-container']}>
                    <img
                      className={styles['two__dropdown-img']}
                      src={dropdownStates.timeDemands ? arrow_up : arrow_down}
                      alt="Arrow Down"
                    />
                  </div>
                </div>
                {dropdownStates.timeDemands && (
                  <ul className={styles['two__dropdown-list-demands']}>
                    {timeDemands.map(demands => (
                      <li
                        key={demands}
                        onClick={() => selectOption('timeDemands', demands)}
                        className={cn(styles['two__dropdown-item'], {
                          [styles['two__dropdown-item--active']]:
                            selectedOptions.timeDemands === demands,
                        })}
                      >
                        <label className={styles['two__dropdown-label']}>
                          <input
                            type="checkbox"
                            checked={selectedOptions.timeDemands === demands}
                            onChange={() =>
                              selectOption('timeDemands', demands)
                            }
                            className={styles['two__dropdown-checkbox']}
                          />
                          {demands}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.two__line}></div>
              <input
                className={styles.two__input}
                name="requiredMaterialsSkills"
                type="text"
                placeholder="Required materials and skills"
                value={stepTwoData.requiredMaterialsSkills}
                onChange={handleChange}
              />
              <div className={styles.two__line}></div>
              <p className={styles.two__remark}>
                List needed materials and/or skills. If none are required, write
                it as well.
              </p>
              <div className={styles.two__buttons}>
                <button
                  className={styles['two__button-prev']}
                  onClick={e => {
                    e.preventDefault();
                    navigate(Path.StepOne);
                  }}
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
