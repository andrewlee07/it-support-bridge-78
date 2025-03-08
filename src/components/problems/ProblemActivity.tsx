
import React from 'react';
import { AuditEntry } from '@/utils/types/audit';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProblemActivityProps {
  auditEntries: AuditEntry[];
}

interface ProblemAuditEntry extends AuditEntry {
  // Add additional fields that might exist in the audit entry
  action?: string;
  user?: string;
  description?: string;
  assignedTo?: string;
}

const ProblemActivity: React.FC<ProblemActivityProps> = ({ auditEntries }) => {
  if (!auditEntries || auditEntries.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No activity yet.</p>
        </CardContent>
      </Card>
    );
  }

  // Sort entries newest first
  const sortedEntries = [...auditEntries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {sortedEntries.map((entry: ProblemAuditEntry, index) => (
              <React.Fragment key={entry.id}>
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {(entry.user || entry.performedBy || 'User').substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">
                        {getEventText(entry)}
                      </span>
                    </p>
                    
                    <div className="text-sm text-muted-foreground">
                      {entry.user || entry.performedBy || 'User'} • {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                    </div>
                    
                    {(entry.description || entry.message || entry.details) && (
                      <p className="text-sm mt-2 bg-muted p-3 rounded-md whitespace-pre-wrap">
                        {entry.description || entry.details || entry.message}
                      </p>
                    )}
                  </div>
                </div>
                {index < sortedEntries.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

function getEventText(entry: ProblemAuditEntry): string {
  // Fallback to standard audit fields if problem-specific ones aren't available
  const action = entry.action || entry.message;
  
  if (!action) return 'Updated the problem';
  
  switch (action) {
    case 'created':
      return 'Created the problem';
    case 'status-changed':
      return `Changed status to ${entry.newValue || ''}`;
    case 'assigned':
      return `Assigned to ${entry.assignedTo || 'someone'}`;
    case 'priority-changed':
      return `Changed priority to ${entry.newValue || ''}`;
    case 'added-note':
      return 'Added a note';
    case 'reopened':
      return 'Reopened the problem';
    case 'resolved':
      return 'Marked problem as resolved';
    case 'closed':
      return 'Closed the problem';
    case 'marked-as-known-error':
      return 'Marked as Known Error';
    case 'added-related-incident':
      return 'Linked an incident';
    case 'updated':
      return 'Updated problem details';
    default:
      return action;
  }
}

export default ProblemActivity;
