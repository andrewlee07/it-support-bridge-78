
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
        className = 'bg-blue-500 hover:bg-blue-500/90 text-white';
        break;
      case 'under-investigation':
        className = 'bg-purple-500 hover:bg-purple-500/90 text-white';
        break;
      case 'root-cause-identified':
        className = 'bg-yellow-500 hover:bg-yellow-500/90 text-black';
        break;
      case 'known-error':
        className = 'bg-orange-500 hover:bg-orange-500/90 text-white';
        break;
      case 'resolved':
        className = 'bg-green-500 hover:bg-green-500/90 text-white';
        break;
      case 'closed':
        className = 'bg-gray-500 hover:bg-gray-500/90 text-white';
        break;
      default:
        className = 'bg-gray-500 hover:bg-gray-500/90 text-white';
    }
    
    return (
      <Badge 
        variant="secondary"
        className={`${className} px-2.5 py-0.5 text-xs font-semibold`}
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
    <div className="space-y-6 p-6 bg-white border rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{problem.id}</h1>
            {getStatusBadge(problem.status)}
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 px-2.5 py-0.5 text-xs font-semibold">
              Priority: {problem.priority}
            </Badge>
            <WatchButton item={watchableItem} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{problem.title}</h2>
          <div className="text-sm text-muted-foreground">
            <p>Created {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })} by {getUserNameById(problem.createdBy)}</p>
            {problem.assignedTo && (
              <p className="mt-1">Assigned to {getUserNameById(problem.assignedTo)}</p>
            )}
          </div>
        </div>
      </div>
      
      {problem.knownErrorId && (
        <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-md mt-6">
          <Database className="text-amber-500 mr-3 h-5 w-5 shrink-0" />
          <div>
            <span className="font-medium text-amber-800">Known Error: </span>
            <span className="text-amber-800">{problem.knownErrorId}</span>
            <p className="text-sm text-amber-700/80 mt-1">
              A workaround has been identified for this problem.
            </p>
          </div>
        </div>
      )}
      
      {canClose && !isClosed && (
        <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
          <AlertCircle className="text-blue-500 mr-3 h-5 w-5 shrink-0" />
          <div>
            <span className="font-medium text-blue-800">This problem is ready to be closed</span>
            <p className="text-sm text-blue-700/80 mt-1">
              The problem has been {problem.status === 'known-error' ? 'documented as a known error' : 'resolved'} and can now be closed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemHeader;
