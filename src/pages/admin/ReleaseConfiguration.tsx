
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRightLeft } from 'lucide-react';

const ReleaseConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Release Configuration' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Release Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure release management settings and workflows
          </p>
        </div>

        <div className="mb-6">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/admin/status-synchronization">
              <ArrowRightLeft className="h-4 w-4" />
              Status Synchronization Settings
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="workflow">
          <TabsList className="mb-4">
            <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
            <TabsTrigger value="approval">Approval Process</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Release Workflow Configuration</h3>
                <p className="text-muted-foreground mt-1">
                  Configure release workflow stages and transitions
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="approval" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Release Approval Process</h3>
                <p className="text-muted-foreground mt-1">
                  Configure release approval requirements and sign-offs
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fields" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Release Custom Fields</h3>
                <p className="text-muted-foreground mt-1">
                  Configure custom fields for release management
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ReleaseConfiguration;
