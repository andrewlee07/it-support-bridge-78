
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Check, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type BugSeverity = {
  id: string;
  label: string;
  value: string;
  isActive: boolean;
};

const defaultSeverities: BugSeverity[] = [
  { id: '1', label: 'Critical', value: 'critical', isActive: true },
  { id: '2', label: 'Major', value: 'major', isActive: true },
  { id: '3', label: 'Minor', value: 'minor', isActive: true },
  { id: '4', label: 'Trivial', value: 'trivial', isActive: true },
];

const BugSeverityConfiguration: React.FC = () => {
  const { toast } = useToast();
  const [severities, setSeverities] = useState<BugSeverity[]>(defaultSeverities);
  const [newSeverity, setNewSeverity] = useState('');

  const handleAddSeverity = () => {
    if (!newSeverity.trim()) {
      toast({
        title: 'Error',
        description: 'Severity name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    const value = newSeverity.toLowerCase().replace(/\s+/g, '-');
    const exists = severities.some(s => 
      s.value === value || s.label.toLowerCase() === newSeverity.toLowerCase()
    );

    if (exists) {
      toast({
        title: 'Error',
        description: 'This severity already exists',
        variant: 'destructive',
      });
      return;
    }

    setSeverities([
      ...severities,
      {
        id: Date.now().toString(),
        label: newSeverity,
        value: value,
        isActive: true,
      },
    ]);
    setNewSeverity('');
    
    toast({
      title: 'Success',
      description: `${newSeverity} severity has been added`,
    });
  };

  const toggleSeverity = (id: string) => {
    setSeverities(severities.map(severity => 
      severity.id === id ? { ...severity, isActive: !severity.isActive } : severity
    ));
  };

  const deleteSeverity = (id: string) => {
    setSeverities(severities.filter(severity => severity.id !== id));
    toast({
      title: 'Success',
      description: 'Severity has been deleted',
    });
  };

  const resetToDefaults = () => {
    setSeverities(defaultSeverities);
    toast({
      title: 'Reset Complete',
      description: 'Bug severities have been reset to defaults',
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Bug Severity Levels</CardTitle>
        <CardDescription>
          Configure the severity levels for bug reports in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="new-severity">Add New Severity</Label>
              <Input
                id="new-severity"
                placeholder="Severity name"
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value)}
              />
            </div>
            <Button onClick={handleAddSeverity}>Add Severity</Button>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-12 bg-muted p-3 rounded-t-md">
              <div className="col-span-5 font-medium">Name</div>
              <div className="col-span-4 font-medium">Value</div>
              <div className="col-span-3 font-medium text-right">Actions</div>
            </div>
            <div className="divide-y">
              {severities.map((severity) => (
                <div 
                  key={severity.id} 
                  className="grid grid-cols-12 p-3 items-center"
                >
                  <div className="col-span-5 flex items-center gap-2">
                    {severity.label}
                    {!severity.isActive && (
                      <span className="text-xs text-muted-foreground">(Inactive)</span>
                    )}
                  </div>
                  <div className="col-span-4 text-muted-foreground">
                    {severity.value}
                  </div>
                  <div className="col-span-3 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSeverity(severity.id)}
                      title={severity.isActive ? "Deactivate" : "Activate"}
                    >
                      <Check 
                        className={`h-4 w-4 ${severity.isActive ? 'text-green-500' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSeverity(severity.id)}
                      title="Delete"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={resetToDefaults}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BugSeverityConfiguration;
