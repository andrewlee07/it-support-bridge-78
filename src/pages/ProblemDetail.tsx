
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { getProblemById } from '@/utils/mockData/problems';
import ProblemDetailView from '@/components/problems/ProblemDetailView';
import ProblemDetailError from '@/components/problems/ProblemDetailError';
import { useProblemDetail } from '@/hooks/useProblemDetail';

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
      <ProblemDetailError
        loading={loading}
        error={error}
        returnPath="/problems"
        entityType="Problem"
      />
      
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
