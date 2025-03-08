
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';

const SecuritySettings: React.FC = () => {
  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground">
          Configure security settings for the application
        </p>
      </div>
    </PageTransition>
  );
};

export default SecuritySettings;
