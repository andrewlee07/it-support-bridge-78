
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SecurityCase } from '@/utils/types/security';
import { FileText, Edit, MessageSquare, AlertTriangle, Clock, XCircle, CheckCircle, Shield } from 'lucide-react';
import { getUserNameById } from '@/utils/userUtils';

interface ActivityTimelineProps {
  securityCase: SecurityCase;
  formatDate: (dateString: string) => string;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  securityCase,
  formatDate
}) => {
  const getIcon = (action: string | undefined) => {
    switch (action) {
      case 'created':
        return <FileText className="h-4 w-4" />;
      case 'updated':
        return <Edit className="h-4 w-4" />;
      case 'note-added':
        return <MessageSquare className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'reopened':
        return <XCircle className="h-4 w-4" />;
      case 'assigned':
        return <Shield className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string | undefined) => {
    switch (action) {
      case 'created':
        return 'bg-blue-100 text-blue-800';
      case 'updated':
        return 'bg-amber-100 text-amber-800';
      case 'note-added':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'reopened':
        return 'bg-red-100 text-red-800';
      case 'assigned':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {securityCase.audit && securityCase.audit.length > 0 ? (
            securityCase.audit.map((entry, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ${getActionColor(entry.action)} flex items-center justify-center`}>
                    {getIcon(entry.action)}
                  </div>
                  {index < securityCase.audit.length - 1 && <div className="w-0.5 h-full bg-muted" />}
                </div>
                <div className="pb-4">
                  <div className="flex items-baseline gap-2">
                    <p className="font-medium">{entry.userName || getUserNameById(entry.performedBy || '')}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm">{entry.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No activity recorded yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
