
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ModuleConfiguration } from '@/utils/types/configuration';

interface ModuleConfigurationCardProps {
  configuration: ModuleConfiguration;
  onUpdate: (configId: string, newValue: string) => boolean;
}

const ModuleConfigurationCard: React.FC<ModuleConfigurationCardProps> = ({
  configuration,
  onUpdate
}) => {
  const [value, setValue] = useState(configuration.configValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const success = onUpdate(configuration.id, value);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(configuration.configValue);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{configuration.configDisplayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{configuration.description}</p>
          
          <div className="space-y-2">
            <Label htmlFor={`config-${configuration.id}`}>Value</Label>
            <div className="flex gap-2">
              <Input
                id={`config-${configuration.id}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!isEditing}
              />
              
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {configuration.updatedAt.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleConfigurationCard;
