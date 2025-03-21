
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

interface ChangesHeaderProps {
  onCreateNew: () => void;
}

const ChangesHeader: React.FC<ChangesHeaderProps> = ({ onCreateNew }) => {
  const handleExport = () => {
    console.log('Exporting changes data');
    // In a real app, this would trigger a data export
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Change Management</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage change requests across your organization
        </p>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="default"
          onClick={handleExport}
          className="bg-secondary/50 border border-border/20 hover:bg-muted"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button onClick={onCreateNew} size="default" className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Change
        </Button>
      </div>
    </div>
  );
};

export default ChangesHeader;
