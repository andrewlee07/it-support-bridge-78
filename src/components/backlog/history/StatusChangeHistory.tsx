
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoryEntry } from '@/utils/types/backlogTypes';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRightIcon, UserIcon, BotIcon } from 'lucide-react';

interface StatusChangeHistoryProps {
  historyEntries: HistoryEntry[];
}

const StatusChangeHistory: React.FC<StatusChangeHistoryProps> = ({ historyEntries }) => {
  // Filter to only status changes
  const statusChanges = historyEntries.filter(entry => entry.field === 'status');
  
  if (statusChanges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No status changes recorded yet.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Helpers to determine if change was automatic (by system) or manual
  const isAutomaticChange = (entry: HistoryEntry): boolean => {
    // In a real implementation, you would check against system user IDs
    // or have a flag in the history entry. For simplicity, we'll just check if 
    // the user ID includes "system" or "auto"
    return entry.changedBy.toLowerCase().includes('system') || 
           entry.changedBy.toLowerCase().includes('auto');
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'ready':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'deferred':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusChanges.map((entry) => (
            <div 
              key={entry.id} 
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(entry.previousValue as string)}>
                    {entry.previousValue}
                  </Badge>
                  <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
                  <Badge className={getStatusColor(entry.newValue as string)}>
                    {entry.newValue}
                  </Badge>
                </div>
                
                <div className="flex items-center">
                  {isAutomaticChange(entry) ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <BotIcon className="h-3 w-3" />
                      Automatic
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <UserIcon className="h-3 w-3" />
                      Manual
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(entry.changedAt), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusChangeHistory;
