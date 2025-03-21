import { useState } from 'react';
import { Queue, AutoAssignRule, QueueNotificationSettings, BusinessHours } from '@/utils/types/group';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { TicketType } from '@/utils/types/ticket';

interface QueueFormValues {
  name: string;
  description?: string;
  groupId: string;
  ticketTypes: TicketType[];
  defaultAssignee?: string;
  isDefault?: boolean;
  capacity?: number;
  autoAssignRules?: AutoAssignRule[];
  notificationSettings?: QueueNotificationSettings;
  businessHours?: BusinessHours;
}

export function useQueueManagement() {
  // State for queues
  const [queues, setQueues] = useState<Queue[]>([
    {
      id: 'q1',
      name: 'General Support',
      description: 'General IT support requests',
      filterCriteria: {
        ticketTypes: ['incident', 'service'] as TicketType[],
        priorities: ['low', 'medium']
      },
      groupId: 'g1',
      isDefault: true,
      capacity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  // State for queue dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQueue, setEditingQueue] = useState<Queue | null>(null);

  // Open dialog for creating a new queue
  const handleAddQueue = () => {
    setEditingQueue(null);
    setDialogOpen(true);
  };

  // Open dialog for editing an existing queue
  const handleEditQueue = (queue: Queue) => {
    setEditingQueue(queue);
    setDialogOpen(true);
  };

  // Handle dialog submission
  const handleSubmitQueue = (values: QueueFormValues) => {
    const queueValues = {
      name: values.name, // Make sure name is required in the form
      description: values.description || '',
      groupId: values.groupId,
      ticketTypes: values.ticketTypes,
      defaultAssignee: values.defaultAssignee,
      isDefault: values.isDefault,
      capacity: values.capacity,
      autoAssignRules: values.autoAssignRules,
      notificationSettings: values.notificationSettings,
      businessHours: values.businessHours,
    };
    
    if (editingQueue) {
      // Update existing queue
      const updatedQueues = queues.map(queue => 
        queue.id === editingQueue.id
          ? {
              ...queue,
              name: values.name,
              description: values.description || '',
              filterCriteria: {
                ...queue.filterCriteria,
                ticketTypes: values.ticketTypes
              },
              groupId: values.groupId,
              defaultAssignee: values.defaultAssignee,
              isDefault: values.isDefault,
              capacity: values.capacity,
              autoAssignRules: values.autoAssignRules,
              notificationSettings: values.notificationSettings,
              businessHours: values.businessHours,
              updatedAt: new Date()
            }
          : queue
      );
      
      setQueues(updatedQueues);
      toast.success("Queue updated successfully");
    } else {
      // Create new queue
      const newQueue: Queue = {
        id: uuidv4(),
        name: values.name,
        description: values.description || '',
        filterCriteria: {
          ticketTypes: values.ticketTypes,
          priorities: []
        },
        groupId: values.groupId,
        defaultAssignee: values.defaultAssignee,
        isDefault: values.isDefault,
        capacity: values.capacity,
        autoAssignRules: values.autoAssignRules,
        notificationSettings: values.notificationSettings,
        businessHours: values.businessHours,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setQueues([...queues, newQueue]);
      toast.success("Queue created successfully");
    }
    
    setDialogOpen(false);
  };

  // Handle queue deletion
  const handleDeleteQueue = (queueId: string) => {
    // Remove the queue with the specified ID
    setQueues(queues.filter(queue => queue.id !== queueId));
    toast.success("Queue deleted successfully");
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingQueue(null);
  };

  return {
    queues,
    dialogOpen,
    editingQueue,
    handleAddQueue,
    handleEditQueue,
    handleDeleteQueue,
    handleSubmitQueue,
    handleCloseDialog,
    isEditing: !!editingQueue
  };
}
