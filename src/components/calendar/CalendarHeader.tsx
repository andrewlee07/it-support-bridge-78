
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  List,
  Table as TableIcon,
  Download,
} from 'lucide-react';
import { CalendarViewType } from '@/utils/types/calendar';

interface CalendarHeaderProps {
  date: Date;
  view: CalendarViewType;
  displayMode: 'calendar' | 'table' | 'split';
  showFilters: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarViewType) => void;
  onDisplayModeChange: (mode: 'calendar' | 'table' | 'split') => void;
  onToggleFilters: () => void;
  onExport: () => void;
  getDateRangeText: () => string;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  view,
  displayMode,
  showFilters,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  onDisplayModeChange,
  onToggleFilters,
  onExport,
  getDateRangeText
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onToday}>Today</Button>
        <Button variant="outline" size="icon" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold ml-2">{getDateRangeText()}</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Tabs defaultValue={view} onValueChange={(value) => onViewChange(value as CalendarViewType)}>
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
            onClick={() => onDisplayModeChange('calendar')}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={displayMode === 'table' ? 'default' : 'outline'} 
            size="icon" 
            onClick={() => onDisplayModeChange('table')}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={displayMode === 'split' ? 'default' : 'outline'} 
            size="icon" 
            onClick={() => onDisplayModeChange('split')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" size="icon" onClick={onToggleFilters}>
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onExport}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
