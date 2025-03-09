
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ReportHeaderProps {
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ isCreating, setIsCreating }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">
          View and create custom reports
        </p>
      </div>
      {!isCreating && (
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Report
        </Button>
      )}
    </div>
  );
};

export default ReportHeader;
