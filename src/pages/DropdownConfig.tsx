
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';

const DropdownConfig: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Dropdown Configuration' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dropdown Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure system dropdown options
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Options</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dropdown configuration features will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default DropdownConfig;
