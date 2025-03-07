
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BacklogItemDetail from '@/components/backlog/BacklogItemDetail';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';
import BacklogItemSelectionDialog from '@/components/backlog/BacklogItemSelectionDialog';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface ReleaseDetailDialogsProps {
  releaseId: string;
  showAddItems: boolean;
  setShowAddItems: (show: boolean) => void;
  selectedBacklogItem: BacklogItem | null;
  setSelectedBacklogItem: (item: BacklogItem | null) => void;
  editingBacklogItem: BacklogItem | null;
  setEditingBacklogItem: (item: BacklogItem | null) => void;
  onSelectItems: (items: BacklogItem[]) => Promise<void>;
  onEditBacklogItem: (item: BacklogItem) => void;
  onBacklogItemUpdated: () => void;
}

const ReleaseDetailDialogs: React.FC<ReleaseDetailDialogsProps> = ({
  releaseId,
  showAddItems,
  setShowAddItems,
  selectedBacklogItem,
  setSelectedBacklogItem,
  editingBacklogItem,
  setEditingBacklogItem,
  onSelectItems,
  onEditBacklogItem,
  onBacklogItemUpdated
}) => {
  return (
    <>
      <BacklogItemSelectionDialog
        open={showAddItems}
        onOpenChange={setShowAddItems}
        onSelectItems={onSelectItems}
        releaseId={releaseId}
      />
      
      <Dialog 
        open={!!selectedBacklogItem} 
        onOpenChange={(open) => !open && setSelectedBacklogItem(null)}
      >
        <DialogContent className="sm:max-w-3xl">
          {selectedBacklogItem && (
            <BacklogItemDetail 
              item={selectedBacklogItem} 
              onEdit={onEditBacklogItem}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog 
        open={!!editingBacklogItem} 
        onOpenChange={(open) => !open && setEditingBacklogItem(null)}
      >
        <DialogContent className="sm:max-w-3xl">
          {editingBacklogItem && (
            <BacklogItemForm
              initialData={editingBacklogItem}
              onSuccess={onBacklogItemUpdated}
              onCancel={() => setEditingBacklogItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReleaseDetailDialogs;
