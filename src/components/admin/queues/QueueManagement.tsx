
import React from 'react';
import { Button } from '@/components/ui/button';
import { InboxIcon, Plus } from 'lucide-react';
import QueueTable from './QueueTable';
import QueueDialog, { QueueFormValues } from './QueueDialog';
import { useQueueManagement } from './useQueueManagement';
import { Card } from '@/components/ui/card';

const QueueManagement: React.FC = () => {
  const {
    queues,
    dialogOpen,
    editingQueue,
    handleAddQueue,
    handleEditQueue,
    handleDeleteQueue,
    handleSubmitQueue,
    handleCloseDialog,
    isEditing
  } = useQueueManagement();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <InboxIcon className="h-5 w-5" />
          <h3 className="text-lg font-medium">Queue Management</h3>
        </div>
        <Button onClick={handleAddQueue}>
          <Plus className="h-4 w-4 mr-2" />
          Add Queue
        </Button>
      </div>

      <Card className="p-4">
        <QueueTable 
          queues={queues} 
          onEdit={handleEditQueue} 
          onDelete={handleDeleteQueue} 
        />
      </Card>

      <QueueDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={(values: QueueFormValues) => handleSubmitQueue(values)}
        initialData={editingQueue || undefined}
        isEditing={isEditing}
      />
    </div>
  );
};

export default QueueManagement;
