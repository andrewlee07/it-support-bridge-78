
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, TestTube, LinkIcon, UnlinkIcon } from 'lucide-react';
import { TestCase, TestStatus } from '@/utils/types/testTypes';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { useQuery } from '@tanstack/react-query';
import { getTestCasesForBacklogItem } from '@/utils/api/testBacklogIntegrationApi';
import { Skeleton } from '@/components/ui/skeleton';
import StatusBadge from '@/components/test-management/ui/StatusBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { unlinkTestCaseFromBacklogItem } from '@/utils/api/testBacklogIntegrationApi';
import { useToast } from '@/hooks/use-toast';

interface LinkedTestCasesProps {
  backlogItem: BacklogItem;
  onLinkTestCase?: () => void;
  onViewTestCase?: (testCase: TestCase) => void;
  refetch?: () => void;
}

const LinkedTestCases: React.FC<LinkedTestCasesProps> = ({ 
  backlogItem, 
  onLinkTestCase, 
  onViewTestCase,
  refetch 
}) => {
  const { toast } = useToast();
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);

  // Fetch test cases for this backlog item
  const { 
    data: testCasesResponse, 
    isLoading, 
    refetch: refetchTestCases
  } = useQuery({
    queryKey: ['backlogTestCases', backlogItem.id],
    queryFn: () => getTestCasesForBacklogItem(backlogItem.id),
    enabled: !!backlogItem.id
  });

  const testCases = testCasesResponse?.data || [];

  const handleRefresh = () => {
    refetchTestCases();
    if (refetch) refetch();
  };

  const handleUnlinkTestCase = async () => {
    if (!selectedTestCase) return;
    
    setIsUnlinking(true);
    
    try {
      const result = await unlinkTestCaseFromBacklogItem(selectedTestCase.id, backlogItem.id);
      
      if (result.success) {
        toast({
          title: "Test case unlinked",
          description: `Test case ${selectedTestCase.title} has been unlinked from this backlog item.`,
        });
        handleRefresh();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to unlink test case",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUnlinking(false);
      setIsUnlinkDialogOpen(false);
      setSelectedTestCase(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <TestTube className="h-5 w-5 mr-2" />
          Linked Test Cases
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          {onLinkTestCase && (
            <Button size="sm" onClick={onLinkTestCase}>
              <Plus className="h-4 w-4 mr-2" />
              Link Test Case
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : testCases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <LinkIcon className="h-10 w-10 mb-2 opacity-50" />
            <p>No test cases linked to this backlog item</p>
            {onLinkTestCase && (
              <Button variant="outline" size="sm" className="mt-4" onClick={onLinkTestCase}>
                <Plus className="h-4 w-4 mr-2" />
                Link Test Case
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[250px] pr-4">
            <div className="space-y-3">
              {testCases.map((testCase) => (
                <div key={testCase.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <StatusBadge status={testCase.status} />
                      <h4 className="ml-2 text-sm font-medium truncate">{testCase.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{testCase.description}</p>
                  </div>
                  <div className="flex items-center ml-2 space-x-2">
                    {onViewTestCase && (
                      <Button variant="ghost" size="sm" onClick={() => onViewTestCase(testCase)}>
                        View
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTestCase(testCase);
                        setIsUnlinkDialogOpen(true);
                      }}
                    >
                      <UnlinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {/* Unlink Test Case Dialog */}
      <Dialog open={isUnlinkDialogOpen} onOpenChange={setIsUnlinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlink Test Case</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to unlink this test case from the backlog item?</p>
            {selectedTestCase && (
              <div className="mt-4 p-3 border rounded-md bg-muted/30">
                <h4 className="font-medium">{selectedTestCase.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{selectedTestCase.description}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsUnlinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleUnlinkTestCase}
              disabled={isUnlinking}
            >
              {isUnlinking ? "Unlinking..." : "Unlink"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LinkedTestCases;
