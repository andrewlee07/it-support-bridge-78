
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { KanbanBoardConfig, sprintColumnsConfig } from '@/utils/types/kanbanTypes';
import { useKanbanConfig } from './config/useKanbanConfig';
import BoardLayoutSection from './config/BoardLayoutSection';
import ColumnsSection from './config/ColumnsSection';
import { toast } from 'sonner';
import { ViewDimension } from '@/hooks/backlog/kanban/types';

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
  const {
    config,
    handleAddColumn,
    handleRemoveColumn,
    handleMoveColumn,
    handleToggleVisibility,
    handleUpdateColumnName,
    handleLayoutChange,
    handleViewTypeChange,
    getFinalConfig
  } = useKanbanConfig(currentConfig);

  const handleSubmit = () => {
    onSave(getFinalConfig());
    toast.success("Board configuration updated");
  };

  const handleSwitchToSprints = (viewType: ViewDimension) => {
    handleViewTypeChange(viewType);
    
    // If switching to sprints and there are no sprint columns yet, add them
    if (viewType === 'sprint' && !config.columns.some(col => col.statusValue.startsWith('sprint'))) {
      // Add sprint columns
      toast.info("Setting up sprint view");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Kanban Board Configuration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <BoardLayoutSection 
            layout={config.layout}
            viewType={config.viewType}
            onLayoutChange={handleLayoutChange}
            onViewTypeChange={handleSwitchToSprints}
          />

          <ColumnsSection 
            columns={config.columns}
            defaultCollapsed={config.defaultCollapsed}
            onAddColumn={handleAddColumn}
            onRemoveColumn={handleRemoveColumn}
            onMoveColumn={handleMoveColumn}
            onToggleVisibility={handleToggleVisibility}
            onUpdateColumnName={handleUpdateColumnName}
          />

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
