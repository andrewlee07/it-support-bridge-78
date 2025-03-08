
import React, { useState } from 'react';
import { Ticket } from '@/utils/types/ticket';
import { Tabs } from '@/components/ui/tabs';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';
import TicketDetailHeader from './detail/TicketDetailHeader';
import TicketTabs from './detail/TicketTabs';
import TicketTabContent from './detail/TicketTabContent';
import ReopenDialog, { ReopenFormValues } from './detail/ReopenDialog';

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
