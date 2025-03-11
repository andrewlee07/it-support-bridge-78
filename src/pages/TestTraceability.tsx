import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from '@/components/shared/PageTransition';
import TraceabilityMatrix from '@/components/test-management/traceability/TraceabilityMatrix';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart2 } from 'lucide-react';

const mockData = [
  {
    id: '1',
    title: 'Sample Backlog Item',
    testCases: [
      { id: 'tc1', title: 'Test Case 1', status: 'passed' },
      { id: 'tc2', title: 'Test Case 2', status: 'failed' }
    ]
  }
];

const TestTraceability = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Test Traceability</h1>
            <p className="text-muted-foreground">
              Monitor test coverage across backlog items and releases
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/test-tracking">
                <BarChart2 className="h-4 w-4 mr-2" />
                Test Dashboard
              </Link>
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="matrix" className="space-y-4">
          <TabsList>
            <TabsTrigger value="matrix">Coverage Matrix</TabsTrigger>
            <TabsTrigger value="metrics">Coverage Metrics</TabsTrigger>
            <TabsTrigger value="releases">Release Coverage</TabsTrigger>
          </TabsList>

          <TabsContent value="matrix">
            <TraceabilityMatrix data={mockData} />
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <p className="text-muted-foreground">Coverage metrics will be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="releases">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <p className="text-muted-foreground">Release coverage comparison will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default TestTraceability;
