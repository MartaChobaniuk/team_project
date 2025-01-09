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

  if (filters.duration?.length) {
    filteredEvents = filteredEvents.filter(event => {
      const eventDuration = event.duration;

      switch (filters.duration as string) {
        case 'Up to 1 hour':
          return eventDuration <= 1;
        case '1-6 hours':
          return eventDuration > 1 && eventDuration <= 6;
        case 'Up to a day':
          return eventDuration > 7 && eventDuration <= 24;
        case 'Up to a week':
          return eventDuration > 25 && eventDuration <= 144;
        case 'Up to a month':
          return eventDuration > 145 && eventDuration <= 744;
        case '1 - 3 months':
          return eventDuration > 745 && eventDuration <= 2232;
        case '3 - 6 months':
          return eventDuration > 2233 && eventDuration <= 4464;
        case 'Up to a year':
          return eventDuration > 4465 && eventDuration <= 8950;
        default:
          return;
      }
    });
  }

  return filteredEvents;
};
