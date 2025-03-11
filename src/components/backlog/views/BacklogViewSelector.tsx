
import React from 'react';
import { ViewIcon, KanbanIcon, ListIcon, CalendarIcon, LineChartIcon, Clock } from 'lucide-react';
import { BacklogViewType } from '@/utils/types/backlogTypes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface BacklogViewSelectorProps {
  currentView: BacklogViewType;
  onViewChange: (view: BacklogViewType) => void;
}

const viewOptions = [
  { value: 'kanban', label: 'Kanban', icon: KanbanIcon },
  { value: 'list', label: 'List', icon: ListIcon },
  { value: 'timeline', label: 'Timeline', icon: Clock },
  { value: 'calendar', label: 'Calendar', icon: CalendarIcon },
  { value: 'reporting', label: 'Reporting', icon: LineChartIcon },
] as const;

export function BacklogViewSelector({ currentView, onViewChange }: BacklogViewSelectorProps) {
  return (
    <ToggleGroup type="single" value={currentView} onValueChange={(value) => value && onViewChange(value as BacklogViewType)}>
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
