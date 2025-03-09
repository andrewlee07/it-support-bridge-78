
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AuditEntry, AuditEntityType } from '@/utils/types/audit';
import { getAuditLogs, filterAuditLogs } from '@/utils/auditLogging';
import { Search, RefreshCw, FileText } from 'lucide-react';

const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('all');
  const [detailsVisible, setDetailsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    setLoading(true);
    try {
      const allLogs = getAuditLogs();
      setLogs(allLogs);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setLoading(true);
    try {
      let filteredLogs = getAuditLogs();
      
      // Apply entity type filter
      if (entityTypeFilter !== 'all') {
        filteredLogs = filterAuditLogs({
          entityType: entityTypeFilter as AuditEntityType
        });
      }
      
      // Apply search query filter
      if (searchQuery) {
        filteredLogs = filteredLogs.filter(log => 
          log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.performedBy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.details?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setLogs(filteredLogs);
    } catch (error) {
      console.error('Failed to filter audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleRefresh = () => {
    loadLogs();
  };

  const toggleDetails = (logId: string) => {
    setDetailsVisible(prev => ({
      ...prev,
      [logId]: !prev[logId]
    }));
  };

  const formatTimestamp = (timestamp: Date) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Audit Log</CardTitle>
            <CardDescription>
              Review administrative actions and security events
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={entityTypeFilter} 
              onValueChange={setEntityTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="change">Change</SelectItem>
                <SelectItem value="ticket">Ticket</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="asset">Asset</SelectItem>
                <SelectItem value="release">Release</SelectItem>
                <SelectItem value="problem">Problem</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">
              Filter
            </Button>
          </form>

          {loading ? (
            <div className="text-center py-8">
              <p>Loading audit logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 border rounded-md bg-muted/10">
              <p className="text-muted-foreground">No audit logs found.</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Entity ID</TableHead>
                    <TableHead className="w-[100px]">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <React.Fragment key={log.id}>
                      <TableRow>
                        <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                        <TableCell>{log.performedBy || log.userName || 'System'}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell className="capitalize">{log.entityType}</TableCell>
                        <TableCell className="font-mono text-xs">{log.entityId}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleDetails(log.id)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      {detailsVisible[log.id] && (
                        <TableRow className="bg-muted/20">
                          <TableCell colSpan={6} className="p-4">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-semibold">Details:</span> {log.details || 'No details available'}
                              </div>
                              {log.oldValue && (
                                <div>
                                  <span className="font-semibold">Previous Value:</span> 
                                  <pre className="mt-1 p-2 bg-muted text-xs overflow-x-auto rounded">
                                    {log.oldValue}
                                  </pre>
                                </div>
                              )}
                              {log.newValue && (
                                <div>
                                  <span className="font-semibold">New Value:</span>
                                  <pre className="mt-1 p-2 bg-muted text-xs overflow-x-auto rounded">
                                    {log.newValue}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditLogViewer;
