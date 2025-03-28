
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TicketDetailViewProps 
} from './TicketDetailView';
import TicketTabContent from './TicketTabContent';
import ReopenDialog from './ReopenDialog';
import TicketDetailHeader from './TicketDetailHeader';
import NoteTab from './NoteTab';
import CreateTaskTab from './CreateTaskTab';
import { Megaphone } from 'lucide-react';
import CreateAnnouncementFromIncidentDialog from '@/components/announcements/CreateAnnouncementFromIncidentDialog';
import TicketTabs from './TicketTabs';

// We need to make the TicketDetailContainer compatible with the interfaces used by the imported components
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
  const [activeTab, setActiveTab] = useState('details');
  
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
  const isResolved = ['closed', 'resolved', 'fulfilled'].includes(ticket.status);
  const isServiceRequest = type === 'service';

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="space-y-6">
      <TicketDetailHeader 
        ticket={ticket}
        isServiceRequest={isServiceRequest}
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
      
      <Tabs defaultValue="details" onValueChange={handleTabChange} className="w-full">
        <TicketTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isResolved={isResolved}
          isServiceRequest={isServiceRequest}
        />
        
        <TicketTabContent 
          ticket={ticket}
          activeTab={activeTab}
          type={type}
          onUpdate={handleUpdate}
          onClose={handleClose}
          onAddNote={onAddNote || (() => {})}
          onDetailsTabReopen={handleReopenClick}
          onTabChange={handleTabChange}
        />
      </Tabs>
      
      {/* Reopen Dialog */}
      <ReopenDialog
        isOpen={reopenDialogOpen}
        onOpenChange={setReopenDialogOpen}
        onConfirm={handleReopenConfirm}
        isServiceRequest={isServiceRequest}
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
