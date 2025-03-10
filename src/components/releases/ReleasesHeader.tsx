
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReleasesSearch from './ReleasesSearch';

interface ReleasesHeaderProps {
  onCreateNew: () => void;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
  onStatusFilterChange?: (status: any) => void;
  statusFilter?: any;
  totalCount?: number;
}

const ReleasesHeader: React.FC<ReleasesHeaderProps> = ({ onCreateNew }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Release Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track software releases and deployments
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <ReleasesSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <div className="flex gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link to="/calendar">
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar View
            </Link>
          </Button>
          
          <Button onClick={onCreateNew} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Release
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReleasesHeader;
