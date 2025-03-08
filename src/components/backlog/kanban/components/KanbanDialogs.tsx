
import React from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';
import KanbanConfigDialog from '../KanbanConfigDialog';
import { KanbanBoardConfig } from '@/utils/types/kanbanTypes';

interface KanbanDialogsProps {
  editingItem: BacklogItem | null;
  setEditingItem: React.Dispatch<React.SetStateAction<BacklogItem | null>>;
  newItemDialogOpen: boolean;
  setNewItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  configOpen: boolean;
  setConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardConfig: KanbanBoardConfig;
  updateBoardConfig: (newConfig: KanbanBoardConfig) => void;
  onFormSuccess: () => void;
  onFormCancel: () => void;
}

const KanbanDialogs: React.FC<KanbanDialogsProps> = ({
  editingItem,
  setEditingItem,
  newItemDialogOpen,
  setNewItemDialogOpen,
  configOpen,
  setConfigOpen,
  boardConfig,
  updateBoardConfig,
  onFormSuccess,
  onFormCancel
}) => {
  return (
    <>
      <KanbanConfigDialog
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        currentConfig={boardConfig}
        onSave={updateBoardConfig}
      />

      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Backlog Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <BacklogItemForm
              initialData={editingItem}
              onSuccess={onFormSuccess}
              onCancel={onFormCancel}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Backlog Item</DialogTitle>
          </DialogHeader>
          <BacklogItemForm
            onSuccess={onFormSuccess}
            onCancel={onFormCancel}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KanbanDialogs;
