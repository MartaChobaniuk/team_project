import { useEffect, useState } from 'react';
import styles from './Response.module.scss';

export const Response = () => {
  const [events, setEvents] = useState<any[]>([]); // State for events
  const [error, setError] = useState<string | null>(null); // State for errors

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        'https://dewvdtfd5m.execute-api.eu-north-1.amazonaws.com/dev/events',
      );

      if (!response.ok) {
        setError('There was a problem');
      }

      const data = await response.json();

      setEvents(data);
      // eslint-disable-next-line no-console
      console.log(data); // For debugging purposes
    } catch {
      setError('There was a problem with the fetch operation');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleButtonClick = () => {
    fetchEvents();
  };

  return (
    <div className={styles.response}>
      <h1>Events</h1>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} onClick={handleButtonClick}>
        Refresh Events
      </button>
      <div className={styles.response__content}>
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className={styles.event}>
              <h2>{event.title}</h2>
              <p>
                <strong>Description:</strong>
                {event.description}
              </p>
              <p>
                <strong>Location:</strong>
                {event.location}
              </p>
              <p>
                <strong>Date:</strong>
                {new Date(event.date).toLocaleString()}
              </p>
              <p>
                <strong>Opportunity Type:</strong>
                {event.opportunityType}
              </p>
              <p>
                <strong>Assistance Type:</strong>
                {event.assistanceType}
              </p>
              <p>
                <strong>Category ID:</strong>
                {event.categoryId}
              </p>
              <p>
                <strong>Duration:</strong>
                {event.duration} minutes
              </p>
              <p>
                <strong>Goal:</strong>
                {event.goal}
              </p>
              <p>
                <strong>Current Progress:</strong>
                {event.currentProgress}
              </p>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className={styles.image}
                />
              )}
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};
