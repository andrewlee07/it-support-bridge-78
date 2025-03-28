
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

interface ReleaseGeneralSettingsValues {
  releaseNamePrefix: string;
  versionFormat: string;
  releaseApprovalRequired: boolean;
  enableReleaseMetrics: boolean;
  requireDeploymentNotes: boolean;
  enableVersionNumbering: boolean;
  autoCreateTest: boolean;
  requireRiskAssessment: boolean;
}

const ReleaseGeneralSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Default values - in a real app these would come from an API
  const defaultValues: ReleaseGeneralSettingsValues = {
    releaseNamePrefix: "REL-",
    versionFormat: "v{major}.{minor}.{patch}",
    releaseApprovalRequired: true,
    enableReleaseMetrics: true,
    requireDeploymentNotes: true,
    enableVersionNumbering: true,
    autoCreateTest: false,
    requireRiskAssessment: true
  };
  
  const form = useForm<ReleaseGeneralSettingsValues>({
    defaultValues
  });
  
  const onSubmit = (data: ReleaseGeneralSettingsValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Release general settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved release general settings:", data);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Release Settings</CardTitle>
        <CardDescription>Configure global settings for release management</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormSectionHeader 
              title="Release Identification" 
              description="Configure how releases are identified and versioned" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                form={form}
                name="releaseNamePrefix"
                label="Release Name Prefix"
                description="Prefix used for release reference IDs"
              >
                <Input />
              </CustomFormField>
              
              <CustomFormField
                form={form}
                name="versionFormat"
                label="Version Format"
                description="Format for version numbers (e.g., v{major}.{minor}.{patch})"
              >
                <Input />
              </CustomFormField>
            </div>
          </div>
          
          <div>
            <FormSectionHeader 
              title="Release Behavior Settings" 
              description="Configure how releases behave in the system" 
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="releaseApprovalRequired" 
                  checked={form.watch("releaseApprovalRequired")}
                  onCheckedChange={(checked) => 
                    form.setValue("releaseApprovalRequired", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="releaseApprovalRequired">Require approval for releases</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, releases must be approved before deployment
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="requireDeploymentNotes" 
                  checked={form.watch("requireDeploymentNotes")}
                  onCheckedChange={(checked) => 
                    form.setValue("requireDeploymentNotes", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="requireDeploymentNotes">Require deployment notes</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, deployment notes must be provided for each release
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableVersionNumbering" 
                  checked={form.watch("enableVersionNumbering")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableVersionNumbering", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableVersionNumbering">Enable automatic version numbering</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically increment version numbers based on release type
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="requireRiskAssessment" 
                  checked={form.watch("requireRiskAssessment")}
                  onCheckedChange={(checked) => 
                    form.setValue("requireRiskAssessment", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="requireRiskAssessment">Require risk assessment</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, releases must include a risk assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <FormSectionHeader 
              title="Reporting & Integration" 
              description="Configure release metrics and integrations" 
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableReleaseMetrics" 
                  checked={form.watch("enableReleaseMetrics")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableReleaseMetrics", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableReleaseMetrics">Enable release metrics tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track and report on release execution metrics like success rates
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="autoCreateTest" 
                  checked={form.watch("autoCreateTest")}
                  onCheckedChange={(checked) => 
                    form.setValue("autoCreateTest", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="autoCreateTest">Automatically create test cycles</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate test cycles for each new release
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

export default ReleaseGeneralSettings;
