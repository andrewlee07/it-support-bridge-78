
import React from 'react';
import { format } from 'date-fns';
import { AuditEntry } from '@/utils/types/audit';

interface ActivityHistoryProps {
  auditEntries: AuditEntry[];
}

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ auditEntries }) => {
  return (
    <div className="mt-6">
      <h3 className="text-md font-medium mb-2">Activity History</h3>
      <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
        {auditEntries.length > 0 ? (
          auditEntries.map((entry, index) => (
            <div key={index} className="p-3">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{entry.performedBy}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
              <p className="text-sm mt-1">{entry.message}</p>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No activity recorded yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
