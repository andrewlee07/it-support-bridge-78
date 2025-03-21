
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SecurityCase } from '@/utils/types/security';
import { FileText, Edit, MessageSquare, AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';
import { getUserNameById } from '@/utils/userUtils';

interface ActivityTimelineProps {
  securityCase: SecurityCase;
  formatDate: (dateString: string) => string;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  securityCase,
  formatDate
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {securityCase.audit && securityCase.audit.map((entry, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {entry.action === 'created' && <FileText className="h-4 w-4" />}
                  {entry.action === 'updated' && <Edit className="h-4 w-4" />}
                  {entry.action === 'note-added' && <MessageSquare className="h-4 w-4" />}
                  {entry.action === 'resolved' && <CheckCircle className="h-4 w-4" />}
                  {entry.action === 'reopened' && <AlertOctagon className="h-4 w-4" />}
                  {(!entry.action || entry.action === 'other') && <AlertTriangle className="h-4 w-4" />}
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
