import { FilterOptions } from '../types/FilterType';

export const filterOptions: FilterOptions[] = [
  {
    id: 'opportunityType',
    nameOfFilter: 'opportunity type',
    value: ['VOLUNTARY', 'WISHES'],
  },
  {
    id: 'assistanceType',
    nameOfFilter: 'type of help',
    value: ['VOLUNTEERING', 'DONATION'],
  },
  {
    id: 'categoryName',
    nameOfFilter: 'category',
    value: [
      'Military Support',
      'Humanitarian Aid',
      'Medical Assistance',
      'Reconstruction & Infrastructure',
      'Mental Health',
      'Education & Mentorship',
      'Community & Local Initiatives',
      'Cultural & Historical Preservation',
    ],
  },
  {
    id: 'location',
    nameOfFilter: 'location',
    value: [
      'Kyiv',
      'Kharkiv',
      'Odesa',
      'Dnipro',
      'Lviv',
      'Zaporizhzhia',
      'Mykolaiv',
      'Mariupol',
      'Vinnytsia',
      'Chernihiv',
      'Sumy',
      'Poltava',
      'Cherkasy',
      'Khmelnytskyi',
      'Rivne',
      'Ternopil',
      'Ivano-Frankivsk',
      'Zhytomyr',
      'Kirovohrad',
      'Luhansk',
      'Donetsk',
      'Chernivtsi',
      'Kherson',
      'Zakarpattia',
      'Lutsk',
      'Kremenchuk',
      'Online',
    ],
  },
  {
    id: 'date',
    nameOfFilter: 'date',
    value: ['Select a date'],
    calendar: true,
  },
  {
    id: 'duration',
    nameOfFilter: 'time demands in days',
    value: ['1-7', '8-30', '31-90', '91-120', '121-180', '181-365', '365-730'],
  },
];
