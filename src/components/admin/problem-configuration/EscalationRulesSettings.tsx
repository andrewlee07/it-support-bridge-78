
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
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface EscalationRule {
  id: string;
  condition: string;
  priority: string;
  timeThreshold: number;
  timeUnit: 'minutes' | 'hours' | 'days';
  escalateToLevel: string;
  notifyRoles: string[];
}

const EscalationRulesSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [enableEscalation, setEnableEscalation] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([
    {
      id: '1',
      condition: 'No activity',
      priority: 'P1',
      timeThreshold: 2,
      timeUnit: 'hours',
      escalateToLevel: 'Manager',
      notifyRoles: ['Problem Manager', 'Service Owner']
    },
    {
      id: '2',
      condition: 'No update',
      priority: 'P2',
      timeThreshold: 1,
      timeUnit: 'days',
      escalateToLevel: 'Team Lead',
      notifyRoles: ['Problem Coordinator']
    },
    {
      id: '3',
      condition: 'Stuck in analysis',
      priority: 'Any',
      timeThreshold: 5,
      timeUnit: 'days',
      escalateToLevel: 'Director',
      notifyRoles: ['Problem Manager', 'IT Director']
    }
  ]);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Problem escalation rules have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved escalation rules:", {
      enableEscalation,
      rules: escalationRules
    });
  };
  
  const handleDeleteRule = (ruleId: string) => {
    setEscalationRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule deleted",
      description: "Escalation rule has been removed."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem Escalation Rules</CardTitle>
        <CardDescription>Configure problem escalation pathways and triggers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="enableEscalation" 
            checked={enableEscalation}
            onCheckedChange={setEnableEscalation}
          />
          <div>
            <Label htmlFor="enableEscalation">Enable Automatic Escalation</Label>
            <p className="text-sm text-muted-foreground">
              Automatically escalate problems based on defined rules
            </p>
          </div>
        </div>
        
        {enableEscalation && (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Time Threshold</TableHead>
                    <TableHead>Escalate To</TableHead>
                    <TableHead>Notify</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escalationRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>{rule.condition}</TableCell>
                      <TableCell>{rule.priority}</TableCell>
                      <TableCell>{`${rule.timeThreshold} ${rule.timeUnit}`}</TableCell>
                      <TableCell>{rule.escalateToLevel}</TableCell>
                      <TableCell>{rule.notifyRoles.join(', ')}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteRule(rule.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <Button variant="outline" className="mt-4" onClick={() => setIsEditing(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Escalation Rule
            </Button>
            
            {isEditing && (
              <Card className="border border-primary/50">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Add/Edit Escalation Rule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select defaultValue="activity">
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activity">No activity</SelectItem>
                          <SelectItem value="update">No update</SelectItem>
                          <SelectItem value="analysis">Stuck in analysis</SelectItem>
                          <SelectItem value="pending">Pending too long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select defaultValue="P1">
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="P1">P1</SelectItem>
                          <SelectItem value="P2">P2</SelectItem>
                          <SelectItem value="P3">P3</SelectItem>
                          <SelectItem value="Any">Any</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="threshold">Time Threshold</Label>
                      <div className="flex space-x-2">
                        <Input id="threshold" type="number" min="1" defaultValue="2" className="w-24" />
                        <Select defaultValue="hours">
                          <SelectTrigger id="timeUnit">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="escalateToLevel">Escalate To</Label>
                      <Select defaultValue="Manager">
                        <SelectTrigger id="escalateToLevel">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Team Lead">Team Lead</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Director">Director</SelectItem>
                          <SelectItem value="VP">VP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notifyRoles">Notify Roles</Label>
                      <Select defaultValue="Problem Manager">
                        <SelectTrigger id="notifyRoles">
                          <SelectValue placeholder="Select roles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Problem Manager">Problem Manager</SelectItem>
                          <SelectItem value="Problem Coordinator">Problem Coordinator</SelectItem>
                          <SelectItem value="Service Owner">Service Owner</SelectItem>
                          <SelectItem value="IT Director">IT Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setIsEditing(false);
                      toast({
                        title: "Rule saved",
                        description: "Escalation rule has been updated."
                      });
                    }}>
                      Save Rule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button">
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscalationRulesSettings;
