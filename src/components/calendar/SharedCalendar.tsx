import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  List,
  Table as TableIcon,
  Download,
} from 'lucide-react';

import CalendarEventList from './CalendarEventList';
import CalendarEventTable from './CalendarEventTable';
import CalendarEventPopover from './CalendarEventPopover';
import { useChangeCalendarEvents } from '@/hooks/useChangeCalendarEvents';
import { CalendarEvent, CalendarViewType, CalendarEventType } from '@/utils/types/calendar';

interface SharedCalendarProps {
  onEventClick?: (event: CalendarEvent) => void;
}

const SharedCalendar: React.FC<SharedCalendarProps> = ({ onEventClick }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarViewType>('month');
  const [displayMode, setDisplayMode] = useState<'calendar' | 'table' | 'split'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all' as CalendarEventType | 'all',
    status: 'all',
  });

  const { events, isLoading, refetch } = useChangeCalendarEvents(date, view, filters);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    if (onEventClick) {
      onEventClick(event);
    }
  };

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

  const handleViewChange = (newView: CalendarViewType) => {
    setView(newView);
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'type') {
      setFilters(prev => ({ 
        ...prev, 
        [key]: value as CalendarEventType | 'all'
      }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const exportData = () => {
    console.log('Exporting calendar data');
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

  const renderEvent = (day: Date) => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });

    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0">
        <div 
          className="text-xs text-center bg-primary/10 text-primary rounded-sm mx-1 truncate cursor-pointer" 
          onClick={(e) => {
            e.stopPropagation();
            handleEventClick(dayEvents[0]);
          }}
        >
          {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleToday}>Today</Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold ml-2">{getDateRangeText()}</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Tabs defaultValue={view} onValueChange={(value) => handleViewChange(value as CalendarViewType)}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex space-x-1">
            <Button 
              variant={displayMode === 'calendar' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setDisplayMode('calendar')}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant={displayMode === 'table' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setDisplayMode('table')}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant={displayMode === 'split' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => setDisplayMode('split')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={toggleFilters}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={exportData}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter events by type and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Event Type</label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => handleFilterChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="change">Changes</SelectItem>
                    <SelectItem value="release">Releases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setFilters({ type: 'all', status: 'all' })}>Reset</Button>
            <Button onClick={toggleFilters}>Apply</Button>
          </CardFooter>
        </Card>
      )}

      <div className={displayMode === 'split' ? 'grid grid-rows-2 gap-4 h-full' : 'h-full'}>
        {(displayMode === 'calendar' || displayMode === 'split') && (
          <div className="w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className={dayIsInCurrentView(date) ? 'h-full' : ''}
              components={{
                Day: ({ date: day, displayText }) => {
                  return (
                    <div className="relative h-12 w-full p-1 flex justify-center">
                      <div className="absolute top-1 right-1 text-xs">{displayText}</div>
                      {renderEvent(day)}
                    </div>
                  );
                }
              }}
            />
          </div>
        )}

        {(displayMode === 'table' || displayMode === 'split') && (
          <div className="border rounded-md overflow-hidden">
            <CalendarEventTable 
              events={events} 
              onEventClick={handleEventClick}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      {selectedEvent && (
        <CalendarEventPopover 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default SharedCalendar;
