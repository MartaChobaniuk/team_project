export interface FilterSelection {
  query?: string;
  categoryId?: string;
  opportunityType?: string;
  assistanceType?: string;
  region?: string;
  timeDemands?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}
export interface FilterOptions {
  id: keyof FilterSelection;
  nameOfFilter: string;
  value: string | string[] | Record<string, string> | Date | null;
}
