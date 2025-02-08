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

export const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const auth = useAuth();
  const isAuthenticated = auth?.user;
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [formParticipate, setFormParticipate] = useState(false);
  const [formDonation, setFormDonation] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        if (eventId) {
          const data = await getEventById(eventId);

          setEvent(data);
        }
      } catch (err) {
        setError('No details');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const analyzeImageBrightness = () => {
      if (!event?.coverImage) {
        return;
      }

      const img = new Image();

      img.crossOrigin = 'anonymous';
      img.src = event.coverImage;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        const width = 10;
        const height = 10;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const { data } = imageData;

        let totalBrightness = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          totalBrightness += brightness;
        }

        const avgBrightness = totalBrightness / (width * height);

        setIsDarkBackground(avgBrightness < 128);
      };
    };

    analyzeImageBrightness();
  }, [event?.coverImage]);

  const handleClick = () => {
    if (!event) {
      return;
    }

    if (event.assistanceType === 'VOLUNTEERING') {
      if (!isAuthenticated) {
        setFormParticipate(true);
      } else {
        console.log(`Додаємо івент до профілю: ${event.id}`);
        //addToProfile(event);
      }
    } else if (event.assistanceType === 'DONATION') {
      setFormDonation(true);
    }
  };

  const remaining =
    event?.target && event?.currentProgress !== undefined
      ? +event.target - +event.currentProgress
      : 0;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
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
          [styles['event-details__content-top--is-dark']]: isDarkBackground,
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
            {`${event.categoryId} / ${event.address} / ${new Date(event.startingDate).toLocaleString('uk-UA')}`}
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
              <span className={styles['event-details__name']}>
                Required Materials & Skills:
              </span>
              <span className={styles['event-details__value']}>
                {event.description}
              </span>
            </div>
            <div className={styles['event-details__detail']}>
              <span className={styles['event-details__name']}>Location:</span>
              <span className={styles['event-details__value']}>
                {event.address}
              </span>
            </div>
            <div className={styles['event-details__detail']}>
              <span className={styles['event-details__name']}>
                Date & time:
              </span>
              <span className={styles['event-details__value']}>
                {event.startingDate}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['event-details__block-right']}>
          {formParticipate ? (
            <>
              <p className={styles['event-details__part-title']}>
                Leave us your contact information and we’ll get in touch.
              </p>
              <form className={styles['event-details__part-form']}>
                <input
                  className={styles['event-details__part-input']}
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  required
                />
                <PhoneInput
                  country={'ua'}
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
                <input
                  className={styles['event-details__part-input']}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                />
              </form>
              <div className={styles['event-details__part-buttons']}>
                <button className={styles['event-details__part-send']}>
                  Send
                </button>
                <button className={styles['event-details__part-cancel']}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles['event-details__organizer-block']}>
                <div className={styles['event-details__img-container']}>
                  <img
                    src={event.organizerPhoto}
                    className={styles['event-details__organizer-logo']}
                  />
                </div>
                <div className={styles['event-details__organizer-details']}>
                  <p className={styles['event-details__organizer-title']}>
                    Organization
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

          {formDonation && <form></form>}
        </div>
      </div>
    </div>
  );
};
