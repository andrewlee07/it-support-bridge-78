
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getLinkedTestCases, getBacklogItemCoverage } from '@/utils/api/testBacklogIntegrationApi';
import { TestCase } from '@/utils/types/test/testCase';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle, Search } from 'lucide-react';
import StatusBadge from '@/components/test-management/ui/StatusBadge';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface TestCoverageTabProps {
  backlogItemId?: string;
  backlogItem?: BacklogItem;
  onViewTestCase?: (testCase: TestCase) => void;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItemId,
  backlogItem,
  onViewTestCase 
}) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [coverage, setCoverage] = useState<any>(null);
  
  // Use backlogItem.id if provided, otherwise use backlogItemId
  const itemId = backlogItem?.id || backlogItemId;
  
  useEffect(() => {
    if (!itemId) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch test cases linked to this backlog item
        const testCasesResponse = await getLinkedTestCases(itemId);
        if (testCasesResponse.success) {
          setTestCases(testCasesResponse.data);
        }
        
        // Fetch coverage data
        const coverageResponse = await getBacklogItemCoverage(itemId);
        if (coverageResponse.success) {
          setCoverage(coverageResponse.data);
        }
        
      } catch (error) {
        console.error('Error fetching test coverage data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [itemId]);
  
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-9 w-24" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (testCases.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-center mb-2">No Test Cases Linked</h3>
          <p className="text-muted-foreground text-center mb-6">
            This backlog item doesn't have any test cases linked to it yet.
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Link Test Cases
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">
                Test Coverage
                {coverage && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                    {coverage.coveragePercentage}% covered
                  </Badge>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {testCases.length} test case{testCases.length !== 1 ? 's' : ''} linked to this item
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Link More Tests
            </Button>
          </div>
          
          <div className="space-y-3">
            {testCases.map(testCase => (
              <div key={testCase.id} className="border rounded-md p-3 transition-colors hover:bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">{testCase.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {testCase.description}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={testCase.status} size="sm" />
                    {onViewTestCase && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => onViewTestCase(testCase)}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex mt-2 text-xs text-muted-foreground">
                  <div className="mr-4">Last executed: {testCase.lastExecutionDate 
                    ? format(new Date(testCase.lastExecutionDate), 'MMM d, yyyy')
                    : 'Never'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCoverageTab;
