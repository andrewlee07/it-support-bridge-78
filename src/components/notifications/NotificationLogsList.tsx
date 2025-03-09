
import React, { useState } from 'react';
import { useNotificationLogs } from '@/hooks/useNotifications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationLogsList: React.FC = () => {
  const { logs, isLoading } = useNotificationLogs();
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const toggleExpandEvent = (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(eventId);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getEventTypeBadge = (type: string) => {
    let variant: "default" | "secondary" | "outline" | "destructive" = "default";
    
    if (type.includes('ticket')) {
      variant = "default";
    } else if (type.includes('change')) {
      variant = "secondary";
    } else if (type.includes('problem')) {
      variant = "outline";
    } else if (type.includes('breach')) {
      variant = "destructive";
    }
    
    return (
      <Badge variant={variant} className="whitespace-nowrap">
        {type}
      </Badge>
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading notification logs...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No notification logs found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((event) => (
                <React.Fragment key={event.id}>
                  <TableRow 
                    className={
                      expandedEventId === event.id 
                        ? "bg-muted/50 cursor-pointer" 
                        : "cursor-pointer"
                    }
                    onClick={() => toggleExpandEvent(event.id)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        {getEventTypeBadge(event.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTimestamp(event.timestamp)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{event.targetType}</span> 
                      <span className="text-muted-foreground ml-1">{event.targetId}</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        {expandedEventId === event.id ? 'Hide Details' : 'View Details'}
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {expandedEventId === event.id && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={4} className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Event Data</h4>
                          <div className="bg-background p-3 rounded-md overflow-x-auto">
                            <pre className="text-xs">
                              {JSON.stringify(event.data, null, 2)}
                            </pre>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Related {event.targetType}
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationLogsList;
