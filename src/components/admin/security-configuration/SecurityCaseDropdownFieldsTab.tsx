
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getDropdownConfigurationsByEntityType } from '@/utils/mockData/dropdownConfigurations';
import { ConfigurableDropdown } from '@/utils/types/configuration';
import { useDisclosure } from '@/hooks/useDisclosure';

const SecurityCaseDropdownFieldsTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedConfig, setSelectedConfig] = useState<ConfigurableDropdown | null>(null);

  // Fetch dropdown configurations
  const { data: configurations, isLoading } = useQuery({
    queryKey: ['dropdownConfigurations', 'security-case'],
    queryFn: () => getDropdownConfigurationsByEntityType('security-case'),
    initialData: [],
  });

  const handleEditConfiguration = (config: ConfigurableDropdown) => {
    setSelectedConfig(config);
    onOpen();
  };

  const handleAddConfiguration = () => {
    setSelectedConfig(null);
    onOpen();
  };

  const handleCloseDialog = () => {
    setSelectedConfig(null);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Dropdown Fields Configuration</h3>
        <Button onClick={handleAddConfiguration}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Field
        </Button>
      </div>

      {configurations.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground mb-4">No dropdown fields configured yet</p>
          <Button variant="outline" onClick={handleAddConfiguration}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Configure your first dropdown field
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {configurations.map((config) => (
            <div 
              key={config.id} 
              className="border rounded-md p-4 hover:border-primary/50 transition-colors"
              onClick={() => handleEditConfiguration(config)}
            >
              <h4 className="font-medium">{config.displayName}</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {config.options.length} options
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {config.options.slice(0, 3).map((option) => (
                  <div 
                    key={option.id} 
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {option.label}
                  </div>
                ))}
                {config.options.length > 3 && (
                  <div className="text-xs bg-muted px-2 py-1 rounded">
                    +{config.options.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog for adding/editing dropdown configurations would go here */}
      {/* In a real implementation, you would add the dropdown configuration dialog component */}
    </div>
  );
};

export default SecurityCaseDropdownFieldsTab;
