
import { useState } from 'react';
import { toast } from 'sonner';
import { Ticket, RelatedItem } from '@/utils/types/ticket';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Task } from '@/utils/types/taskTypes';
import { createTask } from '@/utils/api/taskApi';
import { createBugFromTicket } from '@/utils/api/bugApi';
import { createBacklogItemFromServiceRequest } from '@/utils/api/backlogApi';
import { createProblemFromIncident } from '@/utils/api/problemApi';

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
  // Handle problem creation from incident
  const handleCreateProblem = async (problemData: any) => {
    try {
      const response = await createProblemFromIncident(ticket.id, {
        title: problemData.title || `Problem from incident: ${ticket.title}`,
        description: problemData.description || ticket.description,
        priority: problemData.priority || mapTicketPriorityToProblemPriority(ticket.priority),
        category: problemData.category || ticket.category
      });
      
      if (response && response.data) {
        toast.success('Problem created successfully');
        
        if (onAddNote) {
          onAddNote(`Created problem #${response.data.id} from this incident`);
        }
        
        if (onUpdate) {
          const relatedItem: RelatedItem = {
            id: response.data.id,
            type: 'problem',
            status: 'new',
            title: response.data.title,
            createdAt: new Date()
          };
          
          const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
          
          onUpdate({
            status: ticket.status,
            assignedTo: ticket.assignedTo || '',
            notes: `Added problem ${response.data.id} to related items`,
            _relatedItems: updatedRelatedItems
          });
        }
      }
    } catch (error) {
      console.error('Error creating problem:', error);
      toast.error('Failed to create problem');
    }
  };

  // Handle bug creation from incident
  const handleCreateBug = async (bugData: any) => {
    try {
      const response = await createBugFromTicket(ticket.id, {
        title: `Bug from ${ticket.type}: ${ticket.title}`,
        description: bugData.description || ticket.description,
        severity: bugData.severity || 'medium',
        priority: bugData.priority || 'medium',
        stepsToReproduce: [ticket.description]
      });
      
      if (response && response.data) {
        toast.success('Bug created successfully');
        
        if (onAddNote) {
          onAddNote(`Created bug #${response.data.id} from this ${ticket.type}`);
        }
        
        if (onUpdate) {
          const relatedItem: RelatedItem = {
            id: response.data.id,
            type: 'bug',
            status: 'open',
            title: response.data.title,
            createdAt: new Date()
          };
          
          const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
          
          onUpdate({
            status: ticket.status,
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
      const response = await createBacklogItemFromServiceRequest(ticket.id, {
        title: item.title || `Implement: ${ticket.title}`,
        description: item.description || ticket.description,
        priority: item.priority || 'medium',
        type: item.type || 'feature'
      });
      
      if (response && response.data) {
        toast.success('Backlog item created successfully');
        
        if (onAddNote) {
          onAddNote(`Created backlog item: ${response.data.title} from this service request`);
        }
        
        if (onUpdate) {
          const relatedItem: RelatedItem = {
            id: response.data.id,
            type: 'backlogItem',
            status: response.data.status || 'open',
            title: response.data.title,
            createdAt: new Date()
          };
          
          const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
          
          onUpdate({
            status: ticket.status,
            assignedTo: ticket.assignedTo || '',
            notes: `Added backlog item ${response.data.title} to related items`,
            _relatedItems: updatedRelatedItems
          });
        }
      }
    } catch (error) {
      console.error('Error creating backlog item:', error);
      toast.error('Failed to create backlog item');
    }
  };

  // Handle task creation from ticket
  const handleCreateTask = async (task: Task) => {
    try {
      const response = await createTask({
        ...task,
        description: task.description || '', 
        creator: 'user-1', // In a real app, this would be the current user
      });
      
      if (response && response.data) {
        toast.success('Task created successfully');
        
        if (onAddNote) {
          onAddNote(`Created task: ${response.data.title} (${response.data.id}) from this ${ticket.type}`);
        }
        
        if (onUpdate) {
          const relatedItem: RelatedItem = {
            id: response.data.id,
            type: 'task',
            status: response.data.status,
            title: response.data.title,
            createdAt: new Date()
          };
          
          const updatedRelatedItems = [...(ticket.relatedItems || []), relatedItem];
          
          onUpdate({
            status: ticket.status,
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
    handleCreateProblem,
    handleCreateBug,
    handleCreateBacklogItem,
    handleCreateTask
  };
};

// Helper function to map ticket priority to problem priority
function mapTicketPriorityToProblemPriority(ticketPriority: string): "P1" | "P2" | "P3" {
  switch (ticketPriority) {
    case 'high':
    case 'P1':
      return 'P1';
    case 'medium':
    case 'P2':
      return 'P2';
    case 'low':
    case 'P3':
    case 'P4':
    default:
      return 'P3';
  }
}

export default useRelatedItemCreation;
