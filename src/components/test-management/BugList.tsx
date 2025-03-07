import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs, updateBug } from '@/utils/mockData/testData';
import { Bug, BugSeverity, BugPriority, BugStatus } from '@/utils/types/testTypes';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Bug as BugIcon, MoreVertical, Pencil, Eye, CheckCircle, XCircle, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import BugForm from './BugForm';
import { useAuth } from '@/contexts/AuthContext';

// Status badge component
const StatusBadge = ({ status }: { status: BugStatus }) => {
  const statusConfig = {
    'new': { label: 'New', className: 'bg-blue-100 text-blue-800' },
    'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
    'fixed': { label: 'Fixed', className: 'bg-green-100 text-green-800' },
    'verified': { label: 'Verified', className: 'bg-purple-100 text-purple-800' },
    'closed': { label: 'Closed', className: 'bg-gray-100 text-gray-800' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

// Severity badge component
const SeverityBadge = ({ severity }: { severity: BugSeverity }) => {
  const severityConfig = {
    'critical': { label: 'Critical', className: 'bg-red-100 text-red-800' },
    'high': { label: 'High', className: 'bg-orange-100 text-orange-800' },
    'medium': { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
    'low': { label: 'Low', className: 'bg-green-100 text-green-800' },
  };

  const config = severityConfig[severity];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayBugs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32">
                    <div className="flex flex-col items-center justify-center">
                      <BugIcon className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No bugs found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                displayBugs.map((bug) => (
                  <TableRow key={bug.id}>
                    <TableCell className="font-medium">
                      <div 
                        className="cursor-pointer hover:text-primary"
                        onClick={() => viewBug(bug)}
                      >
                        {bug.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <SeverityBadge severity={bug.severity} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={bug.status} />
                    </TableCell>
                    <TableCell>
                      {bug.createdBy || <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell>
                      {new Date(bug.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewBug(bug)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editBug(bug)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Status Update</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusUpdate(bug.id, 'in-progress')}>
                              <Bookmark className="mr-2 h-4 w-4" />
                              <span>Mark In Progress</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(bug.id, 'fixed')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Mark Fixed</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(bug.id, 'verified')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Mark Verified</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(bug.id, 'closed')}>
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Close Bug</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Bug Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedBug && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedBug.title}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <SeverityBadge severity={selectedBug.severity} />
                  <StatusBadge status={selectedBug.status} />
                  <Badge variant="outline" className="capitalize">
                    {selectedBug.priority} priority
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{selectedBug.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Steps to Reproduce</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {selectedBug.stepsToReproduce.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {selectedBug.attachment && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Screenshot</h3>
                  <div className="border rounded-md p-2">
                    <img 
                      src={selectedBug.attachment} 
                      alt="Bug screenshot" 
                      className="max-h-60 object-contain mx-auto" 
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Reported by:</span> {selectedBug.createdBy}
                </div>
                <div>
                  <span className="font-semibold">Reported on:</span> {new Date(selectedBug.createdAt).toLocaleString()}
                </div>
                {selectedBug.assignedDeveloper && (
                  <div>
                    <span className="font-semibold">Assigned to:</span> {selectedBug.assignedDeveloper}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Last updated:</span> {new Date(selectedBug.updatedAt).toLocaleString()}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  editBug(selectedBug);
                }}>
                  Edit Bug
                </Button>
              </div>
            </div>
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
