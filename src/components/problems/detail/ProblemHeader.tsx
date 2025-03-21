
import React from 'react';
import { Problem } from '@/utils/types/problem';
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Database, AlertCircle } from 'lucide-react';
import { getUserNameById } from '@/utils/userUtils';
import WatchButton from '@/components/shared/WatchButton';

interface ProblemHeaderProps {
  problem: Problem;
  canClose: boolean;
  isClosed: boolean;
}

const ProblemHeader = ({ problem, canClose, isClosed }: ProblemHeaderProps) => {
  const getStatusBadge = (status: string) => {
    let variant = 'default';
    let className = '';
    
    switch (status) {
      case 'new':
        className = 'bg-blue-500 hover:bg-blue-500/90';
        break;
      case 'under-investigation':
        className = 'bg-purple-500 hover:bg-purple-500/90';
        break;
      case 'root-cause-identified':
        className = 'bg-yellow-500 text-black hover:bg-yellow-500/90';
        break;
      case 'known-error':
        className = 'bg-orange-500 hover:bg-orange-500/90';
        break;
      case 'resolved':
        className = 'bg-green-500 hover:bg-green-500/90';
        break;
      case 'closed':
        className = 'bg-gray-500 hover:bg-gray-500/90';
        break;
      default:
        className = 'bg-gray-500 hover:bg-gray-500/90';
    }
    
    return (
      <Badge 
        variant="secondary"
        className={className}
      >
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </Badge>
    );
  };

  // Create a watchable item for the WatchButton
  const watchableItem = {
    id: problem.id,
    type: 'problem' as any,
    title: problem.title,
    status: problem.status,
    createdAt: problem.createdAt,
    updatedAt: problem.updatedAt
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{problem.id}</h1>
            {getStatusBadge(problem.status)}
            <Badge variant="outline" className="bg-amber-100 text-amber-900 hover:bg-amber-100">Priority: {problem.priority}</Badge>
            <WatchButton item={watchableItem} />
          </div>
          <h2 className="text-xl font-semibold mb-2">{problem.title}</h2>
          <div className="text-sm text-muted-foreground">
            <p>Created {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })} by {getUserNameById(problem.createdBy)}</p>
            {problem.assignedTo && (
              <p>Assigned to {getUserNameById(problem.assignedTo)}</p>
            )}
          </div>
        </div>
      </div>
      
      {problem.knownErrorId && (
        <div className="flex items-center mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <Database className="text-amber-500 mr-2 h-5 w-5 shrink-0" />
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
        <div className="flex items-center mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <AlertCircle className="text-blue-500 mr-2 h-5 w-5 shrink-0" />
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
