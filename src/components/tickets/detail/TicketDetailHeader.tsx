
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Ticket } from '@/utils/types/ticket';
import { CheckCircle2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TicketDetailHeaderProps {
  ticket: Ticket;
  isServiceRequest: boolean;
  canReopen: boolean;
  isResolved: boolean;
  onReopen: () => void;
  onResolve: () => void;
}

const TicketDetailHeader: React.FC<TicketDetailHeaderProps> = ({
  ticket,
  isServiceRequest,
  canReopen,
  isResolved,
  onReopen,
  onResolve
}) => {
  const resolveButtonLabel = isServiceRequest ? 'Fulfill Request' : 'Resolve';
  
  return (
    <>
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
          <div className="flex gap-2">
            {canReopen && (
              <Button 
                variant="outline" 
                onClick={onReopen}
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reopen
              </Button>
            )}
            {!isResolved && (
              <Button 
                variant="destructive" 
                onClick={onResolve}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {resolveButtonLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetailHeader;
