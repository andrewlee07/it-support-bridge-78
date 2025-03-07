
// Email notification
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  triggerOn: 'ticket-created' | 'ticket-updated' | 'ticket-assigned' | 'ticket-resolved' | 'sla-breach' | 'change-approved' | 'change-submitted';
  isActive: boolean;
}
