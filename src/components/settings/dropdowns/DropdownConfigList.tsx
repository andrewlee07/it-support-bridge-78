
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Settings } from "lucide-react";
import { ConfigurableDropdown, ConfigurableEntityType } from "@/utils/types/configuration";
import { getDropdownConfigurations } from "@/utils/mockData/dropdownConfigurations";
import DropdownConfigForm from "./DropdownConfigForm";

interface DropdownConfigListProps {
  entityType: ConfigurableEntityType;
}

const DropdownConfigList = ({ entityType }: DropdownConfigListProps) => {
  const [dropdowns, setDropdowns] = useState<ConfigurableDropdown[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingDropdown, setEditingDropdown] = useState<ConfigurableDropdown | null>(null);

  useEffect(() => {
    // Load all dropdowns but filter by entityType
    const allDropdowns = getDropdownConfigurations();
    const filteredDropdowns = allDropdowns.filter(
      dropdown => dropdown.entityType === entityType
    );
    setDropdowns(filteredDropdowns);
  }, [entityType]);

  const handleCreateDropdown = () => {
    setEditingDropdown(null);
    setIsCreating(true);
  };

  const handleEditDropdown = (dropdown: ConfigurableDropdown) => {
    setIsCreating(false);
    setEditingDropdown(dropdown);
  };

  const closeForm = () => {
    setIsCreating(false);
    setEditingDropdown(null);
  };

  // Create a title based on the entity type
  const getEntityTitle = () => {
    switch (entityType) {
      case 'incident': return 'Incident';
      case 'service-request': return 'Service Request';
      case 'change': return 'Change Management';
      case 'asset': return 'Asset Management';
      default: return entityType.charAt(0).toUpperCase() + entityType.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{getEntityTitle()} Field Configurations</h3>
        <Button onClick={handleCreateDropdown}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>

      {(isCreating || editingDropdown) ? (
        <DropdownConfigForm 
          isNew={isCreating}
          configId={editingDropdown?.id || null}
          entityType={entityType}
          onClose={closeForm}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {dropdowns.length === 0 ? (
            <Card className="col-span-2 p-6 text-center">
              <p className="text-muted-foreground">No custom fields configured for {getEntityTitle().toLowerCase()} yet.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleCreateDropdown}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add your first field
              </Button>
            </Card>
          ) : (
            dropdowns.map((dropdown) => (
              <Card key={dropdown.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 border-b bg-muted/50 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{dropdown.displayName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dropdown.options.length} options • {dropdown.isRequired ? 'Required' : 'Optional'}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEditDropdown(dropdown)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <ul className="p-4 space-y-1 max-h-32 overflow-y-auto">
                    {dropdown.options.map((option) => (
                      <li key={option.id} className="text-sm flex items-center space-x-2">
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{backgroundColor: option.isActive ? '#22c55e' : '#ef4444'}}
                        />
                        <span>{option.label}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownConfigList;
