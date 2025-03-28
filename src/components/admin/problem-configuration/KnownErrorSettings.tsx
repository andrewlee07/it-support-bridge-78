
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';

const KnownErrorSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    idPrefix: "KE-",
    autoCreateFromProblem: true,
    requireWorkaround: true,
    requireSymptoms: true,
    reviewFrequency: "quarterly",
    enableVersioning: true,
    defaultTemplate: ""
  });
  
  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Known error database settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved known error settings:", settings);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Known Error Database Settings</CardTitle>
        <CardDescription>Configure how known errors are documented and managed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <FormSectionHeader 
            title="Identification & Creation" 
            description="Configure how known errors are identified and created" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label htmlFor="idPrefix">Known Error ID Prefix</Label>
              <Input 
                id="idPrefix" 
                value={settings.idPrefix}
                onChange={(e) => handleChange("idPrefix", e.target.value)}
                placeholder="KE-"
              />
              <p className="text-sm text-muted-foreground">
                Prefix used for known error reference IDs
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reviewFrequency">Review Frequency</Label>
              <Select 
                value={settings.reviewFrequency} 
                onValueChange={(value) => handleChange("reviewFrequency", value)}
              >
                <SelectTrigger id="reviewFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Biannually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How often known errors should be reviewed
              </p>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Switch 
                id="autoCreateFromProblem" 
                checked={settings.autoCreateFromProblem}
                onCheckedChange={(checked) => handleChange("autoCreateFromProblem", checked)}
              />
              <div>
                <Label htmlFor="autoCreateFromProblem">Auto-create from Problem</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically create a known error entry when a problem is marked as 'Known Error'
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="enableVersioning" 
                checked={settings.enableVersioning}
                onCheckedChange={(checked) => handleChange("enableVersioning", checked)}
              />
              <div>
                <Label htmlFor="enableVersioning">Enable Versioning</Label>
                <p className="text-sm text-muted-foreground">
                  Track versions of known error documentation when updated
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <FormSectionHeader 
            title="Documentation Requirements" 
            description="Configure what information is required for known errors" 
          />
          
          <div className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              <Switch 
                id="requireWorkaround" 
                checked={settings.requireWorkaround}
                onCheckedChange={(checked) => handleChange("requireWorkaround", checked)}
              />
              <div>
                <Label htmlFor="requireWorkaround">Require Workaround</Label>
                <p className="text-sm text-muted-foreground">
                  Known errors must include workaround documentation
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="requireSymptoms" 
                checked={settings.requireSymptoms}
                onCheckedChange={(checked) => handleChange("requireSymptoms", checked)}
              />
              <div>
                <Label htmlFor="requireSymptoms">Require Symptoms Description</Label>
                <p className="text-sm text-muted-foreground">
                  Known errors must include symptoms documentation
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="defaultTemplate">Default Documentation Template</Label>
            <Textarea 
              id="defaultTemplate" 
              value={settings.defaultTemplate}
              onChange={(e) => handleChange("defaultTemplate", e.target.value)}
              placeholder="## Description
[Describe the known error]

## Symptoms
[List the symptoms]

## Workaround
[Describe the workaround]

## Affected Services
[List affected services]

## Resolution Plan
[Describe the plan for permanent resolution]"
              className="h-32 mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Default template for new known error documentation
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button">
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnownErrorSettings;
