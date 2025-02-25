/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './EventDetailsPage.module.scss';
import { EventType } from '../../types/EventType';
import { getEventById } from '../../services/events';
import { Loader } from '../../components/Loader';
import arrow from '../../images/icons/arrow_wht_back.svg';
import report from '../../images/icons/report.svg';
import avatar from '../../images/icons/account_white.svg';
import { useAuth } from 'react-oidc-context';
import PhoneInput from 'react-phone-input-2';
import { categoryId } from '../../helpers/dropdownsInfo';
import { DonationStepOne } from '../../components/DonationStepOne';
import { DonationStepTwo } from '../../components/DonationStepTwo';
import { DonationStepThree } from '../../components/DonationStepThree';

export const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const auth = useAuth();
  const isAuthenticated = auth?.user;
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeForm, setActiveForm] = useState<'volunteering' | 'donation' | null>(null);
  const [stepDonation, setStepDonation] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('eventForm');

    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) {
          setError('Event ID is missing');

          return;
        }

        setIsLoading(true);

        const data = await getEventById(eventId);

        setEvent(data);
      } catch (err) {
        setError('No event details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAuth = async () => {
    setIsSubmitting(true);

    if (!validateFields()) {
      setIsSubmitting(false);

      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch(
        `https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/events/${eventId}/authJoin`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Дані успішно відправлено!');
        localStorage.removeItem('eventForm');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        alert('Помилка відправки даних.');
      }
    } catch (errorMes) {
      console.error('Error:', errorMes);
      alert('Сталася помилка при відправці.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = () => {
    if (!event) {
      return;
    }
  
    const { assistanceType, id } = event;
  
    if (assistanceType === 'VOLUNTEERING') {
      setActiveForm('volunteering');
  
      if (isAuthenticated) {
        console.log(`Додаємо івент до профілю: ${id}`);
        handleSubmitAuth();
      }
    } else if (assistanceType === 'DONATION') {
      setActiveForm('donation');
      setStepDonation(1);
    }
  };  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      localStorage.setItem('eventForm', JSON.stringify(updatedForm));

      return updatedForm;
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => {
      const updatedForm = { ...prev, phone: value };

      localStorage.setItem('eventForm', JSON.stringify(updatedForm));

      return updatedForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!validateFields()) {
      setIsSubmitting(false);

      return;
    }

    try {
      const dataToSend = { ...formData, eventId };

      const response = await fetch(
        `https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/events/${eventId}/join`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });

      if (response.ok) {
        alert('Дані успішно відправлено!');
        localStorage.removeItem('eventForm');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        alert('Помилка відправки даних.');
      }
    } catch (errorMes) {
      console.error('Error:', errorMes);
      alert('Сталася помилка при відправці.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('eventForm');
    setFormData({ name: '', phone: '', email: '' });
  };

  const handleCancelDonation = () => {
    localStorage.removeItem('amount');
    setActiveForm(null);
  };

  const handleGoBack = () => {
    setStepDonation(1);
  };

  const handleNextStepOne = () => {
    setStepDonation(2);
  };

  const handleNextStepTwo = () => {
    setStepDonation(3);
  };

  const remaining =
    event?.target && event?.currentProgress !== undefined
      ? +event.target - +event.currentProgress
      : 0;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['error-block']}>
        <p className={styles.error}>{error}</p>
        <button
          type="button"
          className={styles['error-button']}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    );
  }

  if (!event) {
    return <p className={styles.error}>Event not found</p>;
  }

  return (
    <div
      className={cn(styles['event-details'], {
        [styles['event-details--visible']]: isVisible,
      })}
    >
      <div
        className={cn(styles['event-details__content-top'], {
          [styles['event-details__content-top--visible']]: isVisible,
        })}
        style={{
          backgroundImage: event.coverImage
            ? `url(${event.coverImage})`
            : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          className={styles['event-details__block-back']}
          onClick={() => navigate(-1)}
        >
          <img
            src={arrow}
            alt="arrow"
            className={styles['event-details__img']}
          />
          <p className={styles['event-details__back']}>Go Back</p>
        </div>
        <div className={styles['event-details__block-names']}>
          <h2 className={styles['event-details__main-title']}>{event.title}</h2>
          <p className={styles['event-details__subtitle']}>
            {`${categoryId[event.categoryId] || 'Category'} / ${event.region} / ${formatDate(event.startingDate)} / ${event.startHour}.${event.startMinute} ${event.startPeriod}`}
          </p>
          <div className={styles['event-details__shell']}>
            <div className={styles['event-details__buttons']}>
              <button
                className={styles['event-details__button-pr']}
                onClick={handleClick}
              >
                {event.assistanceType === 'VOLUNTEERING'
                  ? 'Participate'
                  : 'Donate'}
              </button>
              <button className={styles['event-details__button-sec']}>
                Provide Another Assistance
              </button>
            </div>
            <div className={styles['event-details__block-report']}>
              <img
                src={report}
                alt="report"
                className={styles['event-details__img']}
              />
              <p className={styles['event-details__report']}>Report</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(styles['event-details__content-bottom'], {
          [styles['event-details__content-bottom--visible']]: isVisible,
        })}
      >
        <div className={styles['event-details__block-left']}>
          {event.assistanceType === 'VOLUNTEERING' ? (
            <div className={styles['event-details__block-participants']}>
              <div className={styles['event-details__participants']}>
                <div className={styles['event-details__participant']}>
                  <img
                    src={avatar}
                    alt="user"
                    className={styles['event-details__participant-img']}
                  />
                </div>
                <div className={styles['event-details__participant']}>
                  <img
                    src={avatar}
                    alt="user"
                    className={styles['event-details__participant-img']}
                  />
                </div>
                <div className={styles['event-details__participant']}>
                  <img
                    src={avatar}
                    alt="user"
                    className={styles['event-details__participant-img']}
                  />
                </div>
                <div className={styles['event-details__participant']}>
                  <img
                    src={avatar}
                    alt="user"
                    className={styles['event-details__participant-img']}
                  />
                </div>
                <div className={styles['event-details__participant']}>
                  <img
                    src={avatar}
                    alt="user"
                    className={styles['event-details__participant-img']}
                  />
                </div>
                <div className={styles['event-details__participant']}>
                  <span className={styles['event-details__participant-span']}>
                    {event.currentProgress}
                  </span>
                </div>
              </div>
              <div className={styles['event-details__participants-info']}>
                <p className={styles['event-details__participants-text']}>
                  Looking for {remaining} more volunteers
                </p>
              </div>
            </div>
          ) : (
            <div className={styles['event-details__donate-block']}>
              <p className={styles['event-details__donate-text']}>
                {`USD ${event.currentProgress} / ${event.target}`}
              </p>
              <p className={styles['event-details__donate-text']}>
                {`USD ${+event.target - +event.currentProgress} left to collect`}
              </p>
            </div>
          )}
          <div className={styles['event-details__description']}>
            <p className={styles['event-details__text-description']}>
              {event.description}
            </p>
          </div>
          <div className={styles['event-details__details']}>
            <h3 className={styles['event-details__title-details']}>
              Event Details
            </h3>
            <div className={styles['event-details__detail']}>
              <span className={styles['event-details__name']}>Required Materials & Skills: </span>
              <span className={styles['event-details__value']}>
                {event.description}
              </span>
            </div>
            <div className={styles['event-details__detail']}>
              <span className={styles['event-details__name']}>Location: </span>
              <span className={styles['event-details__value']}>
                {event.address}
              </span>
            </div>
            <div className={styles['event-details__detail']}>
              <span className={styles['event-details__name']}>Date & time: </span>
              <span className={styles['event-details__value']}>
                {formatDate(event.startingDate)} / {event.startHour}.
                {event.startMinute} {event.startPeriod}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['event-details__block-right']}>
          {!activeForm && (
            <>
              <div className={styles['event-details__organizer-block']}>
                <div className={styles['event-details__img-container']}>
                  <img
                    src={event.organizerPhoto}
                    alt="logo"
                    className={styles['event-details__organizer-logo']}
                  />
                </div>
                <div className={styles['event-details__organizer-details']}>
                  <p className={styles['event-details__organizer-title']}>
                    {event.organizerType === 'Individual' ? 'Organizer person' : 'Organization'}
                  </p>
                  <p className={styles['event-details__organizer-name']}>
                    {event.organizerName}
                  </p>
                  <p className={styles['event-details__organizer-phone']}>
                    {event.phone}
                  </p>
                  <p className={styles['event-details__organizer-email']}>
                    {event.organizerEmail}
                  </p>
                  <p className={styles['event-details__organizer-link']}>
                    {event.link}
                  </p>
                </div>
              </div>
              <div className={styles['event-details__organizer-buttons']}>
                <button className={styles['event-details__organizer-button']}>
                  Feedback
                </button>
                <button className={styles['event-details__organizer-button']}>
                  Success Stories
                </button>
              </div>
            </>
          )}
          {activeForm === 'volunteering' && (
            <>
              <p className={styles['event-details__part-title']}>
                Leave us your contact information and we’ll get in touch.
              </p>
              <form onSubmit={handleSubmit} className={styles['event-details__part-form']}>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  className={styles['event-details__part-input']}
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
                <div className={styles['event-details__part-line']}></div>
                {errors.name && !formData.name && (
                  <p className={styles['event-details__part-error']}>
                    {errors.name}
                  </p>
                )}
                <PhoneInput
                  country={'ua'}
                  value={formData.phone}
                  onChange={handlePhoneChange}
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
                    zIndex: '15',
                  }}
                />
                <div className={styles['event-details__part-line']}></div>
                {errors.phone && !formData.phone && (
                  <p className={styles['event-details__part-error']}>
                    {errors.phone}
                  </p>
                )}
                <input
                  value={formData.email}
                  onChange={handleChange}
                  className={styles['event-details__part-input']}
                  type="email"
                  name="email"
                  placeholder="Email address"
                />
                <div className={styles['event-details__part-line']}></div>
                {errors.email && !formData.email && (
                  <p className={styles['event-details__part-error']}>
                    {errors.email}
                  </p>
                )}
              </form>
              <div className={styles['event-details__part-buttons']}>
                <button
                  type="submit"
                  className={styles['event-details__part-send']}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Sending' : 'Send'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles['event-details__part-cancel']}
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {activeForm === 'donation' && stepDonation === 1 && (
            <DonationStepOne
              onCancel={handleCancelDonation}
              onNext={handleNextStepOne}
            />
          )}

          {activeForm === 'donation' && stepDonation === 2 && (
            <DonationStepTwo
              onBack={handleGoBack}
              onNext={handleNextStepTwo}
            />
          )}

          {activeForm === 'donation' && stepDonation === 3 && (
            <DonationStepThree />
          )}
        </div>
      </div>
    </div>
  );
};
