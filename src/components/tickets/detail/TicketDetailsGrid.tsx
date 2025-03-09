
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { getServiceById } from '@/utils/mockData/services';
import { getUserById } from '@/utils/mockData/users';
import { getTeamById } from '@/utils/mockData/services';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface TicketDetailsGridProps {
  ticket: Ticket;
  isServiceRequest: boolean;
}

const TicketDetailsGrid: React.FC<TicketDetailsGridProps> = ({ ticket, isServiceRequest }) => {
  // Get service details if a serviceId is present
  const [service, setService] = useState<any>(null);
  const [supportContact, setSupportContact] = useState<any>(null);
  const [supportTeam, setSupportTeam] = useState<any>(null);
  const [serviceOwner, setServiceOwner] = useState<any>(null);
  
  useEffect(() => {
    if (ticket.serviceId) {
      const serviceDetails = getServiceById(ticket.serviceId);
      if (serviceDetails) {
        setService(serviceDetails);
        
        // Get support contact
        if (serviceDetails.supportContactId) {
          const contact = getUserById(serviceDetails.supportContactId);
          setSupportContact(contact);
        }
        
        // Get support team
        if (serviceDetails.supportTeamId) {
          const team = getTeamById(serviceDetails.supportTeamId);
          setSupportTeam(team);
        }
        
        // Get service owner
        if (serviceDetails.serviceOwnerId) {
          const owner = getUserById(serviceDetails.serviceOwnerId);
          setServiceOwner(owner);
        }
      }
    }
  }, [ticket.serviceId]);
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">Status</h3>
          <StatusBadge status={ticket.status} isServiceRequest={isServiceRequest} />
        </div>
        <div>
          <h3 className="text-sm font-medium">Priority</h3>
          <PriorityBadge priority={ticket.priority} isServiceRequest={isServiceRequest} />
        </div>
        <div>
          <h3 className="text-sm font-medium">Reported By</h3>
          <p className="text-sm">{ticket.createdBy}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Assigned To</h3>
          <p className="text-sm">{ticket.assignedTo || 'Unassigned'}</p>
        </div>
        
        {service && (
          <div>
            <h3 className="text-sm font-medium">Service</h3>
            <p className="text-sm">{service.name}</p>
          </div>
        )}
        
        <div>
          <h3 className="text-sm font-medium">{isServiceRequest ? 'Request Type' : 'Category'}</h3>
          <p className="text-sm">{ticket.category}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Created</h3>
          <p className="text-sm">{format(new Date(ticket.createdAt), 'MMM d, yyyy HH:mm')}</p>
        </div>
        {ticket.resolvedAt && (
          <div>
            <h3 className="text-sm font-medium">{isServiceRequest ? 'Fulfilled' : 'Resolved'}</h3>
            <p className="text-sm">{format(new Date(ticket.resolvedAt), 'MMM d, yyyy HH:mm')}</p>
          </div>
        )}
      </div>
      
      {/* Service Information Section */}
      {service && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-md font-medium mb-3">Service Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {service.supportHours && (
              <div>
                <h4 className="text-sm font-medium">Support Hours</h4>
                <p className="text-sm">{service.supportHours}</p>
              </div>
            )}
            
            {supportContact && (
              <div>
                <h4 className="text-sm font-medium">Support Contact</h4>
                <p className="text-sm">{supportContact.name}</p>
              </div>
            )}
            
            {supportTeam && (
              <div>
                <h4 className="text-sm font-medium">Support Team</h4>
                <p className="text-sm">{supportTeam.name}</p>
              </div>
            )}
            
            {serviceOwner && (
              <div>
                <h4 className="text-sm font-medium">Service Owner</h4>
                <p className="text-sm">{serviceOwner.name}</p>
              </div>
            )}
            
            {service.documentationUrl && (
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium">Documentation</h4>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={() => window.open(service.documentationUrl, '_blank')}
                >
                  View Documentation
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="md:col-span-2">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm mt-1">{ticket.description}</p>
      </div>
    </div>
  );
};

export default TicketDetailsGrid;
