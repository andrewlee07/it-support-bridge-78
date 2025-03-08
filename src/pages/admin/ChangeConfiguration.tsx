
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import PageHeader from '@/components/admin/change-configuration/PageHeader';
import DropdownFieldsTab from '@/components/admin/change-configuration/DropdownFieldsTab';
import RiskAssessmentTabs from '@/components/admin/change-configuration/RiskAssessmentTabs';
import WorkflowSettingsTab from '@/components/admin/change-configuration/WorkflowSettingsTab';

const ChangeConfiguration = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader />

        <Tabs defaultValue="dropdowns">
          <TabsList className="mb-4">
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dropdowns" className="space-y-4">
            <DropdownFieldsTab />
          </TabsContent>
          
          <TabsContent value="risk" className="space-y-6">
            <RiskAssessmentTabs />
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <WorkflowSettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ChangeConfiguration;
