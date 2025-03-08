
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { TestCase } from '@/utils/types/test/testCase';
import { useTestCases } from '../hooks/useTestCases';
import TestCaseInformation from '../components/TestCaseInformation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestExecutionDetails from './TestExecutionDetails';
import TestCaseTraceability from './TestCaseTraceability';
import StatusBadge from '../ui/StatusBadge';

interface TestCaseDetailViewProps {
  releaseId?: string;
}

const TestCaseDetailView: React.FC<TestCaseDetailViewProps> = ({ releaseId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setpriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  const { testCasesData, isLoadingTestCases } = useTestCases({
    enabled: true,
    testCycleId: releaseId
  });

  // Apply filters to test cases
  const filteredTestCases = testCasesData.filter(testCase => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === '' || 
      testCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      testCase.status === statusFilter;
    
    // Apply priority filter
    const matchesPriority = 
      priorityFilter === 'all' || 
      testCase.priority === priorityFilter;
    
    // Apply assignee filter
    const matchesAssignee = 
      assigneeFilter === 'all' || 
      testCase.assignedTester === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const handleSelectTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
  };

  // Extract unique assignees for the filter dropdown
  const uniqueAssignees = Array.from(
    new Set(testCasesData.map(tc => tc.assignedTester).filter(Boolean))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Test Cases</span>
                <Badge>{filteredTestCases.length} tests</Badge>
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search test cases..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pass">Passed</SelectItem>
                      <SelectItem value="fail">Failed</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="not-run">Not Run</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={priorityFilter} onValueChange={setpriorityFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      {uniqueAssignees.map(assignee => (
                        <SelectItem key={assignee} value={assignee}>
                          {assignee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {isLoadingTestCases ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Loading test cases...</p>
                </div>
              ) : filteredTestCases.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-muted-foreground">No test cases found</p>
                  <p className="text-sm text-muted-foreground">Adjust your filters or try a different search</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {filteredTestCases.map(testCase => (
                    <div
                      key={testCase.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedTestCase?.id === testCase.id
                          ? 'bg-secondary/50 border-primary'
                          : 'hover:bg-secondary/20'
                      }`}
                      onClick={() => handleSelectTestCase(testCase)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{testCase.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {testCase.description}
                          </p>
                        </div>
                        <StatusBadge status={testCase.status} />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>ID: {testCase.id}</span>
                        {testCase.assignedTester && <span>Assignee: {testCase.assignedTester}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          {selectedTestCase ? (
            <Card className="h-full">
              <Tabs defaultValue="details">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{selectedTestCase.title}</CardTitle>
                    <TabsList>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="execution">Execution</TabsTrigger>
                      <TabsTrigger value="traceability">Traceability</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <TabsContent value="details">
                    <TestCaseInformation testCase={selectedTestCase} />
                  </TabsContent>
                  
                  <TabsContent value="execution">
                    <TestExecutionDetails testCase={selectedTestCase} />
                  </TabsContent>
                  
                  <TabsContent value="traceability">
                    <TestCaseTraceability testCase={selectedTestCase} />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-2">Select a test case to view details</p>
              <Button variant="outline" disabled>View Details</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCaseDetailView;
