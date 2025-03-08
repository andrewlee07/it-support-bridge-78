
import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, CheckCircle, Trash2 } from 'lucide-react';
import { ErrorLog } from '@/utils/logging/errorLogger';

interface ErrorLogsListProps {
  logs: ErrorLog[];
  onViewDetails: (log: ErrorLog) => void;
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ErrorLogsList: React.FC<ErrorLogsListProps> = ({
  logs,
  onViewDetails,
  onResolve,
  onDelete
}) => {
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
    <Table>
      <TableCaption>System error logs - {logs.length} records found</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-2" />
                <p>No error logs found</p>
                <p className="text-sm">Great job! Your system is running smoothly.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          logs.map((log) => (
            <TableRow key={log.id} className={log.resolved ? "opacity-60" : ""}>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </div>
              </TableCell>
              <TableCell>{getSeverityBadge(log.severity)}</TableCell>
              <TableCell className="max-w-[200px] truncate">{log.message}</TableCell>
              <TableCell>{log.userName || 'System'}</TableCell>
              <TableCell className="max-w-[150px] truncate">{log.route || 'N/A'}</TableCell>
              <TableCell>
                {log.resolved ? 
                  <Badge variant="outline" className="bg-green-50 text-green-700">Resolved</Badge> : 
                  <Badge variant="outline" className="bg-red-50 text-red-700">Unresolved</Badge>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onViewDetails(log)}>
                    <FileText className="h-4 w-4" />
                  </Button>
                  {!log.resolved && (
                    <Button variant="ghost" size="icon" onClick={() => onResolve(log.id)}>
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => onDelete(log.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
