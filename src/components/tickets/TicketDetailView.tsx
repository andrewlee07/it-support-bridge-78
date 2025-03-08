
import React, { useState } from 'react';
import { Ticket } from '@/utils/types/ticket';
import { Tabs } from '@/components/ui/tabs';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';
import TicketDetailHeader from './detail/TicketDetailHeader';
import TicketTabs from './detail/TicketTabs';
import TicketTabContent from './detail/TicketTabContent';
import ReopenDialog, { ReopenFormValues } from './detail/ReopenDialog';
import { toast } from 'sonner';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { createBugFromTestExecution, createBacklogItemFromBug } from '@/utils/api/testBacklogIntegrationApi';

export interface TicketDetailViewProps {
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate?: (data: UpdateTicketValues) => void;
  onClose?: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
  onReopen?: (reason: string) => void;
  // For backward compatibility with existing components
  onUpdateTicket?: (data: UpdateTicketValues) => void;
  onCloseTicket?: (data: CloseTicketValues) => void;
  onReopenTicket?: (reason: string) => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticket,
  type,
  onUpdate,
  onClose,
  onAddNote,
  onReopen,
  onUpdateTicket,
  onCloseTicket,
  onReopenTicket
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);

  // Service request specific states
  const isServiceRequest = type === 'service';
  const isResolved = ['resolved', 'closed', 'fulfilled'].includes(ticket.status);
  const canReopen = ticket.status === (isServiceRequest ? 'fulfilled' : 'resolved') || ticket.status === 'closed';
  const resolveTabLabel = isServiceRequest ? 'fulfill' : 'resolve';

  // Use either the new or old prop handlers
  const handleUpdateSubmit = (data: UpdateTicketValues) => {
    if (onUpdate) onUpdate(data);
    if (onUpdateTicket) onUpdateTicket(data);
    setActiveTab('details');
  };

  const handleCloseSubmit = (data: CloseTicketValues) => {
    if (onClose) onClose(data);
    if (onCloseTicket) onCloseTicket(data);
    setActiveTab('details');
  };

  const handleAddNote = (note: string) => {
    if (onAddNote && note.trim()) {
      onAddNote(note);
    }
  };

  const handleReopenSubmit = (data: ReopenFormValues) => {
    if (onReopen) onReopen(data.reason);
    if (onReopenTicket) onReopenTicket(data.reason);
    setIsReopenDialogOpen(false);
  };

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
        // In a real implementation, this would be handled by the backend
        // Here we're just simulating the update to show the concept
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
          
          // This is just to show the update in UI, in a real implementation
          // this would be stored in the database
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

  return (
    <div className="space-y-6 h-full">
      <TicketDetailHeader 
        ticket={ticket}
        isServiceRequest={isServiceRequest}
        canReopen={canReopen}
        isResolved={isResolved}
        onReopen={() => setIsReopenDialogOpen(true)}
        onResolve={() => setActiveTab(resolveTabLabel)}
      />
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-150px)]">
        <TicketTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isResolved={isResolved}
          isServiceRequest={isServiceRequest}
        />
        
        {/* Tab Contents */}
        <TicketTabContent 
          activeTab={activeTab}
          ticket={ticket}
          type={type}
          onUpdate={handleUpdateSubmit}
          onClose={handleCloseSubmit}
          onAddNote={handleAddNote}
          onDetailsTabReopen={() => setIsReopenDialogOpen(true)}
          onTabChange={setActiveTab}
          onCreateBug={handleCreateBug}
          onCreateBacklogItem={handleCreateBacklogItem}
        />
      </Tabs>

      {/* Reopen Dialog */}
      <ReopenDialog 
        isOpen={isReopenDialogOpen} 
        onOpenChange={setIsReopenDialogOpen}
        onReopen={handleReopenSubmit}
        isServiceRequest={isServiceRequest}
      />
    </div>
  );
};

export default TicketDetailView;
