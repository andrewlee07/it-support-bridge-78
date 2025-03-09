import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  BellOff, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Cog, 
  X,
  AlertCircle, 
  Bug, 
  FileText, 
  ClipboardList, 
  Package, 
  Box, 
  Calendar, 
  Mail,
  BellRing,
  CheckCircle,
  Clock,
  AlarmClock,
  AlertOctagon
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getIconForResultType } from './iconHelpers';
import { formatTimestamp } from './timeHelpers';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'incident' | 'bug' | 'testCase' | 'backlogItem' | 'release' | 'asset' | 'change';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  entityId: string;
  url: string;
  actor?: {
    id: string;
    name: string;
    initials: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Critical Incident',
    message: 'Network outage reported in the main data center',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    read: false,
    type: 'incident',
    priority: 'critical',
    entityId: 'incident-1',
    url: '/incidents/incident-1',
    actor: {
      id: 'user-1',
      name: 'John Doe',
      initials: 'JD'
    }
  },
  {
    id: 'n2',
    title: 'New Bug Assigned',
    message: 'You have been assigned to investigate the login form bug',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
    type: 'bug',
    priority: 'high',
    entityId: 'bug-1',
    url: '/bugs/bug-1',
    actor: {
      id: 'user-2',
      name: 'Jane Smith',
      initials: 'JS'
    }
  },
  {
    id: 'n3',
    title: 'Release Approved',
    message: 'Version 2.0 release has been approved for deployment',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
    type: 'release',
    entityId: 'release-1',
    url: '/releases/release-1',
    actor: {
      id: 'user-3',
      name: 'Mike Johnson',
      initials: 'MJ'
    }
  },
  {
    id: 'n4',
    title: 'Test Execution Failed',
    message: 'Payment processing test has failed in the staging environment',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
    type: 'testCase',
    priority: 'medium',
    entityId: 'test-1',
    url: '/test-tracking/test-1'
  },
  {
    id: 'n5',
    title: 'Backlog Item Updated',
    message: 'The status of "Password Reset Feature" has been changed to "In Progress"',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    read: true,
    type: 'backlogItem',
    entityId: 'backlog-1',
    url: '/backlog/backlog-1',
    actor: {
      id: 'user-4',
      name: 'Sarah Williams',
      initials: 'SW'
    }
  }
];

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  return (
    <div className={`p-3 border-b last:border-0 ${notification.read ? 'bg-background' : 'bg-muted/30'}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {getIconForResultType(notification.type)}
        </div>
        <div className="flex-1">
          <Link to={notification.url} className="font-medium hover:underline">
            {notification.title}
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              {notification.actor && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {notification.actor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{notification.actor.name}</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(notification.timestamp)}
              </span>
            </div>
            
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onMarkAsRead(notification.id)}
              >
                <Check className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NotificationCenterProps {
  initialNotifications?: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  initialNotifications = mockNotifications
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  const [notificationSettings, setNotificationSettings] = useState({
    categories: {
      incidents: true,
      bugs: true,
      testCases: true,
      backlogItems: true,
      releases: true,
      assets: true,
      changes: true
    },
    deliveryMethods: {
      inApp: true,
      email: true
    },
    priorityLevels: {
      critical: true,
      high: true,
      medium: false,
      low: false
    }
  });
  
  const handleNotificationToggle = (category, value) => {
    setNotificationSettings(prev => {
      if (category.includes('.')) {
        const [mainCategory, subCategory] = category.split('.');
        return {
          ...prev,
          [mainCategory]: {
            ...prev[mainCategory],
            [subCategory]: value
          }
        };
      }
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [value]: !prev[category][value]
        }
      };
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    });
    setShowSettings(false);
  };
  
  const itemsPerPage = 5;
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab);
  
  const pageCount = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-10 w-10 rounded-full"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 h-5 min-w-5 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 sm:w-96 p-0" 
        align="end" 
        side="bottom"
      >
        {showSettings ? (
          <div>
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setShowSettings(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="font-semibold">Notification Settings</h2>
              </div>
              <Link to="/settings" className="text-sm text-blue-500 hover:underline">
                All Settings
              </Link>
            </div>
            
            <div className="p-3 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Notification Categories</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <Label>Incidents</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.incidents} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          incidents: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bug className="h-5 w-5 text-red-500" />
                    <Label>Bugs</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.bugs} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          bugs: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <Label>Test Cases</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.testCases} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          testCases: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ClipboardList className="h-5 w-5 text-orange-500" />
                    <Label>Backlog Items</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.backlogItems} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          backlogItems: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-green-500" />
                    <Label>Releases</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.releases} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          releases: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Box className="h-5 w-5 text-blue-500" />
                    <Label>Assets</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.assets} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          assets: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-cyan-500" />
                    <Label>Changes</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.categories.changes} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        categories: {
                          ...prev.categories,
                          changes: checked
                        }
                      }));
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Delivery Methods</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-5 w-5 text-indigo-500" />
                    <Label>In-app notifications</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.deliveryMethods.inApp} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        deliveryMethods: {
                          ...prev.deliveryMethods,
                          inApp: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <Label>Email notifications</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.deliveryMethods.email} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        deliveryMethods: {
                          ...prev.deliveryMethods,
                          email: checked
                        }
                      }));
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Priority Levels</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertOctagon className="h-5 w-5 text-red-500" />
                    <Label>Critical</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.priorityLevels.critical} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        priorityLevels: {
                          ...prev.priorityLevels,
                          critical: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlarmClock className="h-5 w-5 text-orange-500" />
                    <Label>High</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.priorityLevels.high} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        priorityLevels: {
                          ...prev.priorityLevels,
                          high: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <Label>Medium</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.priorityLevels.medium} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        priorityLevels: {
                          ...prev.priorityLevels,
                          medium: checked
                        }
                      }));
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <Label>Low</Label>
                  </div>
                  <Switch 
                    checked={notificationSettings.priorityLevels.low} 
                    onCheckedChange={(checked) => {
                      setNotificationSettings(prev => ({
                        ...prev,
                        priorityLevels: {
                          ...prev.priorityLevels,
                          low: checked
                        }
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t p-3">
              <Button className="w-full" onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b p-3">
              <h2 className="font-semibold">Notifications</h2>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Cog className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowSettings(true)}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={markAllAsRead}>
                      Mark all as read
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={clearAll}>
                      Clear all
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={(value) => {
                setActiveTab(value);
                setCurrentPage(1);
              }}
            >
              <div className="border-b">
                <TabsList className="w-full h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="all" 
                    className="flex-1 py-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unread" 
                    className="flex-1 py-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Unread
                    {unreadCount > 0 && (
                      <Badge className="ml-1.5" variant="outline">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <BellOff className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto">
                    {paginatedNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                        onMarkAsRead={markAsRead}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0">
                {unreadCount === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Check className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">All caught up!</p>
                  </div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto">
                    {paginatedNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                        onMarkAsRead={markAsRead}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {pageCount > 1 && (
              <div className="flex items-center justify-between border-t p-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs">
                  Page {currentPage} of {pageCount}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={currentPage === pageCount}
                  onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
