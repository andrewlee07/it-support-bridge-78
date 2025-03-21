
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowUpDown, CalendarClock, Eye, Edit, MoreHorizontal, Clock, CheckCircle2 } from 'lucide-react';
import { SecurityCase } from '@/utils/types/security'; 
import { getUserNameById } from '@/utils/userUtils';
import SecurityCaseSLAIndicator from '@/components/security/components/SecurityCaseSLAIndicator';
import WatchButton from '@/components/shared/WatchButton';

type SLAType = 'response' | 'resolution';

interface SecurityCasesTableProps {
  cases: any[]; // Replace with SecurityCase[] once type is defined
  expandedCase: string | null;
  selectedCase: any | null;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  typeFilter: string | null;
  statusFilter: string | null;
  priorityFilter: string | null;
  typeOptions: string[];
  statusOptions: string[];
  priorityOptions: string[];
  handleSort: (column: string) => void;
  toggleExpandRow: (caseId: string) => void;
  setTypeFilter: (type: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  setPriorityFilter: (priority: string | null) => void;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
  getPriorityColor: (priority: string) => string;
  getPriorityIcon: (priority: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
  getTimeDifference: (dateString: string) => string;
  handleViewCase: (secCase: any) => void;
  handleEditCase: (secCase: any) => void;
}

const SecurityCasesTable: React.FC<SecurityCasesTableProps> = ({
  cases,
  sortColumn,
  sortDirection,
  typeFilter,
  statusFilter,
  priorityFilter,
  typeOptions,
  statusOptions,
  priorityOptions,
  handleSort,
  setTypeFilter,
  setStatusFilter,
  setPriorityFilter,
  getStatusColor,
  getTypeColor,
  getPriorityColor,
  getPriorityIcon,
  formatDate,
  getTimeDifference,
  handleViewCase,
  handleEditCase
}) => {
  // Add state for SLA Type
  const [slaType, setSlaType] = useState<SLAType>('resolution');

  // Helper function to render sort indicator
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
                Case Description
                {renderSortIndicator('title')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center">
                Type
                {renderSortIndicator('type')}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {typeOptions.map(type => (
                      <DropdownMenuItem 
                        key={type}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTypeFilter(type === typeFilter ? null : type);
                        }}
                        className={typeFilter === type ? "bg-muted" : ""}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      setTypeFilter(null);
                    }}>
                      Show All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status
                {renderSortIndicator('status')}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {statusOptions.map(status => (
                      <DropdownMenuItem 
                        key={status}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatusFilter(status === statusFilter ? null : status);
                        }}
                        className={statusFilter === status ? "bg-muted" : ""}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      setStatusFilter(null);
                    }}>
                      Show All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('priority')}
            >
              <div className="flex items-center">
                Priority
                {renderSortIndicator('priority')}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {priorityOptions.map(priority => (
                      <DropdownMenuItem 
                        key={priority}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPriorityFilter(priority === priorityFilter ? null : priority);
                        }}
                        className={priorityFilter === priority ? "bg-muted" : ""}
                      >
                        {priority}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      setPriorityFilter(null);
                    }}>
                      Show All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('reportedBy')}
            >
              <div className="flex items-center">
                Reported By
                {renderSortIndicator('reportedBy')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('reportedAt')}
            >
              <div className="flex items-center">
                <CalendarClock className="mr-1 h-4 w-4 opacity-70" />
                Reported
                {renderSortIndicator('reportedAt')}
              </div>
            </TableHead>
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
          {cases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                No security cases found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            cases.map((case_) => (
              <TableRow key={case_.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-foreground hover:underline"
                    onClick={() => handleViewCase(case_)}
                  >
                    {case_.id}
                  </Button>
                </TableCell>
                <TableCell className="max-w-sm">
                  <div>
                    <p className="font-medium">{case_.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{case_.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(case_.type)}>
                    {case_.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(case_.status)}>
                    {case_.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getPriorityIcon(case_.priority)}
                    <Badge variant="outline" className={getPriorityColor(case_.priority)}>
                      {case_.priority}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{getUserNameById(case_.reportedBy)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>User ID: {case_.reportedBy}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{getTimeDifference(case_.reportedAt)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatDate(case_.reportedAt)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <SecurityCaseSLAIndicator securityCase={case_} defaultSlaType={slaType} darkMode={true} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end space-x-1">
                    <WatchButton 
                      item={{
                        id: case_.id,
                        type: 'incident', // Using 'incident' as a general type for security cases
                        title: case_.title,
                        status: case_.status,
                        createdAt: new Date(case_.reportedAt)
                      }}
                      variant="ghost"
                      size="icon"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCase(case_);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCase(case_);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SecurityCasesTable;
