
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter, Search, X } from 'lucide-react';
import { TaskStatus, TaskPriority } from '@/utils/types/taskTypes';
import { Badge } from '@/components/ui/badge';

export interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus[];
  onStatusFilterChange: (statuses: TaskStatus[]) => void;
  priorityFilter: TaskPriority[];
  onPriorityFilterChange: (priorities: TaskPriority[]) => void;
  placeholder?: string;
  // For backward compatibility with Tasks.tsx
  value?: string;
  onChange?: (value: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  placeholder = 'Search tasks...',
  // Handle backward compatibility
  value,
  onChange
}) => {
  // Use the backward compatibility props if provided
  const effectiveSearchQuery = value !== undefined ? value : searchQuery;
  const effectiveOnSearchChange = onChange || onSearchChange;

  const statusOptions: TaskStatus[] = ['new', 'in-progress', 'on-hold', 'completed', 'cancelled'];
  const priorityOptions: TaskPriority[] = ['critical', 'high', 'medium', 'low'];

  const handleToggleStatus = (status: TaskStatus) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter(s => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  const handleTogglePriority = (priority: TaskPriority) => {
    if (priorityFilter.includes(priority)) {
      onPriorityFilterChange(priorityFilter.filter(p => p !== priority));
    } else {
      onPriorityFilterChange([...priorityFilter, priority]);
    }
  };

  const handleClearFilters = () => {
    effectiveOnSearchChange('');
    onStatusFilterChange([]);
    onPriorityFilterChange([]);
  };

  const hasFilters = effectiveSearchQuery || statusFilter.length > 0 || priorityFilter.length > 0;

  return (
    <div className="w-full max-w-3xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={effectiveSearchQuery}
            onChange={(e) => effectiveOnSearchChange(e.target.value)}
            className="pl-8"
          />
          {effectiveSearchQuery && (
            <button 
              onClick={() => effectiveOnSearchChange('')}
              className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
              {(statusFilter.length > 0 || priorityFilter.length > 0) && (
                <Badge variant="secondary" className="ml-1 h-5 px-1">
                  {statusFilter.length + priorityFilter.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            {statusOptions.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={() => handleToggleStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            {priorityOptions.map(priority => (
              <DropdownMenuCheckboxItem
                key={priority}
                checked={priorityFilter.includes(priority)}
                onCheckedChange={() => handleTogglePriority(priority)}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
            
            {hasFilters && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClearFilters} className="text-destructive focus:text-destructive">
                  Clear filters
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasFilters && (
        <div className="flex flex-wrap gap-2 mt-2">
          {statusFilter.map(status => (
            <Badge key={status} variant="secondary" className="gap-1">
              {status}
              <button onClick={() => handleToggleStatus(status)} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {priorityFilter.map(priority => (
            <Badge key={priority} variant="secondary" className="gap-1">
              {priority}
              <button onClick={() => handleTogglePriority(priority)} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {hasFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters} 
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSearch;
