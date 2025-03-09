
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useNotificationSystemHealth } from '@/hooks/useNotifications';

const NotificationSystemHealth: React.FC = () => {
  const { healthReport, isLoading, refetch } = useNotificationSystemHealth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="success">Healthy</Badge>;
      case 'degraded':
        return <Badge variant="warning">Degraded</Badge>;
      case 'down':
        return <Badge variant="destructive">Down</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">System Health</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="p-8 text-center">Loading health data...</div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(healthReport.overallStatus)}
                <span className="font-medium">Overall Status</span>
              </div>
              {getStatusBadge(healthReport.overallStatus)}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Notifications Sent</div>
                <div className="text-2xl font-bold">{healthReport.stats.notificationsSent}</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-2xl font-bold">{healthReport.stats.successRate}%</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Avg. Delivery Time</div>
                <div className="text-2xl font-bold">{healthReport.stats.avgDeliveryTime}s</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Queue Length</div>
                <div className="text-2xl font-bold">{healthReport.stats.queueLength || 0}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium">Component Status</h3>
              <div className="space-y-2">
                {healthReport.components.map((component) => (
                  <div key={component.name} className="flex items-center justify-between p-3 bg-background border rounded-md">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(component.status)}
                      <span>{component.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {component.latency && (
                        <span className="text-sm text-muted-foreground">{component.latency}ms</span>
                      )}
                      {getStatusBadge(component.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-right">
              Last updated: {new Date(healthReport.lastUpdated).toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSystemHealth;
