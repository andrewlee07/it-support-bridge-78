
import React, { useState } from 'react';
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  Webhook,
  Plus,
  Search,
  ArrowUpDown
} from 'lucide-react';
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
  }
];

// Get channel icon based on channel type
const getChannelIcon = (type: string) => {
  switch (type) {
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'slack':
    case 'teams':
      return <MessageSquare className="h-4 w-4" />;
    case 'inApp':
      return <Bell className="h-4 w-4" />;
    case 'sms':
      return <Smartphone className="h-4 w-4" />;
    case 'webhook':
      return <Webhook className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificationChannelList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channels, setChannels] = useState<NotificationChannel[]>(mockChannels);
  
  // Handle toggle channel enabled state
  const toggleChannelEnabled = (id: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };
  
  // Filter channels based on search query
  const filteredChannels = searchQuery
    ? channels.filter(channel => 
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : channels;
    
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Channel
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Priority
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Capabilities</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChannels.length > 0 ? (
                filteredChannels.map((channel) => (
                  <TableRow key={channel.id}>
                    <TableCell>
                      <div className="font-medium flex items-center">
                        {getChannelIcon(channel.type)}
                        <span className="ml-2">{channel.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {channel.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {channel.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{channel.priority}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {channel.capabilities.supportsFormatting && 
                          <Badge variant="secondary" className="text-xs">Formatting</Badge>}
                        {channel.capabilities.supportsAttachments && 
                          <Badge variant="secondary" className="text-xs">Attachments</Badge>}
                        {channel.capabilities.supportsThreading && 
                          <Badge variant="secondary" className="text-xs">Threading</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={channel.enabled} 
                        onCheckedChange={() => toggleChannelEnabled(channel.id)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Configure</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No channels found. Try adjusting your search or create a new channel.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationChannelList;
