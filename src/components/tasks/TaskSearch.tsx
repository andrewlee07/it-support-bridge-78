
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TaskStatus, TaskPriority } from '@/utils/types/taskTypes';

export interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus[];
  onStatusFilterChange: (statuses: TaskStatus[]) => void;
  priorityFilter: TaskPriority[];
  onPriorityFilterChange: (priorities: TaskPriority[]) => void;
  onlyOverdue: boolean;
  onOverdueChange: (value: boolean) => void;
  onlyAssignedToMe: boolean;
  onAssignedToMeChange: (value: boolean) => void;
  // Optional advanced props with defaults
  selectedGoals?: string[];
  onGoalsChange?: (goals: string[]) => void;
  finishDateOption?: string;
  onFinishDateOptionChange?: (option: string) => void;
  customFinishDate?: Date;
  onCustomFinishDateChange?: (date: Date) => void;
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
  onAssignedToMeChange,
  // Advanced filtering props with defaults
  selectedGoals = [],
  onGoalsChange = () => {},
  finishDateOption = 'any',
  onFinishDateOptionChange = () => {},
  customFinishDate,
  onCustomFinishDateChange = () => {}
}) => {
  const statusOptions: TaskStatus[] = ['new', 'in-progress', 'on-hold', 'completed', 'cancelled'];
  const priorityOptions: TaskPriority[] = ['critical', 'high', 'medium', 'low'];

  const handleStatusChange = (status: TaskStatus) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter(s => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    if (priorityFilter.includes(priority)) {
      onPriorityFilterChange(priorityFilter.filter(p => p !== priority));
    } else {
      onPriorityFilterChange([...priorityFilter, priority]);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (statusFilter.length > 0) count++;
    if (priorityFilter.length > 0) count++;
    if (onlyOverdue) count++;
    if (onlyAssignedToMe) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
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
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-1 rounded-full px-2">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={statusFilter.includes(status)} 
                        onCheckedChange={() => handleStatusChange(status)}
                      />
                      <Label 
                        htmlFor={`status-${status}`}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {status.replace(/-/g, ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Priority</h4>
                <div className="grid grid-cols-2 gap-2">
                  {priorityOptions.map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`priority-${priority}`} 
                        checked={priorityFilter.includes(priority)} 
                        onCheckedChange={() => handlePriorityChange(priority)}
                      />
                      <Label 
                        htmlFor={`priority-${priority}`}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Assignment</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="assigned-to-me" 
                    checked={onlyAssignedToMe} 
                    onCheckedChange={(checked) => onAssignedToMeChange(checked === true)}
                  />
                  <Label 
                    htmlFor="assigned-to-me"
                    className="text-sm cursor-pointer"
                  >
                    Only assigned to me
                  </Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Due Date</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="overdue" 
                    checked={onlyOverdue} 
                    onCheckedChange={(checked) => onOverdueChange(checked === true)}
                  />
                  <Label 
                    htmlFor="overdue"
                    className="text-sm cursor-pointer"
                  >
                    Show only overdue tasks
                  </Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TaskSearch;
