import { EventType } from '../types/EventType';
import { FilterSelection } from '../types/FilterType';
import { categoryId } from './dropdownsInfo';

export const filteredEv = (
  events: EventType[],
  filters: FilterSelection,
  query: string,
): EventType[] => {
  let filteredEvents = [...events];

  // Ваша логіка фільтрації
  if (query) {
    const queryLowerCase = query.toLowerCase();

    filteredEvents = filteredEvents.filter(event => {
      return (
        event.title.toLowerCase().includes(queryLowerCase) ||
        event.description.toLowerCase().includes(queryLowerCase) ||
        event.region.toLowerCase().includes(queryLowerCase)
      );
    });
  }

  if (filters.opportunityType?.includes('Voluntary')) {
    filteredEvents = filteredEvents.filter(
      event => event.opportunityType === 'VOLUNTARY',
    );
  } else if (filters.opportunityType?.includes('Wishes')) {
    filteredEvents = filteredEvents.filter(
      event => event.opportunityType === 'WISHES',
    );
  }

  if (filters.assistanceType?.includes('Volunteering')) {
    filteredEvents = filteredEvents.filter(
      event => event.assistanceType === 'VOLUNTEERING',
    );
  } else if (filters.assistanceType?.includes('Donation')) {
    filteredEvents = filteredEvents.filter(
      event => event.assistanceType === 'DONATION',
    );
  }

  if (filters.categoryName) {
    const selectedCategoryId = Object.keys(categoryId).find(
      key => categoryId[key] === filters.categoryName,
    );

    if (selectedCategoryId) {
      filteredEvents = filteredEvents.filter(
        event => event.categoryId === selectedCategoryId,
      );
    }
  }

  if (filters.location) {
    filteredEvents = filteredEvents.filter(event => {
      return event.address === filters.location;
    });
  }

  if (filters.startDate && !filters.endDate) {
    filteredEvents = filteredEvents.filter(event => {
      if (!event.startingDate) {
        return false;
      }

      const eventDate = new Date(event.startingDate);

      if (isNaN(eventDate.getTime())) {
        return false;
      }

      const startDate = filters.startDate;

      if (!startDate) {
        return false;
      }

      const eventDateString = eventDate.toISOString().split('T')[0];
      const startDateString = startDate.toISOString().split('T')[0];

      return eventDateString === startDateString;
    });
  }

  if (filters.endDate && !filters.startDate) {
    filteredEvents = filteredEvents.filter(event => {
      if (!event.endingDate) {
        return false;
      }

      const eventDate = new Date(event.endingDate);

      if (isNaN(eventDate.getTime())) {
        return false;
      }

      const endDate = filters.endDate;

      if (!endDate) {
        return false;
      }

      const eventDateString = eventDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];

      return eventDateString === endDateString;
    });
  }

  if (filters.startDate && filters.endDate) {
    filteredEvents = filteredEvents.filter(event => {
      if (!event.startingDate) {
        return false;
      }

      const eventDate = new Date(event.startingDate);

      if (isNaN(eventDate.getTime())) {
        return false;
      }

      const startDate = filters.startDate;
      const endDate = filters.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      const eventDateString = eventDate.toISOString().split('T')[0];
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];

      return (
        eventDateString >= startDateString && eventDateString <= endDateString
      );
    });
  }

  return filteredEvents;
};
