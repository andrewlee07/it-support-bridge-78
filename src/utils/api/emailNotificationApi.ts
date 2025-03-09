
import { ApiResponse, EmailTemplate, TicketType } from '../types';
import { simulateApiResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { emailTemplates } from '../mockData/emailTemplates';

// Email notification API methods
export const emailNotificationApi = {
  // Get all email templates
  getEmailTemplates: async (): Promise<ApiResponse<EmailTemplate[]>> => {
    return simulateApiResponse(emailTemplates);
  },

  // Get email template by id
  getEmailTemplateById: async (id: string): Promise<ApiResponse<EmailTemplate>> => {
    const template = emailTemplates.find(t => t.id === id);
    if (!template) {
      return createApiErrorResponse('Email template not found', 404);
    }
    return simulateApiResponse(template);
  },

  // Create new email template
  createEmailTemplate: async (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<EmailTemplate>> => {
    const newTemplate: EmailTemplate = {
      id: `template-${emailTemplates.length + 1}`,
      ...template,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // In a real app, we'd add to the database
    // For now, we'll just return it
    return simulateApiResponse(newTemplate);
  },

  // Update existing email template
  updateEmailTemplate: async (id: string, template: Partial<EmailTemplate>): Promise<ApiResponse<EmailTemplate>> => {
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
      return createApiErrorResponse('Email template not found', 404);
    }
    
    const updatedTemplate = {
      ...emailTemplates[templateIndex],
      ...template,
      updatedAt: new Date()
    };
    
    // In a real app, we'd update the database
    // For now, we'll just return it
    return simulateApiResponse(updatedTemplate);
  },

  // Delete email template
  deleteEmailTemplate: async (id: string): Promise<ApiResponse<void>> => {
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
      return createApiErrorResponse('Email template not found', 404);
    }
    
    // In a real app, we'd delete from the database
    return simulateApiResponse(undefined);
  },

  // Send notification email based on ticket/change events
  sendTicketEmail: async (ticketId: string, eventType: string, title: string, recipients: string[]): Promise<ApiResponse<void>> => {
    // In a real app, this would connect to an email service
    console.log(`Sending ${eventType} email for ticket ${ticketId} to ${recipients.join(', ')}`);
    return simulateApiResponse(undefined);
  },

  // Send notification email for change requests
  sendChangeRequestEmail: async (changeId: string, eventType: string, title: string, recipients: string[]): Promise<ApiResponse<void>> => {
    // In a real app, this would connect to an email service
    console.log(`Sending ${eventType} email for change request ${changeId} to ${recipients.join(', ')}`);
    return simulateApiResponse(undefined);
  },

  // Send regular notifications based on SLA breaches
  sendSLABreachNotification: async (ticketId: string, ticketType: TicketType, recipients: string[]): Promise<ApiResponse<void>> => {
    // In a real app, this would connect to an email service
    console.log(`Sending SLA breach notification for ${ticketType} ${ticketId} to ${recipients.join(', ')}`);
    return simulateApiResponse(undefined);
  },

  // Send test email to verify template
  testEmailTemplate: async (templateData: { subject: string; body: string; }): Promise<ApiResponse<void>> => {
    // In a real app, this would connect to an email service
    console.log(`Sending test email with subject: ${templateData.subject}`);
    return simulateApiResponse(undefined);
  }
};
