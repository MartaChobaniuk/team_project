import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../utils/constants';
import cn from 'classnames';
import styles from './StepOne.module.scss';
import arrow from '../../images/icons/arrow_back.svg';
import arrow_up from '../../images/icons/arrow_up_white (2).svg';
import arrow_down from '../../images/icons/arrow_down_white.svg';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useOpportunityContext } from '../../store/OpportunityContex';

export const StepOne = () => {
  const navigate = useNavigate();
  const { stepOneData, setStepOneData } = useOpportunityContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('stepOneData');
    const storedPhoto = localStorage.getItem('photo');

    if (storedData && !stepOneData) {
      setStepOneData(JSON.parse(storedData));
    }

    if (storedPhoto) {
      setPhotoURL(storedPhoto);
      setIsImageUploaded(true);
    }
  }, [stepOneData, photoURL, setStepOneData]);

  useEffect(() => {
    if (stepOneData) {
      localStorage.setItem('stepOneData', JSON.stringify(stepOneData));
    }
  }, [stepOneData]);

  useEffect(() => {
    if (photoURL) {
      localStorage.setItem('photo', photoURL);
    }
  }, [photoURL]);

  const options = ['Individual', 'Company'];
  const activeOption =
    options.find(option => option === stepOneData.organizerType) || options[0];

  const selectOption = (option: string) => {
    setOpenDropdown(false);
    setStepOneData(prev => ({ ...prev, organizerType: option }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStepOneData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setPhotoFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        setPhotoURL(base64String);
      };

      reader.readAsDataURL(file);
    }
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
                  <span
                    className={cn(styles.one__select, {
                      [styles['one__select--chosen']]:
                        stepOneData.organizerType,
                    })}
                  >
                    {stepOneData.organizerType || 'Organizer Type'}
                  </span>
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
                      <label className={styles['one__dropdown-label']}>
                        <input
                          type="checkbox"
                          checked={stepOneData.organizerType === option}
                          onChange={() => selectOption(option)}
                          className={styles['one__dropdown-checkbox']}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <div className={styles.one__line}></div>
              <p className={styles.one__remark}>*Required</p>
              <input
                className={styles.one__input}
                type="text"
                name="fullName"
                placeholder="Your full name or organization name"
                value={stepOneData.fullName}
                onChange={handleChange}
                required
              />
              <div className={styles.one__line}></div>
              <p className={styles.one__remark}>*Required</p>
              <input
                className={styles.one__input}
                type="email"
                name="email"
                placeholder="Email"
                value={stepOneData.email}
                onChange={handleChange}
                required
              />
              <div className={styles.one__line}></div>
              <p className={styles.one__remark}>*Required</p>
              <PhoneInput
                country={'ua'}
                value={stepOneData.phone}
                onChange={value =>
                  setStepOneData(prev => ({ ...prev, phone: value }))
                }
                inputProps={{
                  required: true,
                  className: styles['transparent-input'],
                }}
                buttonStyle={{
                  background: 'transparent',
                  border: 'none',
                }}
                containerStyle={{ background: 'transparent' }}
                dropdownStyle={{
                  background: 'black',
                  color: 'white',
                }}
              />
              <div className={styles.one__line}></div>
              <p className={styles.one__remark}>*Required</p>
              <input
                className={styles.one__input}
                type="text"
                name="website"
                placeholder="Link to your website or official page"
                value={stepOneData.website}
                onChange={handleChange}
              />
              <div className={styles.one__line}></div>
              {isImageUploaded ? (
                <div className={styles['one__uploaded-photo']}>
                  <img
                    src={photoURL}
                    alt="Uploaded photo"
                    className={styles['one__uploaded-img']}
                  />
                </div>
              ) : (
                <div className={styles['one__input-shell']}>
                  <input
                    className={styles['one__input-photo']}
                    type="file"
                    id="photoFile"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                    required
                    data-placeholder="Your photo or the organization's logo"
                    data-has-file={photoFile ? 'true' : 'false'}
                  />
                  <label
                    htmlFor="photoFile"
                    className={`${styles['custom-file-label']} ${!photoFile ? styles['no-file-selected'] : ''}`}
                  >
                    {photoFile
                      ? photoFile.name
                      : "Your photo or the organization\'s logo"}
                  </label>
                  <button className={styles['one__button-upload']}>
                    Upload file
                  </button>
                </div>
              )}
              <div
                className={cn(styles['one__line--upload'], {
                  [styles['one__line--upload-photo']]: isImageUploaded,
                })}
              ></div>
              <p className={styles.one__remark}>
                *Required. Max image size - 10 MB. File type - JPG, PNG, PDF.
              </p>
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
