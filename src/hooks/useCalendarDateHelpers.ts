
import { useState } from 'react';
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  isSameDay 
} from 'date-fns';
import { CalendarViewType } from '@/utils/types/calendar';

export const useCalendarDateHelpers = (initialDate: Date = new Date(), initialView: CalendarViewType = 'month') => {
  const [date, setDate] = useState<Date>(initialDate);
  const [view, setView] = useState<CalendarViewType>(initialView);

  const handlePrevious = () => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(date.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(date.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(date.getMonth() - 1);
    }
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(date.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(date.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(date.getMonth() + 1);
    }
    setDate(newDate);
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const getDateRangeText = () => {
    if (view === 'day') {
      return format(date, 'MMMM d, yyyy');
    } else if (view === 'week') {
      const start = startOfWeek(date);
      const end = endOfWeek(date);
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(date, 'MMMM yyyy');
    }
  };

  const dayIsInCurrentView = (day: Date) => {
    if (view === 'day') {
      return isSameDay(day, date);
    } else if (view === 'week') {
      const start = startOfWeek(date);
      const end = endOfWeek(date);
      return day >= start && day <= end;
    } else {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      return day >= start && day <= end;
    }
  };

  return {
    date,
    setDate,
    view,
    setView,
    handlePrevious,
    handleNext,
    handleToday,
    getDateRangeText,
    dayIsInCurrentView
  };
};
