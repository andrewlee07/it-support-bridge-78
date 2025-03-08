
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { PageHeader } from './settings/PageHeader';
import StatusSynchronizationConfig from '@/components/admin/StatusSynchronizationConfig';

const StatusSynchronizationSettings: React.FC = () => {
  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        <PageHeader 
          title="Status Synchronization Settings"
          description="Configure how status changes propagate between releases and linked items"
          backLink="/admin/dashboard"
          backLinkText="Back to Admin Dashboard"
        />
        
        <StatusSynchronizationConfig />
      </div>
    </PageTransition>
  );
};

export default StatusSynchronizationSettings;
