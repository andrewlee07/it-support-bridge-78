
import { ApiResponse } from '../types/api';
import { 
  NotificationTemplate, 
  NotificationRule, 
  NotificationLog, 
  WebhookConfig,
  NotificationEvent,
  EventType
} from '../types/notification';
import { mockEmailTemplates } from '../mockData/emailTemplates';
import { simulateApiResponse, createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for notification components
let notificationTemplates: NotificationTemplate[] = mockEmailTemplates.map(template => ({
  ...template,
  lastModified: new Date(),
  lastModifiedBy: 'admin'
}));

let notificationRules: NotificationRule[] = [
  {
    id: 'rule-1',
    eventType: 'incident-created',
    recipients: ['requester', 'manager'],
    isActive: true
  },
  {
    id: 'rule-2',
    eventType: 'incident-assigned',
    recipients: ['requester', 'assignee'],
    isActive: true
  },
  {
    id: 'rule-3',
    eventType: 'incident-resolved',
    recipients: ['requester'],
    isActive: true
  },
  {
    id: 'rule-4',
    eventType: 'service-request-created',
    recipients: ['requester', 'manager'],
    isActive: true
  },
  {
    id: 'rule-5',
    eventType: 'service-request-approval-required',
    recipients: ['manager'],
    isActive: true
  },
  {
    id: 'rule-6',
    eventType: 'service-request-completed',
    recipients: ['requester'],
    isActive: true
  },
  {
    id: 'rule-7',
    eventType: 'asset-created',
    recipients: ['manager'],
    isActive: true
  },
  {
    id: 'rule-8',
    eventType: 'asset-updated',
    recipients: ['manager'],
    isActive: true
  },
  {
    id: 'rule-9',
    eventType: 'asset-assigned',
    recipients: ['assignee', 'manager'],
    isActive: true
  }
];

let webhookConfigs: WebhookConfig[] = [
  {
    id: 'webhook-1',
    name: 'Slack Notifications',
    url: 'https://hooks.slack.com/services/T00000/B00000/XXXX',
    eventTypes: ['incident-created', 'incident-resolved'],
    authType: 'token',
    authCredentials: 'encrypted-token-here',
    isActive: true,
    retryCount: 3,
    retryInterval: 5
  }
];

let notificationLogs: NotificationLog[] = [
  {
    id: 'log-1',
    eventType: 'incident-created',
    recipientId: 'user-1',
    recipientEmail: 'john.doe@example.com',
    channel: 'email',
    status: 'sent',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    templateId: 'email-1',
    recordId: 'incident-1'
  },
  {
    id: 'log-2',
    eventType: 'incident-assigned',
    recipientId: 'user-2',
    recipientEmail: 'jane.smith@example.com',
    channel: 'email',
    status: 'sent',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    templateId: 'email-2',
    recordId: 'incident-1'
  },
  {
    id: 'log-3',
    eventType: 'incident-resolved',
    recipientId: 'user-1',
    recipientEmail: 'john.doe@example.com',
    channel: 'email',
    status: 'failed',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    error: 'SMTP connection timeout',
    retryCount: 1,
    templateId: 'email-3',
    recordId: 'incident-1'
  }
];

// Queue for notification events
let notificationQueue: NotificationEvent[] = [];

export const notificationApi = {
  // Template Management
  getNotificationTemplates: async (): Promise<ApiResponse<NotificationTemplate[]>> => {
    return simulateApiResponse(notificationTemplates);
  },
  
  getNotificationTemplateById: async (id: string): Promise<ApiResponse<NotificationTemplate | null>> => {
    const template = notificationTemplates.find(t => t.id === id);
    return simulateApiResponse(template || null);
  },
  
  createNotificationTemplate: async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>): 
    Promise<ApiResponse<NotificationTemplate>> => {
    const newTemplate: NotificationTemplate = {
      ...template,
      id: `template-${uuidv4()}`,
      lastModified: new Date(),
      lastModifiedBy: 'current-user'
    };
    
    notificationTemplates.push(newTemplate);
    return simulateApiResponse(newTemplate);
  },
  
  updateNotificationTemplate: async (
    id: string, 
    updates: Partial<Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>>
  ): Promise<ApiResponse<NotificationTemplate>> => {
    const templateIndex = notificationTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return createApiErrorResponse('Template not found');
    }
    
    const updatedTemplate: NotificationTemplate = {
      ...notificationTemplates[templateIndex],
      ...updates,
      lastModified: new Date(),
      lastModifiedBy: 'current-user'
    };
    
    notificationTemplates[templateIndex] = updatedTemplate;
    return simulateApiResponse(updatedTemplate);
  },
  
  deleteNotificationTemplate: async (id: string): Promise<ApiResponse<boolean>> => {
    const initialLength = notificationTemplates.length;
    notificationTemplates = notificationTemplates.filter(t => t.id !== id);
    
    return simulateApiResponse(notificationTemplates.length < initialLength);
  },
  
  // Rule Management
  getNotificationRules: async (): Promise<ApiResponse<NotificationRule[]>> => {
    return simulateApiResponse(notificationRules);
  },
  
  getNotificationRuleById: async (id: string): Promise<ApiResponse<NotificationRule | null>> => {
    const rule = notificationRules.find(r => r.id === id);
    return simulateApiResponse(rule || null);
  },
  
  createNotificationRule: async (rule: Omit<NotificationRule, 'id'>): Promise<ApiResponse<NotificationRule>> => {
    const newRule: NotificationRule = {
      ...rule,
      id: `rule-${uuidv4()}`
    };
    
    notificationRules.push(newRule);
    return simulateApiResponse(newRule);
  },
  
  updateNotificationRule: async (id: string, updates: Partial<Omit<NotificationRule, 'id'>>): 
    Promise<ApiResponse<NotificationRule>> => {
    const ruleIndex = notificationRules.findIndex(r => r.id === id);
    
    if (ruleIndex === -1) {
      return createApiErrorResponse('Rule not found');
    }
    
    const updatedRule: NotificationRule = {
      ...notificationRules[ruleIndex],
      ...updates
    };
    
    notificationRules[ruleIndex] = updatedRule;
    return simulateApiResponse(updatedRule);
  },
  
  deleteNotificationRule: async (id: string): Promise<ApiResponse<boolean>> => {
    const initialLength = notificationRules.length;
    notificationRules = notificationRules.filter(r => r.id !== id);
    
    return simulateApiResponse(notificationRules.length < initialLength);
  },
  
  // Webhook Management
  getWebhookConfigs: async (): Promise<ApiResponse<WebhookConfig[]>> => {
    return simulateApiResponse(webhookConfigs);
  },
  
  getWebhookConfigById: async (id: string): Promise<ApiResponse<WebhookConfig | null>> => {
    const config = webhookConfigs.find(c => c.id === id);
    return simulateApiResponse(config || null);
  },
  
  createWebhookConfig: async (config: Omit<WebhookConfig, 'id'>): Promise<ApiResponse<WebhookConfig>> => {
    const newConfig: WebhookConfig = {
      ...config,
      id: `webhook-${uuidv4()}`
    };
    
    webhookConfigs.push(newConfig);
    return simulateApiResponse(newConfig);
  },
  
  updateWebhookConfig: async (id: string, updates: Partial<Omit<WebhookConfig, 'id'>>): 
    Promise<ApiResponse<WebhookConfig>> => {
    const configIndex = webhookConfigs.findIndex(c => c.id === id);
    
    if (configIndex === -1) {
      return createApiErrorResponse('Webhook configuration not found');
    }
    
    const updatedConfig: WebhookConfig = {
      ...webhookConfigs[configIndex],
      ...updates
    };
    
    webhookConfigs[configIndex] = updatedConfig;
    return simulateApiResponse(updatedConfig);
  },
  
  deleteWebhookConfig: async (id: string): Promise<ApiResponse<boolean>> => {
    const initialLength = webhookConfigs.length;
    webhookConfigs = webhookConfigs.filter(c => c.id !== id);
    
    return simulateApiResponse(webhookConfigs.length < initialLength);
  },
  
  testWebhook: async (config: WebhookConfig): Promise<ApiResponse<boolean>> => {
    // In a real implementation, we would call the webhook with a test payload
    console.log(`Testing webhook ${config.name} at ${config.url}`);
    
    // Simulate success 80% of the time
    const isSuccess = Math.random() < 0.8;
    
    if (isSuccess) {
      return createApiSuccessResponse(true);
    } else {
      return createApiErrorResponse('Failed to connect to webhook endpoint');
    }
  },
  
  // Notification Logs
  getNotificationLogs: async (limit: number = 50, offset: number = 0): Promise<ApiResponse<NotificationLog[]>> => {
    const paginatedLogs = notificationLogs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(offset, offset + limit);
    
    return simulateApiResponse(paginatedLogs);
  },
  
  getNotificationLogById: async (id: string): Promise<ApiResponse<NotificationLog | null>> => {
    const log = notificationLogs.find(l => l.id === id);
    return simulateApiResponse(log || null);
  },
  
  retryNotification: async (id: string): Promise<ApiResponse<NotificationLog>> => {
    const logIndex = notificationLogs.findIndex(l => l.id === id);
    
    if (logIndex === -1) {
      return createApiErrorResponse('Notification log not found');
    }
    
    if (notificationLogs[logIndex].status !== 'failed') {
      return createApiErrorResponse('Only failed notifications can be retried');
    }
    
    // Update the retry count and status
    const updatedLog: NotificationLog = {
      ...notificationLogs[logIndex],
      status: 'retrying',
      retryCount: (notificationLogs[logIndex].retryCount || 0) + 1,
      timestamp: new Date()
    };
    
    notificationLogs[logIndex] = updatedLog;
    
    // In a real implementation, we would add the notification back to the queue
    // For now, we'll just simulate a success 50% of the time
    setTimeout(() => {
      const isSuccess = Math.random() < 0.5;
      
      notificationLogs[logIndex] = {
        ...updatedLog,
        status: isSuccess ? 'sent' : 'failed',
        error: isSuccess ? undefined : 'Failed after retry'
      };
    }, 2000);
    
    return simulateApiResponse(updatedLog);
  },
  
  // Event Publishing
  publishEvent: async (event: Omit<NotificationEvent, 'id' | 'timestamp'>): Promise<ApiResponse<NotificationEvent>> => {
    const newEvent: NotificationEvent = {
      ...event,
      id: `event-${uuidv4()}`,
      timestamp: new Date()
    };
    
    // Add to queue
    notificationQueue.push(newEvent);
    
    // Process the event (in a real system, this would be done by a separate worker)
    setTimeout(() => processNextQueueItem(), 100);
    
    return simulateApiResponse(newEvent);
  },
  
  // System Health
  getSystemHealth: async (): Promise<ApiResponse<{
    status: 'operational' | 'degraded' | 'down',
    metrics: {
      totalNotifications: number;
      successRate: number;
      queueSize: number;
      averageProcessingTime: number;
    },
    recentErrors: Array<{
      timestamp: Date;
      errorType: string;
      count: number;
    }>
  }>> => {
    // Calculate some mock metrics
    const totalSent = notificationLogs.filter(l => l.status === 'sent').length;
    const totalFailed = notificationLogs.filter(l => l.status === 'failed').length;
    const total = totalSent + totalFailed;
    const successRate = total > 0 ? (totalSent / total) * 100 : 100;
    
    // Group errors
    const errors = notificationLogs
      .filter(l => l.status === 'failed' && l.error)
      .reduce((acc, log) => {
        const errorType = log.error || 'Unknown error';
        if (!acc[errorType]) {
          acc[errorType] = {
            timestamp: log.timestamp,
            errorType,
            count: 0
          };
        }
        acc[errorType].count++;
        return acc;
      }, {} as Record<string, { timestamp: Date; errorType: string; count: number; }>);
    
    return simulateApiResponse({
      status: successRate > 90 ? 'operational' : successRate > 70 ? 'degraded' : 'down',
      metrics: {
        totalNotifications: total,
        successRate,
        queueSize: notificationQueue.length,
        averageProcessingTime: 1.2 // Mock value in seconds
      },
      recentErrors: Object.values(errors).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    });
  }
};

