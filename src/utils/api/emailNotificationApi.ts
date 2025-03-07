
import { ApiResponse, EmailTemplate } from '../types';
import { mockEmailTemplates } from '../mockData/emailTemplates';
import { simulateApiResponse } from '../mockData/apiHelpers';
import { getUserById } from '../mockData';

// In-memory storage of email templates
let emailTemplates = [...mockEmailTemplates];

// Email notification API
export const emailNotificationApi = {
  // Get all email templates
  getEmailTemplates: async (): Promise<ApiResponse<EmailTemplate[]>> => {
    return simulateApiResponse(emailTemplates);
  },
  
  // Get email template by trigger event
  getEmailTemplateByTrigger: async (triggerEvent: string): Promise<ApiResponse<EmailTemplate | null>> => {
    const template = emailTemplates.find(t => t.triggerOn === triggerEvent && t.isActive);
    
    return simulateApiResponse(template || null);
  },
  
  // Send email notification for change request events
  sendChangeRequestEmail: async (
    changeId: string,
    eventType: 'change-submitted' | 'change-approved',
    changeTitle: string,
    recipientIds: string[]
  ): Promise<ApiResponse<boolean>> => {
    // Find the appropriate template
    const template = emailTemplates.find(t => t.triggerOn === eventType && t.isActive);
    
    if (!template) {
      return {
        success: false,
        error: 'No active email template found for this event type',
      };
    }
    
    // Get recipient information
    const recipients = recipientIds
      .map(id => getUserById(id))
      .filter(user => user !== undefined);
    
    if (recipients.length === 0) {
      return {
        success: false,
        error: 'No valid recipients found',
      };
    }
    
    // In a real application, we would send actual emails here
    // For this mock implementation, we'll just log to console
    console.log(`Mock email sent for change request ${changeId} (${changeTitle})`);
    console.log(`Event: ${eventType}`);
    console.log(`Recipients: ${recipients.map(r => r?.name).join(', ')}`);
    
    // In a real implementation, we might also log sent emails to a database
    
    return simulateApiResponse(true);
  },
  
  // Update an email template
  updateEmailTemplate: async (
    id: string,
    updates: Partial<EmailTemplate>
  ): Promise<ApiResponse<EmailTemplate>> => {
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return {
        success: false,
        error: 'Email template not found',
      };
    }
    
    const existingTemplate = emailTemplates[templateIndex];
    
    const updatedTemplate = {
      ...existingTemplate,
      ...updates,
    };
    
    emailTemplates[templateIndex] = updatedTemplate;
    
    return simulateApiResponse(updatedTemplate);
  },
  
  // Create a new email template
  createEmailTemplate: async (template: Omit<EmailTemplate, 'id'>): Promise<ApiResponse<EmailTemplate>> => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: `email-${emailTemplates.length + 1}`,
    };
    
    emailTemplates.push(newTemplate);
    
    return simulateApiResponse(newTemplate);
  },
};
