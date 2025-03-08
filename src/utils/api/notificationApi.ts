
import { 
  NotificationTemplate, 
  NotificationLog, 
  WebhookConfig, 
  NotificationRule,
  EventType
} from '@/utils/types/notification';
import { mockEmailTemplates } from '@/utils/mockData/emailTemplates';

// Mock templates data
const mockTemplates: NotificationTemplate[] = mockEmailTemplates.map(template => ({
  id: template.id,
  name: template.name,
  eventType: template.triggerOn as EventType, // Map triggerOn to eventType
  subject: template.subject,
  body: template.body,
  isActive: template.isActive,
  lastModified: new Date(),
  lastModifiedBy: 'admin@example.com',
}));

// Mock notification logs
const mockLogs: NotificationLog[] = [
  {
    id: 'log-1',
    eventType: 'incident-created',
    recipientId: 'user-1',
    recipientEmail: 'john@example.com',
    channel: 'email',
    status: 'sent',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    templateId: 'email-1',
    recordId: 'INC00001',
  },
  {
    id: 'log-2',
    eventType: 'incident-assigned',
    recipientId: 'user-2',
    recipientEmail: 'jane@example.com',
    channel: 'email',
    status: 'sent',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    templateId: 'email-2',
    recordId: 'INC00002',
  },
  {
    id: 'log-3',
    eventType: 'service-request-approval-required',
    recipientId: 'user-3',
    recipientEmail: 'mike@example.com',
    channel: 'email',
    status: 'failed',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    error: 'SMTP connection error',
    retryCount: 2,
    templateId: 'email-3',
    recordId: 'SR00001',
  },
  {
    id: 'log-4',
    eventType: 'incident-resolved',
    recipientId: 'user-1',
    recipientEmail: 'john@example.com',
    channel: 'webhook',
    status: 'sent',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    templateId: 'email-1',
    recordId: 'INC00001',
  },
];

// Mock webhooks
const mockWebhooks: WebhookConfig[] = [
  {
    id: 'webhook-1',
    name: 'Slack Notifications',
    url: 'https://hooks.slack.com/services/TXXXXXXXX/BXXXXXXXX/XXXXXXXXXX',
    eventTypes: ['incident-created', 'incident-resolved'],
    authType: 'token',
    authCredentials: 'xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx',
    isActive: true,
    retryCount: 3,
    retryInterval: 5,
  },
  {
    id: 'webhook-2',
    name: 'External Service',
    url: 'https://api.external-service.com/webhooks',
    eventTypes: ['incident-created', 'incident-assigned', 'incident-resolved'],
    authType: 'basic',
    authCredentials: 'username:password',
    isActive: false,
    retryCount: 2,
    retryInterval: 10,
  },
];

// Mock notification rules
const mockRules: NotificationRule[] = [
  {
    id: 'rule-1',
    eventType: 'incident-created',
    recipients: ['requester', 'manager'],
    isActive: true,
  },
  {
    id: 'rule-2',
    eventType: 'incident-assigned',
    recipients: ['assignee'],
    isActive: true,
  },
  {
    id: 'rule-3',
    eventType: 'incident-resolved',
    recipients: ['requester'],
    isActive: true,
  },
  {
    id: 'rule-4',
    eventType: 'service-request-approval-required',
    recipients: ['manager'],
    isActive: true,
  },
];

// API functions for notification templates
export const fetchNotificationTemplates = async (): Promise<NotificationTemplate[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockTemplates];
};

export const fetchNotificationTemplateById = async (id: string): Promise<NotificationTemplate | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const template = mockTemplates.find(t => t.id === id);
  return template || null;
};

export const createNotificationTemplate = async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>): Promise<NotificationTemplate> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newTemplate: NotificationTemplate = {
    id: `template-${Date.now()}`,
    ...template,
    lastModified: new Date(),
    lastModifiedBy: 'admin@example.com',
  };
  mockTemplates.push(newTemplate);
  return newTemplate;
};

export const updateNotificationTemplate = async (id: string, template: Partial<NotificationTemplate>): Promise<NotificationTemplate> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockTemplates.findIndex(t => t.id === id);
  if (index === -1) {
    throw new Error('Template not found');
  }
  
  const updatedTemplate = {
    ...mockTemplates[index],
    ...template,
    lastModified: new Date(),
    lastModifiedBy: 'admin@example.com',
  };
  mockTemplates[index] = updatedTemplate;
  return updatedTemplate;
};

export const deleteNotificationTemplate = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockTemplates.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTemplates.splice(index, 1);
  }
};

// API functions for notification logs
export const fetchNotificationLogs = async (): Promise<NotificationLog[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return [...mockLogs];
};

export const retryNotification = async (id: string): Promise<NotificationLog> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const index = mockLogs.findIndex(log => log.id === id);
  if (index === -1) {
    throw new Error('Log not found');
  }
  
  // Simulate retry
  mockLogs[index] = {
    ...mockLogs[index],
    status: 'queued',
    retryCount: (mockLogs[index].retryCount || 0) + 1,
  };
  
  return mockLogs[index];
};

// API functions for webhooks
export const fetchWebhooks = async (): Promise<WebhookConfig[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [...mockWebhooks];
};

export const fetchWebhookById = async (id: string): Promise<WebhookConfig | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const webhook = mockWebhooks.find(w => w.id === id);
  return webhook || null;
};

export const createWebhook = async (webhook: Omit<WebhookConfig, 'id'>): Promise<WebhookConfig> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newWebhook: WebhookConfig = {
    id: `webhook-${Date.now()}`,
    ...webhook,
  };
  mockWebhooks.push(newWebhook);
  return newWebhook;
};

export const updateWebhook = async (id: string, webhook: Partial<WebhookConfig>): Promise<WebhookConfig> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockWebhooks.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error('Webhook not found');
  }
  
  const updatedWebhook = {
    ...mockWebhooks[index],
    ...webhook,
  };
  mockWebhooks[index] = updatedWebhook;
  return updatedWebhook;
};

export const deleteWebhook = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockWebhooks.findIndex(w => w.id === id);
  if (index !== -1) {
    mockWebhooks.splice(index, 1);
  }
};

export const testWebhook = async (config: { url: string; authType: string; authCredentials?: string }): Promise<{ success: boolean; message?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate a webhook test (always success for demo)
  return {
    success: true,
    message: 'Webhook test successful. Server responded with 200 OK.',
  };
};

// API functions for notification rules
export const fetchNotificationRules = async (): Promise<NotificationRule[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockRules];
};

export const updateNotificationRule = async (id: string, rule: Partial<NotificationRule>): Promise<NotificationRule> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockRules.findIndex(r => r.id === id);
  if (index === -1) {
    throw new Error('Rule not found');
  }
  
  const updatedRule = {
    ...mockRules[index],
    ...rule,
  };
  mockRules[index] = updatedRule;
  return updatedRule;
};

// System health monitoring
export const fetchSystemHealth = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    status: 'operational', // 'operational', 'degraded', 'down'
    metrics: {
      totalNotifications: 1248,
      successRate: 98.7,
      queueSize: 3,
      averageProcessingTime: 1.2,
    },
    recentErrors: [
      {
        timestamp: new Date(Date.now() - 3600000),
        errorType: 'SMTP Connection Error',
        count: 3,
      },
      {
        timestamp: new Date(Date.now() - 86400000),
        errorType: 'Webhook Timeout',
        count: 5,
      },
    ],
  };
};
