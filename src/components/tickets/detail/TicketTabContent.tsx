
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
import CreateTaskTab from './CreateTaskTab';
import { Bug } from '@/utils/types/test';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Task } from '@/utils/types/taskTypes';

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
  onCreateTask?: (task: Task) => void;
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
  onCreateBacklogItem,
  onCreateTask
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

  // Function to handle task creation
  const handleTaskCreated = (task: Task) => {
    if (onCreateTask) {
      onCreateTask(task);
      onTabChange('details');
    } else {
      // If no handler provided, still return to details tab
      onTabChange('details');
    }
  };

  return (
    <>
      {/* Details Tab */}
      <TabsContent value="details" className="mt-4">
        <TicketDetails 
          ticket={ticket} 
          type={type} 
          onReopen={onDetailsTabReopen} 
        />
      </TabsContent>
      
      {/* Activity Tab */}
      <TabsContent value="activity" className="mt-4">
        <ActivityHistory auditEntries={ticket.audit} />
      </TabsContent>
      
      {/* Update Tab */}
      <TabsContent value="update" className="mt-4">
        <div className="border p-4 rounded-md bg-muted/30">
          <TicketUpdateForm
            defaultValues={{
              status: ticket.status,
              assignedTo: ticket.assignedTo || '',
              pendingSubStatus: ticket.pendingSubStatus,
              notes: ''
            }}
            onSubmit={onUpdate}
            onCancel={() => onTabChange('details')}
            type={type}
          />
        </div>
      </TabsContent>
      
      {/* Resolve/Fulfill Tab */}
      <TabsContent value={resolveTabLabel} className="mt-4">
        <div className="border p-4 rounded-md bg-muted/30">
          <TicketCloseForm
            defaultValues={{
              status: isServiceRequest ? 'fulfilled' : 'resolved',
              notes: '',
              rootCause: '',
              closureReason: '',
              resolution: '' 
            }}
            onSubmit={onClose}
            onCancel={() => onTabChange('details')}
            type={type}
            relatedItems={ticket.relatedItems}
          />
        </div>
      </TabsContent>
      
      {/* Add Note Tab */}
      <TabsContent value="notes" className="mt-4">
        <div className="border p-4 rounded-md bg-muted/30">
          <NoteTab onAddNote={onAddNote} />
        </div>
      </TabsContent>

      {/* Create Task Tab */}
      <TabsContent value="create-task" className="mt-4">
        <div className="border p-4 rounded-md bg-muted/30">
          <CreateTaskTab 
            ticket={ticket}
            onTaskCreated={handleTaskCreated}
            onCancel={() => onTabChange('details')}
          />
        </div>
      </TabsContent>

      {/* Create Bug Tab (for Incidents) */}
      {!isServiceRequest && (
        <TabsContent value="create-bug" className="mt-4">
          <div className="border p-4 rounded-md bg-muted/30 space-y-4">
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
        <TabsContent value="create-backlog" className="mt-4">
          <div className="border p-4 rounded-md bg-muted/30 space-y-4">
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
    </>
  );
};

export default TicketTabContent;
