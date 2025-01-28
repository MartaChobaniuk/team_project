export interface FilterSelection {
  query?: string;
  categoryName?: string;
  categoryId?: string;
  opportunityType?: string;
  assistanceType?: string;
  location?: string;
  duration?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface Value {
  [key: string]: string;
}

export interface FilterOptions {
  id: keyof FilterSelection;
  nameOfFilter: string;
  value: string | string[] | Value[] | Record<string, string>[] | Date | null;
}
