
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { useProblemDetail } from '@/hooks/useProblemDetail';
import ProblemDetailView from '@/components/problems/ProblemDetailView';
import ProblemDetailError from '@/components/problems/ProblemDetailError';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    problem,
    loading,
    error,
    handleUpdateProblem,
    handleResolveProblem,
    handleAddNote,
    handleCreateKnownError,
    handleCloseProblem,
    handleReopenProblem
  } = useProblemDetail(id);
  
  // If loading or error, show error/loading state
  if (loading || error || !problem) {
    return (
      <PageTransition>
        <DetailBreadcrumb 
          entityName="Problem"
          entityId={id || ''}
          parentRoute="/problems"
          parentName="Problems"
        />
        
        <ProblemDetailError
          loading={loading}
          error={error}
          returnPath="/problems"
          entityType="Problem"
        />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <DetailBreadcrumb 
        entityName="Problem"
        entityId={problem.id}
        parentRoute="/problems"
        parentName="Problems"
      />
      
      <ProblemDetailView
        problem={problem}
        onUpdateProblem={handleUpdateProblem}
        onResolveProblem={handleResolveProblem}
        onAddNote={handleAddNote}
        onCreateKnownError={handleCreateKnownError}
        onCloseProblem={handleCloseProblem}
        onReopenProblem={handleReopenProblem}
      />
    </PageTransition>
  );
};

export default ProblemDetail;
