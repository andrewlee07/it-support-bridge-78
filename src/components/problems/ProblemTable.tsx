
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Problem } from '@/utils/types/problem';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Paperclip, Database, Clock, Edit, Eye, MoreHorizontal } from 'lucide-react';
import WatchButton from '@/components/shared/WatchButton';

interface ProblemTableProps {
  problems: Problem[];
  onProblemClick: (problemId: string) => void;
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems, onProblemClick }) => {
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
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Related</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow 
              key={problem.id}
              className="hover:bg-muted"
            >
              <TableCell className="font-mono text-xs">
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium"
                  onClick={(e) => handleViewProblem(e, problem.id)}
                >
                  {problem.id}
                </Button>
              </TableCell>
              <TableCell>
                <div className="font-medium">{problem.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{problem.description}</div>
                {problem.knownErrorId && (
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <Database size={12} />
                    <span className="text-amber-600">Known Error: {problem.knownErrorId}</span>
                  </div>
                )}
              </TableCell>
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
              <TableCell>
                <Badge variant="outline" className={getPriorityColor(problem.priority)}>
                  {problem.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                {problem.relatedIncidents && problem.relatedIncidents.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Paperclip size={14} /> {problem.relatedIncidents.length}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex justify-end space-x-1">
                  <WatchButton 
                    item={{
                      id: problem.id,
                      type: 'problem',
                      title: problem.title,
                      status: problem.status,
                      createdAt: new Date(problem.createdAt)
                    }}
                    variant="ghost"
                    size="icon"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => handleViewProblem(e, problem.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => handleEditProblem(e, problem.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <DropdownMenu>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More Options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Assign User</DropdownMenuItem>
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Mark as Duplicate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProblemTable;
