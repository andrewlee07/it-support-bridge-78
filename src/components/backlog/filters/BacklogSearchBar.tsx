
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import StatusFilter from './StatusFilter';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';

interface Release {
  id: string;
  title: string;
}

interface BacklogSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedReleaseId: string;
  setSelectedReleaseId: (id: string) => void;
  selectedStatus: BacklogItemStatus[];
  handleStatusChange: (status: BacklogItemStatus) => void;
  releases: Release[];
}

const BacklogSearchBar: React.FC<BacklogSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedReleaseId,
  setSelectedReleaseId,
  selectedStatus,
  handleStatusChange,
  releases
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Search backlog items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <Select
          value={selectedReleaseId}
          onValueChange={setSelectedReleaseId}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by release" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {releases.map((release) => (
              <SelectItem key={release.id} value={release.id}>
                {release.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <StatusFilter 
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default BacklogSearchBar;
