
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  isServiceRequest
}) => {
  const resolveTabLabel = isServiceRequest ? 'fulfill' : 'resolve';
  
  return (
    <TabsList className="mb-4">
      <TabsTrigger value="details">Details</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      {!isResolved && (
        <>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value={resolveTabLabel}>{isServiceRequest ? 'Fulfill' : 'Resolve'}</TabsTrigger>
          <TabsTrigger value="notes">Add Note</TabsTrigger>
        </>
      )}
    </TabsList>
  );
};

export default TicketTabs;
