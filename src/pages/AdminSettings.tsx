
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import SecuritySettings from '@/components/admin/SecuritySettings';
import UserMFASettings from '@/components/admin/UserMFASettings';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const AdminSettings = () => {
  const { user, hasPermission } = useAuth();
  
  // Check if user is authenticated and has admin role
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has admin permissions
  if (!hasPermission(['admin'])) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6 border-red-300 bg-red-50 dark:bg-red-950/20">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Access Denied</h1>
          </div>
          <p className="mt-2">You don't have permission to access this page. This page is restricted to administrators only.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Administration</h1>
      
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="mfa">User MFA Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="mfa">
          <UserMFASettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
