
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TestCase } from '@/utils/types/test/testCase';
import TestCaseInformation from './components/TestCaseInformation';
import TestExecutionHistory from './components/TestExecutionHistory';
import BacklogItemLinkingSection from './components/BacklogItemLinkingSection';
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
          <CardDescription>Test case details and execution history</CardDescription>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="executions">Execution History</TabsTrigger>
            <TabsTrigger value="traceability">Traceability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <TestCaseInformation testCase={testCase} />
          </TabsContent>
          
          <TabsContent value="executions">
            <TestExecutionHistory testCaseId={testCase.id} />
          </TabsContent>
          
          <TabsContent value="traceability">
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
