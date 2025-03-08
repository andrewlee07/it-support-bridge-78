
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { TestCase } from '@/utils/types/test';
import { getLinkedTestCases } from '@/utils/api/test-integration';
import { useBacklogTestCoverage } from '@/hooks/useBacklogTestCoverage';

interface LinkedTestCasesProps {
  backlogItemId: string;
  onViewTestCase?: (testCase: TestCase) => void;
}

const LinkedTestCases: React.FC<LinkedTestCasesProps> = ({ backlogItemId, onViewTestCase }) => {
  // Use our custom hook for fetching linked test cases
  const { linkedTestCases, isLoadingLinkedTestCases } = useBacklogTestCoverage(backlogItemId);

  // Get the status color class
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'blocked':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Display loading state
  if (isLoadingLinkedTestCases) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Linked Test Cases</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Test Cases ({linkedTestCases.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {linkedTestCases.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No test cases linked to this backlog item.</p>
          </div>
        ) : (
          <ScrollArea className="h-72">
            <div className="space-y-3">
              {linkedTestCases.map((testCase) => (
                <div 
                  key={testCase.id} 
                  className="p-3 border rounded-md hover:bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{testCase.title}</div>
                    <div className="text-sm text-muted-foreground">ID: {testCase.id}</div>
                    <div className="mt-1">
                      <Badge className={getStatusColor(testCase.status)}>
                        {testCase.status === 'passed' ? (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        ) : testCase.status === 'failed' ? (
                          <XCircle className="h-3 w-3 mr-1" />
                        ) : null}
                        {testCase.status}
                      </Badge>
                    </div>
                  </div>
                  {onViewTestCase && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewTestCase(testCase)}
                    >
                      View
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkedTestCases;
