
import React from 'react';
import { Problem } from '@/utils/types/problem';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Paperclip, Database, Clock } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  onClick?: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500 hover:bg-blue-500';
      case 'under-investigation': return 'bg-purple-500 hover:bg-purple-500';
      case 'root-cause-identified': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'known-error': return 'bg-orange-500 hover:bg-orange-500';
      case 'resolved': return 'bg-green-500 hover:bg-green-500';
      case 'closed': return 'bg-gray-500 hover:bg-gray-500';
      case 'pending': return 'bg-amber-500 hover:bg-amber-500';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'P2': return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'P3': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="font-mono text-sm text-muted-foreground">{problem.id}</div>
            <div className="flex gap-2">
              <Badge variant="secondary" className={`${getStatusColor(problem.status)} text-white`}>
                {formatStatus(problem.status)}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(problem.priority)}>
                {problem.priority}
              </Badge>
            </div>
          </div>
          
          <Link to={`/problems/${problem.id}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-lg hover:text-primary hover:underline transition-colors cursor-pointer">
              {problem.title}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {problem.description}
          </p>
          
          {problem.knownErrorId && (
            <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-800 p-2 rounded">
              <Database size={16} />
              <span>Known Error: {problem.knownErrorId}</span>
            </div>
          )}
          
          {problem.status === 'pending' && problem.pendingSubStatus && (
            <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-800 p-2 rounded">
              <Clock size={16} />
              <span>Pending: {problem.pendingSubStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex justify-between border-t mt-3 text-sm text-muted-foreground">
        <div>
          Created {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
        </div>
        
        <div className="flex items-center">
          {problem.relatedIncidents && problem.relatedIncidents.length > 0 && (
            <span className="flex items-center gap-1 mr-3">
              <Paperclip size={14} /> {problem.relatedIncidents.length}
            </span>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="text-primary hover:text-primary hover:bg-primary/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to={`/problems/${problem.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
