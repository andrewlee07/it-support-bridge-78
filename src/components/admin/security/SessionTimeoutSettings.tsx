
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from 'lucide-react';

interface SessionTimeoutSettingsProps {
  defaultSessionTimeout: number;
  onTimeoutChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SessionTimeoutSettings: React.FC<SessionTimeoutSettingsProps> = ({
  defaultSessionTimeout,
  onTimeoutChange
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Session Timeout Settings</CardTitle>
        </div>
        <CardDescription>
          Configure how long users can remain inactive before being automatically logged out
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultTimeout">Default Session Timeout (minutes)</Label>
              <Input
                id="defaultTimeout"
                type="number"
                min="1"
                value={defaultSessionTimeout}
                onChange={onTimeoutChange}
              />
              <p className="text-sm text-muted-foreground">
                Users will be automatically logged out after this period of inactivity
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionTimeoutSettings;
