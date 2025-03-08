
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Ticket } from '@/utils/types/ticket';
import TicketDetails from '../TicketDetails';
import ActivityHistory from '../ActivityHistory';
import TicketUpdateForm, { UpdateTicketValues } from '../TicketUpdateForm';
import TicketCloseForm, { CloseTicketValues } from '../TicketCloseForm';
import NoteTab from './NoteTab';
import BugCreationForm from '@/components/test-management/forms/BugCreationForm';
import BacklogItemForm from '@/components/backlog/BacklogItemForm';
import { Bug } from '@/utils/types/test';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface TicketTabContentProps {
  activeTab: string;
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate: (data: UpdateTicketValues) => void;
  onClose: (data: CloseTicketValues) => void;
  onAddNote: (note: string) => void;
  onDetailsTabReopen: () => void;
  onTabChange: (value: string) => void;
  onCreateBug?: (data: any) => void;
  onCreateBacklogItem?: (data: BacklogItem) => void;
}

const TicketTabContent: React.FC<TicketTabContentProps> = ({
  activeTab,
  ticket,
  type,
  onUpdate,
  onClose,
  onAddNote,
  onDetailsTabReopen,
  onTabChange,
  onCreateBug,
  onCreateBacklogItem
}) => {
  const isServiceRequest = type === 'service';
  const resolveTabLabel = isServiceRequest ? 'fulfill' : 'resolve';
  
  // Function to handle bug creation from incident
  const handleBugSubmit = (values: any) => {
    if (onCreateBug) {
      onCreateBug(values);
      onTabChange('details');
    }
  };
  
  // Function to handle backlog item creation from service request
  const handleBacklogItemSubmit = (item: BacklogItem) => {
    if (onCreateBacklogItem) {
      onCreateBacklogItem(item);
      onTabChange('details');
    }
  };

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

      {/* Create Bug Tab (for Incidents) */}
      {!isServiceRequest && (
        <TabsContent value="create-bug" className="h-full">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Create Bug from Incident</h2>
            <p className="text-muted-foreground">
              Create a new bug based on this incident. The incident details will be used to pre-populate the bug form.
            </p>
            <BugCreationForm 
              testCase={{
                id: ticket.id,
                title: ticket.title
              } as any}
              onSubmit={handleBugSubmit}
              onCancel={() => onTabChange('details')}
              isSubmitting={false}
            />
          </div>
        </TabsContent>
      )}

      {/* Create Backlog Item Tab (for Service Requests) */}
      {isServiceRequest && (
        <TabsContent value="create-backlog" className="h-full">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Create Backlog Item from Service Request</h2>
            <p className="text-muted-foreground">
              Create a new backlog item based on this service request. The request details will be used to pre-populate the form.
            </p>
            <BacklogItemForm 
              initialData={{
                title: `Implement: ${ticket.title}`,
                description: ticket.description,
                priority: 'medium',
                status: 'open',
                type: 'feature'
              } as any}
              onSuccess={handleBacklogItemSubmit}
              onCancel={() => onTabChange('details')}
            />
          </div>
        </TabsContent>
      )}
    </div>
  );
};

export default TicketTabContent;
