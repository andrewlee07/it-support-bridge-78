
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { NotificationLog } from '@/utils/types/notification';
import { useNotificationLogs } from '@/hooks/useNotifications';

interface NotificationLogsListProps {
  className?: string;
}

const NotificationLogsList: React.FC<NotificationLogsListProps> = ({ className }) => {
  const { logs, loading, fetchLogs, retryNotification } = useNotificationLogs();
  const [selectedLog, setSelectedLog] = useState<NotificationLog | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="success">{status}</Badge>;
      case 'failed':
        return <Badge variant="destructive">{status}</Badge>;
      case 'retrying':
      case 'queued':
        return <Badge variant="warning">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewDetail = (log: NotificationLog) => {
    setSelectedLog(log);
    setIsDetailOpen(true);
  };

  const handleRetry = async () => {
    if (!selectedLog) return;
    
    setIsRetrying(true);
    try {
      await retryNotification(selectedLog.id);
      await fetchLogs();
      setIsDetailOpen(false);
    } finally {
      setIsRetrying(false);
    }
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy HH:mm:ss');
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Notification Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-4 text-center">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">
              No notification logs found
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.eventType}</Badge>
                      </TableCell>
                      <TableCell>{log.recipientEmail}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(log)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedLog && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Notification Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Event Type</div>
                <div>{selectedLog.eventType}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Time</div>
                <div>{formatDate(selectedLog.timestamp)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Recipient</div>
                <div>{selectedLog.recipientEmail}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div>{getStatusBadge(selectedLog.status)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Channel</div>
                <div className="capitalize">{selectedLog.channel}</div>
              </div>
              {selectedLog.error && (
                <div>
                  <div className="text-sm text-muted-foreground">Error</div>
                  <div className="text-destructive text-sm">{selectedLog.error}</div>
                </div>
              )}
              {selectedLog.retryCount !== undefined && (
                <div>
                  <div className="text-sm text-muted-foreground">Retry Count</div>
                  <div>{selectedLog.retryCount}</div>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedLog.status === 'failed' && (
                <Button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="mr-auto"
                >
                  {isRetrying ? 'Retrying...' : 'Retry Now'}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setIsDetailOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default NotificationLogsList;
