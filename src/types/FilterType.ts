export interface FilterSelection {
  query?: string;
  categoryName?: string;
  opportunityType?: string;
  assistanceType?: string;
  location?: string;
  date?: string;
  duration?: string;
}

export interface Value {
  [key: string]: string;
}

export interface FilterOptions {
  id: string;
  nameOfFilter: string;
  value: string[];
  calendar?: boolean;
}
