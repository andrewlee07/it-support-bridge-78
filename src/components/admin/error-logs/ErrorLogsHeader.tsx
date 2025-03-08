
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Trash2 } from 'lucide-react';

interface ErrorLogsHeaderProps {
  onRefresh: () => void;
  onClearAll: () => void;
}

export const ErrorLogsHeader: React.FC<ErrorLogsHeaderProps> = ({
  onRefresh,
  onClearAll
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Error Logs</h1>
        <p className="text-muted-foreground">System-wide error tracking for administrators</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="destructive" size="sm" onClick={onClearAll}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  );
};
