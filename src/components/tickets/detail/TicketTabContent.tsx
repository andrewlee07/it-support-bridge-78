
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';
import DetailsTab from './DetailsTab';
import TimelineTab from './TimelineTab';
import RelatedItemsTab from './RelatedItemsTab';
import TasksTab from './TasksTab';
import SecurityDetailsCard from './SecurityDetailsCard';

interface TicketTabContentProps {
  ticket: Ticket;
  activeTab: string;
  type: 'incident' | 'service' | 'security';
  onUpdate?: (data: UpdateTicketValues) => void;
  onClose?: (data: CloseTicketValues) => void;
  onAddNote: (note: string) => void;
  onDetailsTabReopen: () => void;
  onTabChange: (value: string) => void;
}

const TicketTabContent: React.FC<TicketTabContentProps> = ({
  ticket,
  activeTab,
  type,
  onUpdate,
  onClose,
  onAddNote,
  onDetailsTabReopen,
  onTabChange,
}) => {
  return (
    <>
      <TabsContent value="details" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DetailsTab
              ticket={ticket}
              type={type}
              onUpdate={onUpdate}
              onClose={onClose}
              onDetailsTabReopen={onDetailsTabReopen}
            />
          </div>
          <div className="space-y-6">
            {/* Show security details card for security cases */}
            {type === 'security' && (
              <SecurityDetailsCard ticket={ticket} />
            )}
            <TimelineTab
              ticket={ticket}
              onAddNote={onAddNote}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="related" className="mt-0">
        <RelatedItemsTab ticket={ticket} />
      </TabsContent>
      
      <TabsContent value="tasks" className="mt-0">
        <TasksTab 
          parentId={ticket.id} 
          parentType={type === 'service' ? 'service-request' : type} 
        />
      </TabsContent>
    </>
  );
};

export default TicketTabContent;
