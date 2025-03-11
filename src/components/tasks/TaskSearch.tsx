
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Filter, 
  Calendar, 
  Goal, 
  Tag, 
  Save, 
  Clock, 
  X, 
  Check 
} from 'lucide-react';
import { 
  TaskStatus, 
  TaskPriority 
} from '@/utils/types/taskTypes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

// Type for filter presets
interface FilterPreset {
  id: string;
  name: string;
  filters: {
    status: string[];
    priority: string[];
    assignedToMe: boolean;
    overdue: boolean;
    goals: string[];
    finishDateOption: string;
    customFinishDate?: Date;
  };
}

// Default filter presets
const defaultPresets: FilterPreset[] = [
  {
    id: 'my-critical',
    name: 'My Critical Tasks',
    filters: {
      status: ['new', 'in-progress'],
      priority: ['critical'],
      assignedToMe: true,
      overdue: false,
      goals: [],
      finishDateOption: 'any'
    }
  },
  {
    id: 'overdue',
    name: 'All Overdue Tasks',
    filters: {
      status: ['new', 'in-progress', 'on-hold'],
      priority: [],
      assignedToMe: false,
      overdue: true,
      goals: [],
      finishDateOption: 'any'
    }
  }
];

// Goals data for demonstration
const availableGoals = [
  { id: 'goal-1', name: 'Q2 Milestone' },
  { id: 'goal-2', name: 'Marketing Campaign' },
  { id: 'goal-3', name: 'Product Launch' },
  { id: 'goal-4', name: 'Infrastructure Upgrade' }
];

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
  onAssignedToMeChange: (assignedToMe: boolean) => void;
  // New props for advanced filtering
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
  // New props with defaults
  selectedGoals = [],
  onGoalsChange = () => {},
  finishDateOption = 'any',
  onFinishDateOptionChange = () => {},
  customFinishDate,
  onCustomFinishDateChange = () => {},
}) => {
  // State for the preset save/load dialogs
  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>(defaultPresets);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  
  // Status filters with multi-select capability
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    statusFilter !== 'all' ? [statusFilter] : []
  );
  
  // Priority filters with multi-select capability
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(
    priorityFilter !== 'all' ? [priorityFilter] : []
  );

  // Calculate the total number of active filters to display on the badge
  const totalActiveFilters = (
    (selectedStatuses.length) +
    (selectedPriorities.length) +
    (onlyOverdue ? 1 : 0) +
    (onlyAssignedToMe ? 1 : 0) +
    (selectedGoals.length) +
    (finishDateOption !== 'any' ? 1 : 0)
  );

  // Handle status multi-select
  const handleStatusSelect = (status: string) => {
    setSelectedStatuses(prev => {
      const newStatuses = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status];
      
      // Update the parent component's filter
      if (newStatuses.length === 0) {
        onStatusFilterChange('all');
      } else if (newStatuses.length === 1) {
        onStatusFilterChange(newStatuses[0]);
      } else {
        // For backward compatibility, just use the first one if multiple are selected
        onStatusFilterChange(newStatuses[0]);
      }
      
      return newStatuses;
    });
  };

  // Handle priority multi-select
  const handlePrioritySelect = (priority: string) => {
    setSelectedPriorities(prev => {
      const newPriorities = prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority];
      
      // Update the parent component's filter
      if (newPriorities.length === 0) {
        onPriorityFilterChange('all');
      } else if (newPriorities.length === 1) {
        onPriorityFilterChange(newPriorities[0]);
      } else {
        // For backward compatibility, just use the first one if multiple are selected
        onPriorityFilterChange(newPriorities[0]);
      }
      
      return newPriorities;
    });
  };

  // Handle goal selection
  const handleGoalSelect = (goalId: string) => {
    onGoalsChange(
      selectedGoals.includes(goalId)
        ? selectedGoals.filter(g => g !== goalId)
        : [...selectedGoals, goalId]
    );
  };

  // Save current filters as a preset
  const saveCurrentPreset = () => {
    if (!presetName.trim()) return;
    
    const newPreset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name: presetName,
      filters: {
        status: selectedStatuses,
        priority: selectedPriorities,
        assignedToMe: onlyAssignedToMe,
        overdue: onlyOverdue,
        goals: selectedGoals,
        finishDateOption,
        customFinishDate
      }
    };
    
    setSavedPresets([...savedPresets, newPreset]);
    setSaveDialogOpen(false);
    setPresetName('');
  };

  // Load a preset
  const loadPreset = (preset: FilterPreset) => {
    // Apply all the filters from the preset
    if (preset.filters.status.length > 0) {
      setSelectedStatuses(preset.filters.status);
      onStatusFilterChange(preset.filters.status[0]); // For compatibility
    } else {
      setSelectedStatuses([]);
      onStatusFilterChange('all');
    }
    
    if (preset.filters.priority.length > 0) {
      setSelectedPriorities(preset.filters.priority);
      onPriorityFilterChange(preset.filters.priority[0]); // For compatibility
    } else {
      setSelectedPriorities([]);
      onPriorityFilterChange('all');
    }
    
    onAssignedToMeChange(preset.filters.assignedToMe);
    onOverdueChange(preset.filters.overdue);
    onGoalsChange(preset.filters.goals);
    onFinishDateOptionChange(preset.filters.finishDateOption);
    
    if (preset.filters.customFinishDate) {
      onCustomFinishDateChange(new Date(preset.filters.customFinishDate));
    }
    
    setLoadDialogOpen(false);
  };

  // Delete a preset
  const deletePreset = (presetId: string) => {
    setSavedPresets(savedPresets.filter(p => p.id !== presetId));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
    onStatusFilterChange('all');
    onPriorityFilterChange('all');
    onAssignedToMeChange(false);
    onOverdueChange(false);
    onGoalsChange([]);
    onFinishDateOptionChange('any');
    onCustomFinishDateChange(new Date());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filters</span>
                {totalActiveFilters > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {totalActiveFilters}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Tasks</h4>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['new', 'in-progress', 'on-hold', 'completed', 'cancelled'].map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${status}`} 
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => handleStatusSelect(status)}
                        />
                        <Label htmlFor={`status-${status}`} className="capitalize">
                          {status.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['critical', 'high', 'medium', 'low'].map(priority => (
                      <div key={priority} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`priority-${priority}`} 
                          checked={selectedPriorities.includes(priority)}
                          onCheckedChange={() => handlePrioritySelect(priority)}
                        />
                        <Label htmlFor={`priority-${priority}`} className="capitalize">
                          {priority}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Goals</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableGoals.map(goal => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`goal-${goal.id}`} 
                          checked={selectedGoals.includes(goal.id)}
                          onCheckedChange={() => handleGoalSelect(goal.id)}
                        />
                        <Label htmlFor={`goal-${goal.id}`}>
                          {goal.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Finish Date</Label>
                  <Select 
                    value={finishDateOption} 
                    onValueChange={onFinishDateOptionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select finish date option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Date</SelectItem>
                      <SelectItem value="today">Due Today</SelectItem>
                      <SelectItem value="tomorrow">Due Tomorrow</SelectItem>
                      <SelectItem value="this-week">Due This Week</SelectItem>
                      <SelectItem value="this-month">Due This Month</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="no-date">No Due Date</SelectItem>
                      <SelectItem value="custom">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>

                  {finishDateOption === 'custom' && (
                    <div className="mt-2">
                      <Input 
                        type="date" 
                        value={customFinishDate ? customFinishDate.toISOString().slice(0, 10) : ''} 
                        onChange={(e) => onCustomFinishDateChange(new Date(e.target.value))}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="overdue" 
                      checked={onlyOverdue}
                      onCheckedChange={(checked) => onOverdueChange(!!checked)}
                    />
                    <Label htmlFor="overdue">Overdue Tasks Only</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="assigned-to-me" 
                      checked={onlyAssignedToMe}
                      onCheckedChange={(checked) => onAssignedToMeChange(!!checked)}
                    />
                    <Label htmlFor="assigned-to-me">Assigned to Me</Label>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSaveDialogOpen(true)}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLoadDialogOpen(true)}
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      Presets
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedStatuses.map(status => (
            <Badge key={`status-${status}`} variant="secondary" className="flex items-center gap-1">
              Status: {status.replace('-', ' ')}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleStatusSelect(status)} />
            </Badge>
          ))}
          
          {selectedPriorities.map(priority => (
            <Badge key={`priority-${priority}`} variant="secondary" className="flex items-center gap-1">
              Priority: {priority}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handlePrioritySelect(priority)} />
            </Badge>
          ))}
          
          {selectedGoals.map(goalId => {
            const goal = availableGoals.find(g => g.id === goalId);
            return (
              <Badge key={`goal-${goalId}`} variant="secondary" className="flex items-center gap-1">
                Goal: {goal?.name || goalId}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleGoalSelect(goalId)} />
              </Badge>
            );
          })}
          
          {finishDateOption !== 'any' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Due: {finishDateOption.replace('-', ' ')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFinishDateOptionChange('any')} 
              />
            </Badge>
          )}
          
          {onlyOverdue && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Overdue only
              <X className="h-3 w-3 cursor-pointer" onClick={() => onOverdueChange(false)} />
            </Badge>
          )}
          
          {onlyAssignedToMe && (
            <Badge variant="secondary" className="flex items-center gap-1">
              My tasks
              <X className="h-3 w-3 cursor-pointer" onClick={() => onAssignedToMeChange(false)} />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Save Preset Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Filter Preset</DialogTitle>
            <DialogDescription>
              Enter a name for this filter configuration to save it for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Preset name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveCurrentPreset} disabled={!presetName.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Preset Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Presets</DialogTitle>
            <DialogDescription>
              Select a saved preset to apply those filters.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2 p-1">
              {savedPresets.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No saved presets</p>
              ) : (
                savedPresets.map(preset => (
                  <div 
                    key={preset.id} 
                    className="flex items-center justify-between p-2 rounded-md border hover:bg-accent"
                  >
                    <span className="font-medium">{preset.name}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => loadPreset(preset)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => deletePreset(preset.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskSearch;
