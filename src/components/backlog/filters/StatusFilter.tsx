
import React from 'react';
import { FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';

interface StatusFilterProps {
  selectedStatus: BacklogItemStatus[];
  onStatusChange: (status: BacklogItemStatus) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange
}) => {
  return (
    <div className="relative">
      <Button variant="outline" className="w-[200px] justify-start">
        <FilterIcon className="h-4 w-4 mr-2" />
        Status Filter ({selectedStatus.length})
      </Button>
      <div className="absolute z-10 w-full mt-2 bg-white shadow-md rounded-md border p-2 hidden group-hover:block">
        {['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'].map((status) => (
          <div key={status} className="flex items-center p-2">
            <input
              type="checkbox"
              id={`status-${status}`}
              checked={selectedStatus.includes(status as BacklogItemStatus)}
              onChange={() => onStatusChange(status as BacklogItemStatus)}
              className="mr-2"
            />
            <label htmlFor={`status-${status}`}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
