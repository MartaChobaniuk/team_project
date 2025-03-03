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
import { categoryId } from '../../helpers/dropdownsInfo';
import { DonationStepOne } from '../../components/DonationStepOne';
import { DonationStepTwo } from '../../components/DonationStepTwo';
import { DonationStepThree } from '../../components/DonationStepThree';
import { ParticipateForm } from '../../components/ParticipateForm';

export const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeForm, setActiveForm] = useState<'volunteering' | 'donation' | null>(null);
  const [stepDonation, setStepDonation] = useState(1);
  const [isOrganizerVisible, setOrganizerVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleClick = () => {
    if (!event) {
      return;
    }

    const { assistanceType } = event;

    if (assistanceType === 'VOLUNTEERING') {
      setActiveForm('volunteering');
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

  const toggleOrganizerInfo = () => {
    setOrganizerVisible((prev) => !prev);
  };

  const handleCancelDonation = () => {
    localStorage.removeItem('amount');
    setActiveForm(null);
  };

  const handleGoBack = () => {
    setStepDonation(1);
  };

  const handleGoBackStepTwo = () => {
    setStepDonation(2);
  };

  const handleClose = () => {
    setActiveForm(null);
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
        <div className={styles.overlay} />
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
          <div
            className={cn(styles['event-details__shell'], {
              [styles['event-details__shell--scrolled']]: isScrolled,
            })}
          >
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

          {!activeForm && (
            <div className={styles['event-details__organizer-mobile']} onClick={toggleOrganizerInfo}>
              <p className={styles['event-details__organizer-mob-title']}>About the organizer</p>
              <div className={styles['event-details__collaps-line']}></div>
            </div>
          )}
          {!activeForm && isOrganizerVisible && (
            <>
              <div className={styles['event-details__mob-organizer-block']}>
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
              <div className={styles['event-details__mob-organizer-buttons']}>
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
            <ParticipateForm onClose={handleClose} />
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
            <DonationStepThree
              onBack={handleGoBackStepTwo}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};
