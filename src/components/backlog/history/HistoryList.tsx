
import React from 'react';
import { HistoryEntry } from '@/utils/types/backlogTypes';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserById } from '@/utils/mockData';
import { History, ChevronRight } from 'lucide-react';

interface HistoryListProps {
  history: HistoryEntry[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <History className="mx-auto h-8 w-8 opacity-50 mb-2" />
        <p>No history available</p>
      </div>
    );
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'None';
    if (typeof value === 'object' && value instanceof Date) {
      return value.toLocaleDateString();
    }
    return String(value);
  };

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      'title': 'Title',
      'description': 'Description',
      'status': 'Status',
      'priority': 'Priority',
      'type': 'Type',
      'assignee': 'Assignee',
      'releaseId': 'Release',
      'storyPoints': 'Story Points',
      'dueDate': 'Due Date',
      'labels': 'Labels'
    };
    
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <div className="space-y-2">
      {history
        .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())
        .map((entry) => {
          const user = getUserById(entry.changedBy);
          
          return (
            <div 
              key={entry.id} 
              className="flex gap-3 p-3 border rounded-md hover:bg-muted/30 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted text-xs">
                  {user?.name.split(' ').map(n => n[0]).join('') || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{user?.name || 'Unknown User'}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.changedAt), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="mt-1 text-sm">
                  <span>Changed {getFieldLabel(entry.field)} from </span>
                  <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                    {formatValue(entry.previousValue)}
                  </span>
                  <span className="mx-1">
                    <ChevronRight className="h-3 w-3 inline" />
                  </span>
                  <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                    {formatValue(entry.newValue)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HistoryList;
