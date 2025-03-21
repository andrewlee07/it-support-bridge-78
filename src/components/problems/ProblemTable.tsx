
import React from 'react';
import { Table } from '@/components/ui/table';
import { Problem } from '@/utils/types/problem';
import { useProblemTable } from './hooks/useProblemTable';
import ProblemTableHeader from './table/ProblemTableHeader';
import ProblemTableBody from './table/ProblemTableBody';

interface ProblemTableProps {
  problems: Problem[];
  onProblemClick: (problemId: string) => void;
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems, onProblemClick }) => {
  const {
    sortColumn,
    sortDirection,
    slaType,
    setSlaType,
    handleSort,
    getStatusColor,
    getPriorityColor,
    sortedProblems
  } = useProblemTable(problems);

  const handleViewProblem = (e: React.MouseEvent, problemId: string) => {
    e.stopPropagation();
    onProblemClick(problemId);
  };

  const handleEditProblem = (e: React.MouseEvent, problemId: string) => {
    e.stopPropagation();
    console.log('Edit problem:', problemId);
    // Implement edit functionality
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border-separate border-spacing-0">
        <ProblemTableHeader
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          slaType={slaType}
          setSlaType={setSlaType}
        />
        <ProblemTableBody
          problems={sortedProblems}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
          onProblemClick={onProblemClick}
          handleViewProblem={handleViewProblem}
          handleEditProblem={handleEditProblem}
        />
      </Table>
    </div>
  );
};

export default ProblemTable;
