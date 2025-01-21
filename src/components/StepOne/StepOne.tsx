import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../utils/constants';
import cn from 'classnames';
import styles from './StepOne.module.scss';
import arrow from '../../images/icons/arrow_back.svg';
import arrow_up from '../../images/icons/arrow_up_white (2).svg';
import arrow_down from '../../images/icons/arrow_down_white.svg';
import PhoneInput from 'react-phone-input-2';

export const StepOne = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Individual', 'Company'];

  const activeOption =
    options.find(option => option === selectedOption) || options[0];

  const selectOption = (option: string) => {
    setOpenDropdown(false);
    setSelectedOption(option);
  };

  return (
    <div className={styles.one}>
      <div className={styles.one__nav}>
        <div className={styles['one__right-side']}>
          <div
            className={styles['one__bllock-top']}
            onClick={() => navigate(Path.Opportunities)}
          >
            <img src={arrow} alt="arrow" className={styles.one__img} />
            <p className={styles.one__back}>Go Back</p>
          </div>
          <div className={styles['one__bllock-bottom']}>
            <h1 className={styles.one__title}>New Opportunity</h1>
            <h3 className={styles.one__subtitle}>Step 1/3. Organiezer</h3>
          </div>
        </div>
        <div className={styles['one__left-side']}>
          <p className={styles.one__content}>
            Tell us about yourself or your organization! Share basic details
            like your name or organization name, contact information, and your
            photo or the organization logo. This helps us verify your
            credibility and ensure transparency for participants.
          </p>
          <div className={styles.one__form}>
            <form action="">
              <div className={styles['one__dropdown-shell']}>
                <button
                  className={styles.one__dropdown}
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  {selectedOption ? selectedOption : 'Organizer Type'}
                </button>
                <div className={styles['one__dropdown-img-container']}>
                  <img
                    className={styles['one__dropdown-img']}
                    src={openDropdown ? arrow_up : arrow_down}
                    alt="Arrow Down"
                  />
                </div>
              </div>
              {openDropdown && (
                <ul className={styles['one__dropdown-list']}>
                  {options.map(option => (
                    <li
                      key={option}
                      onClick={() => selectOption(option)}
                      className={cn(styles['one__dropdown-item'], {
                        [styles['one__dropdown-item--active']]:
                          option === activeOption,
                      })}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
              <div className={styles.one__line}></div>
              <input
                className={styles.one__input}
                type="text"
                placeholder="Your full name or organization name"
              />
              <div className={styles.one__line}></div>
              <input
                className={styles.one__input}
                type="email"
                placeholder="Email"
                required
              />
              <div className={styles.one__line}></div>
              <PhoneInput
                inputStyle={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '10px',
                  fontSize: '16px',
                  height: '44px',
                }}
                country={'ua'}
                value={phone}
                onChange={value => setPhone(value)}
                inputProps={{
                  required: true,
                }}
              />
              <div className={styles.one__line}></div>
              <input
                className={styles.one__input}
                type="text"
                placeholder="Link to your website or official page"
              />
              <div className={styles.one__line}></div>
              <div className={styles['one__input-shell']}>
                <input
                  className={styles.one__input}
                  type="text"
                  placeholder="Your photo or the organization's logo"
                />
                <button className={styles['one__button-upload']}>
                  Upload file
                </button>
              </div>
              <div className={styles['one__line--upload']}></div>
              <div className={styles.one__buttons}>
                <button className={styles['one__button-cancel']}>Cancel</button>
                <button
                  className={styles['one__button-continue']}
                  onClick={() => navigate(Path.StepTwo)}
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
