
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

interface AppearanceTabProps {
  isDark: boolean;
  toggleTheme: () => void;
  handleSave: () => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({ isDark, toggleTheme, handleSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the application looks for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <Switch 
            id="dark-mode" 
            checked={isDark}
            onCheckedChange={toggleTheme}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceTab;
