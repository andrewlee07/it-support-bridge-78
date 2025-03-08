
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Shield, Save, RotateCcw } from 'lucide-react';
import { PasswordPolicy } from '@/utils/types/user';

interface PasswordPolicySettingsProps {
  passwordPolicy: PasswordPolicy;
  onPasswordPolicyChange: (field: keyof PasswordPolicy, value: any) => void;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
}

const PasswordPolicySettings: React.FC<PasswordPolicySettingsProps> = ({
  passwordPolicy,
  onPasswordPolicyChange,
  onSave,
  onReset,
  isSaving
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Password Policy</CardTitle>
        </div>
        <CardDescription>
          Configure password requirements for all users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minLength">Minimum Password Length</Label>
              <Input
                id="minLength"
                type="number"
                min="8"
                max="32"
                value={passwordPolicy.minLength}
                onChange={(e) => onPasswordPolicyChange('minLength', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDays">Password Expiry (days)</Label>
              <Input
                id="expiryDays"
                type="number"
                min="0"
                value={passwordPolicy.expiryDays}
                onChange={(e) => onPasswordPolicyChange('expiryDays', parseInt(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">
                Set to 0 for no expiry
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Password Requirements</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="requireUppercase" className="cursor-pointer">
                  Require Uppercase Letters
                </Label>
                <Switch
                  id="requireUppercase"
                  checked={passwordPolicy.requireUppercase}
                  onCheckedChange={(checked) => onPasswordPolicyChange('requireUppercase', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="requireLowercase" className="cursor-pointer">
                  Require Lowercase Letters
                </Label>
                <Switch
                  id="requireLowercase"
                  checked={passwordPolicy.requireLowercase}
                  onCheckedChange={(checked) => onPasswordPolicyChange('requireLowercase', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="requireNumbers" className="cursor-pointer">
                  Require Numbers
                </Label>
                <Switch
                  id="requireNumbers"
                  checked={passwordPolicy.requireNumbers}
                  onCheckedChange={(checked) => onPasswordPolicyChange('requireNumbers', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="requireSpecialChars" className="cursor-pointer">
                  Require Special Characters
                </Label>
                <Switch
                  id="requireSpecialChars"
                  checked={passwordPolicy.requireSpecialChars}
                  onCheckedChange={(checked) => onPasswordPolicyChange('requireSpecialChars', checked)}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="preventPasswordReuse">Previous Passwords to Check</Label>
            <Input
              id="preventPasswordReuse"
              type="number"
              min="0"
              max="24"
              value={passwordPolicy.preventPasswordReuse}
              onChange={(e) => onPasswordPolicyChange('preventPasswordReuse', parseInt(e.target.value))}
            />
            <p className="text-sm text-muted-foreground">
              Prevent reuse of this many previous passwords (0 to disable)
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordPolicySettings;
