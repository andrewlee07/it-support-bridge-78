
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Ticket } from '@/utils/types/ticket';
import TicketDetails from '../TicketDetails';
import ActivityHistory from '../ActivityHistory';
import TicketUpdateForm, { UpdateTicketValues } from '../TicketUpdateForm';
import TicketCloseForm, { CloseTicketValues } from '../TicketCloseForm';
import NoteTab from './NoteTab';

interface TicketTabContentProps {
  activeTab: string;
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate: (data: UpdateTicketValues) => void;
  onClose: (data: CloseTicketValues) => void;
  onAddNote: (note: string) => void;
  onDetailsTabReopen: () => void;
  onTabChange: (value: string) => void;
}

const TicketTabContent: React.FC<TicketTabContentProps> = ({
  activeTab,
  ticket,
  type,
  onUpdate,
  onClose,
  onAddNote,
  onDetailsTabReopen,
  onTabChange
}) => {
  const isServiceRequest = type === 'service';
  const resolveTabLabel = isServiceRequest ? 'fulfill' : 'resolve';

  return (
    <div className="mt-4 h-full overflow-y-auto">
      {/* Details Tab */}
      <TabsContent value="details" className="h-full">
        <TicketDetails 
          ticket={ticket} 
          type={type} 
          onReopen={onDetailsTabReopen} 
        />
      </TabsContent>
      
      {/* Activity Tab */}
      <TabsContent value="activity" className="h-full">
        <ActivityHistory auditEntries={ticket.audit} />
      </TabsContent>
      
      {/* Update Tab */}
      <TabsContent value="update" className="h-full">
        <TicketUpdateForm
          defaultValues={{
            status: ticket.status,
            assignedTo: ticket.assignedTo || '',
            notes: ''
          }}
          onSubmit={onUpdate}
          onCancel={() => onTabChange('details')}
          type={type}
        />
      </TabsContent>
      
      {/* Resolve/Fulfill Tab */}
      <TabsContent value={resolveTabLabel} className="h-full">
        <TicketCloseForm
          defaultValues={{
            status: isServiceRequest ? 'fulfilled' : 'resolved',
            notes: '',
            rootCause: '',
            closureReason: '',
            resolution: '' // Added missing resolution property
          }}
          onSubmit={onClose}
          onCancel={() => onTabChange('details')}
          type={type}
        />
      </TabsContent>
      
      {/* Add Note Tab */}
      <TabsContent value="notes" className="h-full">
        <NoteTab onAddNote={onAddNote} />
      </TabsContent>
    </div>
  );
};

export default TicketTabContent;
