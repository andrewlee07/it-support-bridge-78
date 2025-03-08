
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';
import OptionsList from '@/components/settings/dropdowns/OptionsList';
import { ConfigurableEntityType } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';

const ConfigurationSettings = () => {
  const [activeTab, setActiveTab] = useState<ConfigurableEntityType>('ticket');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  // Fetch dropdown configurations based on active tab
  const { data: configurations, isLoading } = useQuery({
    queryKey: ['dropdownConfigurations', activeTab],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationsByEntity(activeTab),
  });

  const handleAddNew = () => {
    setSelectedConfigId(null);
    setIsFormOpen(true);
  };

  const handleSelectConfig = (id: string) => {
    setSelectedConfigId(id);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Field Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ConfigurableEntityType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ticket">Tickets</TabsTrigger>
              <TabsTrigger value="asset">Assets</TabsTrigger>
              <TabsTrigger value="change">Changes</TabsTrigger>
              <TabsTrigger value="user">Users</TabsTrigger>
            </TabsList>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <TabsContent value="ticket" className="mt-0">
                <DropdownConfigList 
                  entityType="ticket" 
                  configurations={configurations?.data}
                  isLoading={isLoading}
                  onAddNew={handleAddNew}
                  onSelectConfig={handleSelectConfig}
                  selectedConfigId={selectedConfigId}
                />
              </TabsContent>
              <TabsContent value="asset" className="mt-0">
                <DropdownConfigList 
                  entityType="asset" 
                  configurations={configurations?.data}
                  isLoading={isLoading}
                  onAddNew={handleAddNew}
                  onSelectConfig={handleSelectConfig}
                  selectedConfigId={selectedConfigId}
                />
              </TabsContent>
              <TabsContent value="change" className="mt-0">
                <DropdownConfigList 
                  entityType="change" 
                  configurations={configurations?.data}
                  isLoading={isLoading}
                  onAddNew={handleAddNew}
                  onSelectConfig={handleSelectConfig}
                  selectedConfigId={selectedConfigId}
                />
              </TabsContent>
              <TabsContent value="user" className="mt-0">
                <DropdownConfigList 
                  entityType="user" 
                  configurations={configurations?.data}
                  isLoading={isLoading}
                  onAddNew={handleAddNew}
                  onSelectConfig={handleSelectConfig}
                  selectedConfigId={selectedConfigId}
                />
              </TabsContent>
              
              {selectedConfigId && (
                <div className="col-span-1 md:col-span-2">
                  <OptionsList 
                    configId={selectedConfigId} 
                    entityType={activeTab} 
                  />
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DropdownConfigForm 
            onClose={handleCloseForm} 
            entityType={activeTab} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfigurationSettings;
