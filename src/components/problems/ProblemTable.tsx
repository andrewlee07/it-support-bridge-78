
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
import { Paperclip, Database, Clock, Edit, Eye, MoreHorizontal, ArrowUpDown, CheckCircle2 } from 'lucide-react';
import WatchButton from '@/components/shared/WatchButton';
import { getUserNameById } from '@/utils/userUtils';

interface ProblemTableProps {
  problems: Problem[];
  onProblemClick: (problemId: string) => void;
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems, onProblemClick }) => {
  const [sortColumn, setSortColumn] = React.useState<string | null>('id');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  const [slaType, setSlaType] = React.useState<'response' | 'resolution'>('resolution');

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

  const handleSort = (column: string) => {
    // If clicking the same column, toggle direction
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new column, set it as the sort column with default 'asc' direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortIndicator = (column: string) => {
    if (sortColumn === column) {
      return <span className="ml-1">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>;
    }
    return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center">
                ID
                {renderSortIndicator('id')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center">
                Problem Description
                {renderSortIndicator('title')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status
                {renderSortIndicator('status')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('priority')}
            >
              <div className="flex items-center">
                Priority
                {renderSortIndicator('priority')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('assignedTo')}
            >
              <div className="flex items-center">
                Assigned To
                {renderSortIndicator('assignedTo')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('createdAt')}
            >
              <div className="flex items-center">
                Created
                {renderSortIndicator('createdAt')}
              </div>
            </TableHead>
            <TableHead>Related</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 min-w-[240px]"
              onClick={() => handleSort('sla')}
            >
              <div className="flex items-center justify-between">
                <span>SLA Status</span>
                <div className="flex bg-slate-800 rounded overflow-hidden">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`px-2 py-1 text-xs h-7 rounded-none ${slaType === 'response' ? 'bg-slate-700 text-white' : 'text-slate-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlaType('response');
                    }}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Response
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`px-2 py-1 text-xs h-7 rounded-none ${slaType === 'resolution' ? 'bg-slate-700 text-white' : 'text-slate-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlaType('resolution');
                    }}
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Resolution
                  </Button>
                </div>
              </div>
            </TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No problems found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            problems.map((problem) => (
              <TableRow key={problem.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-foreground hover:underline"
                    onClick={(e) => handleViewProblem(e, problem.id)}
                  >
                    {problem.id}
                  </Button>
                </TableCell>
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
                <TableCell className="text-muted-foreground">
                  {problem.assignedTo ? getUserNameById(problem.assignedTo) : 'Unassigned'}
                </TableCell>
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
                <TableCell>
                  {problem.relatedIncidents && problem.relatedIncidents.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Paperclip size={14} /> {problem.relatedIncidents.length}
                    </span>
                  )}
                </TableCell>
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
                <TableCell>
                  <div className="flex items-center justify-end space-x-1">
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
                        <DropdownMenuItem>Add to Known Error DB</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Mark as Duplicate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProblemTable;
