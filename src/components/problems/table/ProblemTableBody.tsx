
import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Problem } from '@/utils/types/problem';
import { 
  ProblemIDCell,
  ProblemDescriptionCell,
  ProblemStatusCell,
  ProblemPriorityCell,
  ProblemAssignedCell,
  ProblemCreatedAtCell,
  ProblemRelatedIncidentsCell,
  ProblemSLACell
} from './ProblemTableCells';
import ProblemActionsCell from './ProblemActionsCell';

interface ProblemTableBodyProps {
  problems: Problem[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  onProblemClick: (problemId: string) => void;
  handleViewProblem: (e: React.MouseEvent, problemId: string) => void;
  handleEditProblem: (e: React.MouseEvent, problemId: string) => void;
}

const ProblemTableBody: React.FC<ProblemTableBodyProps> = ({
  problems,
  getStatusColor,
  getPriorityColor,
  onProblemClick,
  handleViewProblem,
  handleEditProblem
}) => {
  if (problems.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
            No problems found matching your criteria
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {problems.map((problem) => (
        <TableRow key={problem.id} className="hover:bg-muted/20 border-b border-border/10">
          <ProblemIDCell 
            problem={problem} 
            onProblemClick={onProblemClick} 
          />
          <ProblemDescriptionCell problem={problem} />
          <ProblemStatusCell 
            problem={problem} 
            getStatusColor={getStatusColor} 
          />
          <ProblemPriorityCell 
            problem={problem} 
            getPriorityColor={getPriorityColor} 
          />
          <ProblemAssignedCell problem={problem} />
          <ProblemCreatedAtCell problem={problem} />
          <ProblemRelatedIncidentsCell problem={problem} />
          <ProblemSLACell problem={problem} />
          <ProblemActionsCell 
            problem={problem}
            onViewProblem={handleViewProblem}
            onEditProblem={handleEditProblem}
          />
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ProblemTableBody;
