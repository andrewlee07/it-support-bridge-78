
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { 
  CalendarIcon, 
  ChevronRightIcon, 
  FilesIcon, 
  FilterIcon, 
  PlusIcon 
} from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { getReleases } from '@/utils/api/release';
import BacklogItemDetail from './BacklogItemDetail';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

interface BacklogItemListProps {
  onCreateItem: () => void;
  onEditItem: (backlogItem: BacklogItem) => void;
}

const BacklogItemList: React.FC<BacklogItemListProps> = ({
  onCreateItem,
  onEditItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<BacklogItemStatus[]>([]);
  const [selectedBacklogItem, setSelectedBacklogItem] = useState<BacklogItem | null>(null);

  const { data: backlogItemsResponse, isLoading } = useQuery({
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'deferred':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

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

  const handleDeleteItem = (id: string) => {
    console.log('Delete item:', id);
    setSelectedBacklogItem(null);
  };

  const handleStatusChange = (status: BacklogItemStatus) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Backlog Items</h1>
          <p className="text-muted-foreground">Manage and plan your work items</p>
        </div>
        <Button onClick={onCreateItem}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Item
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search backlog items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Select
                value={selectedReleaseId}
                onValueChange={setSelectedReleaseId}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by release" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {releases.map((release) => (
                    <SelectItem key={release.id} value={release.id}>
                      {release.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Button variant="outline" className="w-[200px] justify-start">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Status Filter ({selectedStatus.length})
                </Button>
                <div className="absolute z-10 w-full mt-2 bg-white shadow-md rounded-md border p-2 hidden group-hover:block">
                  {['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'].map((status) => (
                    <div key={status} className="flex items-center p-2">
                      <input
                        type="checkbox"
                        id={`status-${status}`}
                        checked={selectedStatus.includes(status as BacklogItemStatus)}
                        onChange={() => handleStatusChange(status as BacklogItemStatus)}
                        className="mr-2"
                      />
                      <label htmlFor={`status-${status}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : backlogItems.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-center p-6">
              <FilesIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No backlog items found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedReleaseId || selectedStatus.length > 0
                  ? "Try adjusting your filters"
                  : "Get started by creating your first backlog item"}
              </p>
              <Button onClick={onCreateItem}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Backlog Item
              </Button>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Release</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlogItems.map((item) => {
                    const release = releases.find(r => r.id === item.releaseId);
                    
                    return (
                      <TableRow key={item.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => handleViewItem(item)}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {release ? (
                            <Badge variant="outline">
                              {release.title}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.dueDate ? (
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                              {format(new Date(item.dueDate), 'MMM d, yyyy')}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No due date</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={(e) => {
                            e.stopPropagation();
                            handleViewItem(item);
                          }}>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
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
