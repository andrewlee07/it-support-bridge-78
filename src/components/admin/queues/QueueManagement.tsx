
import React, { useState } from 'react';
import { useQueueManagement } from '@/hooks/useQueueManagement';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import QueueDialog from './QueueDialog';
import QueueList from './QueueList';

export const QueueManagement = () => {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Queue Management</h1>
        <Button onClick={handleAddQueue} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Queue
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Queues</CardTitle>
        </CardHeader>
        <CardContent>
          <QueueList 
            queues={queues}
            onEdit={handleEditQueue}
            onDelete={handleDeleteQueue}
          />
        </CardContent>
      </Card>
      
      {dialogOpen && (
        <QueueDialog
          open={dialogOpen}
          onOpenChange={handleCloseDialog}
          onSubmit={handleSubmitQueue}
          queue={editingQueue}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default QueueManagement;
