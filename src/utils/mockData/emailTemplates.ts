
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
  {
    id: 'email-4',
    name: 'Change Request Submitted',
    subject: 'Change Request #{changeId} has been submitted',
    body: 'Hello {managerName},\n\nA new change request "{changeTitle}" has been submitted and requires your review.\n\nPlease review the details and approve or reject the change request.\n\nThank you,\nChange Management Team',
    triggerOn: 'change-submitted',
    isActive: true,
  },
  {
    id: 'email-5',
    name: 'Change Request Approved',
    subject: 'Change Request #{changeId} has been approved',
    body: 'Hello {userName},\n\nYour change request "{changeTitle}" has been approved. You may proceed with the implementation as planned.\n\nImplementation Window: {startDate} to {endDate}\n\nThank you,\nChange Management Team',
    triggerOn: 'change-approved',
    isActive: true,
  },
  {
    id: 'email-6',
    name: 'Problem Created',
    subject: 'New Problem Record #{problemId} has been created',
    body: 'Hello {teamName},\n\nA new problem "{problemTitle}" has been created and assigned to your team.\n\nPlease review and begin root cause analysis.\n\nPriority: {problemPriority}\nRelated Incidents: {relatedIncidents}\n\nProblem Management Team',
    triggerOn: 'problem-created',
    isActive: false,
  },
];
