
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  BellRing, 
  Key, 
  Moon, 
  Shield, 
  Sun, 
  AlertCircle, 
  Bug, 
  FileText, 
  ClipboardList,
  Package, 
  Box, 
  Calendar, 
  Mail
} from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';
import { getIconForResultType } from '@/components/shared/notifications/iconHelpers';

const UserSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
  // Notification settings state
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
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    toast({
      title: "Theme updated",
      description: `Theme set to ${!isDark ? 'dark' : 'light'} mode`,
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully",
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Settings Not Available</CardTitle>
            <CardDescription>You must be logged in to view settings</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <PageTransition>
      <ReleasesErrorBoundary>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">User Settings</h1>
          
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the application looks for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Control which notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Categories */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Categories</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <Label>Incidents</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.incidents} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'incidents')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bug className="h-5 w-5 text-red-500" />
                        <Label>Bugs</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.bugs} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'bugs')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <Label>Test Cases</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.testCases} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'testCases')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ClipboardList className="h-5 w-5 text-orange-500" />
                        <Label>Backlog Items</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.backlogItems} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'backlogItems')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5 text-green-500" />
                        <Label>Releases</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.releases} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'releases')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Box className="h-5 w-5 text-blue-500" />
                        <Label>Assets</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.assets} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'assets')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-cyan-500" />
                        <Label>Changes</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.categories.changes} 
                        onCheckedChange={(checked) => handleNotificationToggle('categories', 'changes')}
                      />
                    </div>
                  </div>
                  
                  {/* Delivery Methods */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delivery Methods</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-5 w-5" />
                        <Label>In-app notifications</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.deliveryMethods.inApp} 
                        onCheckedChange={(checked) => handleNotificationToggle('deliveryMethods', 'inApp')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5" />
                        <Label>Email notifications</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.deliveryMethods.email} 
                        onCheckedChange={(checked) => handleNotificationToggle('deliveryMethods', 'email')}
                      />
                    </div>
                  </div>
                  
                  {/* Priority Levels */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Priority Levels</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-red-500"></span>
                        <Label>Critical</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.priorityLevels.critical} 
                        onCheckedChange={(checked) => handleNotificationToggle('priorityLevels', 'critical')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                        <Label>High</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.priorityLevels.high} 
                        onCheckedChange={(checked) => handleNotificationToggle('priorityLevels', 'high')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                        <Label>Medium</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.priorityLevels.medium} 
                        onCheckedChange={(checked) => handleNotificationToggle('priorityLevels', 'medium')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        <Label>Low</Label>
                      </div>
                      <Switch 
                        checked={notificationSettings.priorityLevels.low} 
                        onCheckedChange={(checked) => handleNotificationToggle('priorityLevels', 'low')}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Key className="h-5 w-5" />
                      <Label htmlFor="two-factor">Two-factor Authentication</Label>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant={user.mfaEnabled ? "success" : "secondary"}
                        className={`rounded-full px-3 ${user.mfaEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                      >
                        {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <div className="text-xs text-muted-foreground ml-2">(Managed by IT Admin)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                    </div>
                    <div className="text-sm">30 minutes</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Change Password</Button>
                  <Button onClick={handleSave}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ReleasesErrorBoundary>
    </PageTransition>
  );
};

export default UserSettings;
