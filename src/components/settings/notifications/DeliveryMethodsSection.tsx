
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BellRing, Mail } from 'lucide-react';

interface DeliveryMethodsSectionProps {
  methods: {
    inApp: boolean;
    email: boolean;
  };
  onToggle: (category: string, value: string) => void;
}

const DeliveryMethodsSection: React.FC<DeliveryMethodsSectionProps> = ({ 
  methods,
  onToggle
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Delivery Methods</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BellRing className="h-5 w-5 text-indigo-500" />
          <Label>In-app notifications</Label>
        </div>
        <Switch 
          checked={methods.inApp} 
          onCheckedChange={(checked) => onToggle('deliveryMethods', 'inApp')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-blue-500" />
          <Label>Email notifications</Label>
        </div>
        <Switch 
          checked={methods.email} 
          onCheckedChange={(checked) => onToggle('deliveryMethods', 'email')}
        />
      </div>
    </div>
  );
};

export default DeliveryMethodsSection;
