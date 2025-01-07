import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { EventType } from '../types/EventType';
import { getEvents } from '../services/events';
import { Loader } from '../components/Loader';

type Context = {
  events: EventType[];
  loadEvents: () => void;
};

const State: Context = {
  events: [],
  loadEvents: () => {},
};

export const EventsContext = React.createContext(State);

type Props = {
  children: React.ReactNode;
};

export const EventsProvider: React.FC<Props> = ({ children }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getEvents();

      setEvents(data);
    } catch {
      setEvents([]);
      setErrorMessage('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const value = useMemo(
    () => ({
      events,
      loadEvents,
    }),
    [events, loadEvents],
  );

  return (
    <EventsContext.Provider value={value}>
      {loading && !errorMessage && <Loader />}
      {!loading && errorMessage && errorMessage}
      {!loading && !errorMessage && children}
    </EventsContext.Provider>
  );
};
