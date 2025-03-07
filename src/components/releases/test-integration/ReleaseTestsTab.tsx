
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Plus, 
  Bug, 
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';
import { useTestReleaseCoverage } from '@/hooks/useTestReleaseCoverage';
import ReleaseTestCoverage from './ReleaseTestCoverage';
import ReleaseTestProgress from './ReleaseTestProgress';
import CreateTestCycleDialog from './CreateTestCycleDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestCycle } from '@/utils/types/testTypes';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

interface ReleaseTestsTabProps {
  releaseId: string;
}

const ReleaseTestsTab: React.FC<ReleaseTestsTabProps> = ({ releaseId }) => {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { testCoverage, testProgress, testCycles, isLoading, refetchAll } = useTestReleaseCoverage(releaseId);

  const handleCreateTestCycle = () => {
    setIsCreateDialogOpen(true);
  };

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

  const navigateToTestTracking = () => {
    // Navigate to test tracking page
    navigate('/test-tracking');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        
        <Skeleton className="h-10 w-full" />
        
        <div className="space-y-4 mt-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  // If no test coverage data is available yet
  if (!testCoverage) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test Management</h2>
          <div className="flex space-x-2">
            <Button onClick={handleCreateTestCycle}>
              <Plus className="h-4 w-4 mr-2" />
              Create Test Cycle
            </Button>
            <Button variant="outline" onClick={refetchAll}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-center p-8 border rounded-md text-center">
          <div className="max-w-md space-y-3">
            <ShieldCheck className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium">No test data available</h3>
            <p className="text-muted-foreground">
              Start by creating a test cycle for this release to track test coverage and execution progress.
            </p>
            <Button onClick={handleCreateTestCycle}>
              <Plus className="h-4 w-4 mr-2" />
              Create Test Cycle
            </Button>
          </div>
        </div>
        
        <CreateTestCycleDialog
          releaseId={releaseId}
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSuccess={refetchAll}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Test Management</h2>
        <div className="flex space-x-2">
          <Button onClick={handleCreateTestCycle}>
            <Plus className="h-4 w-4 mr-2" />
            Create Test Cycle
          </Button>
          <Button variant="outline" onClick={refetchAll}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReleaseTestCoverage coverage={testCoverage} />
        <ReleaseTestProgress progressData={testProgress} />
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={navigateToTestTracking}
      >
        <Bug className="h-4 w-4 mr-2" />
        View All Test Details
      </Button>
      
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium">Test Cycles ({testCycles.length})</h3>
        
        {testCycles.length === 0 ? (
          <div className="flex items-center justify-center p-6 border rounded-md">
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No test cycles yet</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleCreateTestCycle}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Test Cycle
              </Button>
            </div>
          </div>
        ) : (
          testCycles.map((cycle: TestCycle) => (
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
          ))
        )}
      </div>
      
      <CreateTestCycleDialog
        releaseId={releaseId}
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={refetchAll}
      />
    </div>
  );
};

export default ReleaseTestsTab;
