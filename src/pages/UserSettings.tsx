
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';
import { useUserSettings } from '@/hooks/useUserSettings';

// Import the tab components
import AppearanceTab from '@/components/settings/AppearanceTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import SecurityTab from '@/components/settings/SecurityTab';

const UserSettings = () => {
  const { user } = useAuth();
  const { 
    isDark,
    notificationSettings,
    toggleTheme,
    handleNotificationToggle,
    handleSave
  } = useUserSettings();

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
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
              <AppearanceTab 
                isDark={isDark}
                toggleTheme={toggleTheme}
                handleSave={handleSave}
              />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsTab
                notificationSettings={notificationSettings}
                handleNotificationToggle={handleNotificationToggle}
                handleSave={handleSave}
              />
            </TabsContent>
            
            <TabsContent value="security">
              <SecurityTab
                user={user}
                handleSave={handleSave}
              />
            </TabsContent>
          </Tabs>
        </div>
      </ReleasesErrorBoundary>
    </PageTransition>
  );
};

export default UserSettings;
