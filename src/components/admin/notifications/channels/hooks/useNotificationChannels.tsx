
import { useState } from 'react';
import { NotificationChannel } from '@/utils/types/eventBus/notificationTypes';

// Sample notification channels for the mockup
const mockChannels: NotificationChannel[] = [
  {
    id: 'channel-1',
    name: 'Email Notifications',
    type: 'email',
    enabled: true,
    priority: 1,
    capabilities: {
      supportsFormatting: true,
      supportsAttachments: true,
      supportsThreading: true,
      supportsAcknowledgement: false,
      supportsReply: true,
      maxMessageSize: 10485760 // 10MB
    },
    deliverySettings: {
      retryCount: 3,
      retryInterval: 15,
      expiresAfter: 1440 // 24 hours
    },
    description: 'Transactional email notifications via SMTP',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'channel-2',
    name: 'In-App Notifications',
    type: 'inApp',
    enabled: true,
    priority: 0,
    capabilities: {
      supportsFormatting: true,
      supportsAttachments: false,
      supportsThreading: false,
      supportsAcknowledgement: true,
      supportsReply: false
    },
    deliverySettings: {
      retryCount: 1,
      retryInterval: 1
    },
    description: 'Real-time in-app notifications',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'channel-3',
    name: 'Slack Integration',
    type: 'slack',
    enabled: true,
    priority: 2,
    capabilities: {
      supportsFormatting: true,
      supportsAttachments: true,
      supportsThreading: true,
      supportsAcknowledgement: false,
      supportsReply: true
    },
    deliverySettings: {
      retryCount: 3,
      retryInterval: 5
    },
    description: 'Notifications via Slack webhooks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'channel-4',
    name: 'SMS Notifications',
    type: 'sms',
    enabled: false,
    priority: 3,
    capabilities: {
      supportsFormatting: false,
      supportsAttachments: false,
      supportsThreading: false,
      supportsAcknowledgement: false,
      supportsReply: false,
      maxMessageSize: 160 // SMS character limit
    },
    deliverySettings: {
      retryCount: 2,
      retryInterval: 10
    },
    description: 'SMS notifications for critical alerts',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'channel-5',
    name: 'External Webhook',
    type: 'webhook',
    enabled: true,
    priority: 4,
    capabilities: {
      supportsFormatting: true,
      supportsAttachments: true,
      supportsThreading: false,
      supportsAcknowledgement: false,
      supportsReply: false
    },
    deliverySettings: {
      retryCount: 5,
      retryInterval: 30,
      expiresAfter: 720 // 12 hours
    },
    description: 'Integration with external systems via webhooks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'channel-6',
    name: 'Microsoft Teams',
    type: 'teams',
    enabled: true,
    priority: 2,
    capabilities: {
      supportsFormatting: true,
      supportsAttachments: true,
      supportsThreading: true,
      supportsAcknowledgement: false,
      supportsReply: true
    },
    deliverySettings: {
      retryCount: 3,
      retryInterval: 5
    },
    description: 'Notifications via Microsoft Teams webhooks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Ensure all properties are explicitly required, not optional
export interface NewChannelParams {
  name: string;
  type: string;
  description: string;
}

export const useNotificationChannels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channels, setChannels] = useState<NotificationChannel[]>(mockChannels);
  
  // Handle toggle channel enabled state
  const toggleChannelEnabled = (id: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };
  
  // Add a new channel
  const addNewChannel = (params: NewChannelParams) => {
    const newChannel: NotificationChannel = {
      id: `channel-${Date.now()}`,
      name: params.name,
      type: params.type as any,
      enabled: true,
      priority: channels.length + 1,
      capabilities: {
        supportsFormatting: true,
        supportsAttachments: true,
        supportsThreading: true,
        supportsAcknowledgement: false,
        supportsReply: true
      },
      deliverySettings: {
        retryCount: 3,
        retryInterval: 15
      },
      description: params.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setChannels(prev => [...prev, newChannel]);
  };
  
  // Filter channels based on search query
  const filteredChannels = searchQuery
    ? channels.filter(channel => 
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : channels;
    
  return {
    searchQuery,
    setSearchQuery,
    channels,
    filteredChannels,
    toggleChannelEnabled,
    addNewChannel
  };
};
