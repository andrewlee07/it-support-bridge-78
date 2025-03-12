
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { getProblemById } from '@/utils/mockData/problems';
import ProblemDetailView from '@/components/problems/ProblemDetailView';
import ProblemDetailError from '@/components/problems/ProblemDetailError';
import { useProblemDetail } from '@/hooks/useProblemDetail';
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
  
  return (
    <PageTransition>
      {!loading && !error && problem && (
        <DetailBreadcrumb 
          entityName="Problem"
          entityId={problem.id}
          parentRoute="/problems"
          parentName="Problems"
        />
      )}
      
      {(loading || error || !problem) && (
        <ProblemDetailError
          loading={loading}
          error={error}
          returnPath="/problems"
          entityType="Problem"
        />
      )}
      
      {!loading && !error && problem && (
        <ProblemDetailView
          problem={problem}
          onUpdateProblem={handleUpdateProblem}
          onResolveProblem={handleResolveProblem}
          onAddNote={handleAddNote}
          onCreateKnownError={handleCreateKnownError}
          onCloseProblem={handleCloseProblem}
          onReopenProblem={handleReopenProblem}
        />
      )}
    </PageTransition>
  );
};

export default ProblemDetail;
