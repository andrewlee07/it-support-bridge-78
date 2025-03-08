
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditEntry } from '@/utils/types/audit';
import { formatDistanceToNow, format } from 'date-fns';
import { MessageSquare, UserCheck, Edit, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ProblemActivityProps {
  auditEntries: AuditEntry[];
}

const ProblemActivity: React.FC<ProblemActivityProps> = ({ auditEntries }) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return <Edit className="h-5 w-5 text-blue-500" />;
      case 'updated':
        return <Edit className="h-5 w-5 text-amber-500" />;
      case 'assigned':
        return <UserCheck className="h-5 w-5 text-purple-500" />;
      case 'added-note':
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      case 'reopened':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Edit className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getActionLabel = (action: string) => {
    switch (action) {
      case 'created':
        return 'Created';
      case 'updated':
        return 'Updated';
      case 'assigned':
        return 'Assigned';
      case 'added-note':
        return 'Added note';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      case 'reopened':
        return 'Reopened';
      default:
        return action.charAt(0).toUpperCase() + action.slice(1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Activity History</CardTitle>
      </CardHeader>
      <CardContent>
        {auditEntries && auditEntries.length > 0 ? (
          <div className="space-y-4">
            {auditEntries.map((entry) => (
              <div key={entry.id} className="flex">
                <div className="mr-4">
                  {getActionIcon(entry.action)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {getActionLabel(entry.action)}
                      {entry.action === 'assigned' && entry.assignedTo && (
                        <span> to <span className="font-semibold">{entry.assignedTo}</span></span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    By {entry.user}
                  </div>
                  {entry.description && (
                    <div className="mt-2 text-sm border-l-2 border-muted pl-4 py-1">
                      {entry.description}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(new Date(entry.timestamp), 'PPpp')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No activity recorded yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProblemActivity;
