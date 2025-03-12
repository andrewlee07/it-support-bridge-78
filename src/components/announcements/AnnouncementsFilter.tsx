
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Clock, Info, Search, AlertTriangle, FilterX } from 'lucide-react';
import { AnnouncementStatus, AnnouncementPriority, AnnouncementType } from '@/utils/types';

interface AnnouncementsFilterProps {
  status?: AnnouncementStatus;
  priority?: AnnouncementPriority;
  type?: AnnouncementType;
  search?: string;
  onFilterChange: (filters: {
    status?: AnnouncementStatus;
    priority?: AnnouncementPriority;
    type?: AnnouncementType;
    search?: string;
  }) => void;
}

const AnnouncementsFilter: React.FC<AnnouncementsFilterProps> = ({
  status,
  priority,
  type,
  search = '',
  onFilterChange
}) => {
  const [searchValue, setSearchValue] = React.useState(search);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange({ status, priority, type, search: searchValue });
  };
  
  const handleStatusChange = (value: AnnouncementStatus | 'all') => {
    onFilterChange({ 
      status: value === 'all' ? undefined : value, 
      priority, 
      type, 
      search: searchValue 
    });
  };
  
  const handlePriorityChange = (value: AnnouncementPriority | 'all') => {
    onFilterChange({ 
      status, 
      priority: value === 'all' ? undefined : value, 
      type, 
      search: searchValue 
    });
  };
  
  const handleTypeChange = (value: AnnouncementType | 'all') => {
    onFilterChange({ 
      status, 
      priority, 
      type: value === 'all' ? undefined : value, 
      search: searchValue 
    });
  };
  
  const handleClearFilters = () => {
    setSearchValue('');
    onFilterChange({});
  };
  
  const getTypeIcon = (typeValue: string) => {
    switch (typeValue) {
      case 'outage':
        return <AlertCircle className="h-4 w-4" />;
      case 'maintenance':
        return <Clock className="h-4 w-4" />;
      case 'information':
        return <Info className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const isFiltersActive = status || priority || type || searchValue;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filter Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search announcements..."
              className="pl-8"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="status-filter" className="mb-1 block">Status</Label>
            <Select
              value={status || 'all'}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="priority-filter" className="mb-1 block">Priority</Label>
            <Select
              value={priority || 'all'}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger id="priority-filter">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="type-filter" className="mb-1 block">Type</Label>
            <Select
              value={type || 'all'}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="All types">
                  {type && (
                    <div className="flex items-center">
                      {getTypeIcon(type)}
                      <span className="ml-2">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="outage">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    Outage
                  </div>
                </SelectItem>
                <SelectItem value="maintenance">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                    Maintenance
                  </div>
                </SelectItem>
                <SelectItem value="information">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    Information
                  </div>
                </SelectItem>
                <SelectItem value="other">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />
                    Other
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isFiltersActive && (
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearFilters}
              className="flex items-center"
            >
              <FilterX className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementsFilter;
