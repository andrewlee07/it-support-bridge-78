
import React from 'react';
import { TestCase } from '@/utils/types/test/testCase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getBacklogItemsAffectedByBug } from '@/utils/api/testBacklogIntegrationApi';

interface TestCaseTraceabilityProps {
  testCase: TestCase;
}

const TestCaseTraceability: React.FC<TestCaseTraceabilityProps> = ({ testCase }) => {
  // Mock data for linked backlog items
  const backlogItemIds = testCase.relatedBacklogItemIds || [];
  
  // In a real app, this would be a real API call
  const { data: backlogItemsResponse } = useQuery({
    queryKey: ['backlogItems', testCase.id],
    queryFn: async () => {
      // Mock response
      return {
        success: true,
        data: backlogItemIds.map(id => ({
          id,
          title: `Backlog Item ${id}`,
          status: ['open', 'in-progress', 'completed'][Math.floor(Math.random() * 3)],
          coverage: Math.floor(Math.random() * 100),
        }))
      };
    },
    enabled: backlogItemIds.length > 0
  });
  
  const linkedBacklogItems = backlogItemsResponse?.data || [];
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Test-to-Backlog Traceability</h3>
        <p className="text-sm text-muted-foreground">
          This test case is linked to {linkedBacklogItems.length} backlog items.
        </p>
      </div>
      
      {linkedBacklogItems.length > 0 ? (
        <div className="space-y-2">
          {linkedBacklogItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.title}</p>
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Test Coverage: {item.coverage}%
                      </Badge>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No backlog items linked to this test case</p>
        </div>
      )}
    </div>
  );
};

export default TestCaseTraceability;
