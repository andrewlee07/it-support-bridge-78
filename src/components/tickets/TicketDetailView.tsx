
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';

interface TicketDetailViewProps {
  ticket: Ticket;
  type: 'incident' | 'service' | 'security';
  onUpdate: (data: UpdateTicketValues) => void;
  onClose: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
  onReopen?: (reason: string) => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticket,
  type,
  onUpdate,
  onClose,
  onAddNote,
  onReopen
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {type === 'incident' && 'Incident Details'}
        {type === 'service' && 'Service Request Details'}
        {type === 'security' && 'Security Case Details'}
      </h2>
      
      <div className="p-4 border rounded-md">
        <h3 className="font-medium">{ticket.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{ticket.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <span className="text-sm font-medium">ID:</span>
            <span className="text-sm ml-2">{ticket.id}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Status:</span>
            <span className="text-sm ml-2">{ticket.status}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Priority:</span>
            <span className="text-sm ml-2">{ticket.priority}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Category:</span>
            <span className="text-sm ml-2">{ticket.category}</span>
          </div>
        </div>
      </div>
      
      {/* Security-specific details */}
      {type === 'security' && ticket.securityClassification && (
        <div className="p-4 border rounded-md">
          <h3 className="font-medium">Security Information</h3>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="text-sm font-medium">Classification:</span>
              <span className="text-sm ml-2">{ticket.securityClassification}</span>
            </div>
            {ticket.breachType && (
              <div>
                <span className="text-sm font-medium">Breach Type:</span>
                <span className="text-sm ml-2">{ticket.breachType}</span>
              </div>
            )}
            {ticket.dataSubjects !== undefined && (
              <div>
                <span className="text-sm font-medium">Data Subjects:</span>
                <span className="text-sm ml-2">{ticket.dataSubjects}</span>
              </div>
            )}
            {ticket.sarRequestType && (
              <div>
                <span className="text-sm font-medium">SAR Type:</span>
                <span className="text-sm ml-2">{ticket.sarRequestType}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          onClick={() => {
            // This is a placeholder. In a real app, you would have a form to update the ticket
            onUpdate({
              status: 'in-progress',
              assignedTo: 'current-user',
              notes: 'Updating ticket status'
            });
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TicketDetailView;
