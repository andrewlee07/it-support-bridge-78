
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';
import {
  GitBranch,
  Webhook,
  Server,
  RefreshCw,
  TestTube,
  Settings,
  PieChart
} from "lucide-react";

const TestAutomationTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ci-integration");
  const [isSaving, setIsSaving] = useState(false);
  
  // Default values for the CI/CD integration
  const [ciSettings, setCiSettings] = useState({
    enableIntegration: true,
    ciPlatform: "jenkins",
    webhookUrl: "https://jenkins.example.com/webhook/test-automation",
    triggerOnMerge: true,
    triggerOnPush: false,
    reportResults: true,
    createBugsAutomatically: true,
    notifyOnFailure: true
  });
  
  // Default values for test runners
  const [testRunnerSettings, setTestRunnerSettings] = useState({
    enableSelenium: true,
    enableCypress: true,
    enableJest: false,
    enableRobot: false,
    seleniumGridUrl: "http://selenium-grid.internal:4444/wd/hub",
    maxParallelTests: 5
  });
  
  // Default values for scheduling
  const [schedulingSettings, setSchedulingSettings] = useState({
    enableScheduling: true,
    defaultInterval: "daily",
    defaultTime: "01:00",
    retryFailedTests: true,
    maxRetries: 3,
    notifyOnFailure: true
  });
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Test automation settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    // Log settings that would be saved
    console.log("CI Settings:", ciSettings);
    console.log("Test Runner Settings:", testRunnerSettings);
    console.log("Scheduling Settings:", schedulingSettings);
  };
  
  const handleResetSettings = () => {
    setCiSettings({
      enableIntegration: true,
      ciPlatform: "jenkins",
      webhookUrl: "https://jenkins.example.com/webhook/test-automation",
      triggerOnMerge: true,
      triggerOnPush: false,
      reportResults: true,
      createBugsAutomatically: true,
      notifyOnFailure: true
    });
    
    setTestRunnerSettings({
      enableSelenium: true,
      enableCypress: true,
      enableJest: false,
      enableRobot: false,
      seleniumGridUrl: "http://selenium-grid.internal:4444/wd/hub",
      maxParallelTests: 5
    });
    
    setSchedulingSettings({
      enableScheduling: true,
      defaultInterval: "daily",
      defaultTime: "01:00",
      retryFailedTests: true,
      maxRetries: 3,
      notifyOnFailure: true
    });
    
    toast({
      title: "Settings reset",
      description: "Test automation settings have been reset to defaults."
    });
  };
  
  // Test connection function for CI/CD integration
  const handleTestConnection = () => {
    toast({
      title: "Testing connection...",
      description: "Attempting to connect to CI/CD platform..."
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${ciSettings.ciPlatform}.`
      });
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Automation Settings</CardTitle>
        <CardDescription>
          Configure integration with test automation tools and CI/CD pipelines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="ci-integration" className="flex items-center">
              <GitBranch className="h-4 w-4 mr-2" />
              CI/CD Integration
            </TabsTrigger>
            <TabsTrigger value="test-runners" className="flex items-center">
              <TestTube className="h-4 w-4 mr-2" />
              Test Runners
            </TabsTrigger>
            <TabsTrigger value="scheduling" className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Test Scheduling
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ci-integration" className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="enable-integration" 
                checked={ciSettings.enableIntegration}
                onCheckedChange={(checked) => setCiSettings({...ciSettings, enableIntegration: checked})}
              />
              <Label htmlFor="enable-integration">Enable CI/CD Integration</Label>
            </div>
            
            {ciSettings.enableIntegration && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ci-platform">CI/CD Platform</Label>
                    <Select 
                      value={ciSettings.ciPlatform}
                      onValueChange={(value) => setCiSettings({...ciSettings, ciPlatform: value})}
                    >
                      <SelectTrigger id="ci-platform">
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jenkins">Jenkins</SelectItem>
                        <SelectItem value="github-actions">GitHub Actions</SelectItem>
                        <SelectItem value="gitlab-ci">GitLab CI</SelectItem>
                        <SelectItem value="azure-devops">Azure DevOps</SelectItem>
                        <SelectItem value="circleci">CircleCI</SelectItem>
                        <SelectItem value="teamcity">TeamCity</SelectItem>
                        <SelectItem value="travis-ci">Travis CI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="webhook-url" 
                        placeholder="Enter webhook URL"
                        value={ciSettings.webhookUrl}
                        onChange={(e) => setCiSettings({...ciSettings, webhookUrl: e.target.value})}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleTestConnection}
                        type="button"
                      >
                        Test
                      </Button>
                    </div>
                  </div>
                </div>
                
                <FormSectionHeader 
                  title="Trigger Settings" 
                  description="Configure when automated tests should be triggered" 
                />
                
                <div className="space-y-3 pl-1">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="trigger-on-merge" 
                      checked={ciSettings.triggerOnMerge}
                      onCheckedChange={(checked) => setCiSettings({...ciSettings, triggerOnMerge: checked})}
                    />
                    <Label htmlFor="trigger-on-merge">Trigger tests on merge to main branch</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="trigger-on-push" 
                      checked={ciSettings.triggerOnPush}
                      onCheckedChange={(checked) => setCiSettings({...ciSettings, triggerOnPush: checked})}
                    />
                    <Label htmlFor="trigger-on-push">Trigger tests on push to any branch</Label>
                  </div>
                </div>
                
                <FormSectionHeader 
                  title="Result Reporting" 
                  description="Configure how test results are reported and handled" 
                />
                
                <div className="space-y-3 pl-1">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="report-results" 
                      checked={ciSettings.reportResults}
                      onCheckedChange={(checked) => setCiSettings({...ciSettings, reportResults: checked})}
                    />
                    <Label htmlFor="report-results">Import test results from CI/CD pipeline</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="create-bugs" 
                      checked={ciSettings.createBugsAutomatically}
                      onCheckedChange={(checked) => setCiSettings({...ciSettings, createBugsAutomatically: checked})}
                    />
                    <Label htmlFor="create-bugs">Create bugs automatically for failed tests</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notify-on-failure" 
                      checked={ciSettings.notifyOnFailure}
                      onCheckedChange={(checked) => setCiSettings({...ciSettings, notifyOnFailure: checked})}
                    />
                    <Label htmlFor="notify-on-failure">Send notifications for test failures</Label>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="test-runners" className="space-y-4 pt-2">
            <FormSectionHeader 
              title="Test Frameworks" 
              description="Configure supported test automation frameworks" 
            />
            
            <div className="space-y-3 pl-1">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-selenium" 
                  checked={testRunnerSettings.enableSelenium}
                  onCheckedChange={(checked) => setTestRunnerSettings({...testRunnerSettings, enableSelenium: checked})}
                />
                <Label htmlFor="enable-selenium">Enable Selenium WebDriver</Label>
              </div>
              
              {testRunnerSettings.enableSelenium && (
                <div className="pl-7 space-y-2">
                  <Label htmlFor="selenium-grid-url">Selenium Grid URL</Label>
                  <Input 
                    id="selenium-grid-url" 
                    placeholder="Enter Selenium Grid URL"
                    value={testRunnerSettings.seleniumGridUrl}
                    onChange={(e) => setTestRunnerSettings({...testRunnerSettings, seleniumGridUrl: e.target.value})}
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-cypress" 
                  checked={testRunnerSettings.enableCypress}
                  onCheckedChange={(checked) => setTestRunnerSettings({...testRunnerSettings, enableCypress: checked})}
                />
                <Label htmlFor="enable-cypress">Enable Cypress</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-jest" 
                  checked={testRunnerSettings.enableJest}
                  onCheckedChange={(checked) => setTestRunnerSettings({...testRunnerSettings, enableJest: checked})}
                />
                <Label htmlFor="enable-jest">Enable Jest</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-robot" 
                  checked={testRunnerSettings.enableRobot}
                  onCheckedChange={(checked) => setTestRunnerSettings({...testRunnerSettings, enableRobot: checked})}
                />
                <Label htmlFor="enable-robot">Enable Robot Framework</Label>
              </div>
            </div>
            
            <FormSectionHeader 
              title="Execution Settings" 
              description="Configure test execution settings" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-parallel">Maximum Parallel Tests</Label>
                <Input 
                  id="max-parallel" 
                  type="number"
                  min={1}
                  max={20}
                  placeholder="Enter maximum parallel tests"
                  value={testRunnerSettings.maxParallelTests}
                  onChange={(e) => setTestRunnerSettings({
                    ...testRunnerSettings, 
                    maxParallelTests: parseInt(e.target.value) || 1
                  })}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="enable-scheduling" 
                checked={schedulingSettings.enableScheduling}
                onCheckedChange={(checked) => setSchedulingSettings({...schedulingSettings, enableScheduling: checked})}
              />
              <Label htmlFor="enable-scheduling">Enable Scheduled Test Runs</Label>
            </div>
            
            {schedulingSettings.enableScheduling && (
              <div className="space-y-4 pt-2">
                <FormSectionHeader 
                  title="Default Schedule" 
                  description="Configure default schedule for automated test runs" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-interval">Default Interval</Label>
                    <Select 
                      value={schedulingSettings.defaultInterval}
                      onValueChange={(value) => setSchedulingSettings({...schedulingSettings, defaultInterval: value})}
                    >
                      <SelectTrigger id="default-interval">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-time">Default Time</Label>
                    <Input 
                      id="default-time" 
                      type="time"
                      value={schedulingSettings.defaultTime}
                      onChange={(e) => setSchedulingSettings({...schedulingSettings, defaultTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <FormSectionHeader 
                  title="Retry Settings" 
                  description="Configure retry behavior for failed tests" 
                />
                
                <div className="space-y-3 pl-1">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="retry-failed-tests" 
                      checked={schedulingSettings.retryFailedTests}
                      onCheckedChange={(checked) => setSchedulingSettings({...schedulingSettings, retryFailedTests: checked})}
                    />
                    <Label htmlFor="retry-failed-tests">Retry failed tests automatically</Label>
                  </div>
                  
                  {schedulingSettings.retryFailedTests && (
                    <div className="pl-7 space-y-2">
                      <Label htmlFor="max-retries">Maximum Retry Attempts</Label>
                      <Input 
                        id="max-retries" 
                        type="number"
                        min={1}
                        max={10}
                        placeholder="Enter maximum retries"
                        value={schedulingSettings.maxRetries}
                        onChange={(e) => setSchedulingSettings({
                          ...schedulingSettings, 
                          maxRetries: parseInt(e.target.value) || 1
                        })}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notify-schedule-failure" 
                      checked={schedulingSettings.notifyOnFailure}
                      onCheckedChange={(checked) => setSchedulingSettings({...schedulingSettings, notifyOnFailure: checked})}
                    />
                    <Label htmlFor="notify-schedule-failure">Send notifications for test failures</Label>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6" />
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestAutomationTab;
