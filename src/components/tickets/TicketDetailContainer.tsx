
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TicketDetailViewProps 
} from './TicketDetailView';
import TicketTabContent from './detail/TicketTabContent';
import ReopenDialog from './detail/ReopenDialog';
import TicketDetailHeader from './detail/TicketDetailHeader';
import NoteTab from './detail/NoteTab';
import CreateTaskTab from './detail/CreateTaskTab';
import { Megaphone } from 'lucide-react';
import CreateAnnouncementFromIncidentDialog from '@/components/announcements/CreateAnnouncementFromIncidentDialog';

const TicketDetailContainer: React.FC<TicketDetailViewProps> = ({
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
  // For backward compatibility
  const handleUpdate = onUpdate || onUpdateTicket;
  const handleClose = onClose || onCloseTicket;
  const handleReopen = onReopen || onReopenTicket;
  
  const [reopenDialogOpen, setReopenDialogOpen] = useState(false);
  const [createAnnouncementDialogOpen, setCreateAnnouncementDialogOpen] = useState(false);
  
  const handleReopenClick = () => {
    setReopenDialogOpen(true);
  };
  
  const handleReopenConfirm = (reason: string) => {
    if (handleReopen) {
      handleReopen(reason);
    }
    setReopenDialogOpen(false);
  };

  const isIncident = type === 'incident';
  
  return (
    <div className="space-y-6">
      <TicketDetailHeader 
        ticket={ticket}
        type={type}
        onReopenClick={handleReopenClick}
      />
      
      {isIncident && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setCreateAnnouncementDialogOpen(true)}
          >
            <Megaphone className="mr-2 h-4 w-4" />
            Create Announcement
          </Button>
        </div>
      )}
      
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="create-task">Create Task</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <TicketTabContent 
            ticket={ticket}
            type={type}
            onUpdate={handleUpdate}
            onClose={handleClose}
          />
        </TabsContent>
        <TabsContent value="notes">
          <NoteTab 
            ticketId={ticket.id} 
            notes={ticket.notes || []} 
            onAddNote={onAddNote} 
          />
        </TabsContent>
        <TabsContent value="create-task">
          <CreateTaskTab ticket={ticket} />
        </TabsContent>
      </Tabs>
      
      {/* Reopen Dialog */}
      <ReopenDialog
        open={reopenDialogOpen}
        onOpenChange={setReopenDialogOpen}
        onConfirm={handleReopenConfirm}
      />
      
      {/* Create Announcement Dialog */}
      {isIncident && (
        <CreateAnnouncementFromIncidentDialog
          open={createAnnouncementDialogOpen}
          onOpenChange={setCreateAnnouncementDialogOpen}
          incident={ticket}
          onSuccess={() => {
            // Optionally add a note to the ticket about the announcement
            if (onAddNote) {
              onAddNote("Created a public announcement based on this incident.");
            }
          }}
        />
      )}
    </div>
  );
};

export default TicketDetailContainer;
