
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WebhookConfig } from '@/utils/types/notification';
import { useWebhooks } from '@/hooks/useNotifications';
import WebhookConfigForm from './WebhookConfigForm';

interface WebhookConfigListProps {
  className?: string;
}

const WebhookConfigList: React.FC<WebhookConfigListProps> = ({ className }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookConfig | undefined>(undefined);
  const { webhooks, loading, fetchWebhooks } = useWebhooks();

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const handleAddWebhook = () => {
    setSelectedWebhook(undefined);
    setIsFormOpen(true);
  };

  const handleEditWebhook = (webhook: WebhookConfig) => {
    setSelectedWebhook(webhook);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedWebhook(undefined);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Webhook Configurations</h2>
        <Button onClick={handleAddWebhook}>Add Webhook</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <p>Loading webhooks...</p>
        </div>
      ) : webhooks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No webhook configurations found</p>
            <Button onClick={handleAddWebhook}>Add Your First Webhook</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{webhook.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 truncate max-w-[300px]">
                      {webhook.url}
                    </p>
                  </div>
                  <Badge variant={webhook.isActive ? "success" : "secondary"}>
                    {webhook.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="text-sm mb-1">Events:</div>
                  <div className="flex flex-wrap gap-1">
                    {webhook.eventTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditWebhook(webhook)}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isFormOpen && (
        <WebhookConfigForm
          webhook={selectedWebhook}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default WebhookConfigList;
