
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';

const UserMFASettings: React.FC = () => {
  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">User MFA Settings</h1>
        <p className="text-muted-foreground">
          Manage multi-factor authentication settings for users
        </p>
      </div>
    </PageTransition>
  );
};

export default UserMFASettings;
