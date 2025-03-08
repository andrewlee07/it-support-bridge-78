
import { useState, useEffect, useCallback } from 'react';
import { 
  NotificationTemplate, 
  NotificationRule, 
  NotificationLog, 
  WebhookConfig,
  NotificationEvent,
  EventType
} from '@/utils/types/notification';
import { notificationApi } from '@/utils/api/notificationApi';
import { toast } from 'sonner';

export const useNotificationTemplates = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationTemplates();
      if (response.success) {
        setTemplates(response.data);
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch notification templates');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching notification templates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const createTemplate = useCallback(async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>) => {
    try {
      const response = await notificationApi.createNotificationTemplate(template);
      if (response.success) {
        setTemplates(prev => [...prev, response.data]);
        toast.success('Template created successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to create template');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error creating notification template:', err);
      return null;
    }
  }, []);

  const updateTemplate = useCallback(async (
    id: string, 
    updates: Partial<Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>>
  ) => {
    try {
      const response = await notificationApi.updateNotificationTemplate(id, updates);
      if (response.success) {
        setTemplates(prev => prev.map(t => t.id === id ? response.data : t));
        toast.success('Template updated successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to update template');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error updating notification template:', err);
      return null;
    }
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.deleteNotificationTemplate(id);
      if (response.success) {
        setTemplates(prev => prev.filter(t => t.id !== id));
        toast.success('Template deleted successfully');
        return true;
      } else {
        toast.error(response.message || 'Failed to delete template');
        return false;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error deleting notification template:', err);
      return false;
    }
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
};

export const useNotificationRules = () => {
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationRules();
      if (response.success) {
        setRules(response.data);
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch notification rules');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching notification rules:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const createRule = useCallback(async (rule: Omit<NotificationRule, 'id'>) => {
    try {
      const response = await notificationApi.createNotificationRule(rule);
      if (response.success) {
        setRules(prev => [...prev, response.data]);
        toast.success('Rule created successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to create rule');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error creating notification rule:', err);
      return null;
    }
  }, []);

  const updateRule = useCallback(async (id: string, updates: Partial<Omit<NotificationRule, 'id'>>) => {
    try {
      const response = await notificationApi.updateNotificationRule(id, updates);
      if (response.success) {
        setRules(prev => prev.map(r => r.id === id ? response.data : r));
        toast.success('Rule updated successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to update rule');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error updating notification rule:', err);
      return null;
    }
  }, []);

  const deleteRule = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.deleteNotificationRule(id);
      if (response.success) {
        setRules(prev => prev.filter(r => r.id !== id));
        toast.success('Rule deleted successfully');
        return true;
      } else {
        toast.error(response.message || 'Failed to delete rule');
        return false;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error deleting notification rule:', err);
      return false;
    }
  }, []);

  return {
    rules,
    loading,
    error,
    fetchRules,
    createRule,
    updateRule,
    deleteRule
  };
};

export const useWebhookConfigs = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getWebhookConfigs();
      if (response.success) {
        setWebhooks(response.data);
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch webhook configurations');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching webhook configurations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const createWebhook = useCallback(async (webhook: Omit<WebhookConfig, 'id'>) => {
    try {
      const response = await notificationApi.createWebhookConfig(webhook);
      if (response.success) {
        setWebhooks(prev => [...prev, response.data]);
        toast.success('Webhook created successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to create webhook');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error creating webhook configuration:', err);
      return null;
    }
  }, []);

  const updateWebhook = useCallback(async (id: string, updates: Partial<Omit<WebhookConfig, 'id'>>) => {
    try {
      const response = await notificationApi.updateWebhookConfig(id, updates);
      if (response.success) {
        setWebhooks(prev => prev.map(w => w.id === id ? response.data : w));
        toast.success('Webhook updated successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to update webhook');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error updating webhook configuration:', err);
      return null;
    }
  }, []);

  const deleteWebhook = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.deleteWebhookConfig(id);
      if (response.success) {
        setWebhooks(prev => prev.filter(w => w.id !== id));
        toast.success('Webhook deleted successfully');
        return true;
      } else {
        toast.error(response.message || 'Failed to delete webhook');
        return false;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error deleting webhook configuration:', err);
      return false;
    }
  }, []);

  const testWebhook = useCallback(async (webhook: WebhookConfig) => {
    try {
      const response = await notificationApi.testWebhook(webhook);
      if (response.success) {
        toast.success('Webhook test successful');
        return true;
      } else {
        toast.error(response.message || 'Webhook test failed');
        return false;
      }
    } catch (err) {
      toast.error('An unexpected error occurred during webhook test');
      console.error('Error testing webhook:', err);
      return false;
    }
  }, []);

  return {
    webhooks,
    loading,
    error,
    fetchWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    testWebhook
  };
};

export const useNotificationLogs = (limit: number = 50) => {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async (offset: number = 0) => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationLogs(limit, offset);
      if (response.success) {
        setLogs(response.data);
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch notification logs');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching notification logs:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const getLogDetail = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.getNotificationLogById(id);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message || 'Failed to fetch notification log details');
        return null;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error fetching notification log details:', err);
      return null;
    }
  }, []);

  const retryNotification = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.retryNotification(id);
      if (response.success) {
        setLogs(prev => prev.map(log => log.id === id ? response.data : log));
        toast.success('Notification retry initiated');
        return true;
      } else {
        toast.error(response.message || 'Failed to retry notification');
        return false;
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error('Error retrying notification:', err);
      return false;
    }
  }, []);

  return {
    logs,
    loading,
    error,
    fetchLogs,
    getLogDetail,
    retryNotification
  };
};

export const useSystemHealth = () => {
  const [health, setHealth] = useState<{
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
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getSystemHealth();
      if (response.success) {
        setHealth(response.data);
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch system health');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching system health:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    // Set up periodic refresh
    const intervalId = setInterval(fetchHealth, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [fetchHealth]);

  return {
    health,
    loading,
    error,
    fetchHealth
  };
};

export const useNotificationEvents = () => {
  const publishEvent = useCallback(async (
    type: EventType,
    entityId: string,
    entityType: string,
    data: Record<string, any>
  ) => {
    try {
      const response = await notificationApi.publishEvent({
        type,
        entityId,
        entityType,
        data,
        createdBy: 'current-user'
      });
      
      if (response.success) {
        return response.data;
      } else {
        console.error('Failed to publish notification event:', response.message);
        return null;
      }
    } catch (err) {
      console.error('Error publishing notification event:', err);
      return null;
    }
  }, []);

  return { publishEvent };
};
