
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import ServiceManagement from '@/components/services/ServiceManagement';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceManagementPage: React.FC = () => {
  const { userHasPermission } = useAuth();
  const canManageContent = userHasPermission('Manage Service Catalog Content') || 
                          userHasPermission('Manage Service Catalog Config');

  if (!canManageContent) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access Service Management.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage service catalog content and details
            </p>
          </div>

          <ServiceManagement inServiceCatalog={false} />
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceManagementPage;
