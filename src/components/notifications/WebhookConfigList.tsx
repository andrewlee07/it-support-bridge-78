
import React, { useState } from 'react';
import { useWebhookConfigs } from '@/hooks/useNotifications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Globe, Plus } from 'lucide-react';
import { toast } from 'sonner';
import WebhookConfigForm from './WebhookConfigForm';
import { WebhookConfig } from '@/hooks/useNotifications';

const WebhookConfigList: React.FC = () => {
  const { webhooks, isLoading, deleteWebhook } = useWebhookConfigs();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<WebhookConfig | null>(null);

  const handleEditWebhook = (webhook: WebhookConfig) => {
    setEditingWebhook(webhook);
    setIsCreateFormOpen(false);
  };

  const handleCreateWebhook = () => {
    setEditingWebhook(null);
    setIsCreateFormOpen(true);
  };

  const handleDeleteWebhook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this webhook configuration?')) {
      deleteWebhook(id, {
        onSuccess: () => {
          toast.success('Webhook configuration deleted');
        },
        onError: () => {
          toast.error('Failed to delete webhook configuration');
        }
      });
    }
  };

  const handleFormSuccess = () => {
    setIsCreateFormOpen(false);
    setEditingWebhook(null);
  };

  const handleFormCancel = () => {
    setIsCreateFormOpen(false);
    setEditingWebhook(null);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading webhook configurations...</div>;
  }

  if (isCreateFormOpen) {
    return (
      <WebhookConfigForm
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  if (editingWebhook) {
    return (
      <WebhookConfigForm
        initialData={editingWebhook}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Webhook Configurations</CardTitle>
        <Button onClick={handleCreateWebhook} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </Button>
      </CardHeader>
      <CardContent>
        {webhooks.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No webhook configurations found. Create one to start sending event notifications.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate max-w-[200px]">{webhook.url}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.eventTypes.slice(0, 2).map((type) => (
                        <Badge key={type} variant="secondary" className="whitespace-nowrap">
                          {type}
                        </Badge>
                      ))}
                      {webhook.eventTypes.length > 2 && (
                        <Badge variant="secondary">
                          +{webhook.eventTypes.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={webhook.isActive ? "success" : "secondary"}
                    >
                      {webhook.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditWebhook(webhook)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteWebhook(webhook.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookConfigList;
