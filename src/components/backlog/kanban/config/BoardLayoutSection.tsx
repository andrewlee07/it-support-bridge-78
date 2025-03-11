
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ViewDimension } from '@/hooks/backlog/kanban/types';

interface BoardLayoutSectionProps {
  layout: 'horizontal' | 'grid';
  viewType: ViewDimension;
  onLayoutChange: (layout: 'horizontal' | 'grid') => void;
  onViewTypeChange: (viewType: ViewDimension) => void;
}

const BoardLayoutSection: React.FC<BoardLayoutSectionProps> = ({
  layout,
  viewType,
  onLayoutChange,
  onViewTypeChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Board Layout</CardTitle>
        <CardDescription>Configure the appearance and organization of your board</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block">View Dimension</Label>
          <Select value={viewType} onValueChange={(value) => onViewTypeChange(value as ViewDimension)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select view type" />
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
          <p className="text-xs text-muted-foreground mt-1">
            This determines how cards are grouped on the board
          </p>
        </div>
        
        <div>
          <Label className="mb-2 block">Layout Style</Label>
          <RadioGroup value={layout} onValueChange={(value) => onLayoutChange(value as 'horizontal' | 'grid')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal" id="horizontal" />
              <Label htmlFor="horizontal">Horizontal (Scrollable)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label htmlFor="grid">Grid (Wrap columns)</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardLayoutSection;
