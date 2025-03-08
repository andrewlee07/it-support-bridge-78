
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription 
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Layout, LayoutGrid } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { KanbanBoardConfig } from '@/utils/types/kanbanTypes';

interface BoardLayoutSectionProps {
  layout: 'horizontal' | 'grid';
  onLayoutChange: (layout: 'horizontal' | 'grid') => void;
}

const BoardLayoutSection: React.FC<BoardLayoutSectionProps> = ({
  layout,
  onLayoutChange
}) => {
  const form = useForm<KanbanBoardConfig>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Board Layout</CardTitle>
        <CardDescription>
          Choose how columns are displayed on the board
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="layout"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabel>Layout Style</FormLabel>
              <RadioGroup
                value={layout}
                onValueChange={(value: 'horizontal' | 'grid') => onLayoutChange(value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="horizontal" id="horizontal" />
                  <Layout className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="horizontal">Horizontal Scrolling Columns</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="grid" id="grid" />
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="grid">Grid Layout</Label>
                </div>
              </RadioGroup>
              <FormDescription>
                Horizontal layout with scrolling is recommended for boards with many columns
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BoardLayoutSection;
