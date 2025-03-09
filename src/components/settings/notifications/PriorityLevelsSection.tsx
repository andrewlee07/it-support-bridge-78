
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  AlertOctagon,
  AlarmClock,
  Clock,
  CheckCircle
} from 'lucide-react';

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
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertOctagon className="h-5 w-5 text-red-500" />
          <Label>Critical</Label>
        </div>
        <Switch 
          checked={levels.critical} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'critical')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlarmClock className="h-5 w-5 text-orange-500" />
          <Label>High</Label>
        </div>
        <Switch 
          checked={levels.high} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'high')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <Label>Medium</Label>
        </div>
        <Switch 
          checked={levels.medium} 
          onCheckedChange={(checked) => onToggle('priorityLevels', 'medium')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          <Label>Low</Label>
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
