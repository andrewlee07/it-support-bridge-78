
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, RotateCw, List, Grid } from 'lucide-react';
import { ChangeRequest } from '@/utils/types/change';
import ChangesList from './ChangesList';
import ChangesTable from './ChangesTable';

interface ChangeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  changes: ChangeRequest[];
  isLoading: boolean;
  isError: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCreateNew: () => void;
  onViewChange: (id: string) => void;
  refetch: () => void;
  userRole?: string;
  searchQuery?: string;
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
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
  searchQuery,
  viewMode = 'grid',
  onViewModeChange
}) => {
  const filteredChanges = changes.filter(change => {
    // Status tab filtering
    if (activeTab === 'all') return true;
    if (activeTab === 'my-changes') return true; // Replace with actual user ID check
    if (activeTab === 'pending-approval') return change.status === 'submitted';
    if (activeTab === 'in-progress') return change.status === 'in-progress';
    if (activeTab === 'completed') return change.status === 'completed' || change.status === 'failed';
    
    return change.status === activeTab;
  }).filter(change => {
    // Search filtering (if a search query exists)
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      change.id.toLowerCase().includes(query) ||
      change.title.toLowerCase().includes(query) ||
      change.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="my-changes">My Changes</TabsTrigger>
            <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2">
          {onViewModeChange && (
            <div className="flex border rounded-md">
              <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => onViewModeChange('table')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button variant="outline" size="sm" onClick={refetch}>
            <RotateCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button onClick={onCreateNew}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Change
          </Button>
        </div>
      </div>

      <TabsContent value={activeTab} className="mt-0">
        {viewMode === 'grid' ? (
          <ChangesList
            changes={filteredChanges}
            isLoading={isLoading}
            isError={isError}
            onApprove={onApprove}
            onReject={onReject}
            onCreateNew={onCreateNew}
            onViewChange={onViewChange}
            userRole={userRole}
          />
        ) : (
          <ChangesTable
            changes={filteredChanges}
            activeTab={activeTab}
            onApprove={onApprove}
            onReject={onReject}
            onViewChange={onViewChange}
            userRole={userRole}
          />
        )}
      </TabsContent>
    </div>
  );
};

export default ChangeTabs;
