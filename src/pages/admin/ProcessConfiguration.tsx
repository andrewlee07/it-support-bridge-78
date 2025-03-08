
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProcessConfiguration = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Process Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure workflows and processes across different modules
            </p>
          </div>
          
          <Tabs defaultValue="incidents">
            <TabsList className="mb-4">
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="service-requests">Service Requests</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="releases">Releases</TabsTrigger>
            </TabsList>
            
            <TabsContent value="incidents">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Process Configuration</CardTitle>
                  <CardDescription>
                    Configure incident management workflows, statuses, and automations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Incident process configuration options will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="service-requests">
              <Card>
                <CardHeader>
                  <CardTitle>Service Request Process Configuration</CardTitle>
                  <CardDescription>
                    Configure service request workflows, approvals, and automations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Service request process configuration options will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="changes">
              <Card>
                <CardHeader>
                  <CardTitle>Change Process Configuration</CardTitle>
                  <CardDescription>
                    Configure change management workflows, approvals, and risk assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Change process configuration options will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="problems">
              <Card>
                <CardHeader>
                  <CardTitle>Problem Process Configuration</CardTitle>
                  <CardDescription>
                    Configure problem management workflows and resolution paths
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Problem process configuration options will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Process Configuration</CardTitle>
                  <CardDescription>
                    Configure asset management lifecycles and workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Asset process configuration options will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="releases">
              <Card>
                <CardHeader>
                  <CardTitle>Release Process Configuration</CardTitle>
                  <CardDescription>
                    Configure release management workflows and deployment processes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Release process configuration options will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProcessConfiguration;
