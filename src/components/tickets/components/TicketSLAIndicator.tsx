
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
  
  // Get the SLA type (response or resolution)
  const slaType = "Resolution";
  
  // Calculate gradient color based on percentage left
  const getGradientColor = (percentLeft: number) => {
    if (percentLeft <= 0) return 'bg-red-600';
    if (percentLeft <= 30) return 'bg-gradient-to-r from-red-500 to-amber-500';
    if (percentLeft <= 60) return 'bg-gradient-to-r from-amber-500 to-green-500';
    return 'bg-green-500';
  };
  
  const barColor = getGradientColor(slaInfo.percentLeft || 0);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{slaType} SLA</span>
        <span className="text-sm">{slaInfo.timeLeft}</span>
      </div>
      <Progress 
        value={slaInfo.percentLeft} 
        className="h-2" 
        indicatorClassName={barColor} 
      />
    </div>
  );
};

export default TicketSLAIndicator;
