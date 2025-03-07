
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ConfigurableDropdown, ConfigurableEntityType } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DropdownConfigListProps {
  entityType: ConfigurableEntityType;
  configurations: ConfigurableDropdown[];
  isLoading: boolean;
  onAddNew: () => void;
  onSelectConfig: (id: string) => void;
  selectedConfigId: string | null;
}

const DropdownConfigList: React.FC<DropdownConfigListProps> = ({
  entityType,
  configurations,
  isLoading,
  onAddNew,
  onSelectConfig,
  selectedConfigId,
}) => {
  const entityTypeLabels: Record<ConfigurableEntityType, string> = {
    'incident': 'Incident',
    'service-request': 'Service Request',
    'change': 'Change Request',
    'asset': 'Asset',
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{entityTypeLabels[entityType]} Fields</CardTitle>
          <Button size="sm" onClick={onAddNew}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : configurations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No dropdown configurations found
          </div>
        ) : (
          <div className="space-y-2">
            {configurations.map((config) => (
              <Button
                key={config.id}
                variant={selectedConfigId === config.id ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => onSelectConfig(config.id)}
              >
                <div>
                  <p className="font-medium">{config.displayName}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {config.options.filter(o => o.isActive).length} options
                  </p>
                </div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DropdownConfigList;
