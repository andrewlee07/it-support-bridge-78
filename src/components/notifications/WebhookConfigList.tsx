
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { PencilIcon, MoreVerticalIcon, PlusIcon, TrashIcon, PlayIcon } from 'lucide-react';
import { useWebhookConfigs } from '@/hooks/useNotifications';
import { WebhookConfig } from '@/utils/types/notification';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

interface WebhookConfigListProps {
  onEdit: (webhook: WebhookConfig) => void;
  onAdd: () => void;
}

const WebhookConfigList: React.FC<WebhookConfigListProps> = ({
  onEdit,
  onAdd
}) => {
  const { webhooks, loading, updateWebhook, deleteWebhook, testWebhook } = useWebhookConfigs();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [webhookToDelete, setWebhookToDelete] = useState<WebhookConfig | null>(null);

  const handleToggleActive = async (webhook: WebhookConfig) => {
    await updateWebhook(webhook.id, { isActive: !webhook.isActive });
  };

  const handleDelete = async (webhook: WebhookConfig) => {
    setWebhookToDelete(webhook);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (webhookToDelete) {
      await deleteWebhook(webhookToDelete.id);
      setDeleteDialogOpen(false);
      setWebhookToDelete(null);
    }
  };

  const handleTest = async (webhook: WebhookConfig) => {
    await testWebhook(webhook);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Webhook Configurations</CardTitle>
          <CardDescription>
            Manage external system integrations
          </CardDescription>
        </div>
        <Button onClick={onAdd} variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Webhook
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No webhooks configured. Add your first webhook to get started.
                  </TableCell>
                </TableRow>
              ) : (
                webhooks.map(webhook => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">{webhook.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={webhook.url}>
                      {webhook.url}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.eventTypes.slice(0, 2).map(type => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        ))}
                        {webhook.eventTypes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{webhook.eventTypes.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={webhook.isActive}
                          onCheckedChange={() => handleToggleActive(webhook)}
                        />
                        <Badge variant={webhook.isActive ? "default" : "outline"}>
                          {webhook.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(webhook)}>
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTest(webhook)}>
                            <PlayIcon className="h-4 w-4 mr-2" />
                            Test
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(webhook)}
                            className="text-destructive focus:text-destructive"
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the webhook configuration "{webhookToDelete?.name}". 
              Any integrations using this webhook will stop working.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default WebhookConfigList;
