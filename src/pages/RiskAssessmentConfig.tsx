
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Breadcrumb from '@/components/shared/Breadcrumb';

const RiskAssessmentConfig: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Risk Assessment Configuration' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure risk assessment parameters and thresholds
          </p>
        </div>
        
        <Tabs defaultValue="questions">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Risk assessment questions configuration will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="thresholds">
            <Card>
              <CardHeader>
                <CardTitle>Risk Thresholds</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Risk threshold configuration will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default RiskAssessmentConfig;
