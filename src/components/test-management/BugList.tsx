
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs, updateBug } from '@/utils/mockData/testData';
import { Bug } from '@/utils/types/test/bug';
import { BugStatus } from '@/utils/types/test/testStatus';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bug as BugIcon, Eye, Edit, MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import BugForm from './BugForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BugTable from './BugTable';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface BugListProps {
  bugs?: Bug[];
}

const BugList: React.FC<BugListProps> = ({ bugs: initialBugs }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  // Fetch bugs - only if initialBugs is not provided
  const { data: bugsResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
    enabled: !initialBugs,
  });

  // Convert API bugs to our Bug type
  const convertApiBugsToBugs = (apiBugs: any[]): Bug[] => {
    return apiBugs.map(bug => ({
      id: bug.id,
      title: bug.title,
      description: bug.description,
      stepsToReproduce: Array.isArray(bug.stepsToReproduce) 
        ? bug.stepsToReproduce 
        : [bug.stepsToReproduce],
      severity: bug.severity,
      priority: bug.priority,
      status: bug.status,
      assignedDeveloper: bug.assignedTo,
      relatedTestCase: bug.relatedTestCase,
      attachment: bug.attachment,
      createdAt: new Date(bug.createdAt),
      updatedAt: new Date(bug.updatedAt),
      createdBy: bug.createdBy || bug.reportedBy || '',
      reportedBy: bug.reportedBy
    }));
  };

  // Use either the provided bugs or the fetched bugs
  const allBugs = initialBugs || 
    (bugsResponse?.data ? convertApiBugsToBugs(bugsResponse.data) : []);

  // Apply filters
  const displayBugs = allBugs.filter(bug => {
    const matchesSearch = searchQuery === '' || 
      bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || bug.status === statusFilter;
    const matchesSeverity = severityFilter === null || bug.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

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
    // Navigate to the bug detail page
    navigate(`/bugs/${bug.id}`);
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
    toast({
      title: 'Bug updated',
      description: 'The bug has been successfully updated.',
    });
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
        <input
          type="text"
          placeholder="Search bugs..."
          className="px-3 py-2 border rounded-md w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
          onStatusFilterChange={setStatusFilter}
          onSeverityFilterChange={setSeverityFilter}
          statusFilter={statusFilter}
          severityFilter={severityFilter}
        />
      )}

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
