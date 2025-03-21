
import React from 'react';
import { 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Problem } from '@/utils/types/problem';
import { formatDistanceToNow } from 'date-fns';
import { Paperclip, Database, Clock } from 'lucide-react';
import { getUserNameById } from '@/utils/userUtils';

// ID Cell
export const ProblemIDCell: React.FC<{
  problem: Problem;
  onProblemClick: (problemId: string) => void;
}> = ({ problem, onProblemClick }) => (
  <TableCell className="font-medium">
    <Button
      variant="link"
      className="p-0 h-auto font-medium text-foreground hover:underline"
      onClick={(e) => {
        e.stopPropagation();
        onProblemClick(problem.id);
      }}
    >
      {problem.id}
    </Button>
  </TableCell>
);

// Description Cell
export const ProblemDescriptionCell: React.FC<{
  problem: Problem;
}> = ({ problem }) => (
  <TableCell className="max-w-sm">
    <div>
      <p className="font-medium">{problem.title}</p>
      <p className="text-sm text-muted-foreground line-clamp-1">{problem.description}</p>
      {problem.knownErrorId && (
        <div className="flex items-center gap-1 text-xs mt-1">
          <Database size={12} />
          <span className="text-amber-600">Known Error: {problem.knownErrorId}</span>
        </div>
      )}
    </div>
  </TableCell>
);

// Status Cell
export const ProblemStatusCell: React.FC<{
  problem: Problem;
  getStatusColor: (status: string) => string;
}> = ({ problem, getStatusColor }) => {
  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <TableCell>
      <Badge variant="secondary" className={`${getStatusColor(problem.status)} text-white`}>
        {formatStatus(problem.status)}
      </Badge>
      {problem.status === 'pending' && problem.pendingSubStatus && (
        <div className="flex items-center gap-1 text-xs mt-1">
          <Clock size={12} />
          <span className="text-amber-600">
            {problem.pendingSubStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
      )}
    </TableCell>
  );
};

// Priority Cell
export const ProblemPriorityCell: React.FC<{
  problem: Problem;
  getPriorityColor: (priority: string) => string;
}> = ({ problem, getPriorityColor }) => (
  <TableCell>
    <Badge variant="outline" className={getPriorityColor(problem.priority)}>
      {problem.priority}
    </Badge>
  </TableCell>
);

// Assigned Cell
export const ProblemAssignedCell: React.FC<{
  problem: Problem;
}> = ({ problem }) => (
  <TableCell className="text-muted-foreground">
    {problem.assignedTo ? getUserNameById(problem.assignedTo) : 'Unassigned'}
  </TableCell>
);

// Created At Cell
export const ProblemCreatedAtCell: React.FC<{
  problem: Problem;
}> = ({ problem }) => (
  <TableCell className="text-muted-foreground">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{new Date(problem.createdAt).toLocaleDateString()} {new Date(problem.createdAt).toLocaleTimeString()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </TableCell>
);

// Related Incidents Cell
export const ProblemRelatedIncidentsCell: React.FC<{
  problem: Problem;
}> = ({ problem }) => (
  <TableCell>
    {problem.relatedIncidents && problem.relatedIncidents.length > 0 && (
      <span className="flex items-center gap-1">
        <Paperclip size={14} /> {problem.relatedIncidents.length}
      </span>
    )}
  </TableCell>
);

// SLA Cell
export const ProblemSLACell: React.FC<{
  problem: Problem;
}> = ({ problem }) => (
  <TableCell>
    {/* Placeholder for SLA indicator */}
    <div className="h-2 w-full bg-gray-200 rounded-full">
      <div 
        className="h-2 rounded-full bg-green-500" 
        style={{ width: '70%' }}
      ></div>
    </div>
    <p className="text-xs text-muted-foreground mt-1">
      70% time remaining
    </p>
  </TableCell>
);
