
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { useNotificationSystemHealth } from '@/hooks/useNotifications';

const NotificationSystemHealth: React.FC = () => {
  const { healthData, loading, refreshHealthData } = useNotificationSystemHealth();

  useEffect(() => {
    refreshHealthData();
  }, [refreshHealthData]);

  // Helper to render the appropriate status icon
  const StatusIcon = ({ status }: { status: 'healthy' | 'degraded' | 'down' | 'unknown' }) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  // Helper to render the right badge variant
  const getStatusBadgeVariant = (status: 'healthy' | 'degraded' | 'down' | 'unknown') => {
    switch (status) {
      case 'healthy':
        return 'success';
      case 'degraded':
        return 'warning';
      case 'down':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Notification System Health</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshHealthData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading system health data...</span>
          </div>
        ) : healthData ? (
          <div className="space-y-6">
            {/* Overall System Health */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <StatusIcon status={healthData.overallStatus} />
                <span className="ml-2 font-medium">Overall System Health</span>
              </div>
              <Badge variant={getStatusBadgeVariant(healthData.overallStatus)}>
                {healthData.overallStatus.charAt(0).toUpperCase() + healthData.overallStatus.slice(1)}
              </Badge>
            </div>
            
            {/* Individual Components Health */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Components</h3>
              
              {healthData.components.map((component, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                >
                  <div className="flex items-center">
                    <StatusIcon status={component.status} />
                    <span className="ml-2">{component.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={getStatusBadgeVariant(component.status)}>
                      {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                    </Badge>
                    {component.latency && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {component.latency}ms
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-muted/40 p-4 rounded-md">
                <div className="text-xs text-muted-foreground">Notifications Sent (24h)</div>
                <div className="text-2xl font-bold mt-1">{healthData.stats.notificationsSent}</div>
              </div>
              <div className="bg-muted/40 p-4 rounded-md">
                <div className="text-xs text-muted-foreground">Success Rate</div>
                <div className="text-2xl font-bold mt-1">{healthData.stats.successRate}%</div>
              </div>
              <div className="bg-muted/40 p-4 rounded-md">
                <div className="text-xs text-muted-foreground">Avg. Delivery Time</div>
                <div className="text-2xl font-bold mt-1">{healthData.stats.avgDeliveryTime}s</div>
              </div>
            </div>
            
            {/* Last Updated */}
            <div className="text-xs text-muted-foreground text-right">
              Last updated: {new Date(healthData.lastUpdated).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-muted-foreground">Failed to load system health data</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshHealthData}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSystemHealth;
