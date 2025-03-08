
import { useState, useEffect, useCallback } from 'react';
import { notificationApi } from '@/utils/api/notificationApi';
import { NotificationTemplate, WebhookConfig, NotificationLog, EventType } from '@/utils/types/notification';
import { toast } from 'sonner';

// Hook for managing notification templates
export const useNotificationTemplates = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationTemplates();
      if (response.success && response.data) {
        setTemplates(response.data);
      } else {
        toast.error('Failed to load notification templates');
      }
    } catch (error) {
      console.error('Error fetching notification templates:', error);
      toast.error('An error occurred while loading templates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const updateTemplate = useCallback(async (id: string, updates: Partial<NotificationTemplate>) => {
    try {
      const response = await notificationApi.updateNotificationTemplate(id, updates);
      if (response.success && response.data) {
        setTemplates(templates => templates.map(template => 
          template.id === id ? response.data : template
        ));
        toast.success('Template updated successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to update template');
        return null;
      }
    } catch (error) {
      console.error('Error updating notification template:', error);
      toast.error('An error occurred while updating template');
      return null;
    }
  }, []);

  const createTemplate = useCallback(async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>) => {
    try {
      const response = await notificationApi.createNotificationTemplate(template);
      if (response.success && response.data) {
        setTemplates(templates => [...templates, response.data]);
        toast.success('Template created successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to create template');
        return null;
      }
    } catch (error) {
      console.error('Error creating notification template:', error);
      toast.error('An error occurred while creating template');
      return null;
    }
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.deleteNotificationTemplate(id);
      if (response.success && response.data) {
        setTemplates(templates => templates.filter(template => template.id !== id));
        toast.success('Template deleted successfully');
        return true;
      } else {
        toast.error(response.message || 'Failed to delete template');
        return false;
      }
    } catch (error) {
      console.error('Error deleting notification template:', error);
      toast.error('An error occurred while deleting template');
      return false;
    }
  }, []);

  return {
    templates,
    loading,
    fetchTemplates,
    updateTemplate,
    createTemplate,
    deleteTemplate
  };
};

// Hook for managing webhook configurations
export const useWebhookConfigurations = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWebhooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getWebhookConfigurations();
      if (response.success && response.data) {
        setWebhooks(response.data);
      } else {
        toast.error('Failed to load webhook configurations');
      }
    } catch (error) {
      console.error('Error fetching webhook configurations:', error);
      toast.error('An error occurred while loading webhooks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const updateWebhook = useCallback(async (id: string, updates: Partial<WebhookConfig>) => {
    try {
      const response = await notificationApi.updateWebhookConfiguration(id, updates);
      if (response.success && response.data) {
        setWebhooks(webhooks => webhooks.map(webhook => 
          webhook.id === id ? response.data : webhook
        ));
        toast.success('Webhook updated successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to update webhook');
        return null;
      }
    } catch (error) {
      console.error('Error updating webhook configuration:', error);
      toast.error('An error occurred while updating webhook');
      return null;
    }
  }, []);

  const createWebhook = useCallback(async (webhook: Omit<WebhookConfig, 'id'>) => {
    try {
      const response = await notificationApi.createWebhookConfiguration(webhook);
      if (response.success && response.data) {
        setWebhooks(webhooks => [...webhooks, response.data]);
        toast.success('Webhook created successfully');
        return response.data;
      } else {
        toast.error(response.message || 'Failed to create webhook');
        return null;
      }
    } catch (error) {
      console.error('Error creating webhook configuration:', error);
      toast.error('An error occurred while creating webhook');
      return null;
    }
  }, []);

  const deleteWebhook = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.deleteWebhookConfiguration(id);
      if (response.success && response.data) {
        setWebhooks(webhooks => webhooks.filter(webhook => webhook.id !== id));
        toast.success('Webhook deleted successfully');
        return true;
      } else {
        toast.error(response.message || 'Failed to delete webhook');
        return false;
      }
    } catch (error) {
      console.error('Error deleting webhook configuration:', error);
      toast.error('An error occurred while deleting webhook');
      return false;
    }
  }, []);

  const testWebhook = useCallback(async (webhookData: { url: string; authType: string; authCredentials?: string }) => {
    try {
      const response = await notificationApi.testWebhook(webhookData);
      return response;
    } catch (error) {
      console.error('Error testing webhook:', error);
      toast.error('An error occurred while testing webhook');
      throw error;
    }
  }, []);

  return {
    webhooks,
    loading,
    fetchWebhooks,
    updateWebhook,
    createWebhook,
    deleteWebhook,
    testWebhook
  };
};

// Export with multiple aliases for backward compatibility
export const useWebhooks = useWebhookConfigurations;
export const useWebhookConfigs = useWebhookConfigurations;

// Hook for notification logs
export const useNotificationLogs = () => {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotificationLogs();
      if (response.success && response.data) {
        setLogs(response.data);
      } else {
        toast.error('Failed to load notification logs');
      }
    } catch (error) {
      console.error('Error fetching notification logs:', error);
      toast.error('An error occurred while loading logs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const retryNotification = useCallback(async (id: string) => {
    try {
      const response = await notificationApi.retryNotification(id);
      if (response.success) {
        fetchLogs(); // Refresh logs after retry
        toast.success('Notification retry initiated');
        return true;
      } else {
        toast.error(response.message || 'Failed to retry notification');
        return false;
      }
    } catch (error) {
      console.error('Error retrying notification:', error);
      toast.error('An error occurred while retrying notification');
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
export const useNotificationSystemHealth = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshHealthData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getSystemHealth();
      if (response.success && response.data) {
        setHealthData(response.data);
      } else {
        toast.error('Failed to load system health data');
      }
    } catch (error) {
      console.error('Error fetching system health data:', error);
      toast.error('An error occurred while loading health data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshHealthData();
    // Set up polling for health data (every 30 seconds)
    const intervalId = setInterval(refreshHealthData, 30000);
    return () => clearInterval(intervalId);
  }, [refreshHealthData]);

  return {
    healthData,
    loading,
    refreshHealthData
  };
};

// Export with multiple aliases for backward compatibility
export const useNotificationSystem = useNotificationSystemHealth;
