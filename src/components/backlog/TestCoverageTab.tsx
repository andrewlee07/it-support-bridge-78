
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TestCase } from '@/utils/types/test';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';
import TestCoverageIndicator from '@/components/backlog/TestCoverageIndicator';
import LinkTestCaseDialog from '@/components/backlog/LinkTestCaseDialog';
import { 
  getLinkedTestCases, 
  getBacklogItemCoverage, 
  linkTestCaseToBacklogItem, 
  unlinkTestCaseFromBacklogItem 
} from '@/utils/api/test-integration';

interface TestCoverageTabProps {
  backlogItemId: string;
}

const TestCoverageTab = ({ backlogItemId }: TestCoverageTabProps) => {
  const { toast } = useToast();
  const [linkedTestCases, setLinkedTestCases] = useState<TestCase[]>([]);
  const [coverage, setCoverage] = useState<BacklogTestCoverage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  // Function to load test cases
  const loadTestCases = async () => {
    setIsLoading(true);
    try {
      // Fetch linked test cases using the new API
      const response = await getLinkedTestCases(backlogItemId);
      if (response.success) {
        setLinkedTestCases(response.data);
      } else {
        toast({
          title: "Error loading test cases",
          description: response.error || "An unexpected error occurred",
          variant: "destructive"
        });
      }

      // Fetch coverage statistics
      const coverageResponse = await getBacklogItemCoverage(backlogItemId);
      if (coverageResponse.success) {
        setCoverage(coverageResponse.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load test cases",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load test cases on component mount
  useEffect(() => {
    loadTestCases();
  }, [backlogItemId]);

  // Handle linking a test case
  const handleLinkTestCase = async (testCaseId: string) => {
    try {
      const response = await linkTestCaseToBacklogItem(testCaseId, backlogItemId);
      if (response.success) {
        toast({
          title: "Success",
          description: "Test case linked successfully"
        });
        loadTestCases(); // Reload test cases after linking
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to link test case",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  // Handle unlinking a test case
  const handleUnlinkTestCase = async (testCaseId: string) => {
    try {
      const response = await unlinkTestCaseFromBacklogItem(testCaseId, backlogItemId);
      if (response.success) {
        toast({
          title: "Success",
          description: "Test case unlinked successfully"
        });
        loadTestCases(); // Reload test cases after unlinking
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to unlink test case",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Coverage summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg mb-1">Test Coverage</h3>
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : 
              coverage ? 
                `${coverage.totalTestCases} test cases, ${coverage.passedTests} passed, ${coverage.failedTests} failed` : 
                "No test cases linked"
            }
          </p>
        </div>
        {coverage && (
          <TestCoverageIndicator 
            coverage={coverage}
            size="lg" 
          />
        )}
      </div>

      {/* Test Cases Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Linked Test Cases</h3>
          <Button onClick={() => setIsLinkDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Link Test Case
          </Button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading test cases...</div>
        ) : linkedTestCases.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No test cases linked to this item yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {linkedTestCases.map((testCase) => (
                  <tr key={testCase.id} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{testCase.id}</td>
                    <td className="px-4 py-3 text-sm">{testCase.title}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        testCase.status === 'passed' ? 'bg-green-100 text-green-800' :
                        testCase.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {testCase.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUnlinkTestCase(testCase.id)}
                      >
                        Unlink
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Link Test Case Dialog */}
      <LinkTestCaseDialog
        open={isLinkDialogOpen}
        onOpenChange={setIsLinkDialogOpen}
        backlogItemId={backlogItemId}
        onLinkTestCase={handleLinkTestCase}
        existingTestCaseIds={linkedTestCases.map(tc => tc.id)}
      />
    </div>
  );
};

export default TestCoverageTab;
