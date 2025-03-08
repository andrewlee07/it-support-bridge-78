
import { useState, useCallback } from 'react';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { EmailTemplate } from '@/utils/types';
import { ApiResponse } from '@/utils/types/api';
import { logError } from '@/utils/logging/errorLogger';

// Mock webhook related types
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  eventTypes: EventType[];
  authType: 'none' | 'basic' | 'token';
  authCredentials?: string;
  retryCount: number;
  retryInterval: number;
}

export type EventType = 
  | 'incident-created' 
  | 'incident-assigned' 
  | 'incident-resolved' 
  | 'service-request-created' 
  | 'service-request-completed' 
  | 'problem-created' 
  | 'problem-resolved' 
  | 'change-request-submitted' 
  | 'change-request-approved' 
  | 'change-request-rejected';

// Mock health data types
interface SystemHealthData {
  overallStatus: 'healthy' | 'degraded' | 'down' | 'unknown';
  components: {
    name: string;
    status: 'healthy' | 'degraded' | 'down' | 'unknown';
    latency?: number;
  }[];
  stats: {
    notificationsSent: number;
    successRate: number;
    avgDeliveryTime: number;
    queueLength?: number;
  };
  lastUpdated: string;
}

// Mock notification system health data
const mockHealthData: SystemHealthData = {
  overallStatus: 'healthy',
  components: [
    {
      name: 'Email Service',
      status: 'healthy',
      latency: 230,
    },
    {
      name: 'Webhooks',
      status: 'healthy',
      latency: 150,
    },
    {
      name: 'Message Queue',
      status: 'healthy',
      latency: 12,
    },
    {
      name: 'SMS Gateway',
      status: 'degraded',
      latency: 890,
    },
    {
      name: 'Power Automate Integration',
      status: 'healthy',
      latency: 310,
    },
  ],
  stats: {
    notificationsSent: 1458,
    successRate: 99.7,
    avgDeliveryTime: 0.8,
    queueLength: 5,
  },
  lastUpdated: new Date().toISOString(),
};

// Mock webhooks data
const mockWebhooks: WebhookConfig[] = [
  {
    id: 'webhook-1',
    name: 'ServiceNow Integration',
    url: 'https://servicenow.example.com/webhook/incidents',
    isActive: true,
    eventTypes: ['incident-created', 'incident-resolved'],
    authType: 'token',
    authCredentials: 'token-xyz-123',
    retryCount: 3,
    retryInterval: 5,
  },
  {
    id: 'webhook-2',
    name: 'Teams Notification',
    url: 'https://outlook.office.com/webhook/teams/channel',
    isActive: true,
    eventTypes: ['problem-created', 'incident-created', 'service-request-created'],
    authType: 'none',
    retryCount: 2,
    retryInterval: 3,
  },
  {
    id: 'webhook-3',
    name: 'Slack Alerts',
    url: 'https://hooks.slack.com/services/abc123',
    isActive: false,
    eventTypes: ['incident-created', 'incident-assigned'],
    authType: 'token',
    authCredentials: 'slack-token-123',
    retryCount: 5,
    retryInterval: 2,
  },
];

