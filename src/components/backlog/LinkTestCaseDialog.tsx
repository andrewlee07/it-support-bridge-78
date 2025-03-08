
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Link2 } from 'lucide-react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { TestCase } from '@/utils/types/test/testCase';
import { getUnlinkedTestCases, linkTestCaseToBacklogItem } from '@/utils/api/testBacklogIntegrationApi';
import { useToast } from '@/hooks/use-toast';
import TestCaseSelectionTable from '../test-management/TestCaseSelectionTable';

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
  onSuccess,
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);
  const [isLinking, setIsLinking] = useState(false);
  
  // Fetch unlinked test cases
  const { data, isLoading } = useQuery({
    queryKey: ['unlinkedTestCases', backlogItem.id, searchTerm],
    queryFn: async () => {
      const response = await getUnlinkedTestCases(backlogItem.id);
      return response.data || [];
    },
    enabled: isOpen,
  });
  
  // Filter test cases based on search term
  const filteredTestCases = data ? data.filter(testCase => 
    searchTerm === '' ||
    testCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testCase.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  // Handle test case selection
  const handleTestCaseSelect = (testCaseId: string) => {
    setSelectedTestCases(prev => 
      prev.includes(testCaseId)
        ? prev.filter(id => id !== testCaseId)
        : [...prev, testCaseId]
    );
  };
  
  // Link selected test cases to backlog item
  const handleLinkTestCases = async () => {
    if (selectedTestCases.length === 0) {
      toast({
        title: 'No test cases selected',
        description: 'Please select at least one test case to link.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLinking(true);
    
    try {
      // Link each selected test case
      const promises = selectedTestCases.map(testCaseId => 
        linkTestCaseToBacklogItem(testCaseId, backlogItem.id)
      );
      
      await Promise.all(promises);
      
      toast({
        title: 'Test cases linked',
        description: `${selectedTestCases.length} test case(s) linked to this backlog item.`,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'Failed to link test cases',
        description: 'An error occurred while linking test cases.',
        variant: 'destructive',
      });
    } finally {
      setIsLinking(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Link Test Cases</DialogTitle>
          <DialogDescription>
            Select test cases to link to "{backlogItem.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search test cases..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading test cases...</p>
            </div>
          ) : filteredTestCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Link2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No test cases found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                There are no unlinked test cases matching your search criteria.
              </p>
            </div>
          ) : (
            <TestCaseSelectionTable
              testCases={filteredTestCases}
              selectedTestCases={selectedTestCases}
              onSelect={handleTestCaseSelect}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleLinkTestCases} 
            disabled={selectedTestCases.length === 0 || isLinking}
          >
            {isLinking ? 'Linking...' : 'Link Selected Test Cases'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTestCaseDialog;
