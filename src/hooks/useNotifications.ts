
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { 
  NotificationTemplate, 
  WebhookConfig, 
  NotificationLog, 
  EventType 
} from '@/utils/types/notification';
import { notificationApi } from '@/utils/api/notificationApi';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';

// Hook for notification templates
export const useNotificationTemplates = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationTemplates();
      if (response.success && response.data) {
        setTemplates(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch notification templates',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateTemplate = useCallback(async (id: string, updates: Partial<NotificationTemplate>) => {
    setLoading(true);
    try {
      const response = await notificationApi.updateNotificationTemplate(id, updates);
      if (response.success && response.data) {
        // Update local state
        setTemplates(prev => prev.map(t => t.id === id ? response.data : t));
        toast({
          title: 'Success',
          description: 'Notification template updated successfully',
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update template');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createTemplate = useCallback(async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>) => {
    setLoading(true);
    try {
      const response = await notificationApi.createNotificationTemplate(template);
      if (response.success && response.data) {
        // Update local state
        setTemplates(prev => [...prev, response.data]);
        toast({
          title: 'Success',
          description: 'Notification template created successfully',
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create template');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    templates,
    loading,
    fetchTemplates,
    updateTemplate,
    createTemplate
  };
};

// Hook for webhook configurations
export const useWebhooks = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);

  const fetchWebhooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getWebhookConfigurations();
      if (response.success && response.data) {
        setWebhooks(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch webhook configurations',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateWebhook = useCallback(async (id: string, updates: Partial<WebhookConfig>) => {
    setLoading(true);
    try {
      const response = await notificationApi.updateWebhookConfiguration(id, updates);
      if (response.success && response.data) {
        // Update local state
        setWebhooks(prev => prev.map(w => w.id === id ? response.data : w));
        toast({
          title: 'Success',
          description: 'Webhook configuration updated successfully',
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update webhook');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createWebhook = useCallback(async (webhook: Omit<WebhookConfig, 'id'>) => {
    setLoading(true);
    try {
      const response = await notificationApi.createWebhookConfiguration(webhook);
      if (response.success && response.data) {
        // Update local state
        setWebhooks(prev => [...prev, response.data]);
        toast({
          title: 'Success',
          description: 'Webhook configuration created successfully',
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create webhook');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const testWebhook = useCallback(async (webhookData: { url: string; authType: string; authCredentials?: string }) => {
    setLoading(true);
    try {
      const response = await notificationApi.testWebhook(webhookData);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Webhook test successful',
        });
      } else {
        toast({
          title: 'Warning',
          description: response.message || 'Webhook test failed',
          variant: 'destructive',
        });
      }
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    webhooks,
    loading,
    fetchWebhooks,
    updateWebhook,
    createWebhook,
    testWebhook
  };
};

// Hook for notification logs
export const useNotificationLogs = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<NotificationLog[]>([]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationLogs();
      if (response.success && response.data) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notification logs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const retryNotification = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.retryNotification(id);
      if (response.success) {
        // Update the log in the local state
        fetchLogs();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to retry notification:', error);
      return false;
    }
  }, [fetchLogs]);

  return {
    logs,
    loading,
    fetchLogs,
    retryNotification
  };
};

// Hook for system health
export const useNotificationSystem = () => {
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState<{
    status: 'operational' | 'degraded' | 'down';
    metrics: {
      totalNotifications: number;
      successRate: number;
      queueSize: number;
      processingTime: number;
    };
    errors: Array<{
      time: Date;
      type: string;
      count: number;
    }>;
  }>({
    status: 'operational',
    metrics: {
      totalNotifications: 0,
      successRate: 0,
      queueSize: 0,
      processingTime: 0,
    },
    errors: [],
  });

  const fetchSystemHealth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getSystemHealth();
      if (response.success && response.data) {
        setHealth(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notification system health:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    health,
    loading,
    fetchSystemHealth
  };
};

// Aliased hook for backward compatibility
export const useWebhookConfigs = useWebhooks;
