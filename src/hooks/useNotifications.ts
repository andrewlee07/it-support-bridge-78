
import { useState, useCallback, useEffect } from 'react';
import { notificationApi } from '@/utils/api/notificationApi';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { 
  NotificationTemplate, 
  WebhookConfig,
  NotificationLog,
  EventType 
} from '@/utils/types/notification';
import { EmailTemplate } from '@/utils/types';

// Re-export types from notification.ts to ensure consistency
export type { NotificationTemplate, WebhookConfig, NotificationLog, EventType };

// System health hook
export const useNotificationSystem = () => {
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSystemHealth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await notificationApi.getSystemHealth();
      if (response.success) {
        setSystemHealth(response.data);
      } else {
        setError(response.error || 'Failed to load system health');
      }
    } catch (err) {
      setError('An error occurred while fetching system health');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSystemHealth();
  }, [fetchSystemHealth]);

  return {
    systemHealth,
    loading,
    error,
    refreshData: fetchSystemHealth
  };
};

// Email templates hook
export const useEmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await emailNotificationApi.getEmailTemplates();
      if (response.success) {
        setTemplates(response.data);
      } else {
        setError(response.error || 'Failed to load email templates');
      }
    } catch (err) {
      setError('An error occurred while fetching templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const createTemplate = async (template: Omit<EmailTemplate, 'id'>) => {
    const response = await emailNotificationApi.createEmailTemplate(template);
    if (response.success) {
      fetchTemplates();
    }
    return response;
  };

  const updateTemplate = async (id: string, updates: Partial<EmailTemplate>) => {
    const response = await emailNotificationApi.updateEmailTemplate(id, updates);
    if (response.success) {
      fetchTemplates();
    }
    return response;
  };

  const deleteTemplate = async (id: string) => {
    const response = await emailNotificationApi.deleteEmailTemplate(id);
    if (response.success) {
      fetchTemplates();
    }
    return response;
  };

  const testTemplate = async (template: Pick<EmailTemplate, 'subject' | 'body'>, testData: Record<string, string>) => {
    return await emailNotificationApi.testEmailTemplate(template, testData);
  };

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    testTemplate
  };
};

// Notification templates hook (using notificationApi adapter)
export const useNotificationTemplates = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await notificationApi.getNotificationTemplates();
      if (response.success) {
        setTemplates(response.data);
      } else {
        setError(response.error || 'Failed to load notification templates');
      }
    } catch (err) {
      setError('An error occurred while fetching templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const createTemplate = async (template: Omit<NotificationTemplate, 'id' | 'lastModified' | 'lastModifiedBy'>) => {
    const response = await notificationApi.createNotificationTemplate(template);
    if (response.success) {
      fetchTemplates();
    }
    return response;
  };

  const updateTemplate = async (id: string, updates: Partial<NotificationTemplate>) => {
    const response = await notificationApi.updateNotificationTemplate(id, updates);
    if (response.success) {
      fetchTemplates();
    }
    return response;
  };

  const deleteTemplate = async (id: string) => {
    const response = await notificationApi.deleteNotificationTemplate(id);
    if (response.success) {
      fetchTemplates();
    }
    return response;
  };

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

// Webhooks hook
export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await notificationApi.getWebhookConfigurations();
      if (response.success) {
        setWebhooks(response.data);
      } else {
        setError(response.error || 'Failed to load webhook configurations');
      }
    } catch (err) {
      setError('An error occurred while fetching webhooks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const createWebhook = async (webhook: Omit<WebhookConfig, 'id'>) => {
    const response = await notificationApi.createWebhookConfiguration(webhook);
    if (response.success) {
      fetchWebhooks();
    }
    return response;
  };

  const updateWebhook = async (id: string, updates: Partial<WebhookConfig>) => {
    const response = await notificationApi.updateWebhookConfiguration(id, updates);
    if (response.success) {
      fetchWebhooks();
    }
    return response;
  };

  const deleteWebhook = async (id: string) => {
    const response = await notificationApi.deleteWebhookConfiguration(id);
    if (response.success) {
      fetchWebhooks();
    }
    return response;
  };

  const testWebhook = async (webhook: { url: string; authType: string; authCredentials?: string }) => {
    return await notificationApi.testWebhook(webhook);
  };

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

// Notification logs hook
export const useNotificationLogs = () => {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await notificationApi.getNotificationLogs();
      if (response.success) {
        setLogs(response.data);
      } else {
        setError(response.error || 'Failed to load notification logs');
      }
    } catch (err) {
      setError('An error occurred while fetching logs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const retryNotification = async (id: string) => {
    const response = await notificationApi.retryNotification(id);
    if (response.success) {
      fetchLogs();
    }
    return response;
  };

  return {
    logs,
    loading,
    error,
    fetchLogs,
    retryNotification
  };
};
