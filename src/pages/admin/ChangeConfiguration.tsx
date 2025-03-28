
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import PageHeader from '@/components/admin/change-configuration/PageHeader';
import DropdownFieldsTab from '@/components/admin/change-configuration/DropdownFieldsTab';
import RiskAssessmentTabs from '@/components/admin/change-configuration/RiskAssessmentTabs';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';

const ChangeConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Change Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('change');

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader />

        <Tabs defaultValue="dropdowns">
          <TabsList className="mb-4">
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="dropdowns" className="space-y-4">
            <DropdownFieldsTab />
          </TabsContent>
          
          <TabsContent value="risk" className="space-y-6">
            <RiskAssessmentTabs />
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <WorkflowConfigurationTab entityType="change" />
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="change"
              fields={mandatoryFields}
              onSave={updateMandatoryFields}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ChangeConfiguration;
