
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TestCase } from '@/utils/types/test/testCase';
import { Bug } from '@/utils/types/test/bug';
import StatusBadge from '@/components/test-management/ui/StatusBadge';
import { TraceabilityMatrix as TraceabilityMatrixType } from '@/utils/types/test/testCoverage';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';
import { getTraceabilityMatrix } from '@/utils/api/testBacklogIntegrationApi';
import TestCoverageIndicator from '@/components/backlog/TestCoverageIndicator';

const TraceabilityMatrix = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matrixData, setMatrixData] = useState<TraceabilityMatrixType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getTraceabilityMatrix();
        
        // Convert API response to the expected matrix format
        if (response.success && response.data) {
          // Transform the data to the expected format
          const transformedData: TraceabilityMatrixType = {
            backlogItems: response.data.map((item: any) => {
              return {
                id: item.backlogItemId,
                title: item.backlogItemTitle || `Item ${item.backlogItemId}`,
                coverage: item.coverage,
                testCases: item.testCases || [],
                bugs: item.bugs || []
              };
            })
          };
          setMatrixData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching traceability matrix:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterData = (data: TraceabilityMatrixType | null) => {
    if (!data) return { backlogItems: [] };
    
    const filteredItems = data.backlogItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.testCases.some(test => test.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.bugs.some(bug => bug.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return { backlogItems: filteredItems };
  };

  const renderCoverageIndicator = (coverage: number) => {
    // Create a BacklogTestCoverage object from the coverage percentage
    const coverageData = {
      totalTestCases: 100,
      passedTests: coverage,
      failedTests: 100 - coverage,
      notExecutedTests: 0,
      coveragePercentage: coverage,
      lastUpdated: new Date()
    };
    
    return (
      <TestCoverageIndicator 
        coverage={coverageData} 
        size="sm"
      />
    );
  };

  const filteredData = filterData(matrixData);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Traceability Matrix...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Coverage Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search backlog items or tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        {filteredData.backlogItems.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No items found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Backlog Item</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Test Cases</TableHead>
                  <TableHead>Bugs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.backlogItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="w-[150px]">
                      {renderCoverageIndicator(item.coverage)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.testCases.length === 0 ? (
                          <span className="text-sm text-muted-foreground">No test cases</span>
                        ) : (
                          item.testCases.map((test) => (
                            <div key={test.id} className="flex items-center">
                              <StatusBadge status={test.status} size="xs" />
                              <Button variant="link" className="h-auto p-0 ml-1">
                                {test.title.substring(0, 20)}
                                {test.title.length > 20 ? '...' : ''}
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.bugs.length === 0 ? (
                          <span className="text-sm text-muted-foreground">No bugs</span>
                        ) : (
                          item.bugs.map((bug) => (
                            <Badge key={bug.id} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {bug.title.substring(0, 20)}
                              {bug.title.length > 20 ? '...' : ''}
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TraceabilityMatrix;
