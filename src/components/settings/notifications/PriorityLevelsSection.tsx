
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, AlertCircle, BellRing, Bell } from 'lucide-react';

interface PriorityLevelsSectionProps {
  levels: {
    critical: boolean;
    high: boolean;
    medium: boolean;
    low: boolean;
  };
  onToggle: (category: string, value: string) => void;
}

const PriorityLevelsSection: React.FC<PriorityLevelsSectionProps> = ({ 
  levels,
  onToggle
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Priority Levels</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Control which notification priority levels you receive. Critical notifications for problem events like root cause identification and workarounds, as well as important known error updates, are always sent.
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <Label>Critical priority</Label>
        </div>
        <Switch 
          checked={levels.critical} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'critical')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          <Label>High priority</Label>
        </div>
        <Switch 
          checked={levels.high} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'high')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BellRing className="h-5 w-5 text-blue-500" />
          <Label>Medium priority</Label>
        </div>
        <Switch 
          checked={levels.medium} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'medium')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-500" />
          <Label>Low priority</Label>
        </div>
        <Switch 
          checked={levels.low} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'low')}
        />
      </div>
    </div>
  );
};

export default PriorityLevelsSection;
