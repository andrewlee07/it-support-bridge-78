
import React from 'react';
import { format } from 'date-fns';
import { AuditEntry } from '@/utils/types/audit';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Clock, RefreshCw, MessageSquare, User, Settings } from 'lucide-react';

interface ActivityHistoryProps {
  auditEntries: AuditEntry[];
}

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ auditEntries }) => {
  // Sort entries by timestamp in descending order (newest first)
  const sortedEntries = [...auditEntries].sort((a, b) => {
    // Handle both Date objects and string timestamps
    const dateA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
    const dateB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });

  const getActivityIcon = (message: string) => {
    if (message?.includes('closed')) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (message?.includes('reopened')) return <RefreshCw className="h-4 w-4 text-blue-500" />;
    if (message?.includes('Note added')) return <MessageSquare className="h-4 w-4 text-indigo-500" />;
    if (message?.includes('updated')) return <Settings className="h-4 w-4 text-amber-500" />;
    if (message?.includes('assigned')) return <User className="h-4 w-4 text-purple-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Activity History</h3>
      
      {sortedEntries.length === 0 ? (
        <div className="p-6 text-center border rounded-md bg-muted/10">
          <p className="text-muted-foreground">No activity recorded yet</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="p-4 space-y-4">
            {sortedEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="p-3 border rounded-md bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getActivityIcon(entry.message || '')}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{entry.performedBy || entry.userName || 'System'}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(entry.timestamp), 'HH:mm')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{entry.message || entry.action || 'Activity recorded'}</p>
                    
                    {entry.details && (
                      <p className="mt-1 text-xs text-muted-foreground">{entry.details}</p>
                    )}
                    
                    {entry.oldValue && entry.newValue && (
                      <div className="mt-2 text-xs">
                        <span className="text-muted-foreground">Changed from </span>
                        <Badge variant="outline" className="mr-2">{entry.oldValue}</Badge>
                        <span className="text-muted-foreground">to </span>
                        <Badge variant="outline">{entry.newValue}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ActivityHistory;
