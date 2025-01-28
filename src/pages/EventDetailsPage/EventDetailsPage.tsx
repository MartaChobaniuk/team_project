import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './EventDetailsPage.module.scss';
import { EventType } from '../../types/EventType';
import { getEventById } from '../../services/events';
import { Loader } from '../../components/Loader';
import arrow from '../../images/icons/arrow_wht_back.svg';
import report from '../../images/icons/report.svg';

export const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        })}
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
          <h2 className={styles['event-details__title']}>{event.title}</h2>
          <p className={styles['event-details__subtitle']}>
            {`${event.categoryName} / ${event.location} / ${new Date(event.date).toLocaleString('uk-UA')}`}
          </p>
          <div className={styles['event-details__shell']}>
            <div className={styles['event-details__buttons']}>
              <button className={styles['event-details__button-pr']}>
                Participate
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
          <div className={styles['event-details__participants']}>
            Participants
          </div>
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
                {event.location}
              </span>
            </div>
            <div className={styles['event-details__detail']}>
              <span className={styles['event-details__name']}>
                Date & time:
              </span>
              <span className={styles['event-details__value']}>
                {new Date(event.date).toLocaleString('uk-UA')}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['event-details__block-right']}>
          <div className={styles['event-details__organizer-block']}>
            <div className={styles['event-details__img-container']}>
              <img className={styles['event-details__organizer-logo']} />
            </div>
            <div className={styles['event-details__organizer-details']}>
              <p>Organization</p>
              <p>{event.organizerName}</p>
              <p>{event.organizerPhone}</p>
              <p>{event.organizerEmail}</p>
              <p>{event.link}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