// Email templates hook
export const useEmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await emailNotificationApi.getEmailTemplates();
      if (response.success) {
        setTemplates(response.data);
      } else {
        setError(response.error || 'Failed to fetch email templates');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      logError(errorMessage, { componentName: 'useEmailTemplates', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
  };
};

// System health hook
export const useNotificationSystemHealth = () => {
  const [healthData, setHealthData] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshHealthData = useCallback(async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // For this mock, we'll simulate an API delay and return the mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly adjust the mock data to simulate changing health status
      const updatedHealthData = { ...mockHealthData };
      updatedHealthData.lastUpdated = new Date().toISOString();
      
      // Randomly adjust components status
      updatedHealthData.components = updatedHealthData.components.map(component => {
        const random = Math.random();
        if (random > 0.9) {
          return { 
            ...component, 
            status: 'degraded', 
            latency: component.latency ? component.latency * 2 : 500 
          };
        } else if (random > 0.95) {
          return { ...component, status: 'down', latency: 0 };
        }
        return component;
      });
      
      // Calculate overall status based on components
      const hasDown = updatedHealthData.components.some(c => c.status === 'down');
      const hasDegraded = updatedHealthData.components.some(c => c.status === 'degraded');
      
      if (hasDown) {
        updatedHealthData.overallStatus = 'down';
      } else if (hasDegraded) {
        updatedHealthData.overallStatus = 'degraded';
      } else {
        updatedHealthData.overallStatus = 'healthy';
      }
      
      // Update stats
      updatedHealthData.stats = {
        ...updatedHealthData.stats,
        notificationsSent: Math.floor(1000 + Math.random() * 1000),
        successRate: 90 + Math.random() * 10,
        avgDeliveryTime: 0.5 + Math.random() * 2,
      };
      
      setHealthData(updatedHealthData);
    } catch (error) {
      logError('Failed to fetch notification system health data', {
        componentName: 'useNotificationSystemHealth',
        severity: 'error',
      });
      setHealthData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    healthData,
    loading,
    refreshHealthData,
  };
};

// Webhooks hook
export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(mockWebhooks);
  const [loading, setLoading] = useState(false);

  const fetchWebhooks = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setWebhooks(mockWebhooks);
    } catch (error) {
      logError('Failed to fetch webhooks', {
        componentName: 'useWebhooks',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const createWebhook = useCallback(async (webhookData: Omit<WebhookConfig, 'id'>): Promise<WebhookConfig | null> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newWebhook: WebhookConfig = {
        ...webhookData,
        id: `webhook-${Date.now()}`,
      };
      
      setWebhooks(prev => [...prev, newWebhook]);
      return newWebhook;
    } catch (error) {
      logError('Failed to create webhook', {
        componentName: 'useWebhooks',
        severity: 'error',
      });
      return null;
    }
  }, []);

  const updateWebhook = useCallback(async (
    id: string,
    updates: Partial<WebhookConfig>
  ): Promise<WebhookConfig | null> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let updatedWebhook: WebhookConfig | null = null;
      
      setWebhooks(prev => {
        const updated = prev.map(webhook => {
          if (webhook.id === id) {
            updatedWebhook = { ...webhook, ...updates };
            return updatedWebhook;
          }
          return webhook;
        });
        return updated;
      });
      
      return updatedWebhook;
    } catch (error) {
      logError('Failed to update webhook', {
        componentName: 'useWebhooks',
        severity: 'error',
      });
      return null;
    }
  }, []);

  const deleteWebhook = useCallback(async (id: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWebhooks(prev => prev.filter(webhook => webhook.id !== id));
      return true;
    } catch (error) {
      logError('Failed to delete webhook', {
        componentName: 'useWebhooks',
        severity: 'error',
      });
      return false;
    }
  }, []);

  const testWebhook = useCallback(async (
    config: Pick<WebhookConfig, 'url' | 'authType' | 'authCredentials'>
  ): Promise<ApiResponse<boolean>> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Randomly succeed or fail to simulate real-world testing
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        return {
          success: true,
          data: true,
          error: null,
        };
      } else {
        return {
          success: false,
          data: false,
          error: "Failed to connect to the webhook endpoint. Please check the URL and authentication settings.",
        };
      }
    } catch (error) {
      logError('Failed to test webhook', {
        componentName: 'useWebhooks',
        severity: 'error',
      });
      return {
        success: false,
        data: false,
        error: "An unexpected error occurred during the test",
      };
    }
  }, []);

  return {
    webhooks,
    loading,
    fetchWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    testWebhook,
  };
};

// Aliases for backward compatibility
export const useNotificationSystem = useNotificationSystemHealth;
