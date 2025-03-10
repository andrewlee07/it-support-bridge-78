
import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CalendarEvent } from '@/utils/types/calendar';

interface CalendarEventTableProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  isLoading?: boolean;
}

type SortField = 'date' | 'title' | 'type' | 'status';
type SortDirection = 'asc' | 'desc';

const CalendarEventTable: React.FC<CalendarEventTableProps> = ({ 
  events, 
  onEventClick,
  isLoading = false
}) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending for new field
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
            <div className="flex items-center">
              Date/Time {renderSortIcon('date')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSort('title')} className="cursor-pointer">
            <div className="flex items-center">
              Title {renderSortIcon('title')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSort('type')} className="cursor-pointer">
            <div className="flex items-center">
              Type {renderSortIcon('type')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
            <div className="flex items-center">
              Status {renderSortIcon('status')}
            </div>
          </TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEvents.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No events found
            </TableCell>
          </TableRow>
        ) : (
          sortedEvents.map((event) => (
            <TableRow 
              key={event.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onEventClick(event)}
            >
              <TableCell>
                <div className="font-medium">{format(new Date(event.date), 'MMM d, yyyy')}</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(event.date), 'h:mm a')}
                  {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
                </div>
              </TableCell>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    event.type === 'change' 
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' 
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200'
                  }
                >
                  {event.type === 'change' ? 'Change' : 'Release'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    event.status === 'approved' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : event.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : event.status === 'completed'
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{event.owner}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CalendarEventTable;