// Helper function to process the notification queue
// In a real implementation, this would be a separate worker process
function processNextQueueItem() {
  if (notificationQueue.length === 0) return;
  
  const event = notificationQueue.shift();
  if (!event) return;
  
  console.log(`Processing notification event: ${event.type} for ${event.entityType} ${event.entityId}`);
  
  // Get the rule for this event type
  const rule = notificationRules.find(r => r.eventType === event.type && r.isActive);
  
  if (!rule) {
    console.log(`No active rule found for event type ${event.type}`);
    return;
  }
  
  // Get the template for this event type
  const template = notificationTemplates.find(t => t.eventType === event.type && t.isActive);
  
  if (!template) {
    console.log(`No active template found for event type ${event.type}`);
    return;
  }
  
  // In a real implementation, we would resolve recipients, render templates, and send notifications
  // For now, we'll just add some mock logs
  
  // Mock sending to each recipient type
  rule.recipients.forEach(recipientType => {
    // Mock resolving recipient ID and email
    const recipientId = recipientType === 'requester' ? event.data.requesterId || 'user-1' : 
                        recipientType === 'assignee' ? event.data.assigneeId || 'user-2' : 'user-3';
    
    const recipientEmail = recipientId === 'user-1' ? 'john.doe@example.com' : 
                           recipientId === 'user-2' ? 'jane.smith@example.com' : 'manager@example.com';
    
    // Create a log entry
    const logEntry: NotificationLog = {
      id: `log-${uuidv4()}`,
      eventType: event.type,
      recipientId,
      recipientEmail,
      channel: 'email',
      status: Math.random() < 0.9 ? 'sent' : 'failed', // 90% success rate
      timestamp: new Date(),
      templateId: template.id,
      recordId: event.entityId,
      error: Math.random() < 0.9 ? undefined : 'SMTP connection timeout'
    };
    
    notificationLogs.push(logEntry);
  });
  
  // Process webhooks for this event type
  const relevantWebhooks = webhookConfigs.filter(
    config => config.isActive && config.eventTypes.includes(event.type as EventType)
  );
  
  relevantWebhooks.forEach(webhook => {
    // Mock sending to webhook
    console.log(`Sending event ${event.type} to webhook ${webhook.name} at ${webhook.url}`);
    
    // Create a log entry
    const logEntry: NotificationLog = {
      id: `log-${uuidv4()}`,
      eventType: event.type,
      recipientId: 'webhook',
      recipientEmail: webhook.url,
      channel: 'webhook',
      status: Math.random() < 0.8 ? 'sent' : 'failed', // 80% success rate
      timestamp: new Date(),
      templateId: 'webhook',
      recordId: event.entityId,
      error: Math.random() < 0.8 ? undefined : 'Webhook connection timeout'
    };
    
    notificationLogs.push(logEntry);
  });
  
  // Process next item in queue
  if (notificationQueue.length > 0) {
    setTimeout(() => processNextQueueItem(), 100);
  }
}
