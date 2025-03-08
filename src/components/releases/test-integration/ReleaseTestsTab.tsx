
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTestReleaseCoverage } from '@/hooks/useTestReleaseCoverage';

import ReleaseTestCoverage from './ReleaseTestCoverage';
import ReleaseTestProgress from './ReleaseTestProgress';
import ReleaseReadinessScore from './ReleaseReadinessScore';
import CreateTestCycleDialog from './CreateTestCycleDialog';
import TestsTabHeader from './TestsTabHeader';
import TestsLoadingState from './TestsLoadingState';
import EmptyTestState from './EmptyTestState';
import TestCyclesList from './TestCyclesList';

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

  const navigateToTestTracking = () => {
    // Navigate to test tracking page
    navigate('/test-tracking');
  };

  if (isLoading) {
    return <TestsLoadingState />;
  }

  // If no test coverage data is available yet
  if (!testCoverage) {
    return (
      <div className="space-y-4">
        <TestsTabHeader 
          onCreateTestCycle={handleCreateTestCycle} 
          onRefresh={refetchAll} 
        />
        
        <EmptyTestState onCreateTestCycle={handleCreateTestCycle} />
        
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
      <TestsTabHeader 
        onCreateTestCycle={handleCreateTestCycle} 
        onRefresh={refetchAll} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReleaseTestCoverage coverage={testCoverage} />
        <ReleaseTestProgress progressData={testProgress} />
        <ReleaseReadinessScore testCoverage={testCoverage} />
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
        
        <TestCyclesList 
          testCycles={testCycles} 
          onCreateTestCycle={handleCreateTestCycle} 
        />
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
