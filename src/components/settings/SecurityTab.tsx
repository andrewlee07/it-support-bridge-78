
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Key, Shield } from 'lucide-react';
import { User } from '@/utils/types/user';

interface SecurityTabProps {
  user: User;
  handleSave: () => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ user, handleSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <Label htmlFor="two-factor">Two-factor Authentication</Label>
          </div>
          <div className="flex items-center">
            <Badge 
              variant={user.mfaEnabled ? "success" : "secondary"}
              className={`rounded-full px-3 ${user.mfaEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
            >
              {user.mfaEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
            <div className="text-xs text-muted-foreground ml-2">(Managed by IT Admin)</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <Label htmlFor="session-timeout">Session Timeout</Label>
          </div>
          <div className="text-sm">30 minutes</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Change Password</Button>
        <Button onClick={handleSave}>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityTab;
