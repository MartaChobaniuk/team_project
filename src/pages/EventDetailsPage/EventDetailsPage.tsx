import { useEffect, useState } from 'react';
import { EventType } from '../../types/EventType';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/events';
import { Loader } from '../../components/Loader';
import styles from './EventDetailsPage.module.scss';

export const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className={styles['event-details']}>
      <h1 className={styles['event-details__title']}>{event.title}</h1>
      <p>{event.assistanceType}</p>
      <p>{event.categoryName}</p>
      <p>{event.location}</p>
      <p>{event.date}</p>
    </div>
  );
};
