
import { useState, useEffect } from 'react';
import { getProblemById } from '@/utils/mockData/problems';
import { Problem, ProblemStatus } from '@/utils/types/problem';
import { AuditEntry } from '@/utils/types/audit';
import { toast } from 'sonner';

export const useProblemDetail = (id: string | undefined) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedProblem = getProblemById(id);
          if (fetchedProblem) {
            setProblem({
              ...fetchedProblem,
              // Initialize notes array if it doesn't exist
              audit: fetchedProblem.audit || []
            });
          } else {
            setError('Problem not found');
          }
        } else {
          setError('Invalid problem ID');
        }
      } catch (err) {
        setError('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleUpdateProblem = (values: any) => {
    if (problem) {
      const updatedProblem = {
        ...problem,
        ...values,
        status: values.status as ProblemStatus,
        updatedAt: new Date()
      };
      setProblem(updatedProblem);
      toast.success('Problem updated successfully');
    }
  };

  const handleResolveProblem = (values: any) => {
    if (problem) {
      const updatedProblem = {
        ...problem,
        status: 'resolved' as ProblemStatus,
        resolutionStatus: values.resolutionStatus,
        rootCause: values.rootCause,
        resolutionDescription: values.resolutionDescription,
        closureNotes: values.closureNotes,
        resolvedAt: new Date(),
        updatedAt: new Date()
      };
      setProblem(updatedProblem);
      toast.success('Problem resolved successfully');
    }
  };

  const handleAddNote = (note: string) => {
    if (problem) {
      // Create a proper AuditEntry object
      const newAuditEntry: AuditEntry = {
        id: `note-${Date.now()}`,
        entityId: problem.id,
        entityType: 'problem',
        action: 'added-note',
        performedBy: 'current-user',
        timestamp: new Date(),
        details: note
      };
      
      const updatedProblem = {
        ...problem,
        audit: [...problem.audit, newAuditEntry],
        updatedAt: new Date()
      };
      
      setProblem(updatedProblem);
      toast.success('Note added successfully');
    }
  };

  const handleCreateKnownError = (values: any) => {
    if (problem) {
      const knownErrorId = `KE${Date.now().toString().slice(-5)}`;
      const updatedProblem = {
        ...problem,
        status: 'known-error' as ProblemStatus,
        knownErrorId,
        workaround: values.workaround,
        updatedAt: new Date()
      };
      setProblem(updatedProblem);
      toast.success('Known Error created successfully');
    }
  };

  const handleCloseProblem = (closureNotes: string) => {
    if (problem) {
      if (problem.status !== 'resolved' && problem.status !== 'known-error') {
        toast.error('Problem must be resolved or a known error before closing');
        return;
      }
      
      const updatedProblem = {
        ...problem,
        status: 'closed' as ProblemStatus,
        closureNotes: closureNotes || problem.closureNotes,
        closedAt: new Date(),
        updatedAt: new Date()
      };
      setProblem(updatedProblem);
      toast.success('Problem closed successfully');
    }
  };

  const handleReopenProblem = (reason: string) => {
    if (problem) {
      // Create a proper AuditEntry object for reopening
      const reopenAuditEntry: AuditEntry = {
        id: `reopen-${Date.now()}`,
        entityId: problem.id,
        entityType: 'problem',
        action: 'reopened',
        performedBy: 'current-user',
        timestamp: new Date(),
        details: reason
      };
      
      const updatedProblem = {
        ...problem,
        status: 'under-investigation' as ProblemStatus,
        reopenReason: reason,
        reopenedAt: new Date(),
        updatedAt: new Date(),
        audit: [...problem.audit, reopenAuditEntry]
      };
      
      setProblem(updatedProblem);
      toast.success('Problem reopened successfully');
    }
  };

  return {
    problem,
    loading,
    error,
    handleUpdateProblem,
    handleResolveProblem,
    handleAddNote,
    handleCreateKnownError,
    handleCloseProblem,
    handleReopenProblem
  };
};
