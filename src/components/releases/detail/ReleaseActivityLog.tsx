
import React from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { AuditEntry } from '@/utils/types';

interface ReleaseActivityLogProps {
  auditEntries: AuditEntry[];
}

const ReleaseActivityLog: React.FC<ReleaseActivityLogProps> = ({ auditEntries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>
          Recent activity for this release
        </CardDescription>
      </CardHeader>
      <CardContent>
        {auditEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No activity recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {auditEntries.map((entry) => (
              <div key={entry.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between">
                  <span className="font-medium">{entry.message}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(entry.timestamp), 'PPp')}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  By: {entry.performedBy}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseActivityLog;
