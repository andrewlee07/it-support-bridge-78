
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Activity, Edit, CheckCircle, MessageSquarePlus } from 'lucide-react';

interface ProblemTabsProps {
  activeTab: string;
  isClosed: boolean;
}

const ProblemTabs = ({ activeTab, isClosed }: ProblemTabsProps) => {
  return (
    <TabsList className="mb-6 w-full flex flex-wrap justify-start">
      <TabsTrigger value="details" className="flex items-center">
        <Database className="w-4 h-4 mr-1" />
        Details
      </TabsTrigger>
      <TabsTrigger value="activity" className="flex items-center">
        <Activity className="w-4 h-4 mr-1" />
        Activity
      </TabsTrigger>
      {!isClosed && (
        <>
          <TabsTrigger value="update" className="flex items-center">
            <Edit className="w-4 h-4 mr-1" />
            Update
          </TabsTrigger>
          <TabsTrigger value="resolve" className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Resolve
          </TabsTrigger>
          <TabsTrigger value="note" className="flex items-center">
            <MessageSquarePlus className="w-4 h-4 mr-1" />
            Add Note
          </TabsTrigger>
          <TabsTrigger value="kedb" className="flex items-center">
            <Database className="w-4 h-4 mr-1" />
            Create Known Error
          </TabsTrigger>
        </>
      )}
    </TabsList>
  );
};

export default ProblemTabs;
