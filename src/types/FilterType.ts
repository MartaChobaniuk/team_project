export interface FilterSelection {
  query?: string;
  categoryName?: string;
  categoryId?: string;
  opportunityType?: string;
  assistanceType?: string;
  location?: string;
  date?: string | [string, string] | string[] | [string | null, string | null];
  duration?: string;
}

export interface Value {
  [key: string]: string;
}

export interface FilterOptions {
  id: keyof FilterSelection;
  nameOfFilter: string;
  value: string[] | Value[] | Record<string, string>[];
  calendar?: boolean;
}
