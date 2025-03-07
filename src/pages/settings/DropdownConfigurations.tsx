
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import { ConfigurableEntityType } from '@/utils/types';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';

const DropdownConfigurations = () => {
  const [currentTab, setCurrentTab] = useState<ConfigurableEntityType>('incident');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  const { data: configurations, isLoading, refetch } = useQuery({
    queryKey: ['dropdownConfigurations', currentTab],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationsByEntity(currentTab),
  });

  const handleTabChange = (value: string) => {
    setCurrentTab(value as ConfigurableEntityType);
    setSelectedConfigId(null);
    setIsAddingNew(false);
  };

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

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dropdown Field Configurations</h1>
          <p className="text-muted-foreground mt-1">
            Manage dropdown field options for different entity types
          </p>
        </div>

        <Tabs defaultValue="incident" onValueChange={handleTabChange}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="incident">Incidents</TabsTrigger>
              <TabsTrigger value="service-request">Service Requests</TabsTrigger>
              <TabsTrigger value="change">Changes</TabsTrigger>
              <TabsTrigger value="asset">Assets</TabsTrigger>
            </TabsList>
          </div>

          {['incident', 'service-request', 'change', 'asset'].map((entityType) => (
            <TabsContent key={entityType} value={entityType} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <DropdownConfigList
                    entityType={entityType as ConfigurableEntityType}
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
                      entityType={currentTab}
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
          ))}
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default DropdownConfigurations;
