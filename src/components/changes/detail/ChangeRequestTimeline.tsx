
import React from 'react';
import { AuditEntry } from '@/utils/types/audit';
import { format } from 'date-fns';
import { 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  MessageSquare,
  User
} from 'lucide-react';

interface ChangeRequestTimelineProps {
  audit: AuditEntry[];
}

const ChangeRequestTimeline: React.FC<ChangeRequestTimelineProps> = ({ audit }) => {
  if (!audit || audit.length === 0) {
    return <p className="text-sm text-muted-foreground">No activity recorded.</p>;
  }

  const getIconForEntry = (entry: AuditEntry) => {
    const lowerMessage = entry.message.toLowerCase();
    if (lowerMessage.includes('created') || lowerMessage.includes('added')) {
      return <Info className="h-4 w-4 text-blue-500" />;
    } else if (lowerMessage.includes('warning') || lowerMessage.includes('risk')) {
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    } else if (lowerMessage.includes('status') || lowerMessage.includes('updated')) {
      return <RefreshCw className="h-4 w-4 text-purple-500" />;
    } else if (lowerMessage.includes('approved') || lowerMessage.includes('completed')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (lowerMessage.includes('note') || lowerMessage.includes('comment')) {
      return <MessageSquare className="h-4 w-4 text-gray-500" />;
    } else if (lowerMessage.includes('assigned')) {
      return <User className="h-4 w-4 text-blue-500" />;
    }
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="space-y-4">
      {audit.slice().reverse().map((entry, index) => (
        <div key={entry.id} className="flex">
          <div className="mr-4 relative">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
              {getIconForEntry(entry)}
            </div>
            {index < audit.length - 1 && (
              <div className="absolute top-8 bottom-0 left-1/2 w-px -ml-px bg-muted h-full" />
            )}
          </div>
          <div className="pb-6 w-full">
            <div className="flex flex-col">
              <p className="text-sm font-medium">{entry.message}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>
                  {entry.performedBy} • {format(new Date(entry.timestamp), 'PP')} at {format(new Date(entry.timestamp), 'p')}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangeRequestTimeline;
