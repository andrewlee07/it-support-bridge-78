import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { BellRing, Key, Moon, Shield, Sun } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';

const UserSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
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
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control which notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-5 w-5" />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-5 w-5" />
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      </div>
                      <Switch id="browser-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-5 w-5" />
                        <Label htmlFor="ticket-updates">Ticket Updates</Label>
                      </div>
                      <Switch id="ticket-updates" defaultChecked />
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
