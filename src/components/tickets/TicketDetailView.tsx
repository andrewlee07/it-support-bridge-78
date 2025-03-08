
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@/utils/types/ticket';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserPlus, CheckCircle2, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketDetails from './TicketDetails';
import ActivityHistory from './ActivityHistory';
import TicketUpdateForm, { UpdateTicketValues } from './TicketUpdateForm';
import TicketCloseForm, { CloseTicketValues } from './TicketCloseForm';

interface TicketDetailViewProps {
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate: (data: UpdateTicketValues) => void;
  onClose: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
  onReopen?: () => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticket,
  type,
  onUpdate,
  onClose,
  onAddNote,
  onReopen
}) => {
  const [note, setNote] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const handleUpdateSubmit = (data: UpdateTicketValues) => {
    onUpdate(data);
    setActiveTab('details');
  };

  const handleCloseSubmit = (data: CloseTicketValues) => {
    onClose(data);
    setActiveTab('details');
  };

  const handleAddNote = () => {
    if (onAddNote && note.trim()) {
      onAddNote(note);
      setNote('');
    }
  };

  // Service request specific states
  const isServiceRequest = type === 'service';
  const isResolved = ['resolved', 'closed', 'fulfilled'].includes(ticket.status);
  const canReopen = ticket.status === (isServiceRequest ? 'fulfilled' : 'resolved');
  const resolveTabLabel = isServiceRequest ? 'fulfill' : 'resolve';
  const resolveButtonLabel = isServiceRequest ? 'Fulfill Request' : 'Resolve';

  return (
    <div className="space-y-6 h-full">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{ticket.title}</DialogTitle>
        <p className="text-sm text-muted-foreground">{ticket.id}</p>
      </DialogHeader>
      
      {/* Ticket Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{ticket.title}</h2>
            <p className="text-sm text-muted-foreground">{ticket.id}</p>
          </div>
          {!isResolved && (
            <Button 
              variant="destructive" 
              onClick={() => setActiveTab(resolveTabLabel)}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {isServiceRequest ? 'Fulfill' : 'Resolve'}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-150px)]">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          {!isResolved && (
            <>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value={resolveTabLabel}>{isServiceRequest ? 'Fulfill' : 'Resolve'}</TabsTrigger>
              <TabsTrigger value="notes">Add Note</TabsTrigger>
            </>
          )}
        </TabsList>
        
        {/* Tab Contents with fixed height */}
        <div className="mt-4 h-full overflow-y-auto">
          {/* Details Tab */}
          <TabsContent value="details" className="h-full">
            <TicketDetails 
              ticket={ticket} 
              type={type} 
              onReopen={canReopen ? onReopen : undefined} 
            />
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity" className="h-full">
            <ActivityHistory auditEntries={ticket.audit} />
          </TabsContent>
          
          {/* Update Tab */}
          {!isResolved && (
            <>
              <TabsContent value="update" className="h-full">
                <TicketUpdateForm
                  defaultValues={{
                    status: ticket.status,
                    assignedTo: ticket.assignedTo || '',
                    notes: ''
                  }}
                  onSubmit={handleUpdateSubmit}
                  onCancel={() => setActiveTab('details')}
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
                    closureReason: ''
                  }}
                  onSubmit={handleCloseSubmit}
                  onCancel={() => setActiveTab('details')}
                  type={type}
                />
              </TabsContent>
              
              {/* Add Note Tab */}
              <TabsContent value="notes" className="h-full">
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Add Note</h3>
                  <Textarea 
                    placeholder="Add a note to this ticket..." 
                    className="min-h-[200px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddNote}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default TicketDetailView;
