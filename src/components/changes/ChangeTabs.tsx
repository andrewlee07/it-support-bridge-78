
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChangesList from './ChangesList';
import { ChangeRequest } from '@/utils/types';

interface ChangeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  changes: ChangeRequest[];
  isLoading: boolean;
  isError: boolean;
  onApprove: (changeId: string) => void;
  onReject: (changeId: string) => void;
  onCreateNew: () => void;
  onViewChange: (changeId: string) => void;
  refetch: () => void;
  userRole?: string;
  searchQuery?: string;
}

const ChangeTabs: React.FC<ChangeTabsProps> = ({
  activeTab,
  onTabChange,
  changes,
  isLoading,
  isError,
  onApprove,
  onReject,
  onCreateNew,
  onViewChange,
  refetch,
  userRole,
  searchQuery
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="animate-fade-in">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Changes</TabsTrigger>
        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <ChangesList
          changes={changes}
          isLoading={isLoading}
          isError={isError}
          onApprove={onApprove}
          onReject={onReject}
          onCreateNew={onCreateNew}
          onViewChange={onViewChange}
          refetch={refetch}
          userRole={userRole}
          searchQuery={searchQuery}
          viewType="all"
        />
      </TabsContent>
      
      <TabsContent value="pending">
        <ChangesList
          changes={changes}
          isLoading={isLoading}
          isError={isError}
          onApprove={onApprove}
          onReject={onReject}
          onCreateNew={onCreateNew}
          onViewChange={onViewChange}
          refetch={refetch}
          userRole={userRole}
          searchQuery={searchQuery}
          viewType="pending"
        />
      </TabsContent>
      
      <TabsContent value="upcoming">
        <ChangesList
          changes={changes}
          isLoading={isLoading}
          isError={isError}
          onApprove={onApprove}
          onReject={onReject}
          onCreateNew={onCreateNew}
          onViewChange={onViewChange}
          refetch={refetch}
          userRole={userRole}
          searchQuery={searchQuery}
          viewType="upcoming"
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <ChangesList
          changes={changes}
          isLoading={isLoading}
          isError={isError}
          onApprove={onApprove}
          onReject={onReject}
          onCreateNew={onCreateNew}
          onViewChange={onViewChange}
          refetch={refetch}
          userRole={userRole}
          searchQuery={searchQuery}
          viewType="completed"
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChangeTabs;
