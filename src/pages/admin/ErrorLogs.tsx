
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorLog, getErrorLogs, filterErrorLogs, resolveErrorLog, deleteErrorLog, clearAllErrorLogs } from '@/utils/logging/errorLogger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, BarChart2, Calendar as CalendarIcon, CheckCircle, Clock, FileText, RefreshCcw, Search, Server, Trash2, User } from 'lucide-react';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ErrorLogs: React.FC = () => {
  const { user, userCanPerformAction } = useAuth();
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [filters, setFilters] = useState({
    severity: '',
    resolved: '',
    search: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const canAccessErrorLogs = userCanPerformAction('admin', 'read');

  useEffect(() => {
    if (canAccessErrorLogs) {
      loadLogs();
    }
  }, [canAccessErrorLogs]);

  const loadLogs = () => {
    const allLogs = getErrorLogs();
    setLogs(allLogs);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };

  const applyFilters = () => {
    const filteredLogs = filterErrorLogs({
      severity: filters.severity ? filters.severity as any : undefined,
      resolved: filters.resolved === 'true' ? true : filters.resolved === 'false' ? false : undefined,
      startDate: filters.startDate,
      endDate: filters.endDate,
      search: filters.search,
    });
    setLogs(filteredLogs);
  };

  const resetFilters = () => {
    setFilters({
      severity: '',
      resolved: '',
      search: '',
      startDate: undefined,
      endDate: undefined,
    });
    loadLogs();
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleResolve = (id: string) => {
    resolveErrorLog(id);
    loadLogs();
  };

  const handleDelete = (id: string) => {
    deleteErrorLog(id);
    loadLogs();
  };

  const handleClearAll = () => {
    clearAllErrorLogs();
    loadLogs();
  };

  const handleRefresh = () => {
    loadLogs();
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'warning':
        return <Badge variant="warning" className="bg-yellow-500">Warning</Badge>;
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const viewLogDetails = (log: ErrorLog) => {
    setSelectedLog(log);
    setIsDetailOpen(true);
  };

  if (!canAccessErrorLogs) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the error logs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Error Logs</h1>
          <p className="text-muted-foreground">System-wide error tracking for administrators</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="destructive" size="sm" onClick={handleClearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter error logs by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search errors..."
                className="pl-8"
                value={filters.search}
                onChange={handleSearch}
              />
            </div>

            <Select
              value={filters.severity}
              onValueChange={(value) => setFilters({ ...filters, severity: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Severities</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.resolved}
              onValueChange={(value) => setFilters({ ...filters, resolved: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Resolution status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="false">Unresolved</SelectItem>
                <SelectItem value="true">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate ? format(filters.startDate, 'PP') : 'Start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.startDate}
                    onSelect={(date) => setFilters({ ...filters, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.endDate ? format(filters.endDate, 'PP') : 'End date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.endDate}
                    onSelect={(date) => setFilters({ ...filters, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button variant="secondary" size="sm" className="mt-4" onClick={resetFilters}>
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
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
                        <Button variant="ghost" size="icon" onClick={() => viewLogDetails(log)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        {!log.resolved && (
                          <Button variant="ghost" size="icon" onClick={() => handleResolve(log.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(log.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Log details dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Error Details</DialogTitle>
          </DialogHeader>
          
          {selectedLog && (
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
          )}
          
          <DialogFooter>
            {selectedLog && !selectedLog.resolved && (
              <Button variant="outline" onClick={() => handleResolve(selectedLog.id)}>
                Mark as Resolved
              </Button>
            )}
            <Button variant="secondary" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ErrorLogs;
