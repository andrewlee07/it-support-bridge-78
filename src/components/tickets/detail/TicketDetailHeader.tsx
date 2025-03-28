
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/utils/types/ticket';
import { AlertCircle, Bug, FileText } from 'lucide-react';
import { format } from 'date-fns';
import CreateProblemFromIncidentDialog from '@/components/incidents/CreateProblemFromIncidentDialog';
import { toast } from 'sonner';

interface TicketDetailHeaderProps {
  ticket: Ticket;
  isServiceRequest: boolean;
  onReopenClick: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'pending':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    case 'resolved':
    case 'fulfilled':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'closed':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'P1':
    case 'high':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'P2':
    case 'medium':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    case 'P3':
    case 'P4':
    case 'low':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const TicketDetailHeader: React.FC<TicketDetailHeaderProps> = ({ 
  ticket, 
  isServiceRequest,
  onReopenClick
}) => {
  const [problemDialogOpen, setProblemDialogOpen] = useState(false);
  
  const isResolved = ['closed', 'resolved', 'fulfilled'].includes(ticket.status);
  const displayType = isServiceRequest ? 'Service Request' : 'Incident';
  
  const handleCreateProblem = (problemId: string) => {
    toast.success(`Created problem #${problemId} from this incident`);
    // In a real app, we'd update the ticket with the relation
  };
  
  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className={getStatusColor(ticket.status)}>
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
              {ticket.priority}
            </Badge>
            <Badge variant="outline">
              {displayType}
            </Badge>
            <Badge variant="outline">
              ID: {ticket.id}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 md:items-start">
          {isResolved && (
            <Button variant="outline" size="sm" onClick={onReopenClick}>
              Reopen
            </Button>
          )}
          
          {!isServiceRequest && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setProblemDialogOpen(true)}
            >
              <AlertCircle className="h-4 w-4" />
              <span>Create Problem</span>
            </Button>
          )}
          
          {isServiceRequest && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              <span>Create Backlog Item</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Created: {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}</p>
        <p>Updated: {format(new Date(ticket.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
        <p className="mt-2">{ticket.description}</p>
      </div>
      
      {/* Problem Dialog */}
      <CreateProblemFromIncidentDialog
        open={problemDialogOpen}
        onOpenChange={setProblemDialogOpen}
        incident={ticket}
        onSuccess={handleCreateProblem}
      />
    </div>
  );
};

export default TicketDetailHeader;
