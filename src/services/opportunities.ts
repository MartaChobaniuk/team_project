import { NewOpportunityType } from '../types/NewOpportunityType';
import { OpportunityType } from '../types/OpportunityType';
import { client } from '../utils/httpClient';

export const getOpportunities = () => {
  return client.get<OpportunityType[]>('/opportunities0');
};

export const addOpportunity = (data: NewOpportunityType) => {
  return client.post<NewOpportunityType>('/events', data);
};
