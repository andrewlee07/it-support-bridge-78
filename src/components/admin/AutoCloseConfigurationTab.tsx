
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModuleConfigurations } from '@/hooks/useModuleConfigurations';
import { ConfigurableEntityType } from '@/utils/types/configuration';
import { toast } from '@/hooks/use-toast';

interface AutoCloseConfigurationTabProps {
  moduleType: ConfigurableEntityType;
}

const AutoCloseConfigurationTab: React.FC<AutoCloseConfigurationTabProps> = ({ moduleType }) => {
  const { configurations, isLoading, updateConfiguration } = useModuleConfigurations(moduleType);

  // Find the auto-close configuration
  const autoCloseConfig = configurations.find(
    config => config.configType === 'autoClose' && config.configName === 'autoCloseTimeframeInDays'
  );

  const [timeframe, setTimeframe] = useState(autoCloseConfig?.configValue || '5');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    if (!autoCloseConfig) return;
    
    setIsSubmitting(true);
    
    // Update the configuration in the backend
    const success = updateConfiguration(autoCloseConfig.id, timeframe);
    
    if (success) {
      toast({
        title: "Success",
        description: "Auto-close configuration updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update auto-close configuration",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading configuration...</div>;
  }

  const ticketStatusLabel = moduleType === 'incident' ? 'resolved' : 'fulfilled';

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Auto-Close Configuration</h3>
        <p className="text-muted-foreground mt-1">
          Configure automatic closing of {ticketStatusLabel} {moduleType === 'incident' ? 'incidents' : 'service requests'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Auto-Close Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auto-close-timeframe">Auto-close after (days):</Label>
            <div className="flex space-x-2">
              <Input
                id="auto-close-timeframe"
                type="number"
                min="1"
                max="30"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="max-w-[150px]"
              />
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {moduleType === 'incident' ? 'Incidents' : 'Service requests'} will be automatically closed after this many days in the {ticketStatusLabel} state.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoCloseConfigurationTab;
