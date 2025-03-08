
import React from 'react';
import { format } from 'date-fns';
import { ErrorLog } from '@/utils/logging/errorLogger';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertCircle, AlertTitle } from '@/components/ui/alert';
import { User, Server } from 'lucide-react';

interface ErrorLogDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLog: ErrorLog | null;
  onResolve: (id: string) => void;
}

export const ErrorLogDetails: React.FC<ErrorLogDetailsProps> = ({
  isOpen,
  onClose,
  selectedLog,
  onResolve
}) => {
  if (!selectedLog) {
    return null;
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Error Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {getSeverityBadge(selectedLog.severity)}
            <span className="font-medium">
              {format(new Date(selectedLog.timestamp), 'PPpp')}
            </span>
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-mono break-all">{selectedLog.message}</AlertTitle>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" /> User Information
              </h3>
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p><strong>User:</strong> {selectedLog.userName || 'Not available'}</p>
                <p><strong>ID:</strong> {selectedLog.userId || 'Not available'}</p>
                <p><strong>Role:</strong> {selectedLog.userRole || 'Not available'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Server className="h-4 w-4" /> Context
              </h3>
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p><strong>Component:</strong> {selectedLog.componentName || 'Not available'}</p>
                <p><strong>Route:</strong> {selectedLog.route || 'Not available'}</p>
                <p><strong>Status:</strong> {selectedLog.resolved ? 'Resolved' : 'Unresolved'}</p>
              </div>
            </div>
          </div>
          
          {selectedLog.stack && (
            <div>
              <h3 className="text-sm font-medium mb-2">Stack Trace</h3>
              <pre className="p-3 bg-muted rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
                {selectedLog.stack}
              </pre>
            </div>
          )}
          
          {selectedLog.tags && selectedLog.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedLog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium mb-2">Browser Information</h3>
            <p className="text-xs text-muted-foreground break-all">{selectedLog.browserInfo}</p>
          </div>
        </div>
        
        <DialogFooter>
          {!selectedLog.resolved && (
            <Button variant="outline" onClick={() => onResolve(selectedLog.id)}>
              Mark as Resolved
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
