
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
import { Input } from '@/components/ui/input';
import { 
  SlidersHorizontal, 
  Layout, 
  LayoutGrid, 
  ChevronRight, 
  AlertTriangle,
  Plus,
  X,
  Move
} from 'lucide-react';
import { KanbanBoardConfig, defaultKanbanConfig, KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import { v4 as uuidv4 } from 'uuid';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KanbanConfigDialogProps {
  open: boolean;
  onClose: () => void;
  currentConfig: KanbanBoardConfig;
  onSave: (config: KanbanBoardConfig) => void;
}

const KanbanConfigDialog: React.FC<KanbanConfigDialogProps> = ({
  open,
  onClose,
  currentConfig,
  onSave
}) => {
  const [localConfig, setLocalConfig] = useState<KanbanBoardConfig>(() => ({
    ...currentConfig,
    columns: [...currentConfig.columns].sort((a, b) => a.order - b.order)
  }));
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnStatusValue, setNewColumnStatusValue] = useState('');

  const form = useForm<KanbanBoardConfig>({
    defaultValues: localConfig
  });

  const handleAddColumn = () => {
    if (!newColumnName || !newColumnStatusValue) return;

    const newColumn: KanbanColumnConfig = {
      id: uuidv4(),
      displayName: newColumnName,
      statusValue: newColumnStatusValue,
      order: localConfig.columns.length + 1,
      color: `bg-gray-50 dark:bg-gray-950`
    };

    setLocalConfig(prev => ({
      ...prev,
      columns: [...prev.columns, newColumn]
    }));

    setNewColumnName('');
    setNewColumnStatusValue('');
  };

  const handleRemoveColumn = (columnId: string) => {
    setLocalConfig(prev => ({
      ...prev,
      columns: prev.columns.filter(col => col.id !== columnId),
      defaultCollapsed: prev.defaultCollapsed.filter(id => id !== columnId)
    }));
  };

  const handleMoveColumn = (columnId: string, direction: 'up' | 'down') => {
    const columns = [...localConfig.columns];
    const index = columns.findIndex(col => col.id === columnId);
    
    if (direction === 'up' && index > 0) {
      const temp = columns[index - 1].order;
      columns[index - 1].order = columns[index].order;
      columns[index].order = temp;
      
      // Swap the elements in the array too
      [columns[index - 1], columns[index]] = [columns[index], columns[index - 1]];
    } else if (direction === 'down' && index < columns.length - 1) {
      const temp = columns[index + 1].order;
      columns[index + 1].order = columns[index].order;
      columns[index].order = temp;
      
      // Swap the elements in the array too
      [columns[index + 1], columns[index]] = [columns[index], columns[index + 1]];
    }
    
    setLocalConfig(prev => ({
      ...prev,
      columns: columns
    }));
  };

  const handleToggleVisibility = (columnId: string, isVisible: boolean) => {
    setLocalConfig(prev => ({
      ...prev,
      defaultCollapsed: isVisible
        ? prev.defaultCollapsed.filter(id => id !== columnId)
        : [...prev.defaultCollapsed, columnId]
    }));
  };

  const handleSubmit = () => {
    // Re-order columns sequentially
    const orderedColumns = [...localConfig.columns]
      .sort((a, b) => a.order - b.order)
      .map((col, index) => ({
        ...col,
        order: index + 1
      }));

    const updatedConfig = {
      ...localConfig,
      columns: orderedColumns
    };
    
    onSave(updatedConfig);
  };

  const handleLayoutChange = (layout: 'horizontal' | 'grid') => {
    setLocalConfig(prev => ({
      ...prev,
      layout
    }));
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Kanban Board Configuration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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
                      value={localConfig.layout}
                      onValueChange={(value: 'horizontal' | 'grid') => handleLayoutChange(value)}
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Columns / Buckets</CardTitle>
                <CardDescription>
                  Configure and manage your kanban columns
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {localConfig.columns.map((column, index) => (
                    <div key={column.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: column.color.includes('bg-') 
                              ? `var(--${column.color.split('bg-')[1].split(' ')[0]})` 
                              : column.color
                          }}
                        />
                        <div>
                          <p className="font-medium">{column.displayName}</p>
                          <p className="text-xs text-muted-foreground">Status: {column.statusValue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveColumn(column.id, 'up')}
                            disabled={index === 0}
                            className="h-8 w-8"
                          >
                            <Move className="h-4 w-4 rotate-90" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveColumn(column.id, 'down')}
                            disabled={index === localConfig.columns.length - 1}
                            className="h-8 w-8"
                          >
                            <Move className="h-4 w-4 -rotate-90" />
                          </Button>
                        </div>
                        <Switch
                          id={`visibility-${column.id}`}
                          checked={!localConfig.defaultCollapsed.includes(column.id)}
                          onCheckedChange={(checked) => handleToggleVisibility(column.id, checked)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveColumn(column.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-4 border-t pt-4">
                <p className="text-sm font-medium mb-2">Add New Column</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Display Name"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Status Value"
                    value={newColumnStatusValue}
                    onChange={(e) => setNewColumnStatusValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleAddColumn}
                    size="sm"
                    disabled={!newColumnName || !newColumnStatusValue}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Status Value should be a unique identifier (e.g., "in-review")
                </p>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>Save Configuration</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KanbanConfigDialog;
