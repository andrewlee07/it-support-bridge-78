import { ApiResponse } from '../types/api';
import { 
  NotificationTemplate, 
  WebhookConfig, 
  NotificationLog, 
  EventType 
} from '../types/notification';
import { EmailTemplate } from '../types/email';
import { emailNotificationApi } from './emailNotificationApi';
import { simulateApiResponse } from '../mockData/apiHelpers';

// Mock data for the API
const mockWebhooks: WebhookConfig[] = [
  {
    id: 'webhook-1',
    name: 'Slack Integration',
    url: 'https://hooks.slack.com/services/T00000/B00000/XXXX',
    eventTypes: ['incident-created', 'incident-assigned', 'incident-resolved'] as EventType[],
    authType: 'token',
    authCredentials: 'xoxb-123456789',
    isActive: true,
    retryCount: 3,
    retryInterval: 5
  },
  {
    id: 'webhook-2',
    name: 'External System',
    url: 'https://api.external-system.com/webhooks/itsm',
    eventTypes: ['incident-created', 'incident-assigned', 'incident-resolved', 'service-request-completed'] as EventType[],
    authType: 'basic',
    authCredentials: 'user:password',
    isActive: false,
    retryCount: 5,
    retryInterval: 10
  }
];

const mockLogs: NotificationLog[] = [
  {
    id: 'log-1',
    eventType: 'incident-created' as EventType,
    recipientId: 'user-1',
    recipientEmail: 'john@example.com',
    channel: 'email',
    status: 'sent',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    templateId: 'template-1',
    recordId: 'INC00001'
  },
  {
    id: 'log-2',
    eventType: 'incident-assigned' as EventType,
    recipientId: 'user-2',
    recipientEmail: 'jane@example.com',
    channel: 'email',
    status: 'sent',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    templateId: 'template-2',
    recordId: 'INC00001'
  },
  {
    id: 'log-3',
    eventType: 'service-request-approval-required' as EventType,
    recipientId: 'user-3',
    recipientEmail: 'manager@example.com',
    channel: 'email',
    status: 'failed',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    error: 'SMTP connection timeout',
    templateId: 'template-3',
    recordId: 'SR00001',
    retryCount: 1
  }
];

// Mock system health data
const mockSystemHealth = {
  status: 'operational' as 'operational' | 'degraded' | 'down',
  metrics: {
    totalNotifications: 328,
    successRate: 99.1,
    queueSize: 5,
    processingTime: 1200 // in milliseconds
  },
  errors: [
    {
      time: new Date(),
      type: 'SMTP Connection Error',
      count: 3
    }
  ]
};

// Helper function to convert EmailTemplate to NotificationTemplate
const mapEmailToNotificationTemplate = (emailTemplate: EmailTemplate): NotificationTemplate => {
  return {
    id: emailTemplate.id,
    name: emailTemplate.name,
    eventType: emailTemplate.triggerOn as unknown as EventType, // Map triggerOn to eventType
    subject: emailTemplate.subject,
    body: emailTemplate.body,
    isActive: emailTemplate.isActive,
    lastModified: new Date(),
    lastModifiedBy: 'admin@example.com'
  };
};

