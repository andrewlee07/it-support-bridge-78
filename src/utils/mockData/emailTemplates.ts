
import { EmailTemplate } from '../types';

// Mock email templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'email-1',
    name: 'Ticket Created',
    subject: 'Your ticket #{ticketId} has been created',
    body: 'Hello {userName},\n\nYour ticket "{ticketTitle}" has been created successfully. We will address it as soon as possible.\n\nThank you for your patience.\n\nIT Support Team',
    triggerOn: 'ticket-created',
    isActive: true,
  },
  {
    id: 'email-2',
    name: 'Ticket Assigned',
    subject: 'Ticket #{ticketId} has been assigned',
    body: 'Hello {agentName},\n\nTicket "{ticketTitle}" has been assigned to you. Please review and take appropriate action.\n\nThank you,\nIT Support Team',
    triggerOn: 'ticket-assigned',
    isActive: true,
  },
  {
    id: 'email-3',
    name: 'SLA Breach Alert',
    subject: 'ALERT: SLA Breach for Ticket #{ticketId}',
    body: 'Hello {managerName},\n\nThe SLA for ticket "{ticketTitle}" has been breached. This {ticketPriority} priority ticket has not been resolved within the defined timeframe.\n\nPlease take immediate action.\n\nIT Support Team',
    triggerOn: 'sla-breach',
    isActive: true,
  },
];
