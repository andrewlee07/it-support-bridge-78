
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { EyeIcon, RefreshCwIcon } from 'lucide-react';
import { useNotificationLogs } from '@/hooks/useNotifications';
import { NotificationLog, NotificationStatus } from '@/utils/types/notification';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const NotificationLogsList: React.FC = () => {
  const { logs, loading, error, fetchLogs, getLogDetail, retryNotification } = useNotificationLogs();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<NotificationLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  
  const handleViewDetail = async (logId: string) => {
    const log = await getLogDetail(logId);
    if (log) {
      setSelectedLog(log);
      setDetailDialogOpen(true);
    }
  };
  
  const handleRetry = async (logId: string) => {
    await retryNotification(logId);
  };
  
  const handleRefresh = () => {
    fetchLogs();
  };

  const getStatusBadge = (status: NotificationStatus) => {
    switch (status) {
      case 'sent':
        return <Badge variant="success">Sent</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'queued':
        return <Badge variant="outline">Queued</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'retrying':
        return <Badge variant="warning">Retrying</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case 'incident-created': return 'Incident Created';
      case 'incident-assigned': return 'Incident Assigned';
      case 'incident-resolved': return 'Incident Resolved';
      case 'service-request-created': return 'Service Request Created';
      case 'service-request-approval-required': return 'Service Request Approval';
      case 'service-request-completed': return 'Service Request Completed';
      case 'asset-created': return 'Asset Created';
      case 'asset-updated': return 'Asset Updated';
      case 'asset-assigned': return 'Asset Assigned';
      default: return eventType;
    }
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Notification Logs</CardTitle>
            <CardDescription>
              History of sent and failed notifications
            </CardDescription>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-4 text-destructive">
              Error loading notification logs: {error}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No notification logs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                        </TableCell>
                        <TableCell>{getEventTypeLabel(log.eventType)}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={log.recipientEmail}>
                          {log.recipientEmail}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(log.status)}
                          {log.retryCount ? <span className="ml-2 text-xs">({log.retryCount})</span> : null}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewDetail(log.id)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            {log.status === 'failed' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRetry(log.id)}
                              >
                                <RefreshCwIcon className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => 
                        i + 1 >= currentPage - 2 && i + 1 <= currentPage + 2 ? (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => paginate(i + 1)}
                              isActive={currentPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ) : null
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>
              Detailed information about the notification
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Event Type</div>
                  <div>{getEventTypeLabel(selectedLog.eventType)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Status</div>
                  <div className="flex items-center">
                    {getStatusBadge(selectedLog.status)}
                    {selectedLog.retryCount && (
                      <span className="ml-2 text-sm">
                        Retry {selectedLog.retryCount}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Timestamp</div>
                  <div>{format(new Date(selectedLog.timestamp), 'PPpp')}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Recipient</div>
                  <div>{selectedLog.recipientEmail}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Channel</div>
                  <div className="capitalize">{selectedLog.channel}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Record ID</div>
                  <div>{selectedLog.recordId}</div>
                </div>
              </div>
              
              {selectedLog.error && (
                <div className="border border-destructive bg-destructive/10 rounded-md p-3">
                  <div className="text-sm font-medium text-destructive">Error</div>
                  <div className="text-destructive">{selectedLog.error}</div>
                </div>
              )}
              
              <DialogFooter>
                {selectedLog.status === 'failed' && (
                  <Button onClick={() => handleRetry(selectedLog.id)}>
                    Retry Now
                  </Button>
                )}
                <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationLogsList;
