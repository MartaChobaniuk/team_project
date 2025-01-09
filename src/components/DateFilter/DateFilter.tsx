import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onFilterChange: (filters: { [key: string]: any }) => void;
  selectedOptions: { [key: string]: string | null };
}

export const DateFilter: React.FC<Props> = ({ onFilterChange, selectedOptions }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Форматування дати в рядок
  const formatDate = (date: Date | null) => {
    if (!date) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleDateString('en-GB', options); // Формат дати: день, місяць, рік
  };

  // Функція для оновлення фільтрів дат
  const updateDateFilter = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;

      setStartDate(start);
      setEndDate(end);

      // Форматуємо дати
      const formattedStartDate = formatDate(start);
      const formattedEndDate = formatDate(end);

      // Оновлюємо фільтри з новими датами
      const updatedFilters = {
        ...selectedOptions,
        date: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      };

      // Передаємо оновлені фільтри
      onFilterChange(updatedFilters);
    },
    [onFilterChange, selectedOptions],
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={updateDateFilter}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      dateFormat="yyyy/MM/dd"
    />
  );
};
