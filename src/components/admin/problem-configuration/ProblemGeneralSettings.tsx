
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
import { Checkbox } from '@/components/ui/checkbox';
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';
import CustomFormField from '@/components/changes/form/CustomFormField';
import { useForm } from 'react-hook-form';

interface ProblemGeneralSettingsValues {
  problemIdPrefix: string;
  autoLinkIncidents: boolean;
  requireRootCauseAnalysis: boolean;
  enableDurationTracking: boolean;
  autoCreateKnownErrors: boolean;
  requireClosureNotes: boolean;
  enableImpactAssessment: boolean;
}

const ProblemGeneralSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Default values - in a real app these would come from an API
  const defaultValues: ProblemGeneralSettingsValues = {
    problemIdPrefix: "PB-",
    autoLinkIncidents: true,
    requireRootCauseAnalysis: true,
    enableDurationTracking: true,
    autoCreateKnownErrors: false,
    requireClosureNotes: true,
    enableImpactAssessment: true
  };
  
  const form = useForm<ProblemGeneralSettingsValues>({
    defaultValues
  });
  
  const onSubmit = (data: ProblemGeneralSettingsValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Problem general settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved problem general settings:", data);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Problem Settings</CardTitle>
        <CardDescription>Configure global settings for problem management</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormSectionHeader 
              title="Problem Identification" 
              description="Configure how problems are identified and referenced" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                form={form}
                name="problemIdPrefix"
                label="Problem ID Prefix"
                description="Prefix used for problem reference IDs"
              >
                <Input />
              </CustomFormField>
            </div>
          </div>
          
          <div>
            <FormSectionHeader 
              title="Problem Behavior Settings" 
              description="Configure how problems behave in the system" 
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="autoLinkIncidents" 
                  checked={form.watch("autoLinkIncidents")}
                  onCheckedChange={(checked) => 
                    form.setValue("autoLinkIncidents", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="autoLinkIncidents">Automatically link related incidents</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, the system will suggest related incidents to link
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="requireRootCauseAnalysis" 
                  checked={form.watch("requireRootCauseAnalysis")}
                  onCheckedChange={(checked) => 
                    form.setValue("requireRootCauseAnalysis", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="requireRootCauseAnalysis">Require root cause analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, problems require root cause analysis before closing
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableDurationTracking" 
                  checked={form.watch("enableDurationTracking")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableDurationTracking", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableDurationTracking">Enable duration tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track time spent in each stage of problem resolution
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableImpactAssessment" 
                  checked={form.watch("enableImpactAssessment")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableImpactAssessment", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableImpactAssessment">Enable impact assessment</Label>
                  <p className="text-sm text-muted-foreground">
                    Require impact assessment for all problem records
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <FormSectionHeader 
              title="Known Error Settings" 
              description="Configure known error database behavior" 
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="autoCreateKnownErrors" 
                  checked={form.watch("autoCreateKnownErrors")}
                  onCheckedChange={(checked) => 
                    form.setValue("autoCreateKnownErrors", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="autoCreateKnownErrors">Auto-create known errors</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically create known error records when problems are identified
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="requireClosureNotes" 
                  checked={form.watch("requireClosureNotes")}
                  onCheckedChange={(checked) => 
                    form.setValue("requireClosureNotes", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="requireClosureNotes">Require closure notes</Label>
                  <p className="text-sm text-muted-foreground">
                    Problem records require detailed closure notes
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProblemGeneralSettings;
