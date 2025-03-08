
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import ConfigurationSettings from '@/components/admin/ConfigurationSettings';
import SecuritySettings from '@/components/admin/SecuritySettings';
import BugSeverityConfiguration from '@/components/admin/BugSeverityConfiguration';

const AdminSettings = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage system-wide settings and configurations
            </p>
          </div>
          
          <ConfigurationSettings />
          <SecuritySettings />
          <BugSeverityConfiguration />
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminSettings;
