
import React from 'react';
import { KanbanIcon, ListIcon, Clock, LineChartIcon } from 'lucide-react';
import { BacklogViewType } from '@/utils/types/backlogTypes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

interface BacklogViewSelectorProps {
  currentView: BacklogViewType;
  onViewChange: (view: BacklogViewType) => void;
}

const viewOptions = [
  { value: 'kanban', label: 'Kanban', icon: KanbanIcon, path: '/backlog/kanban' },
  { value: 'list', label: 'List', icon: ListIcon, path: '/backlog/list' },
  { value: 'timeline', label: 'Timeline', icon: Clock, path: '/backlog/timeline' },
  { value: 'reporting', label: 'Reporting', icon: LineChartIcon, path: '/backlog/reporting' },
] as const;

export function BacklogViewSelector({ currentView, onViewChange }: BacklogViewSelectorProps) {
  const navigate = useNavigate();

  const handleViewChange = (value: string) => {
    if (!value) return;

    const viewType = value as BacklogViewType;
    onViewChange(viewType);
    
    // Find the path for the selected view and navigate to it
    const selectedView = viewOptions.find(option => option.value === viewType);
    if (selectedView) {
      navigate(selectedView.path);
    }
  };

  return (
    <ToggleGroup 
      type="single" 
      value={currentView} 
      onValueChange={handleViewChange}
    >
      {viewOptions.map(({ value, label, icon: Icon }) => (
        <Tooltip key={value}>
          <TooltipTrigger asChild>
            <ToggleGroupItem value={value} aria-label={`${label} view`}>
              <Icon className="h-4 w-4" />
              <span className="sr-only">{label}</span>
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>{label} view</TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  );
}
