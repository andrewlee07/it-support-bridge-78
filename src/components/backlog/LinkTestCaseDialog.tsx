
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TestCase } from '@/utils/types/test';
import { getUnlinkedTestCases } from '@/utils/api/test-integration';

interface LinkTestCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  backlogItemId: string;
  onLinkTestCase: (testCaseId: string) => Promise<void>;
  existingTestCaseIds: string[];
}

const LinkTestCaseDialog = ({
  open,
  onOpenChange,
  backlogItemId,
  onLinkTestCase,
  existingTestCaseIds
}: LinkTestCaseDialogProps) => {
  const { toast } = useToast();
  const [availableTestCases, setAvailableTestCases] = useState<TestCase[]>([]);
  const [filteredTestCases, setFilteredTestCases] = useState<TestCase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLinking, setIsLinking] = useState(false);

  // Load available test cases that can be linked
  useEffect(() => {
    const loadAvailableTestCases = async () => {
      if (!open) return;
      
      setIsLoading(true);
      try {
        const response = await getUnlinkedTestCases(backlogItemId);
        if (response.success) {
          setAvailableTestCases(response.data);
          setFilteredTestCases(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "Failed to load available test cases",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailableTestCases();
  }, [open, backlogItemId, existingTestCaseIds]);

  // Filter test cases based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTestCases(availableTestCases);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      setFilteredTestCases(
        availableTestCases.filter(
          tc => 
            tc.id.toLowerCase().includes(lowerCaseSearchTerm) || 
            tc.title.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    }
  }, [searchTerm, availableTestCases]);

  // Handle linking a test case
  const handleLink = async (testCaseId: string) => {
    setIsLinking(true);
    try {
      await onLinkTestCase(testCaseId);
      onOpenChange(false); // Close dialog after successful linking
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Link Test Case</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search test cases..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="overflow-y-auto max-h-[400px] border rounded-md">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading test cases...</div>
          ) : filteredTestCases.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm ? "No test cases match your search" : "All test cases are already linked"}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestCases.map((testCase) => (
                  <tr key={testCase.id} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-2 text-sm">{testCase.id}</td>
                    <td className="px-4 py-2 text-sm">{testCase.title}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        testCase.status === 'passed' ? 'bg-green-100 text-green-800' :
                        testCase.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {testCase.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      <Button
                        size="sm"
                        onClick={() => handleLink(testCase.id)}
                        disabled={isLinking}
                      >
                        Link
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTestCaseDialog;
