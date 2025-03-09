
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import AuditLogViewer from '@/components/admin/AuditLogViewer';
import { Shield } from 'lucide-react';

const AuditLogs = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Audit Logs' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        </div>
        
        <p className="text-muted-foreground">
          View a complete history of administrative actions and security events
        </p>
        
        <AuditLogViewer />
      </div>
    </PageTransition>
  );
};

export default AuditLogs;
