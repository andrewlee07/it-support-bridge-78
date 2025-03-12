
import { Ticket } from './types/ticket';
import { SLA } from './types/sla';
import { mockSLAs } from './mockData/slas';

// Replace the missing import with a direct reference to mockSLAs
export const getTicketSLA = (ticket: Ticket): SLA | undefined => {
  // Find a matching SLA for the ticket based on priority and type
  return mockSLAs.find(
    sla => 
      sla.priorityLevel === ticket.priority && 
      sla.ticketType === ticket.type &&
      sla.isActive
  );
};

export type SLAType = 'response' | 'resolution';

export interface SLAStatus {
  slaType: SLAType;
  timeLeft: string;
  percentLeft: number;
  isBreached: boolean;
}

export const calculateSLAStatus = (ticket: Ticket, type: SLAType = 'resolution'): SLAStatus => {
  const sla = getTicketSLA(ticket);
  
  if (!sla) {
    return {
      slaType: type,
      timeLeft: 'No SLA',
      percentLeft: 100,
      isBreached: false
    };
  }
  
  // Calculate based on SLA type
  if (type === 'response') {
    return calculateResponseSLA(ticket, sla);
  } else {
    return calculateResolutionSLA(ticket, sla);
  }
};

// Calculate response SLA status
const calculateResponseSLA = (ticket: Ticket, sla: SLA): SLAStatus => {
  // If ticket has a first response, SLA is met
  if (ticket.firstResponseAt) {
    return {
      slaType: 'response',
      timeLeft: 'Responded',
      percentLeft: 100,
      isBreached: false
    };
  }
  
  // Calculate time left for response
  const createdAt = new Date(ticket.createdAt);
  const responseTarget = new Date(createdAt.getTime() + sla.responseTimeHours * 60 * 60 * 1000);
  const now = new Date();
  
  const timeLeftMs = responseTarget.getTime() - now.getTime();
  const isBreached = timeLeftMs <= 0;
  
  // Format the time left
  const timeLeft = formatTimeLeft(timeLeftMs);
  
  // Calculate percent left (0-100)
  const totalTimeMs = sla.responseTimeHours * 60 * 60 * 1000;
  const percentLeft = Math.max(0, Math.min(100, (timeLeftMs / totalTimeMs) * 100));
  
  return {
    slaType: 'response',
    timeLeft: isBreached ? 'Breached' : timeLeft,
    percentLeft,
    isBreached
  };
};

// Calculate resolution SLA status
const calculateResolutionSLA = (ticket: Ticket, sla: SLA): SLAStatus => {
  // If ticket is resolved or closed, SLA is met
  if (ticket.status === 'resolved' || ticket.status === 'closed' || ticket.status === 'fulfilled') {
    return {
      slaType: 'resolution',
      timeLeft: 'Resolved',
      percentLeft: 100,
      isBreached: false
    };
  }
  
  // For new tickets that haven't been responded to yet, use the same logic as response SLA
  if (ticket.status === 'new' && !ticket.firstResponseAt) {
    return calculateResponseSLA(ticket, sla);
  }
  
  // Calculate time left for resolution
  const createdAt = new Date(ticket.createdAt);
  const resolutionTarget = new Date(createdAt.getTime() + sla.resolutionTimeHours * 60 * 60 * 1000);
  const now = new Date();
  
  const timeLeftMs = resolutionTarget.getTime() - now.getTime();
  const isBreached = timeLeftMs <= 0;
  
  // Format the time left
  const timeLeft = formatTimeLeft(timeLeftMs);
  
  // Calculate percent left (0-100)
  const totalTimeMs = sla.resolutionTimeHours * 60 * 60 * 1000;
  const percentLeft = Math.max(0, Math.min(100, (timeLeftMs / totalTimeMs) * 100));
  
  return {
    slaType: 'resolution',
    timeLeft: isBreached ? 'Breached' : timeLeft,
    percentLeft,
    isBreached
  };
};

// Helper to format time left in a human-readable format
const formatTimeLeft = (timeLeftMs: number): string => {
  if (timeLeftMs <= 0) {
    return 'Breached';
  }
  
  const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  
  return `${hours}h ${minutes}m`;
};
