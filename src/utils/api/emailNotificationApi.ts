
import { ApiResponse, EmailTemplate } from '../types';
import { mockEmailTemplates } from '../mockData/emailTemplates';
import { simulateApiResponse, createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';
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
  
  // Get email template by ID
  getEmailTemplateById: async (id: string): Promise<ApiResponse<EmailTemplate | null>> => {
    const template = emailTemplates.find(t => t.id === id);
    
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
      return createApiErrorResponse<boolean>('No active email template found for this event type');
    }
    
    // Get recipient information
    const recipients = recipientIds
      .map(id => getUserById(id))
      .filter(user => user !== undefined);
    
    if (recipients.length === 0) {
      return createApiErrorResponse<boolean>('No valid recipients found');
    }
    
    // In a real application, we would send actual emails here
    // For this mock implementation, we'll just log to console
    console.log(`Mock email sent for change request ${changeId} (${changeTitle})`);
    console.log(`Event: ${eventType}`);
    console.log(`Recipients: ${recipients.map(r => r?.name).join(', ')}`);
    
    // In a real implementation, we might also log sent emails to a database
    
    return createApiSuccessResponse(true);
  },
  
  // Send a generic email notification
  sendEmail: async (
    templateId: string,
    recipientIds: string[],
    variables: Record<string, string>
  ): Promise<ApiResponse<boolean>> => {
    // Get the template
    const template = emailTemplates.find(t => t.id === templateId);
    
    if (!template) {
      return createApiErrorResponse<boolean>('Email template not found');
    }
    
    if (!template.isActive) {
      return createApiErrorResponse<boolean>('Email template is not active');
    }
    
    // Get recipient information
    const recipients = recipientIds
      .map(id => getUserById(id))
      .filter(user => user !== undefined);
    
    if (recipients.length === 0) {
      return createApiErrorResponse<boolean>('No valid recipients found');
    }
    
    // In a real application, we would send actual emails here
    // For this mock implementation, we'll just log to console
    let subject = template.subject;
    let body = template.body;
    
    // Replace variables in subject and body
    Object.entries(variables).forEach(([key, value]) => {
      const pattern = new RegExp(`{${key}}`, 'g');
      subject = subject.replace(pattern, value);
      body = body.replace(pattern, value);
    });
    
    console.log(`Mock email sent with template: ${template.name}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    console.log(`Recipients: ${recipients.map(r => r?.name).join(', ')}`);
    
    return createApiSuccessResponse(true);
  },
  
  // Update an email template
  updateEmailTemplate: async (
    id: string,
    updates: Partial<EmailTemplate>
  ): Promise<ApiResponse<EmailTemplate>> => {
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return createApiErrorResponse<EmailTemplate>('Email template not found', 404);
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
  
  // Delete an email template
  deleteEmailTemplate: async (id: string): Promise<ApiResponse<boolean>> => {
    const initialLength = emailTemplates.length;
    emailTemplates = emailTemplates.filter(t => t.id !== id);
    
    if (initialLength === emailTemplates.length) {
      return createApiErrorResponse<boolean>('Email template not found', 404);
    }
    
    return createApiSuccessResponse(true);
  },
  
  // Test if a template would render properly
  testEmailTemplate: async (
    template: { subject: string; body: string },
    testData: Record<string, string>
  ): Promise<ApiResponse<{ subject: string; body: string }>> => {
    try {
      let subject = template.subject;
      let body = template.body;
      
      // Replace variables in subject and body
      Object.entries(testData).forEach(([key, value]) => {
        const pattern = new RegExp(`{${key}}`, 'g');
        subject = subject.replace(pattern, value);
        body = body.replace(pattern, value);
      });
      
      return createApiSuccessResponse({ subject, body });
    } catch (error) {
      return createApiErrorResponse({ subject: '', body: '' }, 'Error while rendering template');
    }
  }
};
