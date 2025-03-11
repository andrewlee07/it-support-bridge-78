
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
  onlyOverdue: boolean;
  onOverdueChange: (overdue: boolean) => void;
  onlyAssignedToMe: boolean;
  onAssignedToMeChange: (assigned: boolean) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onlyOverdue,
  onOverdueChange,
  onlyAssignedToMe,
  onAssignedToMeChange
}) => {
  const activeFilterCount = [
    statusFilter !== 'all',
    priorityFilter !== 'all',
    onlyOverdue,
    onlyAssignedToMe
  ].filter(Boolean).length;
  
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex shrink-0 items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Filter Tasks</h4>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="overdue" 
                  checked={onlyOverdue} 
                  onCheckedChange={(checked) => onOverdueChange(!!checked)} 
                />
                <Label htmlFor="overdue" className="flex items-center cursor-pointer">
                  <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                  Only show overdue tasks
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="assigned" 
                  checked={onlyAssignedToMe} 
                  onCheckedChange={(checked) => onAssignedToMeChange(!!checked)} 
                />
                <Label htmlFor="assigned" className="cursor-pointer">
                  Only assigned to me
                </Label>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  onStatusFilterChange('all');
                  onPriorityFilterChange('all');
                  onOverdueChange(false);
                  onAssignedToMeChange(false);
                }}
              >
                Reset filters
              </Button>
              <Button onClick={() => document.dispatchEvent(new Event('close-popover'))}>
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskSearch;
