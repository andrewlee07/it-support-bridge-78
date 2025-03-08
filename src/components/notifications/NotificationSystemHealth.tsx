
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useSystemHealth } from '@/hooks/useNotifications';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const NotificationSystemHealth: React.FC = () => {
  const { health, loading, error, fetchHealth } = useSystemHealth();

  const getStatusBadge = (status: 'operational' | 'degraded' | 'down') => {
    switch (status) {
      case 'operational':
        return (
          <Badge variant="success" className="ml-2 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Operational
          </Badge>
        );
      case 'degraded':
        return (
          <Badge variant="warning" className="ml-2 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Degraded
          </Badge>
        );
      case 'down':
        return (
          <Badge variant="destructive" className="ml-2 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Down
          </Badge>
        );
      default:
        return null;
    }
  };

  // Helper function to get progress indicator color based on value
  const getProgressIndicatorClass = (value: number) => {
    if (value > 90) return "bg-emerald-500";
    if (value > 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <div>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Notification system performance and status
            </CardDescription>
          </div>
          {!loading && health && getStatusBadge(health.status)}
        </div>
        <Button onClick={fetchHealth} variant="outline" size="sm">
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-destructive">
            Error loading system health: {error}
          </div>
        ) : health ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {health.metrics.totalNotifications.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {health.metrics.successRate.toFixed(1)}%
                  </div>
                  <Progress 
                    value={health.metrics.successRate} 
                    className="mt-2"
                    indicatorColor={getProgressIndicatorClass(health.metrics.successRate)}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Queue Size</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {health.metrics.queueSize}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Pending notifications
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {health.metrics.averageProcessingTime.toFixed(1)}s
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Average per notification
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {health.recentErrors.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Recent Errors</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Error Type</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {health.recentErrors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-xs">
                          {format(new Date(error.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                        </TableCell>
                        <TableCell>{error.errorType}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{error.count}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No health data available
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Last updated: {health ? format(new Date(), 'PPpp') : 'Never'}
      </CardFooter>
    </Card>
  );
};

export default NotificationSystemHealth;
