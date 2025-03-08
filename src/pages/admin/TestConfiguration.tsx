
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';

const TestConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Test Configuration' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure test management settings and workflows
          </p>
        </div>

        <Tabs defaultValue="workflow">
          <TabsList className="mb-4">
            <TabsTrigger value="workflow">Test Workflow</TabsTrigger>
            <TabsTrigger value="templates">Test Templates</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Test Workflow Configuration</h3>
                <p className="text-muted-foreground mt-1">
                  Configure test case lifecycle and execution workflow
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Test Case Templates</h3>
                <p className="text-muted-foreground mt-1">
                  Configure test case templates and standardized formats
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fields" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Test Custom Fields</h3>
                <p className="text-muted-foreground mt-1">
                  Configure custom fields for test cases and test execution
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default TestConfiguration;
