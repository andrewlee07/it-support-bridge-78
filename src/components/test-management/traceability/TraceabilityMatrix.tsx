
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Check, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTestCases } from '../hooks/useTestCases';
import { useQuery } from '@tanstack/react-query';
import { getTraceabilityMatrix } from '@/utils/api/testBacklogIntegrationApi';

interface TraceabilityMatrixProps {
  releaseId?: string;
}

const TraceabilityMatrix: React.FC<TraceabilityMatrixProps> = ({ releaseId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coverageThreshold, setCoverageThreshold] = useState(0);
  const [sortField, setSortField] = useState<string>('backlogItem');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Fetch test cases (needed for the matrix columns)
  const { testCasesData, isLoadingTestCases } = useTestCases({
    enabled: true,
    testCycleId: releaseId
  });

  // Fetch traceability matrix data
  const { data: matrixResponse, isLoading: isLoadingMatrix } = useQuery({
    queryKey: ['traceabilityMatrix', releaseId],
    queryFn: getTraceabilityMatrix,
  });

  const matrixData = matrixResponse?.data || [];

  // Generate mock data for the matrix if it doesn't exist
  const backlogItems = matrixData.length > 0 ? matrixData : [
    {
      backlogItemId: 'bi-1',
      testCaseIds: ['tc-1'],
      bugIds: [],
      coverage: 75
    },
    {
      backlogItemId: 'bi-2',
      testCaseIds: ['tc-1', 'tc-2'],
      bugIds: ['bug-1'],
      coverage: 100
    },
    {
      backlogItemId: 'bi-3',
      testCaseIds: [],
      bugIds: [],
      coverage: 0
    },
  ];

  // Function to sort the backlog items
  const sortedBacklogItems = [...backlogItems].sort((a, b) => {
    if (sortField === 'coverage') {
      return sortDirection === 'asc' 
        ? a.coverage - b.coverage 
        : b.coverage - a.coverage;
    }
    if (sortField === 'backlogItem') {
      return sortDirection === 'asc'
        ? a.backlogItemId.localeCompare(b.backlogItemId)
        : b.backlogItemId.localeCompare(a.backlogItemId);
    }
    if (sortField === 'testCount') {
      return sortDirection === 'asc'
        ? a.testCaseIds.length - b.testCaseIds.length
        : b.testCaseIds.length - a.testCaseIds.length;
    }
    return 0;
  });

  // Filter items based on search and coverage threshold
  const filteredItems = sortedBacklogItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.backlogItemId.toLowerCase().includes(searchQuery.toLowerCase());
    const meetsCoverageThreshold = item.coverage >= coverageThreshold;
    return matchesSearch && meetsCoverageThreshold;
  });

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Calculate matrix cell color based on test coverage
  const getCellColor = (backlogItem: any, testCase: any) => {
    if (backlogItem.testCaseIds.includes(testCase.id)) {
      return testCase.status === 'pass' || testCase.status === 'passed'
        ? 'bg-green-100 text-green-800'
        : testCase.status === 'fail' || testCase.status === 'failed'
        ? 'bg-red-100 text-red-800'
        : 'bg-blue-100 text-blue-800';
    }
    return '';
  };

  // Get the coverage badge color
  const getCoverageBadgeColor = (coverage: number) => {
    if (coverage >= 80) return 'bg-green-100 text-green-800';
    if (coverage >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <CardTitle>Traceability Matrix</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search backlog items..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Coverage: {coverageThreshold}%+
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCoverageThreshold(0)}>
                  All Items (0%+)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCoverageThreshold(50)}>
                  50%+ Coverage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCoverageThreshold(80)}>
                  80%+ Coverage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCoverageThreshold(100)}>
                  100% Coverage
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingTestCases || isLoadingMatrix ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading traceability data...</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-auto max-h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="w-[250px] cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('backlogItem')}
                  >
                    <div className="flex items-center">
                      Backlog Item
                      {sortField === 'backlogItem' && (
                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  
                  {testCasesData.map(testCase => (
                    <TableHead key={testCase.id} className="min-w-[50px] text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium truncate max-w-[80px]" title={testCase.title}>
                          TC-{testCase.id.split('-')[1]}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                  
                  <TableHead 
                    className="w-[120px] cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('testCount')}
                  >
                    <div className="flex items-center">
                      Tests
                      {sortField === 'testCount' && (
                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  
                  <TableHead 
                    className="w-[150px] cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('coverage')}
                  >
                    <div className="flex items-center">
                      Coverage
                      {sortField === 'coverage' && (
                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={testCasesData.length + 3} className="text-center py-8">
                      <p className="text-muted-foreground">No backlog items match the current filters</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map(item => (
                    <TableRow key={item.backlogItemId}>
                      <TableCell className="font-medium">
                        {item.backlogItemId}
                      </TableCell>
                      
                      {testCasesData.map(testCase => (
                        <TableCell 
                          key={`${item.backlogItemId}-${testCase.id}`} 
                          className={`text-center ${getCellColor(item, testCase)}`}
                        >
                          {item.testCaseIds.includes(testCase.id) ? (
                            testCase.status === 'pass' || testCase.status === 'passed' ? (
                              <Check className="h-4 w-4 mx-auto text-green-600" />
                            ) : testCase.status === 'fail' || testCase.status === 'failed' ? (
                              <X className="h-4 w-4 mx-auto text-red-600" />
                            ) : (
                              <HelpCircle className="h-4 w-4 mx-auto text-blue-600" />
                            )
                          ) : (
                            <span>-</span>
                          )}
                        </TableCell>
                      ))}
                      
                      <TableCell>
                        {item.testCaseIds.length} / {testCasesData.length}
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{item.coverage}%</span>
                          </div>
                          <Progress value={item.coverage} className="h-2" />
                          <Badge className={getCoverageBadgeColor(item.coverage)}>
                            {item.coverage >= 80 ? "Good" : item.coverage >= 50 ? "Partial" : "Poor"}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TraceabilityMatrix;
