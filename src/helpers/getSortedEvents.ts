import { EventType } from '../types/EventType';
import { FilterSelection } from '../types/FilterType';

export const filteredEv = (
  events: EventType[],
  filters: FilterSelection,
  query: string,
): EventType[] => {
  let filteredEvents = [...events];

  if (query) {
    const queryLowerCase = query.toLowerCase();

    filteredEvents = filteredEvents.filter(event => {
      return (
        event.title.toLowerCase().includes(queryLowerCase) ||
        event.description.toLowerCase().includes(queryLowerCase) ||
        event.location.toLowerCase().includes(queryLowerCase)
      );
    });
  }

  if (filters.opportunityType?.includes('VOLUNTARY')) {
    filteredEvents = filteredEvents.filter(
      event => event.opportunityType === 'VOLUNTARY',
    );
  } else if (filters.opportunityType?.includes('WISHES')) {
    filteredEvents = filteredEvents.filter(
      event => event.opportunityType === 'WISHES',
    );
  }

  if (filters.assistanceType?.includes('VOLUNTEERING')) {
    filteredEvents = filteredEvents.filter(
      event => event.assistanceType === 'VOLUNTEERING',
    );
  } else if (filters.assistanceType?.includes('DONATION')) {
    filteredEvents = filteredEvents.filter(
      event => event.assistanceType === 'DONATION',
    );
  }

  if (filters.categoryName === 'Reconstruction & Infrastructure') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Reconstruction & Infrastructure',
    );
  } else if (filters.categoryName === 'Military Support') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Military Support',
    );
  } else if (filters.categoryName === 'Humanitarian Aid') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Humanitarian Aid',
    );
  } else if (filters.categoryName === 'Medical Assistance') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Medical Assistance',
    );
  } else if (filters.categoryName === 'Mental Health') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Mental Health',
    );
  } else if (filters.categoryName === 'Education & Mentorship') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Education & Mentorship',
    );
  } else if (filters.categoryName === 'Community & Local Initiatives') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Community & Local Initiatives',
    );
  } else if (filters.categoryName === 'Cultural & Historical Preservation') {
    filteredEvents = filteredEvents.filter(
      event => event.categoryName === 'Cultural & Historical Preservation',
    );
  }

  if (filters.location) {
    filteredEvents = filteredEvents.filter(event => {
      return event.location === filters.location;
    });
  }

  if (filters.duration) {
    const [minDuration, maxDuration] = filters.duration.split('-').map(Number);

    filteredEvents = filteredEvents.filter(event => {
      const eventDuration = event.duration;

      return eventDuration >= minDuration && eventDuration <= maxDuration;
    });
  }

  return filteredEvents;
};
