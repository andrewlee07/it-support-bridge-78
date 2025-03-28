
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RootCauseAnalysisSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("fishbone");
  const [mandatoryCategories, setMandatoryCategories] = useState({
    people: true,
    process: true,
    technology: true,
    environment: false,
    materials: false,
    measurement: false
  });
  const [rcaTemplateEnabled, setRcaTemplateEnabled] = useState(true);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Root cause analysis settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved RCA settings:", {
      selectedMethod,
      mandatoryCategories,
      rcaTemplateEnabled
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Root Cause Analysis Configuration</CardTitle>
        <CardDescription>Configure root cause analysis methodology and requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="methodology">
          <TabsList className="mb-4">
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="methodology" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="rcaMethod">Default RCA Method</Label>
                <Select 
                  value={selectedMethod} 
                  onValueChange={setSelectedMethod}
                >
                  <SelectTrigger id="rcaMethod" className="w-full">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fishbone">Fishbone (Ishikawa) Diagram</SelectItem>
                    <SelectItem value="5why">5 Whys Analysis</SelectItem>
                    <SelectItem value="fta">Fault Tree Analysis</SelectItem>
                    <SelectItem value="custom">Custom Method</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  The default methodology for root cause analysis
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="rcaRequired" 
                  checked={true} 
                  disabled
                />
                <div>
                  <Label htmlFor="rcaRequired">Require RCA for closure</Label>
                  <p className="text-sm text-muted-foreground">
                    Problems must have a completed RCA before they can be closed
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="allowMultipleRCA" 
                  checked={true}
                />
                <div>
                  <Label htmlFor="allowMultipleRCA">Allow multiple RCA methods</Label>
                  <p className="text-sm text-muted-foreground">
                    Users can select from available methods or use multiple methods
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableTemplates" 
                  checked={rcaTemplateEnabled}
                  onCheckedChange={setRcaTemplateEnabled}
                />
                <div>
                  <Label htmlFor="enableTemplates">Enable RCA Templates</Label>
                  <p className="text-sm text-muted-foreground">
                    Use predefined templates for different types of root cause analysis
                  </p>
                </div>
              </div>
              
              <div className={!rcaTemplateEnabled ? "opacity-50 pointer-events-none" : ""}>
                <Label>Template Configuration</Label>
                <div className="border rounded-lg p-4 mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Infrastructure Template</p>
                      <p className="text-sm text-muted-foreground">For infrastructure-related problems</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Application Template</p>
                      <p className="text-sm text-muted-foreground">For application-related problems</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Network Template</p>
                      <p className="text-sm text-muted-foreground">For network-related problems</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-2">
                  <span>Add Template</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <div>
              <Label>Required RCA Categories</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Select which categories must be assessed in root cause analysis
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-people" 
                    checked={mandatoryCategories.people}
                    onCheckedChange={(checked) => 
                      setMandatoryCategories(prev => ({...prev, people: checked as boolean}))
                    }
                  />
                  <Label htmlFor="cat-people">People</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-process" 
                    checked={mandatoryCategories.process}
                    onCheckedChange={(checked) => 
                      setMandatoryCategories(prev => ({...prev, process: checked as boolean}))
                    }
                  />
                  <Label htmlFor="cat-process">Process</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-technology" 
                    checked={mandatoryCategories.technology}
                    onCheckedChange={(checked) => 
                      setMandatoryCategories(prev => ({...prev, technology: checked as boolean}))
                    }
                  />
                  <Label htmlFor="cat-technology">Technology</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-environment" 
                    checked={mandatoryCategories.environment}
                    onCheckedChange={(checked) => 
                      setMandatoryCategories(prev => ({...prev, environment: checked as boolean}))
                    }
                  />
                  <Label htmlFor="cat-environment">Environment</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-materials" 
                    checked={mandatoryCategories.materials}
                    onCheckedChange={(checked) => 
                      setMandatoryCategories(prev => ({...prev, materials: checked as boolean}))
                    }
                  />
                  <Label htmlFor="cat-materials">Materials</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-measurement" 
                    checked={mandatoryCategories.measurement}
                    onCheckedChange={(checked) => 
                      setMandatoryCategories(prev => ({...prev, measurement: checked as boolean}))
                    }
                  />
                  <Label htmlFor="cat-measurement">Measurement</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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

export default RootCauseAnalysisSettings;
