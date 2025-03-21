
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import ReleasesSearch from './ReleasesSearch';

interface ReleasesHeaderProps {
  onCreateNew: () => void;
  onTabChange?: (value: string) => void;
  activeTab?: string;
  onStatusFilterChange?: (value: string[]) => void;
  statusFilter?: string[];
  totalCount: number;
}

const ReleasesHeader: React.FC<ReleasesHeaderProps> = ({
  onCreateNew,
  totalCount
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleExport = () => {
    console.log('Exporting releases data');
    // In a real app, this would trigger a data export
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Release Management</h1>
        <p className="text-muted-foreground mt-1">
          Plan and track releases across your organization ({totalCount} total)
        </p>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="default"
          onClick={handleExport}
          className="bg-background hover:bg-muted"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button onClick={onCreateNew} size="default" className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Release
        </Button>
      </div>
    </div>
  );
};

export default ReleasesHeader;
