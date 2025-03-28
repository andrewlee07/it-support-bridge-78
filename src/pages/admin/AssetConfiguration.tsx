
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import { ConfigurableEntityType } from '@/utils/types';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';
import Breadcrumb from '@/components/shared/Breadcrumb';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AssetConfiguration = () => {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const entityType: ConfigurableEntityType = 'asset';

  const { data: configurations, isLoading, refetch } = useQuery({
    queryKey: ['dropdownConfigurations', entityType],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationsByEntity(entityType),
  });

  const { mandatoryFields, updateMandatoryFields, isLoading: isMandatoryLoading } = useMandatoryFields('asset');

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
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="lifecycle">Lifecycle Settings</TabsTrigger>
            <TabsTrigger value="depreciation">Depreciation Rules</TabsTrigger>
            <TabsTrigger value="categories">Asset Categories</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general asset management settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Asset Management Settings</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure global settings for asset management processes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow">
            <WorkflowConfigurationTab entityType="asset" />
          </TabsContent>

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
            <Card>
              <CardHeader>
                <CardTitle>Asset Lifecycle Configuration</CardTitle>
                <CardDescription>Define asset lifecycle stages and transitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Asset Lifecycle Configuration</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure asset lifecycle stages and transition rules
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="depreciation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Depreciation Rules</CardTitle>
                <CardDescription>Configure asset depreciation calculation methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Asset Depreciation Rules</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure depreciation methods and schedules for different asset types
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Categories</CardTitle>
                <CardDescription>Configure asset categorization taxonomy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Asset Category Management</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure asset categories, subcategories, and classification hierarchy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="asset"
              fields={mandatoryFields}
              onSave={updateMandatoryFields}
              isLoading={isMandatoryLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default AssetConfiguration;
