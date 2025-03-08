
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNotificationSystem } from '@/hooks/useNotifications';

interface NotificationSystemHealthProps {
  className?: string;
}

const NotificationSystemHealth: React.FC<NotificationSystemHealthProps> = ({ className }) => {
  const { healthData, loading, refreshHealthData } = useNotificationSystem();

  useEffect(() => {
    refreshHealthData();
    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      refreshHealthData();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshHealthData]);

  const getStatusBadge = () => {
    switch (healthData?.status) {
      case 'operational':
        return (
          <Badge variant="success" className="text-xs">
            ● Operational
          </Badge>
        );
      case 'degraded':
        return (
          <Badge variant="warning" className="text-xs">
            ● Degraded
          </Badge>
        );
      case 'down':
        return (
          <Badge variant="destructive" className="text-xs">
            ● Down
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            ● Unknown
          </Badge>
        );
    }
  };

  const formatTime = (timeInMs: number) => {
    if (timeInMs < 1000) return `${timeInMs}ms`;
    return `${(timeInMs / 1000).toFixed(1)}s`;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Notification System Health</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-4 text-center">Loading health data...</div>
        ) : (
          <>
            <div className="space-y-4 mt-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-semibold">
                    {healthData?.metrics.successRate.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={healthData?.metrics.successRate}
                  className="h-2"
                  indicatorColor={
                    healthData?.metrics.successRate > 98
                      ? 'bg-emerald-500'
                      : healthData?.metrics.successRate > 90
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-md p-3">
                  <div className="text-sm text-muted-foreground">
                    Total Notifications (24h)
                  </div>
                  <div className="text-2xl font-semibold">
                    {healthData?.metrics.totalNotifications}
                  </div>
                </div>
                <div className="bg-muted/30 rounded-md p-3">
                  <div className="text-sm text-muted-foreground">Processing Time</div>
                  <div className="text-2xl font-semibold">
                    {healthData?.metrics.processingTime ? formatTime(healthData.metrics.processingTime) : '-'}
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Current Queue</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-semibold">
                    {healthData?.metrics.queueSize} messages
                  </div>
                  <Badge
                    variant={healthData?.metrics.queueSize > 20 ? 'warning' : 'success'}
                    className="text-xs"
                  >
                    {healthData?.metrics.queueSize > 20 ? 'High' : 'Normal'}
                  </Badge>
                </div>
              </div>

              {healthData?.errors && healthData.errors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Recent Errors</h3>
                  <div className="space-y-2">
                    {healthData.errors.map((error, index) => (
                      <div
                        key={index}
                        className="bg-destructive/10 text-destructive text-sm p-2 rounded-md flex justify-between items-center"
                      >
                        <div>{error.type}</div>
                        <Badge variant="outline">{error.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={refreshHealthData}>
                  Refresh
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSystemHealth;
