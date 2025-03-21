
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TestCase } from '@/utils/types/testTypes';
import TestCaseInformation from './components/TestCaseInformation';
import TestExecutionHistory from './components/TestExecutionHistory';
import BacklogItemLinkingSection from './components/BacklogItemLinkingSection';
import TestCaseTabs from './TestCaseTabs';
import { ChevronLeft, Pencil, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestCaseDetailProps {
  testCase: TestCase;
  onEdit?: () => void;
  onExecute?: () => void;
  onBack?: () => void;
}

const TestCaseDetail: React.FC<TestCaseDetailProps> = ({ 
  testCase, 
  onEdit, 
  onExecute,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/test-tracking');
    }
  };
  
  const handleLinkBacklogItem = () => {
    // This would be implemented to refresh the component or update the data
    console.log('Backlog item linked, refreshing data');
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2" 
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to List
          </Button>
          <CardTitle>{testCase.title}</CardTitle>
          <p className="text-muted-foreground text-sm">Test case details and execution history</p>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          {onExecute && (
            <Button onClick={onExecute}>
              <Play className="h-4 w-4 mr-2" />
              Execute Test
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} className="space-y-4">
          <TestCaseTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            executionCount={testCase.executionHistory?.length || 0}
            issuesCount={testCase.linkedIssues?.length || 0}
          />
          
          <TabsContent value="details" className="m-0">
            <TestCaseInformation testCase={testCase} />
          </TabsContent>
          
          <TabsContent value="executions" className="m-0">
            <TestExecutionHistory testCaseId={testCase.id} />
          </TabsContent>
          
          <TabsContent value="history" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-4 text-muted-foreground">
                  Test case history will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="issues" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-4 text-muted-foreground">
                  Related issues will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traceability" className="m-0">
            <BacklogItemLinkingSection 
              testCaseId={testCase.id} 
              testCase={testCase}
              onLinkBacklogItem={handleLinkBacklogItem} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TestCaseDetail;
