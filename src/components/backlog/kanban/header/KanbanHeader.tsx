
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ListIcon, Filter, Sliders, Calendar, Clock, Tag, CheckSquare } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ViewDimension } from '@/hooks/backlog/kanban/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface KanbanHeaderProps {
  viewDimension: ViewDimension;
  onViewDimensionChange: (dimension: ViewDimension) => void;
}

const KanbanHeader: React.FC<KanbanHeaderProps> = ({ 
  viewDimension, 
  onViewDimensionChange 
}) => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<{
    sprints: string[],
    statuses: string[],
    priorities: string[],
    releases: string[],
    assignees: string[]
  }>({
    sprints: [],
    statuses: [],
    priorities: [],
    releases: [],
    assignees: []
  });

  const totalActiveFilters = Object.values(activeFilters).flat().length;
  
  const handleFilterChange = (type: string, value: string) => {
    setActiveFilters(prev => {
      const typedKey = type as keyof typeof prev;
      if (prev[typedKey].includes(value)) {
        return {
          ...prev,
          [type]: prev[typedKey].filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...prev[typedKey], value]
        };
      }
    });
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Backlog Board</h1>
        <p className="text-muted-foreground">Manage your backlog items using the kanban board</p>
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
              <h4 className="font-medium">Filter Items</h4>
              
              <div className="space-y-2">
                <Label>Sprints</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Sprint 1', 'Sprint 2', 'Sprint 3', 'Backlog'].map(sprint => (
                    <div key={sprint} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`sprint-${sprint}`} 
                        checked={activeFilters.sprints.includes(sprint)}
                        onCheckedChange={() => handleFilterChange('sprints', sprint)}
                      />
                      <Label htmlFor={`sprint-${sprint}`}>{sprint}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Open', 'In Progress', 'Ready', 'Blocked', 'Completed'].map(status => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={activeFilters.statuses.includes(status)}
                        onCheckedChange={() => handleFilterChange('statuses', status)}
                      />
                      <Label htmlFor={`status-${status}`}>{status}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Releases</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['v1.0', 'v1.1', 'v2.0', 'Unassigned'].map(release => (
                    <div key={release} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`release-${release}`} 
                        checked={activeFilters.releases.includes(release)}
                        onCheckedChange={() => handleFilterChange('releases', release)}
                      />
                      <Label htmlFor={`release-${release}`}>{release}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveFilters({
                    sprints: [],
                    statuses: [],
                    priorities: [],
                    releases: [],
                    assignees: []
                  })}
                >
                  Clear filters
                </Button>
                <Button size="sm">Apply</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Select 
                value={viewDimension} 
                onValueChange={(val) => onViewDimensionChange(val as ViewDimension)}
              >
                <SelectTrigger className="w-[50px]">
                  <Filter className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status">By Status</SelectItem>
                  <SelectItem value="sprint">By Sprint</SelectItem>
                  <SelectItem value="assignee">By Assignee</SelectItem>
                  <SelectItem value="priority">By Priority</SelectItem>
                  <SelectItem value="label">By Label</SelectItem>
                  <SelectItem value="release">By Release</SelectItem>
                  <SelectItem value="progress">By Progress</SelectItem>
                  <SelectItem value="due-date">By Due Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            Group items by {viewDimension.replace('-', ' ')}
          </TooltipContent>
        </Tooltip>
        
        <Button 
          variant="outline"
          onClick={() => navigate('/backlog')}
        >
          <ListIcon className="mr-2 h-4 w-4" />
          List View
        </Button>
        <Button 
          variant="outline"
          onClick={() => document.querySelector('[data-kanban-board]')?.dispatchEvent(new Event('openConfig'))}
        >
          <Sliders className="mr-2 h-4 w-4" />
          Board Settings
        </Button>
      </div>
    </div>
  );
};

export default KanbanHeader;
