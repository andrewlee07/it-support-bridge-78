
import { useState, useCallback, useEffect } from 'react';
import { 
  fetchNotificationTemplates, 
  fetchNotificationTemplateById,
  createNotificationTemplate, 
  updateNotificationTemplate,
  deleteNotificationTemplate,
  fetchNotificationLogs,
  retryNotification,
  fetchWebhooks,
  fetchWebhookById,
  createWebhook,
  updateWebhook,
  deleteWebhook,
  testWebhook,
  fetchNotificationRules,
  updateNotificationRule,
  fetchSystemHealth
} from '@/utils/api/notificationApi';
import { 
  NotificationTemplate, 
  NotificationLog, 
  WebhookConfig, 
  NotificationRule 
} from '@/utils/types/notification';
import { useToast } from '@/hooks/use-toast';

// Hook for notification templates management
export const useNotificationTemplates = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotificationTemplates();
      setTemplates(data);
    } catch (err) {
      console.error('Error fetching notification templates:', err);
      setError('Failed to load notification templates');
      toast({
        variant: "destructive",
        title: "Error loading templates",
        description: "Could not load notification templates. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getTemplateById = useCallback(async (id: string) => {
    try {
      return await fetchNotificationTemplateById(id);
    } catch (err) {
      console.error('Error fetching template by ID:', err);
      toast({
        variant: "destructive",
        title: "Error loading template",
        description: "Could not load the specified template."
      });
      return null;
    }
  }, [toast]);

  const createTemplate = useCallback(async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>) => {
    try {
      const newTemplate = await createNotificationTemplate(template);
      setTemplates(prev => [...prev, newTemplate]);
      toast({
        title: "Template created",
        description: "The notification template was created successfully."
      });
      return newTemplate;
    } catch (err) {
      console.error('Error creating template:', err);
      toast({
        variant: "destructive",
        title: "Error creating template",
        description: "Failed to create the notification template."
      });
      throw err;
    }
  }, [toast]);

  const updateTemplate = useCallback(async (id: string, template: Partial<NotificationTemplate>) => {
    try {
      const updatedTemplate = await updateNotificationTemplate(id, template);
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t));
      toast({
        title: "Template updated",
        description: "The notification template was updated successfully."
      });
      return updatedTemplate;
    } catch (err) {
      console.error('Error updating template:', err);
      toast({
        variant: "destructive",
        title: "Error updating template",
        description: "Failed to update the notification template."
      });
      throw err;
    }
  }, [toast]);

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      await deleteNotificationTemplate(id);
      setTemplates(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Template deleted",
        description: "The notification template was deleted successfully."
      });
    } catch (err) {
      console.error('Error deleting template:', err);
      toast({
        variant: "destructive",
        title: "Error deleting template",
        description: "Failed to delete the notification template."
      });
      throw err;
    }
  }, [toast]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
};

// Hook for notification logs
export const useNotificationLogs = () => {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotificationLogs();
      setLogs(data);
    } catch (err) {
      console.error('Error fetching notification logs:', err);
      setError('Failed to load notification logs');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchNotificationLogs();
      setLogs(data);
      setError(null);
      toast({
        title: "Logs refreshed",
        description: "Notification logs have been refreshed."
      });
    } catch (err) {
      console.error('Error refreshing logs:', err);
      setError('Failed to refresh logs');
      toast({
        variant: "destructive",
        title: "Error refreshing logs",
        description: "Could not refresh notification logs."
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const retryNotificationById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const updatedLog = await retryNotification(id);
      setLogs(prev => prev.map(log => log.id === id ? updatedLog : log));
      toast({
        title: "Retry initiated",
        description: "Notification retry has been initiated."
      });
      return updatedLog;
    } catch (err) {
      console.error('Error retrying notification:', err);
      toast({
        variant: "destructive",
        title: "Error retrying notification",
        description: "Failed to retry the notification."
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    refreshLogs,
    retryNotification: retryNotificationById
  };
};

// Hook for webhooks management
export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAllWebhooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWebhooks();
      setWebhooks(data);
    } catch (err) {
      console.error('Error fetching webhooks:', err);
      setError('Failed to load webhooks');
    } finally {
      setLoading(false);
    }
  }, []);

  const getWebhookById = useCallback(async (id: string) => {
    try {
      return await fetchWebhookById(id);
    } catch (err) {
      console.error('Error fetching webhook by ID:', err);
      return null;
    }
  }, []);

  const createWebhookConfig = useCallback(async (webhook: Omit<WebhookConfig, 'id'>) => {
    try {
      const newWebhook = await createWebhook(webhook);
      setWebhooks(prev => [...prev, newWebhook]);
      return newWebhook;
    } catch (err) {
      console.error('Error creating webhook:', err);
      throw err;
    }
  }, []);

  const updateWebhookConfig = useCallback(async (id: string, webhook: Partial<WebhookConfig>) => {
    try {
      const updatedWebhook = await updateWebhook(id, webhook);
      setWebhooks(prev => prev.map(w => w.id === id ? updatedWebhook : w));
      return updatedWebhook;
    } catch (err) {
      console.error('Error updating webhook:', err);
      throw err;
    }
  }, []);

  const deleteWebhookConfig = useCallback(async (id: string) => {
    try {
      await deleteWebhook(id);
      setWebhooks(prev => prev.filter(w => w.id !== id));
      toast({
        title: "Webhook deleted",
        description: "The webhook configuration was deleted successfully."
      });
    } catch (err) {
      console.error('Error deleting webhook:', err);
      toast({
        variant: "destructive",
        title: "Error deleting webhook",
        description: "Failed to delete the webhook."
      });
      throw err;
    }
  }, [toast]);

  const testWebhookConfig = useCallback(async (config: { url: string; authType: string; authCredentials?: string }) => {
    try {
      return await testWebhook(config);
    } catch (err) {
      console.error('Error testing webhook:', err);
      return { success: false, message: 'Error testing webhook' };
    }
  }, []);

  useEffect(() => {
    fetchAllWebhooks();
  }, [fetchAllWebhooks]);

  return {
    webhooks,
    loading,
    error,
    fetchWebhooks: fetchAllWebhooks,
    getWebhookById,
    createWebhook: createWebhookConfig,
    updateWebhook: updateWebhookConfig,
    deleteWebhook: deleteWebhookConfig,
    testWebhook: testWebhookConfig
  };
};

// Hook for notification rules management
export const useNotificationRules = () => {
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotificationRules();
      setRules(data);
    } catch (err) {
      console.error('Error fetching notification rules:', err);
      setError('Failed to load notification rules');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRule = useCallback(async (id: string, rule: Partial<NotificationRule>) => {
    try {
      const updatedRule = await updateNotificationRule(id, rule);
      setRules(prev => prev.map(r => r.id === id ? updatedRule : r));
      toast({
        title: "Rule updated",
        description: "The notification rule was updated successfully."
      });
      return updatedRule;
    } catch (err) {
      console.error('Error updating rule:', err);
      toast({
        variant: "destructive",
        title: "Error updating rule",
        description: "Failed to update the notification rule."
      });
      throw err;
    }
  }, [toast]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  return {
    rules,
    loading,
    error,
    fetchRules,
    updateRule
  };
};

// Hook for system health monitoring
export const useSystemHealth = () => {
  const [health, setHealth] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSystemHealth();
      setHealth(data);
    } catch (err) {
      console.error('Error fetching system health:', err);
      setError('Failed to load system health data');
      toast({
        variant: "destructive",
        title: "Error loading system health",
        description: "Could not load system health information."
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return {
    health,
    loading,
    error,
    fetchHealth
  };
};
