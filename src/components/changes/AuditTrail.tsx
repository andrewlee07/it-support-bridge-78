
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditEntry } from '@/utils/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserById } from '@/utils/mockData';

interface AuditTrailProps {
  entries: AuditEntry[];
  maxHeight?: string;
}

const AuditTrail: React.FC<AuditTrailProps> = ({ entries, maxHeight = '300px' }) => {
  // Sort entries by timestamp (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Audit Trail</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`pr-4 max-h-[${maxHeight}]`}>
          <div className="space-y-4">
            {sortedEntries.length > 0 ? (
              sortedEntries.map((entry) => {
                const user = getUserById(entry.performedBy);
                return (
                  <div key={entry.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-sm">
                        {entry.message}
                      </div>
                      <div className="text-xs text-muted-foreground flex gap-1">
                        <span>{user?.name || 'Unknown user'}</span>
                        <span>•</span>
                        <span>{format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No audit entries found
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AuditTrail;
