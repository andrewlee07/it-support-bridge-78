
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserSearch, ShieldAlert, Clock, ArrowLeft, Download, Filter } from 'lucide-react';
import { SecurityEvent } from '@/utils/types/user';

// Mock security events - in a real app, would be fetched from an API
const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 'event-1',
    userId: 'user-1',
    eventType: 'login',
    timestamp: new Date('2023-05-10T12:30:00'),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Successful login',
    severity: 'info'
  },
  {
    id: 'event-2',
    userId: 'user-2',
    eventType: 'failed_login',
    timestamp: new Date('2023-05-10T12:35:00'),
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: 'Invalid password',
    severity: 'warning'
  },
  {
    id: 'event-3',
    userId: 'user-3',
    eventType: 'login',
    timestamp: new Date('2023-05-10T12:40:00'),
    ipAddress: '192.168.1.3',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)',
    details: 'Successful login',
    severity: 'info'
  },
  {
    id: 'event-4',
    userId: 'user-1',
    eventType: 'password_change',
    timestamp: new Date('2023-05-10T13:00:00'),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Password changed successfully',
    severity: 'info'
  },
  {
    id: 'event-5',
    userId: 'user-4',
    eventType: 'account_locked',
    timestamp: new Date('2023-05-10T13:15:00'),
    ipAddress: '192.168.1.4',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G998B)',
    details: 'Account locked due to too many failed login attempts',
    severity: 'critical'
  },
  {
    id: 'event-6',
    userId: 'user-2',
    eventType: 'mfa_setup',
    timestamp: new Date('2023-05-10T13:30:00'),
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: 'MFA enabled with email method',
    severity: 'info'
  },
  {
    id: 'event-7',
    userId: 'user-5',
    eventType: 'failed_login',
    timestamp: new Date('2023-05-10T13:45:00'),
    ipAddress: '10.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Login attempt from unauthorized IP',
    severity: 'critical'
  },
  {
    id: 'event-8',
    userId: 'user-1',
    eventType: 'logout',
    timestamp: new Date('2023-05-10T14:00:00'),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'User logged out',
    severity: 'info'
  }
];

// Get user name from user ID (mock function)
const getUserName = (userId: string): string => {
  const userMap: Record<string, string> = {
    'user-1': 'John Doe',
    'user-2': 'Jane Smith',
    'user-3': 'Mike Johnson',
    'user-4': 'Sarah Williams',
    'user-5': 'Alex Turner'
  };
  
  return userMap[userId] || 'Unknown User';
};

// Event type mapping for display
const eventTypeDisplay: Record<string, string> = {
  'login': 'Login',
  'logout': 'Logout',
  'failed_login': 'Failed Login',
  'password_change': 'Password Change',
  'mfa_setup': 'MFA Setup',
  'account_locked': 'Account Locked',
  'account_unlocked': 'Account Unlocked',
  'password_reset': 'Password Reset',
  'role_change': 'Role Change',
  'permission_change': 'Permission Change'
};

const SecurityAuditLog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  // Filter events based on search and filters
  const filteredEvents = mockSecurityEvents.filter(event => {
    // Search filter
    const searchMatch =
      search.trim() === '' ||
      getUserName(event.userId).toLowerCase().includes(search.toLowerCase()) ||
      event.ipAddress.toLowerCase().includes(search.toLowerCase()) ||
      (event.details && event.details.toLowerCase().includes(search.toLowerCase()));
    
    // Event type filter
    const eventTypeMatch = eventTypeFilter === 'all' || event.eventType === eventTypeFilter;
    
    // Severity filter
    const severityMatch = severityFilter === 'all' || event.severity === severityFilter;
    
    return searchMatch && eventTypeMatch && severityMatch;
  });

  // Sort events by timestamp (newest first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Get badge color based on severity
  const getSeverityBadgeColor = (severity: string): string => {
    switch (severity) {
      case 'info':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'critical':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Security Audit Log</h1>
                <p className="text-sm text-gray-500">Review system security events</p>
              </div>
            </div>
            <Button 
              variant="outline"
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Log
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter security events by user, type, severity, and date range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="text-sm font-medium block mb-1">Search</label>
                <div className="relative">
                  <UserSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by user, IP..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Event Type</label>
                <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="logout">Logout</SelectItem>
                    <SelectItem value="failed_login">Failed Login</SelectItem>
                    <SelectItem value="password_change">Password Change</SelectItem>
                    <SelectItem value="mfa_setup">MFA Setup</SelectItem>
                    <SelectItem value="account_locked">Account Locked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Severity</label>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Date Range</label>
                <Input
                  type="date"
                  className="w-full"
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.valueAsDate || undefined })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Events Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Security Events
            </CardTitle>
            <CardDescription>
              Showing {sortedEvents.length} events {search || eventTypeFilter !== 'all' || severityFilter !== 'all' ? '(filtered)' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEvents.length > 0 ? (
                  sortedEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-2 text-gray-400" />
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{getUserName(event.userId)}</TableCell>
                      <TableCell>{eventTypeDisplay[event.eventType] || event.eventType}</TableCell>
                      <TableCell className="font-mono">{event.ipAddress}</TableCell>
                      <TableCell>{event.details}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityBadgeColor(event.severity)}>
                          {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                      No security events found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SecurityAuditLog;
