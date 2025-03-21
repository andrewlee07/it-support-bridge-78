
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Activity, Edit, CheckCircle, ClipboardCheck, PlusCircle } from 'lucide-react';

interface ReleaseTabsProps {
  activeTab: string;
  isDeployed: boolean;
}

const ReleaseTabs = ({ activeTab, isDeployed }: ReleaseTabsProps) => {
  return (
    <TabsList className="mb-6 w-full flex flex-wrap justify-start">
      <TabsTrigger value="details" className="flex items-center">
        <Database className="w-4 h-4 mr-1" />
        Details
      </TabsTrigger>
      <TabsTrigger value="items" className="flex items-center">
        <ClipboardCheck className="w-4 h-4 mr-1" />
        Release Items
      </TabsTrigger>
      <TabsTrigger value="activity" className="flex items-center">
        <Activity className="w-4 h-4 mr-1" />
        Activity Log
      </TabsTrigger>
      {!isDeployed && (
        <>
          <TabsTrigger value="edit" className="flex items-center">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="tests" className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Tests
          </TabsTrigger>
          <TabsTrigger value="add-items" className="flex items-center">
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Items
          </TabsTrigger>
        </>
      )}
    </TabsList>
  );
};

export default ReleaseTabs;
