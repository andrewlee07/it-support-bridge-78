
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { calculateSLAStatus } from '@/utils/sla/slaCalculations';
import { Ticket } from '@/utils/types/ticket';

interface TicketSLAIndicatorProps {
  ticket: Ticket;
}

const TicketSLAIndicator: React.FC<TicketSLAIndicatorProps> = ({ ticket }) => {
  const slaInfo = calculateSLAStatus(ticket);
  
  if (ticket.status === 'closed' || ticket.status === 'resolved') {
    return <div className="text-gray-500">Completed</div>;
  }
  
  switch (slaInfo.status) {
    case 'breached':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-600 font-medium">SLA Breached</span>
            <span className="text-red-600 text-sm">{slaInfo.timeLeft}</span>
          </div>
          <Progress value={0} className="h-2" indicatorClassName="bg-red-600" />
        </div>
      );
    case 'warning':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-amber-600 font-medium">SLA Warning</span>
            <span className="text-amber-600 text-sm">{slaInfo.timeLeft}</span>
          </div>
          <Progress value={slaInfo.percentLeft} className="h-2" indicatorClassName="bg-amber-500" />
        </div>
      );
    default:
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-medium">SLA On Track</span>
            <span className="text-green-600 text-sm">{slaInfo.timeLeft}</span>
          </div>
          <Progress value={slaInfo.percentLeft} className="h-2" indicatorClassName="bg-green-500" />
        </div>
      );
  }
};

export default TicketSLAIndicator;
