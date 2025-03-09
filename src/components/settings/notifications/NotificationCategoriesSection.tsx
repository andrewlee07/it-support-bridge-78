
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  AlertCircle,
  Bug,
  FileText,
  ClipboardList,
  Package,
  Box,
  Calendar
} from 'lucide-react';

interface NotificationCategoriesSectionProps {
  categories: {
    incidents: boolean;
    bugs: boolean;
    testCases: boolean;
    backlogItems: boolean;
    releases: boolean;
    assets: boolean;
    changes: boolean;
  };
  onToggle: (category: string, value: string) => void;
}

const NotificationCategoriesSection: React.FC<NotificationCategoriesSectionProps> = ({ 
  categories,
  onToggle
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Notification Categories</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <Label>Incidents</Label>
        </div>
        <Switch 
          checked={categories.incidents} 
          onCheckedChange={(checked) => onToggle('categories', 'incidents')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bug className="h-5 w-5 text-red-500" />
          <Label>Bugs</Label>
        </div>
        <Switch 
          checked={categories.bugs} 
          onCheckedChange={(checked) => onToggle('categories', 'bugs')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-purple-500" />
          <Label>Test Cases</Label>
        </div>
        <Switch 
          checked={categories.testCases} 
          onCheckedChange={(checked) => onToggle('categories', 'testCases')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-5 w-5 text-orange-500" />
          <Label>Backlog Items</Label>
        </div>
        <Switch 
          checked={categories.backlogItems} 
          onCheckedChange={(checked) => onToggle('categories', 'backlogItems')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-green-500" />
          <Label>Releases</Label>
        </div>
        <Switch 
          checked={categories.releases} 
          onCheckedChange={(checked) => onToggle('categories', 'releases')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Box className="h-5 w-5 text-blue-500" />
          <Label>Assets</Label>
        </div>
        <Switch 
          checked={categories.assets} 
          onCheckedChange={(checked) => onToggle('categories', 'assets')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-cyan-500" />
          <Label>Changes</Label>
        </div>
        <Switch 
          checked={categories.changes} 
          onCheckedChange={(checked) => onToggle('categories', 'changes')}
        />
      </div>
    </div>
  );
};

export default NotificationCategoriesSection;
