
import React, { useState } from 'react';
import { Problem } from '@/utils/types/problem';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ProblemHeader from './detail/ProblemHeader';
import ProblemActionButtons from './detail/ProblemActionButtons';
import ProblemTabs from './detail/ProblemTabs';
import ProblemTabContent from './detail/ProblemTabContent';

interface ProblemDetailViewProps {
  problem: Problem;
  onUpdateProblem: (data: any) => void;
  onResolveProblem: (data: any) => void;
  onAddNote: (note: string) => void;
  onCreateKnownError: (data: any) => void;
  onCloseProblem: (notes: string) => void;
  onReopenProblem: (reason: string) => void;
}

const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({
  problem,
  onUpdateProblem,
  onResolveProblem,
  onAddNote,
  onCreateKnownError,
  onCloseProblem,
  onReopenProblem
}) => {
  const [activeTab, setActiveTab] = useState('details');

  const isClosed = problem.status === 'closed';
  const canClose = problem.status === 'resolved' || problem.status === 'known-error';
  const canReopen = problem.status === 'closed';

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <ProblemHeader 
            problem={problem} 
            canClose={canClose} 
            isClosed={isClosed} 
          />
          <ProblemActionButtons 
            canClose={canClose} 
            canReopen={canReopen} 
            isClosed={isClosed} 
            onCloseProblem={onCloseProblem} 
            onReopenProblem={onReopenProblem} 
          />
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ProblemTabs 
            activeTab={activeTab}
            isClosed={isClosed} 
          />
          
          {/* Tab Content */}
          <ProblemTabContent 
            activeTab={activeTab}
            problem={problem}
            isClosed={isClosed}
            onUpdateProblem={onUpdateProblem}
            onResolveProblem={onResolveProblem}
            onAddNote={onAddNote}
            onCreateKnownError={onCreateKnownError}
            setActiveTab={setActiveTab}
          />
        </Tabs>
      </Card>
    </div>
  );
};

export default ProblemDetailView;
