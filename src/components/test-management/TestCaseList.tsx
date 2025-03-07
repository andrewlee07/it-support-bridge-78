
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases, deleteTestCase } from '@/utils/mockData/testData';
import { TestCase, TestStatus } from '@/utils/types/testTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { File, MoreVertical, Pencil, Trash, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import TestCaseForm from './TestCaseForm';
import TestCaseDetails from './TestCaseDetails';

// Status badge component
const StatusBadge = ({ status }: { status: TestStatus }) => {
  const statusConfig = {
    'not-run': { label: 'Not Run', className: 'bg-gray-200 text-gray-800' },
    'pass': { label: 'Pass', className: 'bg-green-100 text-green-800' },
    'fail': { label: 'Fail', className: 'bg-red-100 text-red-800' },
    'blocked': { label: 'Blocked', className: 'bg-yellow-100 text-yellow-800' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

const TestCaseList: React.FC = () => {
  const { toast } = useToast();
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch test cases
  const { data: testCasesResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  // Handle delete test case
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteTestCase(id);
      if (result.success) {
        toast({
          title: 'Test case deleted',
          description: 'The test case has been deleted successfully.',
        });
        refetch();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete test case.',
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

  // View test case details
  const viewTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsViewDialogOpen(true);
  };

  // Edit test case
  const editTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsEditDialogOpen(true);
  };

  // Handle successful edit
  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    refetch();
  };

  if (isError) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-red-500 mb-4">Failed to load test cases</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Cases</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
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
                  <TableHead>Status</TableHead>
                  <TableHead>Related Requirement</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testCasesResponse?.data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-32">
                      <div className="flex flex-col items-center justify-center">
                        <File className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No test cases found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  testCasesResponse?.data?.map((testCase) => (
                    <TableRow key={testCase.id}>
                      <TableCell className="font-medium">
                        <div 
                          className="cursor-pointer hover:text-primary"
                          onClick={() => viewTestCase(testCase)}
                        >
                          {testCase.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={testCase.status} />
                      </TableCell>
                      <TableCell>
                        {testCase.relatedRequirement || <span className="text-muted-foreground">-</span>}
                      </TableCell>
                      <TableCell>
                        {new Date(testCase.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => viewTestCase(testCase)}>
                              <File className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editTestCase(testCase)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              <span>Execute</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Test Case</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this test case? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(testCase.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* View Test Case Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            {selectedTestCase && (
              <TestCaseDetails testCase={selectedTestCase} />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Test Case Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            {selectedTestCase && (
              <TestCaseForm 
                initialData={selectedTestCase} 
                onSuccess={handleEditSuccess}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TestCaseList;
