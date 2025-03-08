
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { getReleases } from '@/utils/api/release';

// Import our new component
import BacklogHeader from './BacklogHeader';
import BacklogSearchBar from './filters/BacklogSearchBar';
import EmptyBacklogState from './EmptyBacklogState';
import BacklogItemTable from './items/BacklogItemTable';
import BacklogItemDetail from './BacklogItemDetail';

interface BacklogItemListProps {
  onCreateItem: () => void;
  onEditItem: (backlogItem: BacklogItem) => void;
  onDeleteItem: (id: string) => void;
}

const BacklogItemList: React.FC<BacklogItemListProps> = ({
  onCreateItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<BacklogItemStatus[]>([]);
  const [selectedBacklogItem, setSelectedBacklogItem] = useState<BacklogItem | null>(null);

  const { data: backlogItemsResponse, isLoading, refetch } = useQuery({
    queryKey: ['backlogItems', selectedReleaseId, selectedStatus, searchQuery],
    queryFn: () => fetchBacklogItems(
      selectedReleaseId === 'unassigned' ? 'unassigned' : selectedReleaseId, 
      selectedStatus.length > 0 ? selectedStatus : undefined, 
      searchQuery
    ),
  });

  const { data: releasesResponse } = useQuery({
    queryKey: ['releases'],
    queryFn: () => getReleases(),
  });

  const releases = releasesResponse?.data || [];
  const backlogItems = backlogItemsResponse?.data || [];

  const handleViewItem = (backlogItem: BacklogItem) => {
    setSelectedBacklogItem(backlogItem);
  };

  const handleCloseDialog = () => {
    setSelectedBacklogItem(null);
  };

  const handleEditSelected = () => {
    if (selectedBacklogItem) {
      onEditItem(selectedBacklogItem);
      setSelectedBacklogItem(null);
    }
  };

  const handleDeleteItem = async (id: string) => {
    await onDeleteItem(id);
    refetch();
    setSelectedBacklogItem(null);
  };

  const handleStatusChange = (status: BacklogItemStatus) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const hasFilters = !!(searchQuery || selectedReleaseId || selectedStatus.length > 0);

  return (
    <div className="space-y-4">
      <BacklogHeader onCreateItem={onCreateItem} />

      <Card>
        <CardContent className="pt-6">
          <BacklogSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedReleaseId={selectedReleaseId}
            setSelectedReleaseId={setSelectedReleaseId}
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
            releases={releases}
          />

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : backlogItems.length === 0 ? (
            <EmptyBacklogState onCreateItem={onCreateItem} hasFilters={hasFilters} />
          ) : (
            <BacklogItemTable 
              backlogItems={backlogItems}
              releases={releases}
              onViewItem={handleViewItem}
              onEditItem={onEditItem}
              onDeleteItem={handleDeleteItem}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedBacklogItem} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Backlog Item Details</DialogTitle>
          </DialogHeader>
          {selectedBacklogItem && (
            <BacklogItemDetail 
              item={selectedBacklogItem} 
              onEdit={handleEditSelected}
              onDelete={handleDeleteItem}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BacklogItemList;
