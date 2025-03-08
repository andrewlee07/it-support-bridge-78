
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, RotateCcw, Link2 } from 'lucide-react';
import { TestCase } from '@/utils/types/test/testCase';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestCaseInformation from './components/TestCaseInformation';
import TestExecutionHistory from './components/TestExecutionHistory';
import BacklogItemLinkingSection from './components/BacklogItemLinkingSection';
import { useTestExecution } from './hooks/useTestExecution';

interface TestCaseDetailProps {
  testCase: TestCase;
  onCreateBug?: (testCase: TestCase) => void;
  onLinkBacklogItem?: (testCase: TestCase) => void;
}

const TestCaseDetail: React.FC<TestCaseDetailProps> = ({ 
  testCase, 
  onCreateBug,
  onLinkBacklogItem
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('information');
  const { executeTestCase, isExecutingTest } = useTestExecution();

  const handleRunTest = async (status: 'pass' | 'fail' | 'blocked') => {
    const result = await executeTestCase(testCase.id, status);
    if (result.success) {
      toast({
        title: 'Test executed',
        description: `Test marked as ${status}.`,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="executions">Execution History</TabsTrigger>
            <TabsTrigger value="traceability">Backlog Traceability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="information">
            <TestCaseInformation testCase={testCase} />
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => handleRunTest('pass')} disabled={isExecutingTest}>
                <span className="text-green-500 mr-2">✓</span> Pass
              </Button>
              <Button variant="outline" onClick={() => handleRunTest('fail')} disabled={isExecutingTest}>
                <span className="text-red-500 mr-2">✗</span> Fail
              </Button>
              <Button variant="outline" onClick={() => handleRunTest('blocked')} disabled={isExecutingTest}>
                <span className="text-orange-500 mr-2">⊘</span> Blocked
              </Button>
              
              {onCreateBug && (
                <Button variant="outline" onClick={() => onCreateBug(testCase)}>
                  <Bug className="h-4 w-4 mr-2" />
                  Create Bug
                </Button>
              )}
              
              <Button variant="outline" className="ml-auto">
                <RotateCcw className="h-4 w-4 mr-2" />
                Re-run Test
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="executions">
            <TestExecutionHistory testCaseId={testCase.id} />
          </TabsContent>
          
          <TabsContent value="traceability">
            <BacklogItemLinkingSection 
              testCase={testCase} 
              onLinkBacklogItem={onLinkBacklogItem ? () => onLinkBacklogItem(testCase) : undefined}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestCaseDetail;
