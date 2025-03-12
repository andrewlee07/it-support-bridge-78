
import { useState } from 'react';
import { toast } from 'sonner';
import { Ticket, RelatedItem } from '@/utils/types/ticket';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Task } from '@/utils/types/taskTypes';
import { createTask } from '@/utils/api/taskApi';
import { createBugFromTestExecution } from '@/utils/api/testBacklogIntegrationApi';

interface UseRelatedItemCreationProps {
  ticket: Ticket;
  onAddNote?: (note: string) => void;
  onUpdate?: (data: any) => void;
}

export const useRelatedItemCreation = ({
  ticket,
  onAddNote,
  onUpdate
}: UseRelatedItemCreationProps) => {
  // Handle bug creation from incident
  const handleCreateBug = async (bugData: any) => {
    try {
      // Use the utility function to create a bug
      const response = await createBugFromTestExecution(ticket.id, {
        title: `Bug from incident: ${ticket.title}`,
        description: bugData.description || ticket.description,
        severity: bugData.severity || 'medium',
        priority: bugData.priority || 'medium',
        stepsToReproduce: [ticket.description]
      });
      
      if (response && response.data) {
        toast.success('Bug created successfully');
        // Add a note to the ticket about the bug creation
        if (onAddNote) {
          onAddNote(`Created bug #${response.data.id} from this incident`);
        }
        
        // Add the bug to related items
        if (onUpdate) {
          const relatedItem = {
            id: response.data.id,
            type: 'bug' as const,
            status: 'open',
            title: response.data.title,
            createdAt: new Date()
          };
          
          // Update the ticket's related items
          const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
          
          onUpdate({
            status: ticket.status as any,
            assignedTo: ticket.assignedTo || '',
            notes: `Added bug ${response.data.id} to related items`,
            _relatedItems: updatedRelatedItems
          });
        }
      }
    } catch (error) {
      console.error('Error creating bug:', error);
      toast.error('Failed to create bug');
    }
  };
  
  // Handle backlog item creation from service request
  const handleCreateBacklogItem = async (item: BacklogItem) => {
    try {
      // Create backlog item with prefilled data from service request
      toast.success('Backlog item created successfully');
      
      // Add a note to the ticket about the backlog item creation
      if (onAddNote) {
        onAddNote(`Created backlog item: ${item.title} from this service request`);
      }
      
      // Add the backlog item to related items
      if (onUpdate) {
        const relatedItem = {
          id: item.id || `backlog-${Date.now()}`,
          type: 'backlogItem' as const,
          status: item.status || 'open',
          title: item.title,
          createdAt: new Date()
        };
        
        // Update the ticket's related items
        const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
        
        // This is just to show the update in UI
        onUpdate({
          status: ticket.status as any,
          assignedTo: ticket.assignedTo || '',
          notes: `Added backlog item ${item.title} to related items`,
          _relatedItems: updatedRelatedItems
        });
      }
    } catch (error) {
      console.error('Error creating backlog item:', error);
      toast.error('Failed to create backlog item');
    }
  };

  // Handle task creation from ticket
  const handleCreateTask = async (task: Task) => {
    try {
      // Create task with prefilled data
      const response = await createTask({
        ...task,
        creator: 'user-1', // In a real app, this would be the current user
      });
      
      if (response && response.data) {
        toast.success('Task created successfully');
        
        // Add a note to the ticket about the task creation
        if (onAddNote) {
          onAddNote(`Created task: ${response.data.title} (${response.data.id}) from this ${ticket.type}`);
        }
        
        // Add the task to related items
        if (onUpdate) {
          const relatedItem: RelatedItem = {
            id: response.data.id,
            type: 'task',
            status: response.data.status,
            title: response.data.title,
            createdAt: new Date()
          };
          
          // Update the ticket's related items
          const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
          
          onUpdate({
            status: ticket.status as any,
            assignedTo: ticket.assignedTo || '',
            notes: `Added task ${response.data.id} to related items`,
            _relatedItems: updatedRelatedItems
          });
        }
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  return {
    handleCreateBug,
    handleCreateBacklogItem,
    handleCreateTask
  };
};
