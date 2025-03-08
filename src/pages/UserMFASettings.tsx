
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';

const UserMFASettings: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Security Settings', path: '/admin-settings/security' },
    { label: 'MFA Settings' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MFA Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage Multi-Factor Authentication settings for users
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User MFA Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User MFA management features will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default UserMFASettings;
