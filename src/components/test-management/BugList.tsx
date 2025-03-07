
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs, updateBug } from '@/utils/mockData/testData';
import { Bug, BugStatus } from '@/utils/types/testTypes';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bug as BugIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import BugForm from './BugForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BugTable from './BugTable';
import BugDetail from './BugDetail';

interface BugListProps {
  bugs?: Bug[];
}

const BugList: React.FC<BugListProps> = ({ bugs: initialBugs }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch bugs - only if initialBugs is not provided
  const { data: bugsResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
    enabled: !initialBugs,
  });

  // Use either the provided bugs or the fetched bugs
  const displayBugs = initialBugs || bugsResponse?.data || [];

  // Quick status updates
  const handleStatusUpdate = async (id: string, status: BugStatus) => {
    try {
      const result = await updateBug(id, { status });
      if (result.success) {
        toast({
          title: 'Bug status updated',
          description: `The bug status has been updated to ${status}.`,
        });
        refetch();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to update bug status.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  // View bug details
  const viewBug = (bug: Bug) => {
    setSelectedBug(bug);
    setIsViewDialogOpen(true);
  };

  // Edit bug
  const editBug = (bug: Bug) => {
    setSelectedBug(bug);
    setIsEditDialogOpen(true);
  };

  // Handle successful edit
  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    refetch();
  };

  if (isError && !initialBugs) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-red-500 mb-4">Failed to load bugs</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bugs</h2>
      </div>
      
      {isLoading && !initialBugs ? (
        // Loading skeleton
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-full rounded" />
            </div>
          ))}
        </div>
      ) : (
        <BugTable 
          bugs={displayBugs}
          onView={viewBug}
          onEdit={editBug}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {/* View Bug Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedBug && (
            <BugDetail 
              bug={selectedBug}
              onClose={() => setIsViewDialogOpen(false)}
              onEdit={() => {
                setIsViewDialogOpen(false);
                editBug(selectedBug);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Bug Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedBug && (
            <BugForm 
              initialData={selectedBug} 
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BugList;
