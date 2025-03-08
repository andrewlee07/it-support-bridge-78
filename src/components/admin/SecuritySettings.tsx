
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Clock, Shield, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_PASSWORD_POLICY, updatePasswordPolicy, updateDefaultSessionTimeout } from '@/utils/securityUtils';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [defaultSessionTimeout, setDefaultSessionTimeout] = useState(30);
  const [passwordPolicy, setPasswordPolicy] = useState({ ...DEFAULT_PASSWORD_POLICY });
  const [isSaving, setIsSaving] = useState(false);

  const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDefaultSessionTimeout(value);
    }
  };

  const handlePasswordPolicyChange = (field: keyof typeof passwordPolicy, value: any) => {
    setPasswordPolicy(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Update password policy
      updatePasswordPolicy(passwordPolicy);
      
      // Update default session timeout
      updateDefaultSessionTimeout(defaultSessionTimeout);
      
      toast({
        title: "Settings updated",
        description: "Security settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setPasswordPolicy({ ...DEFAULT_PASSWORD_POLICY });
    setDefaultSessionTimeout(30);
  };

  return (
    <div className="space-y-6">
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
                  onChange={handleTimeoutChange}
                />
                <p className="text-sm text-muted-foreground">
                  Users will be automatically logged out after this period of inactivity
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  onChange={(e) => handlePasswordPolicyChange('minLength', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryDays">Password Expiry (days)</Label>
                <Input
                  id="expiryDays"
                  type="number"
                  min="0"
                  value={passwordPolicy.expiryDays}
                  onChange={(e) => handlePasswordPolicyChange('expiryDays', parseInt(e.target.value))}
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
                    onCheckedChange={(checked) => handlePasswordPolicyChange('requireUppercase', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireLowercase" className="cursor-pointer">
                    Require Lowercase Letters
                  </Label>
                  <Switch
                    id="requireLowercase"
                    checked={passwordPolicy.requireLowercase}
                    onCheckedChange={(checked) => handlePasswordPolicyChange('requireLowercase', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireNumbers" className="cursor-pointer">
                    Require Numbers
                  </Label>
                  <Switch
                    id="requireNumbers"
                    checked={passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) => handlePasswordPolicyChange('requireNumbers', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireSpecialChars" className="cursor-pointer">
                    Require Special Characters
                  </Label>
                  <Switch
                    id="requireSpecialChars"
                    checked={passwordPolicy.requireSpecialChars}
                    onCheckedChange={(checked) => handlePasswordPolicyChange('requireSpecialChars', checked)}
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
                onChange={(e) => handlePasswordPolicyChange('preventPasswordReuse', parseInt(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">
                Prevent reuse of this many previous passwords (0 to disable)
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
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
    </div>
  );
};

export default SecuritySettings;
