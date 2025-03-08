
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Sliders, Database, AlertTriangle } from 'lucide-react';
import { ConfigurableEntityType } from '@/utils/types/configuration';

// Import relevant configuration components
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import RiskAssessmentQuestionForm from '@/components/settings/risk/RiskAssessmentQuestionForm';
import SLAList from '@/components/sla/SLAList';

type ConfigurationSettingsProps = {
  entityType: ConfigurableEntityType | 'backlog' | 'release';
};

const ConfigurationSettings = ({ entityType }: ConfigurationSettingsProps) => {
  const [currentTab, setCurrentTab] = useState('dropdown-fields');
  
  const getEntityTitle = () => {
    switch (entityType) {
      case 'incident': return 'Incident Management';
      case 'service-request': return 'Service Request Management';
      case 'change': return 'Change Management';
      case 'asset': return 'Asset Management';
      case 'backlog': return 'Backlog Management';
      case 'release': return 'Release Management';
      default: return 'Process Configuration';
    }
  };

  // Only show risk assessment for change management
  const showRiskAssessment = entityType === 'change';
  
  // Only show SLAs for incident and service request
  const showSLA = entityType === 'incident' || entityType === 'service-request';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <CardTitle>{getEntityTitle()} Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure settings specific to {getEntityTitle().toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={currentTab} 
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="dropdown-fields">
                <Database className="h-4 w-4 mr-2" />
                Field Configurations
              </TabsTrigger>
              
              {showSLA && (
                <TabsTrigger value="sla">
                  <Sliders className="h-4 w-4 mr-2" />
                  SLA Configuration
                </TabsTrigger>
              )}
              
              {showRiskAssessment && (
                <TabsTrigger value="risk">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Risk Assessment
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="dropdown-fields">
              <DropdownConfigList entityType={entityType as ConfigurableEntityType} />
            </TabsContent>
            
            {showSLA && (
              <TabsContent value="sla">
                <SLAList entityType={entityType} />
              </TabsContent>
            )}
            
            {showRiskAssessment && (
              <TabsContent value="risk">
                <RiskAssessmentQuestionForm 
                  onSubmit={() => {}} 
                  onCancel={() => {}}
                />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationSettings;
