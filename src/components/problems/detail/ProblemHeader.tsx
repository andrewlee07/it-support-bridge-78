
import React from 'react';
import { Problem } from '@/utils/types/problem';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Database, AlertCircle } from 'lucide-react';

interface ProblemHeaderProps {
  problem: Problem;
  canClose: boolean;
  isClosed: boolean;
}

const ProblemHeader = ({ problem, canClose, isClosed }: ProblemHeaderProps) => {
  const getStatusBadge = (status: string) => {
    let color = '';
    switch (status) {
      case 'new':
        color = 'bg-blue-500';
        break;
      case 'under-investigation':
        color = 'bg-purple-500';
        break;
      case 'root-cause-identified':
        color = 'bg-yellow-500';
        break;
      case 'known-error':
        color = 'bg-orange-500';
        break;
      case 'resolved':
        color = 'bg-green-500';
        break;
      case 'closed':
        color = 'bg-gray-500';
        break;
      default:
        color = 'bg-gray-500';
    }
    return (
      <Badge 
        variant="secondary"
        className={`${color} text-white hover:${color}`}
      >
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">{problem.id}</span>
            {getStatusBadge(problem.status)}
            <Badge variant="outline">{problem.category}</Badge>
            <Badge variant="outline" className="bg-amber-100">Priority: {problem.priority}</Badge>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground">
        Created {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })} 
        {problem.assignedTo && ` • Assigned to ${problem.assignedTo}`}
      </p>
      
      {problem.knownErrorId && (
        <div className="flex items-center mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
          <Database className="text-amber-500 mr-2 h-5 w-5" />
          <div>
            <span className="font-medium">Known Error: </span>
            <span>{problem.knownErrorId}</span>
            <p className="text-sm text-muted-foreground mt-1">
              A workaround has been identified for this problem.
            </p>
          </div>
        </div>
      )}
      
      {canClose && !isClosed && (
        <div className="flex items-center mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <AlertCircle className="text-blue-500 mr-2 h-5 w-5" />
          <div>
            <span className="font-medium">This problem is ready to be closed</span>
            <p className="text-sm text-muted-foreground mt-1">
              The problem has been {problem.status === 'known-error' ? 'documented as a known error' : 'resolved'} and can now be closed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemHeader;
