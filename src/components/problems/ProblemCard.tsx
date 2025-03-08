
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Problem } from '@/utils/types/problem';
import { formatDistanceToNow } from 'date-fns';
import { Link, LinkedPaperclip, Search } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'under-investigation':
        return 'bg-purple-500';
      case 'root-cause-identified':
        return 'bg-yellow-500';
      case 'known-error':
        return 'bg-orange-500';
      case 'resolved':
        return 'bg-green-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-500';
      case 'P2':
        return 'bg-yellow-500';
      case 'P3':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card 
      className="cursor-pointer hover:bg-accent/50 transition-colors" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md font-semibold truncate">{problem.title}</CardTitle>
        </div>
        <div className="text-sm text-muted-foreground">{problem.id}</div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {problem.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge 
            variant="secondary"
            className={`${getStatusBadgeColor(problem.status)} text-white hover:${getStatusBadgeColor(problem.status)}`}
          >
            {formatStatus(problem.status)}
          </Badge>
          <Badge 
            variant="secondary"
            className={`${getPriorityBadgeColor(problem.priority)} text-white hover:${getPriorityBadgeColor(problem.priority)}`}
          >
            {problem.priority}
          </Badge>
          <Badge variant="outline">{problem.category}</Badge>
        </div>
        
        {problem.knownErrorId && (
          <div className="flex items-center gap-1 mt-3 text-sm">
            <Search className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Known Error: {problem.knownErrorId}
            </span>
          </div>
        )}
        
        {problem.relatedIncidents && problem.relatedIncidents.length > 0 && (
          <div className="flex items-center gap-1 mt-1 text-sm">
            <Link className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              {problem.relatedIncidents.length} related incident{problem.relatedIncidents.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
          <div>
            {problem.assignedTo ? `Assigned to: ${problem.assignedTo}` : 'Unassigned'}
          </div>
          <div>
            Updated {formatDistanceToNow(new Date(problem.updatedAt), { addSuffix: true })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
