
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNotificationLogs } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Eye, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const NotificationLogsList: React.FC = () => {
  const { logs, loading, error, refreshLogs, retryNotification } = useNotificationLogs();
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (log: any) => {
    setSelectedLog(log);
    setDetailsOpen(true);
  };

  const handleRetry = async (id: string) => {
    await retryNotification(id);
    setDetailsOpen(false);
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="success">Sent</Badge>;
      case 'queued':
        return <Badge variant="secondary">Queued</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'retrying':
        return <Badge variant="warning">Retrying</Badge>;
      default:
        if (status.startsWith('Retrying')) {
          return <Badge variant="warning">{status}</Badge>;
        }
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive">
        Error loading notification logs: {error}
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={refreshLogs}
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notification Logs</h2>
        <Button variant="outline" size="sm" onClick={refreshLogs}>
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No notification logs found
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {format(new Date(log.timestamp), 'MM/dd HH:mm:ss')}
                  </TableCell>
                  <TableCell>{log.eventType}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {log.recipientEmail}
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(log)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>
              Detailed information about this notification
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Event Type:</div>
                <div>{selectedLog.eventType}</div>

                <div className="font-medium">Time:</div>
                <div>
                  {format(
                    new Date(selectedLog.timestamp),
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                </div>

                <div className="font-medium">Recipient:</div>
                <div>{selectedLog.recipientEmail}</div>

                <div className="font-medium">Status:</div>
                <div>{getStatusBadge(selectedLog.status)}</div>

                <div className="font-medium">Channel:</div>
                <div className="capitalize">{selectedLog.channel}</div>

                <div className="font-medium">Record:</div>
                <div>{selectedLog.recordId}</div>
              </div>

              {selectedLog.error && (
                <div className="mt-4">
                  <div className="font-medium">Error:</div>
                  <div className="text-destructive bg-destructive/10 p-2 rounded text-sm mt-1">
                    {selectedLog.error}
                  </div>
                </div>
              )}

              {selectedLog.retryCount > 0 && (
                <div className="text-sm">
                  Retry {selectedLog.retryCount} of 3
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedLog && selectedLog.status === 'failed' && (
              <Button
                onClick={() => handleRetry(selectedLog.id)}
                variant="default"
              >
                Retry Now
              </Button>
            )}
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationLogsList;
