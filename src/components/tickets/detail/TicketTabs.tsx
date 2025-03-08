
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Bug, ListTodo } from 'lucide-react';

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
    <TabsList className="mb-4 flex flex-wrap">
      <TabsTrigger value="details">Details</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      {!isResolved && (
        <>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value={resolveTabLabel}>{isServiceRequest ? 'Fulfill' : 'Resolve'}</TabsTrigger>
          <TabsTrigger value="notes">Add Note</TabsTrigger>
          {isServiceRequest ? (
            <TabsTrigger value="create-backlog" className="flex items-center">
              <ListTodo className="w-4 h-4 mr-1" />
              Create Backlog
            </TabsTrigger>
          ) : (
            <TabsTrigger value="create-bug" className="flex items-center">
              <Bug className="w-4 h-4 mr-1" />
              Create Bug
            </TabsTrigger>
          )}
        </>
      )}
    </TabsList>
  );
};

export default TicketTabs;
