
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';
import { Database, Settings, GitBranch, BookOpen, AlertTriangle, ArrowUpRight } from 'lucide-react';
import ProblemGeneralSettings from '@/components/admin/problem-configuration/ProblemGeneralSettings';
import RootCauseAnalysisSettings from '@/components/admin/problem-configuration/RootCauseAnalysisSettings';
import KnownErrorSettings from '@/components/admin/problem-configuration/KnownErrorSettings';
import EscalationRulesSettings from '@/components/admin/problem-configuration/EscalationRulesSettings';

const ProblemConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Problem Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('problem');

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Management Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for problem management
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center">
              <GitBranch className="h-4 w-4 mr-2" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="rootcause" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Root Cause Analysis
            </TabsTrigger>
            <TabsTrigger value="knownerrors" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Known Errors
            </TabsTrigger>
            <TabsTrigger value="escalation" className="flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Escalation Rules
            </TabsTrigger>
            <TabsTrigger value="mandatoryfields" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Mandatory Fields
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <ProblemGeneralSettings />
          </TabsContent>
          
          <TabsContent value="workflow">
            <WorkflowConfigurationTab entityType="problem" />
          </TabsContent>
          
          <TabsContent value="rootcause">
            <RootCauseAnalysisSettings />
          </TabsContent>
          
          <TabsContent value="knownerrors">
            <KnownErrorSettings />
          </TabsContent>
          
          <TabsContent value="escalation">
            <EscalationRulesSettings />
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="problem"
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

export default ProblemConfiguration;
