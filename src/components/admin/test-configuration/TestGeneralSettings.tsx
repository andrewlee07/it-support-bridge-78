
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';
import CustomFormField from '@/components/changes/form/CustomFormField';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

interface TestGeneralSettingsValues {
  executionNamePrefix: string;
  defaultTestDuration: number;
  requireExecutionNotes: boolean;
  enableBlockerTracking: boolean;
  enableTestMetrics: boolean;
  enableTestReporting: boolean;
  trackAutomatedTestsPerformance: boolean;
  allowTestReuse: boolean;
  allowTestSkipping: boolean;
}

const TestGeneralSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Default values - in a real app these would come from an API
  const defaultValues: TestGeneralSettingsValues = {
    executionNamePrefix: "TE-",
    defaultTestDuration: 30,
    requireExecutionNotes: true,
    enableBlockerTracking: true,
    enableTestMetrics: true,
    enableTestReporting: true,
    trackAutomatedTestsPerformance: false,
    allowTestReuse: true,
    allowTestSkipping: false
  };
  
  const form = useForm<TestGeneralSettingsValues>({
    defaultValues
  });
  
  const onSubmit = (data: TestGeneralSettingsValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Test general settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved test general settings:", data);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Test Settings</CardTitle>
        <CardDescription>Configure global settings for test management</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormSectionHeader 
              title="Test Execution Settings" 
              description="Configure global settings for test execution" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                form={form}
                name="executionNamePrefix"
                label="Test Execution Prefix"
                description="Prefix used for test execution reference IDs"
              >
                <Input />
              </CustomFormField>
              
              <CustomFormField
                form={form}
                name="defaultTestDuration"
                label="Default Test Duration (minutes)"
                description="Default duration allocated for test execution"
              >
                <Input type="number" min={1} />
              </CustomFormField>
            </div>
          </div>
          
          <div>
            <FormSectionHeader 
              title="Test Behavior Settings" 
              description="Configure how tests behave in the system" 
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="requireExecutionNotes" 
                  checked={form.watch("requireExecutionNotes")}
                  onCheckedChange={(checked) => 
                    form.setValue("requireExecutionNotes", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="requireExecutionNotes">Require execution notes for failed tests</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, users must provide notes when a test fails
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableBlockerTracking" 
                  checked={form.watch("enableBlockerTracking")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableBlockerTracking", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableBlockerTracking">Enable blocker tracking for blocked tests</Label>
                  <p className="text-sm text-muted-foreground">
                    Track and report on tests that are blocked from execution
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="allowTestReuse" 
                  checked={form.watch("allowTestReuse")}
                  onCheckedChange={(checked) => 
                    form.setValue("allowTestReuse", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="allowTestReuse">Allow test case reuse across cycles</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, test cases can be reused in multiple test cycles
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="allowTestSkipping" 
                  checked={form.watch("allowTestSkipping")}
                  onCheckedChange={(checked) => 
                    form.setValue("allowTestSkipping", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="allowTestSkipping">Allow tests to be skipped</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, testers can mark tests as skipped
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <FormSectionHeader 
              title="Reporting & Metrics" 
              description="Configure test metrics and reporting" 
            />
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableTestMetrics" 
                  checked={form.watch("enableTestMetrics")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableTestMetrics", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableTestMetrics">Enable test metrics tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track and report on test execution metrics like pass rates
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="enableTestReporting" 
                  checked={form.watch("enableTestReporting")}
                  onCheckedChange={(checked) => 
                    form.setValue("enableTestReporting", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="enableTestReporting">Enable test reporting</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate and distribute test execution reports
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="trackAutomatedTestsPerformance" 
                  checked={form.watch("trackAutomatedTestsPerformance")}
                  onCheckedChange={(checked) => 
                    form.setValue("trackAutomatedTestsPerformance", checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="trackAutomatedTestsPerformance">Track automated test performance</Label>
                  <p className="text-sm text-muted-foreground">
                    Track and report on automated test execution times and performance
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

export default TestGeneralSettings;
