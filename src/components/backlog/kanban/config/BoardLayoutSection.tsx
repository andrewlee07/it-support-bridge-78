
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { KanbanBoardConfig } from '@/utils/types/kanbanTypes';
import { Layers, Kanban } from 'lucide-react';

interface BoardLayoutSectionProps {
  layout: 'horizontal' | 'grid';
  viewType: 'status' | 'sprint';
  onLayoutChange: (layout: 'horizontal' | 'grid') => void;
  onViewTypeChange: (viewType: 'status' | 'sprint') => void;
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
        <CardDescription>
          Configure how the kanban board is displayed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Layout Type</h3>
          <RadioGroup value={layout} onValueChange={(v) => onLayoutChange(v as 'horizontal' | 'grid')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal" id="horizontal" />
              <Label htmlFor="horizontal">Horizontal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label htmlFor="grid">Grid</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">View Type</h3>
          <ToggleGroup type="single" value={viewType} onValueChange={(v) => v && onViewTypeChange(v as 'status' | 'sprint')}>
            <ToggleGroupItem value="status" aria-label="Status View">
              <Layers className="h-4 w-4 mr-2" />
              Status
            </ToggleGroupItem>
            <ToggleGroupItem value="sprint" aria-label="Sprint View">
              <Kanban className="h-4 w-4 mr-2" />
              Sprint
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardLayoutSection;
