
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChangesSearch from './ChangesSearch';

interface ChangesHeaderProps {
  onCreateNew: () => void;
}

const ChangesHeader: React.FC<ChangesHeaderProps> = ({ onCreateNew }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Change Management</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage change requests across your organization
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <ChangesSearch 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
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
            New Change
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangesHeader;
