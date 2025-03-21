
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AuditEntry } from '@/utils/types/audit';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserById } from '@/utils/mockData';

interface TimelineTabProps {
  auditEntries: AuditEntry[];
}

const TimelineTab: React.FC<TimelineTabProps> = ({ auditEntries }) => {
  // Sort entries by timestamp (newest first)
  const sortedEntries = [...auditEntries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {sortedEntries.length > 0 ? (
              sortedEntries.map((entry) => {
                const user = getUserById(entry.performedBy || entry.userId || '');
                return (
                  <div key={entry.id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-sm">
                        {entry.message || entry.action || 'Activity recorded'}
                      </div>
                      <div className="text-xs text-muted-foreground flex gap-1">
                        <span>{user?.name || entry.performedBy || entry.userName || 'Unknown user'}</span>
                        <span>•</span>
                        <span>{format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}</span>
                      </div>
                      {entry.details && (
                        <p className="mt-1 text-sm text-muted-foreground">{entry.details}</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No timeline entries found
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
