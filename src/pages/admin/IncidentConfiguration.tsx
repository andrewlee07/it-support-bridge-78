
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import { ConfigurableEntityType } from '@/utils/types';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';
import SLAConfigurationTab from '@/components/admin/SLAConfigurationTab';
import AutoCloseConfigurationTab from '@/components/admin/AutoCloseConfigurationTab';
import Breadcrumb from '@/components/shared/Breadcrumb';

const IncidentConfiguration = () => {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const entityType: ConfigurableEntityType = 'incident';

  const { data: configurations, isLoading, refetch } = useQuery({
    queryKey: ['dropdownConfigurations', entityType],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationsByEntity(entityType),
  });

  const handleAddNew = () => {
    setIsAddingNew(true);
    setSelectedConfigId(null);
  };

  const handleSelectConfig = (id: string) => {
    setSelectedConfigId(id);
    setIsAddingNew(false);
  };

  const handleFormClose = () => {
    setIsAddingNew(false);
    setSelectedConfigId(null);
    refetch();
  };

  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Incident Configuration' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure incident management settings, dropdowns, and SLAs
          </p>
        </div>

        <Tabs defaultValue="dropdowns">
          <TabsList className="mb-4">
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="sla">SLA Settings</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
            <TabsTrigger value="autoclose">Auto-Close Settings</TabsTrigger>
            <TabsTrigger value="notification">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dropdowns" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <DropdownConfigList
                  entityType={entityType}
                  configurations={configurations?.data || []}
                  isLoading={isLoading}
                  onAddNew={handleAddNew}
                  onSelectConfig={handleSelectConfig}
                  selectedConfigId={selectedConfigId}
                />
              </div>
              <div className="md:col-span-2">
                {(isAddingNew || selectedConfigId) && (
                  <DropdownConfigForm
                    entityType={entityType}
                    configId={selectedConfigId}
                    onClose={handleFormClose}
                    isNew={isAddingNew}
                  />
                )}
                {!isAddingNew && !selectedConfigId && (
                  <div className="flex h-full items-center justify-center border rounded-lg p-8 bg-muted/30">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">No Configuration Selected</h3>
                      <p className="text-muted-foreground mt-1">
                        Select a configuration to edit or add a new one
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sla" className="space-y-4">
            <SLAConfigurationTab ticketType="incident" />
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Incident Workflow Configuration</h3>
                <p className="text-muted-foreground mt-1">
                  Configure incident lifecycle and state transitions
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="autoclose" className="space-y-4">
            <AutoCloseConfigurationTab moduleType="incident" />
          </TabsContent>
          
          <TabsContent value="notification" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Incident Notification Settings</h3>
                <p className="text-muted-foreground mt-1">
                  Configure email and in-app notifications for incident events
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default IncidentConfiguration;
