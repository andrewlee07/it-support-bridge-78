
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases } from '@/utils/mockData/testCases';
import { TestCase } from '@/utils/types/testTypes';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { linkTestCaseToBacklogItem, getTestCasesForBacklogItem } from '@/utils/api/testBacklogIntegrationApi';
import { Skeleton } from '@/components/ui/skeleton';
import StatusBadge from '@/components/test-management/ui/StatusBadge';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LinkTestCaseDialogProps {
  backlogItem: BacklogItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LinkTestCaseDialog: React.FC<LinkTestCaseDialogProps> = ({
  backlogItem,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);
  const [isLinking, setIsLinking] = useState(false);

  // Fetch all test cases
  const { data: testCasesResponse, isLoading: isLoadingTestCases } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
    enabled: isOpen
  });

  // Fetch already linked test cases to exclude them
  const { data: linkedTestCasesResponse } = useQuery({
    queryKey: ['linkedTestCases', backlogItem.id],
    queryFn: () => getTestCasesForBacklogItem(backlogItem.id),
    enabled: isOpen && !!backlogItem.id
  });

  const allTestCases = testCasesResponse?.data || [];
  const linkedTestCaseIds = (linkedTestCasesResponse?.data || []).map(tc => tc.id);

  // Filter test cases that are not already linked and match the search query
  const filteredTestCases = allTestCases.filter(testCase => 
    !linkedTestCaseIds.includes(testCase.id) &&
    (
      searchQuery === '' || 
      testCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleToggleTestCase = (testCaseId: string) => {
    setSelectedTestCases(prev => 
      prev.includes(testCaseId) 
        ? prev.filter(id => id !== testCaseId)
        : [...prev, testCaseId]
    );
  };

  const handleLinkTestCases = async () => {
    if (selectedTestCases.length === 0) return;
    
    setIsLinking(true);
    
    try {
      // Link each selected test case one by one
      const results = await Promise.all(
        selectedTestCases.map(testCaseId => 
          linkTestCaseToBacklogItem(testCaseId, backlogItem.id)
        )
      );
      
      const successCount = results.filter(r => r.success).length;
      
      if (successCount > 0) {
        toast({
          title: "Test cases linked",
          description: `Successfully linked ${successCount} test case${successCount > 1 ? 's' : ''} to the backlog item.`,
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Failed to link test cases",
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
      setIsLinking(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedTestCases([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Link Test Cases to Backlog Item</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search test cases..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="text-sm">
            {selectedTestCases.length} test case{selectedTestCases.length !== 1 ? 's' : ''} selected
          </div>
          {selectedTestCases.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearSelection}>
              Clear selection
            </Button>
          )}
        </div>

        <Separator />

        {isLoadingTestCases ? (
          <div className="space-y-2 py-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : filteredTestCases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No test cases available to link</p>
            <p className="text-sm mt-1">All test cases are already linked or none match your search criteria</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2 py-2">
              {filteredTestCases.map((testCase) => (
                <div 
                  key={testCase.id}
                  className="flex items-start p-3 border rounded-md hover:bg-muted/30"
                >
                  <Checkbox
                    checked={selectedTestCases.includes(testCase.id)}
                    onCheckedChange={() => handleToggleTestCase(testCase.id)}
                    className="mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <StatusBadge status={testCase.status} />
                      <h4 className="ml-2 text-sm font-medium">{testCase.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {testCase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleLinkTestCases} 
            disabled={selectedTestCases.length === 0 || isLinking}
          >
            {isLinking ? 'Linking...' : 'Link Selected Test Cases'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTestCaseDialog;
