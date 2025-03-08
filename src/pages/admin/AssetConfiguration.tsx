
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import { ConfigurableEntityType } from '@/utils/types';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';
import Breadcrumb from '@/components/shared/Breadcrumb';

const AssetConfiguration = () => {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const entityType: ConfigurableEntityType = 'asset';

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
    { label: 'Asset Configuration' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure asset management settings and fields
          </p>
        </div>

        <Tabs defaultValue="dropdowns">
          <TabsList className="mb-4">
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="lifecycle">Lifecycle Settings</TabsTrigger>
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
          
          <TabsContent value="lifecycle" className="space-y-4">
            {/* Lifecycle Configuration Component will go here */}
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Asset Lifecycle Configuration</h3>
                <p className="text-muted-foreground mt-1">
                  Configure asset lifecycle stages and depreciation settings
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default AssetConfiguration;
