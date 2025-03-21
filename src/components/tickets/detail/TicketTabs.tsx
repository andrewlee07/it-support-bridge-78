
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TicketTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  isResolved: boolean;
  isServiceRequest: boolean;
}

const TicketTabs: React.FC<TicketTabsProps> = ({
  activeTab,
  onTabChange,
  isResolved,
  isServiceRequest,
}) => {
  // Determine if this is a security case (not a service request)
  const isSecurityCase = !isServiceRequest && activeTab.includes('security');
  
  return (
    <TabsList className="mb-4">
      <TabsTrigger value="details">
        {isServiceRequest ? 'Request Details' : isSecurityCase ? 'Security Case Details' : 'Incident Details'}
      </TabsTrigger>
      <TabsTrigger value="related">Related Items</TabsTrigger>
      <TabsTrigger value="tasks">Tasks</TabsTrigger>
    </TabsList>
  );
};

export default TicketTabs;
