
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import BugSeverityConfiguration from '@/components/admin/BugSeverityConfiguration';
import Breadcrumb from '@/components/shared/Breadcrumb';

const BugConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Bug Configuration' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bug Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure bug management settings, severity levels, and workflows
          </p>
        </div>

        <Tabs defaultValue="severity">
          <TabsList className="mb-4">
            <TabsTrigger value="severity">Severity Levels</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="severity" className="space-y-4">
            <BugSeverityConfiguration />
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Bug Workflow Configuration</h3>
                <p className="text-muted-foreground mt-1">
                  Configure bug workflow stages and transitions
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fields" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Bug Custom Fields</h3>
                <p className="text-muted-foreground mt-1">
                  Configure custom fields for bug tracking
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default BugConfiguration;
