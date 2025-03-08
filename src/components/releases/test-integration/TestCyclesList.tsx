
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Plus } from 'lucide-react';
import { TestCycle } from '@/utils/types/testTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TestCyclesListProps {
  testCycles: TestCycle[];
  onCreateTestCycle: () => void;
}

const TestCyclesList: React.FC<TestCyclesListProps> = ({ 
  testCycles, 
  onCreateTestCycle 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <Badge variant="outline">Planned</Badge>;
      case 'in-progress':
      case 'in_progress':
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'aborted':
        return <Badge variant="default" className="bg-red-500">Aborted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (testCycles.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 border rounded-md">
        <div className="text-center">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No test cycles yet</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={onCreateTestCycle}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Test Cycle
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {testCycles.map((cycle: TestCycle) => (
        <Card key={cycle.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{cycle.name}</CardTitle>
              {getStatusBadge(cycle.status)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{cycle.description}</p>
            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(cycle.startDate), 'MMM d')} - {format(new Date(cycle.endDate), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm">Test Cases: {cycle.testCases.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestCyclesList;
