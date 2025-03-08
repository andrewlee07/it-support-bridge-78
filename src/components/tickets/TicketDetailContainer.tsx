
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';
import { Tabs } from '@/components/ui/tabs';
import { useTicketDetailState } from './hooks/useTicketDetailState';
import { useRelatedItemCreation } from './hooks/useRelatedItemCreation';
import TicketDetailHeader from './detail/TicketDetailHeader';
import TicketTabs from './detail/TicketTabs';
import TicketTabContent from './detail/TicketTabContent';
import ReopenDialog from './detail/ReopenDialog';

interface TicketDetailContainerProps {
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate?: (data: UpdateTicketValues) => void;
  onClose?: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
  onReopen?: (reason: string) => void;
  onUpdateTicket?: (data: UpdateTicketValues) => void;
  onCloseTicket?: (data: CloseTicketValues) => void;
  onReopenTicket?: (reason: string) => void;
}

const TicketDetailContainer: React.FC<TicketDetailContainerProps> = ({
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
  const {
    activeTab,
    setActiveTab,
    isReopenDialogOpen,
    setIsReopenDialogOpen,
    handleUpdateSubmit,
    handleCloseSubmit,
    handleReopenSubmit
  } = useTicketDetailState();

  const { handleCreateBug, handleCreateBacklogItem } = useRelatedItemCreation({
    ticket,
    onAddNote,
    onUpdate: onUpdate || onUpdateTicket
  });

  // Derived state
  const isServiceRequest = type === 'service';
  const isResolved = ['resolved', 'closed', 'fulfilled'].includes(ticket.status);
  const canReopen = ticket.status === (isServiceRequest ? 'fulfilled' : 'resolved') || ticket.status === 'closed';
  const resolveTabLabel = isServiceRequest ? 'fulfill' : 'resolve';

  const wrapAddNote = (note: string) => {
    if (onAddNote && note.trim()) {
      onAddNote(note);
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
          onUpdate={(data) => handleUpdateSubmit(onUpdate, onUpdateTicket, data)}
          onClose={(data) => handleCloseSubmit(onClose, onCloseTicket, data)}
          onAddNote={wrapAddNote}
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
        onReopen={(data) => handleReopenSubmit(onReopen, onReopenTicket, data)}
        isServiceRequest={isServiceRequest}
      />
    </div>
  );
};

export default TicketDetailContainer;
