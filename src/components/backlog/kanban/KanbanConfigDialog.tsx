
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  SlidersHorizontal, 
  Layout, 
  LayoutGrid, 
  ChevronRight, 
  AlertTriangle
} from 'lucide-react';
import { KanbanBoardConfig, defaultKanbanConfig } from '@/utils/types/kanbanTypes';

interface KanbanConfigDialogProps {
  config: KanbanBoardConfig;
  onUpdateConfig: (config: KanbanBoardConfig) => void;
}

const KanbanConfigDialog: React.FC<KanbanConfigDialogProps> = ({
  config,
  onUpdateConfig
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<KanbanBoardConfig>({
    defaultValues: config || defaultKanbanConfig
  });

  const handleSubmit = (data: KanbanBoardConfig) => {
    onUpdateConfig(data);
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Configure
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Kanban Board Configuration</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Layout Style</FormLabel>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value: 'horizontal' | 'grid') => field.onChange(value)}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="horizontal" id="horizontal" />
                            <Layout className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="horizontal">Horizontal Columns</Label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="grid" id="grid" />
                            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="grid">Grid Layout</Label>
                          </div>
                        </RadioGroup>
                        <FormDescription>
                          Horizontal layout is recommended for boards with 6 or fewer columns
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Column Visibility</CardTitle>
                  <CardDescription>
                    Configure which columns are visible by default
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {config.columns.map((column) => (
                      <div key={column.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: column.color.includes('bg-') 
                                ? `var(--${column.color.split('bg-')[1].split(' ')[0]})` 
                                : column.color
                            }}
                          />
                          <Label htmlFor={`collapse-${column.id}`} className="font-medium">
                            {column.displayName}
                          </Label>
                        </div>
                        <Switch
                          id={`collapse-${column.id}`}
                          checked={!config.defaultCollapsed.includes(column.id)}
                          onCheckedChange={(checked) => {
                            const newCollapsed = checked 
                              ? config.defaultCollapsed.filter(id => id !== column.id)
                              : [...config.defaultCollapsed, column.id];
                            form.setValue('defaultCollapsed', newCollapsed);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Configuration</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KanbanConfigDialog;
