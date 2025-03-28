
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScheduleBasedRules from '@/components/notifications/routing/ScheduleBasedRules';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { ChannelMappingType } from '@/utils/types/eventBus/channelMappingTypes';

// This component wraps the protected ScheduleBasedRules with additional functionality
const CustomScheduleBasedRules = () => {
  // Default values for channel mappings that satisfy the required properties
  const defaultChannelMapping: ChannelMappingType = {
    inWindow: "primary@example.com",
    outOfWindow: "secondary@example.com"
  };

  // Initialize schedule rule state with proper types
  const [initializedRules] = useState([
    {
      id: "default-rule",
      name: "Default Schedule",
      active: true,
      schedule: {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        timeRanges: [{ start: "09:00", end: "17:00" }]
      },
      channelMappings: {
        email: defaultChannelMapping,
        sms: defaultChannelMapping,
        slack: defaultChannelMapping,
        teams: defaultChannelMapping
      }
    }
  ]);

  const handleAddSchedule = () => {
    toast.success('New schedule rule created successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Schedule-Based Routing</h2>
          <p className="text-muted-foreground">
            Configure routing rules based on time windows and schedules
          </p>
        </div>
        <Button onClick={handleAddSchedule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule Rule
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Time-Based Routing Rules</CardTitle>
          <CardDescription>
            Configure different recipients based on time of day and day of week
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pass initialized rules to ensure proper type consistency */}
          <ScheduleBasedRules initialRules={initializedRules} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integration</CardTitle>
          <CardDescription>
            Integrate with calendar systems for on-call schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-8 rounded-md flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-muted-foreground">
              Calendar integration will be available in a future update
            </p>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">+</span>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline" disabled>Coming Soon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomScheduleBasedRules;
