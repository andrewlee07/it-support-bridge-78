
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CalendarEvent } from '@/utils/types/calendar';

interface CalendarEventListProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  isLoading?: boolean;
}

const CalendarEventList: React.FC<CalendarEventListProps> = ({ 
  events, 
  onEventClick,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No events scheduled for this period</p>
      </div>
    );
  }

  // Group events by date
  const groupedEvents: Record<string, CalendarEvent[]> = {};
  events.forEach(event => {
    const dateStr = format(new Date(event.date), 'yyyy-MM-dd');
    if (!groupedEvents[dateStr]) {
      groupedEvents[dateStr] = [];
    }
    groupedEvents[dateStr].push(event);
  });

  return (
    <div className="space-y-4">
      {Object.entries(groupedEvents).map(([dateStr, dateEvents]) => (
        <Card key={dateStr} className="overflow-hidden">
          <CardHeader className="bg-muted py-2 px-4">
            <h3 className="text-sm font-medium">
              {format(new Date(dateStr), 'EEEE, MMMM d, yyyy')}
            </h3>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {dateEvents.map((event) => (
                <li 
                  key={event.id}
                  className="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {format(new Date(event.date), 'h:mm a')}
                        {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
                      </div>
                    </div>
                    <Badge 
                      className={
                        event.type === 'change' 
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }
                    >
                      {event.type === 'change' ? 'Change' : 'Release'}
                    </Badge>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CalendarEventList;
