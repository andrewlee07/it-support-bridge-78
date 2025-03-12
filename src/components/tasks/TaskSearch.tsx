
import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
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
  // Advanced filtering props
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
  // Advanced filtering props
  selectedGoals = [],
  onGoalsChange = () => {},
  finishDateOption = 'any',
  onFinishDateOptionChange = () => {},
  customFinishDate,
  onCustomFinishDateChange = () => {}
}) => {
  const statusOptions: TaskStatus[] = ['new', 'in-progress', 'on-hold', 'completed', 'cancelled'];
  const priorityOptions: TaskPriority[] = ['critical', 'high', 'medium', 'low'];
  
  // Mock goals for the demo
  const goalOptions = [
    { id: 'goal-1', name: 'Improve System Reliability' },
    { id: 'goal-2', name: 'Reduce Support Tickets' },
    { id: 'goal-3', name: 'Enhance User Experience' },
    { id: 'goal-4', name: 'Optimize Performance' }
  ];
  
  // Date filter options
  const dateOptions = [
    { value: 'any', label: 'Any date' },
    { value: 'today', label: 'Due today' },
    { value: 'tomorrow', label: 'Due tomorrow' },
    { value: 'this-week', label: 'Due this week' },
    { value: 'this-month', label: 'Due this month' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'no-date', label: 'No due date' },
    { value: 'custom', label: 'Custom date' }
  ];

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
  
  const handleGoalChange = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      onGoalsChange(selectedGoals.filter(g => g !== goalId));
    } else {
      onGoalsChange([...selectedGoals, goalId]);
    }
  };
  
  const handleDateOptionChange = (option: string) => {
    onFinishDateOptionChange(option);
  };
  
  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    if (date) {
      onCustomFinishDateChange(date);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (statusFilter.length > 0) count++;
    if (priorityFilter.length > 0) count++;
    if (onlyOverdue) count++;
    if (onlyAssignedToMe) count++;
    if (selectedGoals.length > 0) count++;
    if (finishDateOption !== 'any') count++;
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
                <h4 className="font-medium text-sm">Assigned to</h4>
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
                <h4 className="font-medium text-sm">Task status</h4>
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
              
              {/* Advanced Filters */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Goals</h4>
                <div className="grid grid-cols-1 gap-2">
                  {goalOptions.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`goal-${goal.id}`} 
                        checked={selectedGoals.includes(goal.id)} 
                        onCheckedChange={() => handleGoalChange(goal.id)}
                      />
                      <Label 
                        htmlFor={`goal-${goal.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {goal.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Due date</h4>
                <div className="grid grid-cols-1 gap-2">
                  <select 
                    className="w-full p-2 text-sm border rounded-md"
                    value={finishDateOption}
                    onChange={(e) => handleDateOptionChange(e.target.value)}
                  >
                    {dateOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  {finishDateOption === 'custom' && (
                    <div className="mt-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="date" 
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                        value={customFinishDate ? customFinishDate.toISOString().split('T')[0] : ''}
                        onChange={handleCustomDateChange}
                      />
                    </div>
                  )}
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
