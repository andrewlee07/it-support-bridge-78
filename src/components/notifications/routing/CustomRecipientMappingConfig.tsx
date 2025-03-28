
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RecipientMappingConfig from '@/components/notifications/routing/RecipientMappingConfig';
import { KnownErrorRecipientMapping } from '@/utils/types/eventBus/knownErrorEventTypes';
import { Button } from '@/components/ui/button';
import { Plus, Bell } from 'lucide-react';
import { toast } from 'sonner';

// This component wraps the protected RecipientMappingConfig with additional functionality
const CustomRecipientMappingConfig = () => {
  const handleMappingChange = (mapping: KnownErrorRecipientMapping) => {
    // Handle mapping changes here
    toast.success(`Recipient mapping "${mapping.id}" updated successfully`);
  };
  
  const handleAddMapping = () => {
    toast.success('New recipient mapping created successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Recipient Mapping Configuration</h2>
          <p className="text-muted-foreground">
            Configure which recipients receive notifications for different event types
          </p>
        </div>
        <Button onClick={handleAddMapping}>
          <Plus className="h-4 w-4 mr-2" />
          Add Mapping
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Type Recipients</CardTitle>
          <CardDescription>
            Map event types to recipient groups based on severity and other factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Use the protected component with our custom handlers */}
          <RecipientMappingConfig onMappingChange={handleMappingChange} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Advanced Recipient Rules</CardTitle>
          <CardDescription>
            Configure complex recipient mappings with multiple conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-8 rounded-md flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-muted-foreground">
              Advanced recipient mapping will be available in a future update
            </p>
            <Bell className="h-5 w-5 text-muted-foreground my-2" />
            <Button variant="outline" disabled>Coming Soon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomRecipientMappingConfig;
