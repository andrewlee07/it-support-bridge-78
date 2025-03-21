
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProblemTable from './ProblemTable';
import { useProblemList } from '@/hooks/useProblemList';
import { toast } from 'sonner';

interface ProblemListProps {
  filterStatus?: string | string[];
  filterPriority?: string | string[];
}

const ProblemList: React.FC<ProblemListProps> = ({ 
  filterStatus,
  filterPriority
}) => {
  const navigate = useNavigate();
  const { problems, loading, error } = useProblemList({ filterStatus, filterPriority });
  
  const handleProblemClick = (problemId: string) => {
    // In a real app, this would navigate to a problem detail page
    console.log(`Navigate to problem detail: ${problemId}`);
    toast.info(`Viewing problem ${problemId}`);
    // navigate(`/problems/${problemId}`);
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading problems: {error}</div>;
  }

  if (loading) {
    return <div className="p-4">Loading problems...</div>;
  }

  return (
    <div>
      <ProblemTable problems={problems} onProblemClick={handleProblemClick} />
    </div>
  );
};

export default ProblemList;
