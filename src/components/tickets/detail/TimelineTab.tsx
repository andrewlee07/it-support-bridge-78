
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/utils/types/ticket';
import { format } from 'date-fns';

interface TimelineTabProps {
  ticket: Ticket;
  onAddNote: (note: string) => void;
}

const TimelineTab: React.FC<TimelineTabProps> = ({ ticket, onAddNote }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ticket.audit?.map((entry, index) => (
            <div key={index} className="flex space-x-3">
              <div className="relative flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                {index < ticket.audit.length - 1 && (
                  <div className="absolute left-1 top-3 w-[1px] h-full bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
              <div className="flex-grow space-y-1 pb-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{entry.action}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(entry.timestamp), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                {entry.details && (
                  <p className="text-sm text-muted-foreground">{entry.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
