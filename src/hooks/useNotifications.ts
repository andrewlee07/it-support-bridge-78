import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { 
  SystemHealthReport, 
  EmailTemplate, 
  NotificationEvent, 
  EventType, 
  WebhookConfig 
} from '@/utils/types/email';
import { ApiResponse } from '@/utils/types/api';

// Mock data for system health
const mockSystemHealth: SystemHealthReport = {
  overallStatus: 'healthy',
  components: [
    {
      name: 'Email Delivery',
      status: 'healthy',
      latency: 245,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'Webhook Delivery',
      status: 'healthy',
      latency: 120,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'Queue Processing',
      status: 'healthy',
      latency: 85,
      lastChecked: new Date().toISOString(),
    },
  ],
  stats: {
    notificationsSent: 1452,
    successRate: 99.2,
    avgDeliveryTime: 1.8,
    queueLength: 5,
  },
  lastUpdated: new Date().toISOString(),
};

// Mock notification logs
const mockNotificationLogs: NotificationEvent[] = [
  {
    id: 'event-1',
    type: 'ticket-created',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    targetId: 'ticket-123',
    targetType: 'ticket',
    data: { ticketId: 'ticket-123', title: 'Network issue', priority: 'high' },
  },
  {
    id: 'event-2',
    type: 'change-approved',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    targetId: 'change-456',
    targetType: 'change',
    data: { changeId: 'change-456', title: 'Server maintenance', approvedBy: 'John Doe' },
  },
];

// Mock webhook configs
const mockWebhookConfigs: WebhookConfig[] = [
  {
    id: 'webhook-1',
    name: 'Incident Notifications',
    url: 'https://example.com/webhooks/incidents',
    isActive: true,
    eventTypes: ['ticket-created', 'ticket-updated', 'ticket-resolved'],
    secretKey: 'a1b2c3d4e5f6',
    lastDelivery: {
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: 'success',
      responseCode: 200,
    },
  },
  {
    id: 'webhook-2',
    name: 'Change Management Alerts',
    url: 'https://example.com/webhooks/changes',
    isActive: false,
    eventTypes: ['change-approved', 'change-submitted'],
  },
];

// Hook for notification system features
export const useNotificationSystem = () => {
  // System stats could be fetched from an API endpoint
  const [stats] = useState({
    totalNotifications: 1245,
    failedDeliveries: 12,
    activeTemplates: 8,
    activeWebhooks: 3,
  });

  return {
    stats,
    // Other notification system related methods
  };
};

// Hook for email templates
export const useNotificationTemplates = () => {
  const queryClient = useQueryClient();

  const {
    data: templates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: async () => {
      const response = await emailNotificationApi.getEmailTemplates();
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch email templates');
    },
  });

  const createTemplateMutation = useMutation({
    mutationFn: (template: Omit<EmailTemplate, 'id'>) => {
      return emailNotificationApi.createEmailTemplate(template);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] });
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<EmailTemplate> }) => {
      return emailNotificationApi.updateEmailTemplate(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] });
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: string) => {
      return emailNotificationApi.deleteEmailTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] });
    },
  });

  return {
    templates,
    isLoading,
    error,
    createTemplate: (template: Omit<EmailTemplate, 'id'>) => 
      createTemplateMutation.mutate(template),
    updateTemplate: (id: string, updates: Partial<EmailTemplate>) => 
      updateTemplateMutation.mutate({ id, updates }),
    deleteTemplate: (id: string) => 
      deleteTemplateMutation.mutate(id),
    isCreating: createTemplateMutation.isPending,
    isUpdating: updateTemplateMutation.isPending,
    isDeleting: deleteTemplateMutation.isPending,
  };
};

// Hook for notification logs
export const useNotificationLogs = () => {
  // In a real app, this would fetch from an API
  const { data: logs = mockNotificationLogs, isLoading } = useQuery({
    queryKey: ['notificationLogs'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockNotificationLogs;
    },
  });

  return {
    logs,
    isLoading,
  };
};

// Hook for notification system health
export const useNotificationSystemHealth = () => {
  // In a real app, this would fetch from an API
  const { data: healthReport = mockSystemHealth, isLoading, refetch } = useQuery({
    queryKey: ['notificationSystemHealth'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSystemHealth;
    },
  });

  return {
    healthReport,
    isLoading,
    refetch,
  };
};

// Hook for webhook configurations
export const useWebhookConfigs = () => {
  const queryClient = useQueryClient();
  
  // In a real app, this would fetch from an API
  const { data: webhooks = mockWebhookConfigs, isLoading } = useQuery({
    queryKey: ['webhookConfigs'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockWebhookConfigs;
    },
  });

  const createWebhookMutation = useMutation({
    mutationFn: async (webhook: Omit<WebhookConfig, 'id'>) => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newWebhook: WebhookConfig = {
        ...webhook,
        id: `webhook-${Date.now()}`,
      };
      return newWebhook;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhookConfigs'] });
    },
  });

  const updateWebhookMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<WebhookConfig> }) => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, ...updates };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhookConfigs'] });
    },
  });

  const deleteWebhookMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhookConfigs'] });
    },
  });

  return {
    webhooks,
    isLoading,
    createWebhook: (webhook: Omit<WebhookConfig, 'id'>) => 
      createWebhookMutation.mutate(webhook),
    updateWebhook: (id: string, updates: Partial<WebhookConfig>) => 
      updateWebhookMutation.mutate({ id, updates }),
    deleteWebhook: (id: string) => 
      deleteWebhookMutation.mutate(id),
    isCreating: createWebhookMutation.isPending,
    isUpdating: updateWebhookMutation.isPending,
    isDeleting: deleteWebhookMutation.isPending,
  };
};
