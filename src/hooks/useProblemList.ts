
import { useState, useEffect } from 'react';
import { Problem } from '@/utils/types/problem';
import { getAllProblems } from '@/utils/mockData/problems';

interface UseProblemListProps {
  filterStatus?: string | string[];
  filterPriority?: string | string[];
}

export const useProblemList = ({ filterStatus, filterPriority }: UseProblemListProps = {}) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    try {
      setTimeout(() => {
        let filteredProblems = getAllProblems();
        
        // Apply status filter if provided
        if (filterStatus) {
          const statusFilters = Array.isArray(filterStatus) ? filterStatus : [filterStatus];
          filteredProblems = filteredProblems.filter(problem => 
            statusFilters.includes(problem.status)
          );
        }
        
        // Apply priority filter if provided
        if (filterPriority) {
          const priorityFilters = Array.isArray(filterPriority) ? filterPriority : [filterPriority];
          filteredProblems = filteredProblems.filter(problem => 
            priorityFilters.includes(problem.priority)
          );
        }
        
        setProblems(filteredProblems);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch problem data');
      setLoading(false);
    }
  }, [filterStatus, filterPriority]);

  return { problems, loading, error };
};
