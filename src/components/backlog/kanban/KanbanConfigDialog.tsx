
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus,
  LayoutGrid,
  LayoutRow
} from 'lucide-react';
import { KanbanBoardConfig, KanbanColumnConfig } from '@/utils/types/kanbanTypes';
import { v4 as uuidv4 } from 'uuid';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface KanbanConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: KanbanBoardConfig;
  onSave: (config: KanbanBoardConfig) => void;
}

const KanbanConfigDialog: React.FC<KanbanConfigDialogProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSave,
}) => {
  const [config, setConfig] = useState<KanbanBoardConfig>(currentConfig);
  const [newColumnName, setNewColumnName] = useState('');
  const [newStatusValue, setNewStatusValue] = useState('');

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setConfig(currentConfig);
      setNewColumnName('');
      setNewStatusValue('');
    }
  }, [isOpen, currentConfig]);

  const handleSave = () => {
    onSave(config);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const newColumns = [...config.columns];
    const currentOrder = newColumns[index].order;
    const prevOrder = newColumns[index - 1].order;
    
    newColumns[index].order = prevOrder;
    newColumns[index - 1].order = currentOrder;
    
    setConfig({
      ...config,
      columns: newColumns.sort((a, b) => a.order - b.order)
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === config.columns.length - 1) return;
    
    const newColumns = [...config.columns];
    const currentOrder = newColumns[index].order;
    const nextOrder = newColumns[index + 1].order;
    
    newColumns[index].order = nextOrder;
    newColumns[index + 1].order = currentOrder;
    
    setConfig({
      ...config,
      columns: newColumns.sort((a, b) => a.order - b.order)
    });
  };

  const handleUpdateColumnName = (index: number, name: string) => {
    const newColumns = [...config.columns];
    newColumns[index].displayName = name;
    setConfig({
      ...config,
      columns: newColumns
    });
  };

  const handleDeleteColumn = (index: number) => {
    const newColumns = [...config.columns];
    newColumns.splice(index, 1);
    
    // Reorder remaining columns
    newColumns.forEach((col, idx) => {
      col.order = idx + 1;
    });
    
    setConfig({
      ...config,
      columns: newColumns
    });
  };

  const handleAddColumn = () => {
    if (!newColumnName || !newStatusValue) return;
    
    const newColumn: KanbanColumnConfig = {
      id: uuidv4(),
      displayName: newColumnName,
      statusValue: newStatusValue,
      order: config.columns.length + 1,
      color: `bg-gray-50 dark:bg-gray-950` // default color
    };
    
    setConfig({
      ...config,
      columns: [...config.columns, newColumn].sort((a, b) => a.order - b.order)
    });
    
    setNewColumnName('');
    setNewStatusValue('');
  };

  const handleLayoutChange = (layout: 'horizontal' | 'grid') => {
    setConfig({
      ...config,
      layout
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Kanban Board</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div className="space-y-2">
            <Label>Board Layout</Label>
            <RadioGroup 
              value={config.layout} 
              onValueChange={(val: 'horizontal' | 'grid') => handleLayoutChange(val)}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizontal" id="layout-horizontal" />
                <Label htmlFor="layout-horizontal" className="flex items-center">
                  <LayoutRow className="h-4 w-4 mr-2" />
                  Horizontal (Like screenshot)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grid" id="layout-grid" />
                <Label htmlFor="layout-grid" className="flex items-center">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Grid Layout
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Columns</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Display Name</TableHead>
                  <TableHead>Status Value</TableHead>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {config.columns.map((column, index) => (
                  <TableRow key={column.id}>
                    <TableCell>
                      <Input 
                        value={column.displayName} 
                        onChange={(e) => handleUpdateColumnName(index, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>{column.statusValue}</TableCell>
                    <TableCell>{column.order}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleMoveDown(index)}
                          disabled={index === config.columns.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteColumn(index)}
                          disabled={config.columns.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Label>Add New Column</Label>
            <div className="flex space-x-2">
              <Input 
                placeholder="Display Name" 
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="flex-1"
              />
              <Input 
                placeholder="Status Value" 
                value={newStatusValue}
                onChange={(e) => setNewStatusValue(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAddColumn}
                disabled={!newColumnName || !newStatusValue}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KanbanConfigDialog;
