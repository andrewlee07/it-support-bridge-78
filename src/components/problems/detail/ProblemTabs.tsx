
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database } from 'lucide-react';

interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isClosed: boolean;
}

const ProblemTabs = ({ activeTab, setActiveTab, isClosed }: ProblemTabsProps) => {
  return (
    <TabsList>
      <TabsTrigger value="details">Details</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      {!isClosed && (
        <>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="resolve">Resolve</TabsTrigger>
          <TabsTrigger value="note">Add Note</TabsTrigger>
          <TabsTrigger value="kedb">
            <Database className="h-4 w-4 mr-1" /> Create Known Error
          </TabsTrigger>
        </>
      )}
    </TabsList>
  );
};

export default ProblemTabs;
