
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ConfigurableEntityType } from '@/utils/types';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';

const DropdownFieldsTab = () => {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const entityType: ConfigurableEntityType = 'bug';

  // Dropdown configurations
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

  return (
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
  );
};

export default DropdownFieldsTab;
