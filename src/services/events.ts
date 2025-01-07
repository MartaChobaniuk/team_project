import { EventType } from '../types/EventType';
import { client } from '../utils/httpClient';

export const getEvents = () => {
  return client.get<EventType[]>('/events');
};
