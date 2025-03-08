
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfigurableDropdown, ConfigurableEntityType } from '@/utils/types';
import { PlusCircle, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';

export interface DropdownConfigListProps {
  entityType: ConfigurableEntityType;
  configurations?: ConfigurableDropdown[];
  isLoading?: boolean;
  onAddNew: () => void;
  onSelectConfig: (id: string) => void;
  selectedConfigId?: string | null;
}

const DropdownConfigList = ({
  entityType,
  configurations,
  isLoading,
  onAddNew,
  onSelectConfig,
  selectedConfigId
}: DropdownConfigListProps) => {
  // If configurations are not provided as props, fetch them
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ['dropdownConfigurations', entityType],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationsByEntity(entityType),
    enabled: !configurations, // Only run the query if configurations are not provided
  });

  const configList = configurations || (data?.data || []);
  const loading = isLoading || (configurations ? false : queryLoading);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Dropdown Fields</span>
          <Button variant="ghost" size="sm" onClick={onAddNew}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </CardTitle>
        <CardDescription>
          Configure dropdown options for {entityType} fields
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : configList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No dropdown fields configured</p>
            <Button onClick={onAddNew}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Field
            </Button>
          </div>
        ) : (
          <ul className="space-y-2">
            {configList.map((config) => (
              <li key={config.id}>
                <Button
                  variant={selectedConfigId === config.id ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={() => onSelectConfig(config.id)}
                >
                  <span>{config.displayName}</span>
                  <Settings className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={onAddNew}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Field
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DropdownConfigList;
