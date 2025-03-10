
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChangesList from './ChangesList';
import { ChangeRequest } from '@/utils/types/change';

interface ChangeTabsProps {
  userId?: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  changes?: ChangeRequest[];
  isLoading?: boolean;
  isError?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCreateNew?: () => void;
  onViewChange?: (id: string) => void;
  refetch?: () => void;
  userRole?: string;
  searchQuery?: string;
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
}

const ChangeTabs: React.FC<ChangeTabsProps> = ({ 
  userId,
  activeTab = 'all',
  onTabChange,
  changes = [],
  isLoading = false,
  isError = false,
  onApprove,
  onReject,
  onViewChange,
  userRole
}) => {
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Changes</TabsTrigger>
        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <ChangesList 
          filter="all" 
          userId={userId} 
          changes={changes} 
          isLoading={isLoading} 
          isError={isError} 
          onApprove={onApprove}
          onReject={onReject}
          onViewChange={onViewChange}
          activeTab={activeTab}
          userRole={userRole}
        />
      </TabsContent>
      
      <TabsContent value="pending">
        <ChangesList 
          filter="pending" 
          userId={userId} 
          changes={changes} 
          isLoading={isLoading} 
          isError={isError} 
          onApprove={onApprove}
          onReject={onReject}
          onViewChange={onViewChange}
          activeTab={activeTab}
          userRole={userRole}
        />
      </TabsContent>
      
      <TabsContent value="upcoming">
        <ChangesList 
          filter="upcoming" 
          userId={userId} 
          changes={changes} 
          isLoading={isLoading} 
          isError={isError} 
          onApprove={onApprove}
          onReject={onReject}
          onViewChange={onViewChange}
          activeTab={activeTab}
          userRole={userRole}
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <ChangesList 
          filter="completed" 
          userId={userId} 
          changes={changes} 
          isLoading={isLoading} 
          isError={isError} 
          onApprove={onApprove}
          onReject={onReject}
          onViewChange={onViewChange}
          activeTab={activeTab}
          userRole={userRole}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChangeTabs;