// Notification API service
export const notificationApi = {
  // Keep the conversion helper as part of the API
  mapEmailToNotificationTemplate,

  // Get all notification templates
  getNotificationTemplates: async (): Promise<ApiResponse<NotificationTemplate[]>> => {
    const emailTemplatesResponse = await emailNotificationApi.getEmailTemplates();
    
    if (!emailTemplatesResponse.success) {
      return {
        ...emailTemplatesResponse,
        data: undefined
      } as ApiResponse<NotificationTemplate[]>;
    }
    
    const notificationTemplates = emailTemplatesResponse.data.map(
      template => mapEmailToNotificationTemplate(template)
    );
    
    return simulateApiResponse(notificationTemplates);
  },
  
  // Update a notification template
  updateNotificationTemplate: async (
    id: string, 
    updates: Partial<NotificationTemplate>
  ): Promise<ApiResponse<NotificationTemplate>> => {
    // Convert NotificationTemplate updates to EmailTemplate updates
    const emailUpdates: Partial<EmailTemplate> = {
      ...updates,
      triggerOn: updates.eventType as any // Map eventType back to triggerOn
    };
    
    delete (emailUpdates as any).eventType; // Remove eventType as it's not in EmailTemplate
    delete (emailUpdates as any).lastModified; // Remove lastModified
    delete (emailUpdates as any).lastModifiedBy; // Remove lastModifiedBy
    
    const response = await emailNotificationApi.updateEmailTemplate(id, emailUpdates);
    
    if (!response.success) {
      return {
        ...response,
        data: undefined
      } as ApiResponse<NotificationTemplate>;
    }
    
    return simulateApiResponse(mapEmailToNotificationTemplate(response.data));
  },
  
  // Create a new notification template
  createNotificationTemplate: async (
    template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>
  ): Promise<ApiResponse<NotificationTemplate>> => {
    // Convert NotificationTemplate to EmailTemplate
    const emailTemplate: Omit<EmailTemplate, 'id'> = {
      name: template.name,
      subject: template.subject,
      body: template.body,
      triggerOn: template.eventType as any, // Map eventType to triggerOn
      isActive: template.isActive
    };
    
    const response = await emailNotificationApi.createEmailTemplate(emailTemplate);
    
    if (!response.success) {
      return {
        ...response,
        data: undefined
      } as ApiResponse<NotificationTemplate>;
    }
    
    return simulateApiResponse(mapEmailToNotificationTemplate(response.data));
  },
  
  // Delete a notification template
  deleteNotificationTemplate: async (id: string): Promise<ApiResponse<boolean>> => {
    // Here we would delete the template in a real implementation
    // For this mock API, we'll just return a success response
    return simulateApiResponse(true);
  },
  
  // Webhook-related API methods
  getWebhookConfigurations: async (): Promise<ApiResponse<WebhookConfig[]>> => {
    return simulateApiResponse(mockWebhooks);
  },
  
  updateWebhookConfiguration: async (
    id: string, 
    updates: Partial<WebhookConfig>
  ): Promise<ApiResponse<WebhookConfig>> => {
    const webhookIndex = mockWebhooks.findIndex(w => w.id === id);
    
    if (webhookIndex === -1) {
      return {
        success: false,
        message: 'Webhook configuration not found',
        data: undefined
      };
    }
    
    const updatedWebhook = {
      ...mockWebhooks[webhookIndex],
      ...updates
    };
    
    mockWebhooks[webhookIndex] = updatedWebhook;
    
    return simulateApiResponse(updatedWebhook);
  },
  
  createWebhookConfiguration: async (webhook: Omit<WebhookConfig, 'id'>): Promise<ApiResponse<WebhookConfig>> => {
    const newWebhook: WebhookConfig = {
      ...webhook,
      id: `webhook-${mockWebhooks.length + 1}`
    };
    
    mockWebhooks.push(newWebhook);
    
    return simulateApiResponse(newWebhook);
  },
  
  deleteWebhookConfiguration: async (id: string): Promise<ApiResponse<boolean>> => {
    const webhookIndex = mockWebhooks.findIndex(w => w.id === id);
    
    if (webhookIndex === -1) {
      return {
        success: false,
        message: 'Webhook configuration not found',
        data: false
      };
    }
    
    mockWebhooks.splice(webhookIndex, 1);
    
    return simulateApiResponse(true);
  },
  
  testWebhook: async (webhookData: { 
    url: string; 
    authType: string; 
    authCredentials?: string 
  }): Promise<ApiResponse<boolean>> => {
    // Simulate webhook test (80% success rate)
    const success = Math.random() > 0.2;
    
    return {
      success,
      message: success 
        ? 'Webhook test successful' 
        : 'Failed to connect to webhook endpoint',
      data: success
    };
  },
  
  // Notification logs API methods
  getNotificationLogs: async (): Promise<ApiResponse<NotificationLog[]>> => {
    return simulateApiResponse(mockLogs);
  },
  
  retryNotification: async (id: string): Promise<ApiResponse<boolean>> => {
    const logIndex = mockLogs.findIndex(l => l.id === id);
    
    if (logIndex === -1) {
      return {
        success: false,
        message: 'Notification log not found',
        data: false
      };
    }
    
    // Simulate retry (90% success rate)
    const success = Math.random() > 0.1;
    
    // Update the log status
    mockLogs[logIndex] = {
      ...mockLogs[logIndex],
      status: success ? 'sent' : 'failed',
      timestamp: new Date(),
      retryCount: (mockLogs[logIndex].retryCount || 0) + 1
    };
    
    return {
      success: true,
      message: success 
        ? 'Notification retry successful' 
        : 'Notification retry queued',
      data: true
    };
  },
  
  // System health
  getSystemHealth: async (): Promise<ApiResponse<typeof mockSystemHealth>> => {
    return simulateApiResponse(mockSystemHealth);
  }
};
