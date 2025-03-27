import React, { useState } from 'react';
import { Bug } from '@/utils/types/test/bug';
import { useBugFilters } from '@/hooks/useBugFilters';
import BugDashboardStats from './BugDashboardStats';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Filter, ArrowUpDown, Eye, Edit, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface BugListProps {
  bugs: Bug[];
}

const BugList: React.FC<BugListProps> = ({ bugs }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    severityFilter,
    setSeverityFilter,
    priorityFilter,
    setPriorityFilter,
    statusOptions,
    severityOptions,
    priorityOptions,
    filteredBugs,
    hasActiveFilters,
    resetFilters
  } = useBugFilters(bugs);

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Create bug IDs for display
  const bugsWithFormattedIds = filteredBugs.map((bug, index) => ({
    ...bug,
    formattedId: `BUG${String(index + 1).padStart(5, '0')}`
  }));

  // Sort bugs if needed
  const sortedBugs = [...bugsWithFormattedIds].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = sortColumn === 'id' ? a.formattedId : a[sortColumn as keyof typeof a];
    const bValue = sortColumn === 'id' ? b.formattedId : b[sortColumn as keyof typeof b];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  // Helper function to render sort indicator
  const renderSortIndicator = (column: string) => {
    if (sortColumn === column) {
      return <span className="ml-1">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Dashboard Stats - Interactive Filters */}
      <BugDashboardStats 
        bugs={bugs}
        onStatusClick={(status) => setStatusFilter(status)}
        onSeverityClick={(severity) => setSeverityFilter(severity)}
        activeStatusFilter={statusFilter}
        activeSeverityFilter={severityFilter}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm border">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Input
            placeholder="Search bugs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={resetFilters} 
              size="sm" 
              className="h-8 gap-1 text-xs"
            >
              <X className="h-3 w-3" />
              <span>Clear filters</span>
            </Button>
          )}
        
          {/* Status filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Filter className="h-3 w-3" />
                <span>Status</span>
                {statusFilter && <span className="ml-1 rounded-full w-2 h-2 bg-primary" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by Status</h4>
                <div className="flex flex-col gap-2">
                  {statusOptions.map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={statusFilter === status}
                        onCheckedChange={(checked) => {
                          setStatusFilter(checked ? status : null);
                        }}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Severity filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Filter className="h-3 w-3" />
                <span>Severity</span>
                {severityFilter && <span className="ml-1 rounded-full w-2 h-2 bg-primary" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by Severity</h4>
                <div className="flex flex-col gap-2">
                  {severityOptions.map((severity) => (
                    <div key={severity} className="flex items-center gap-2">
                      <Checkbox 
                        id={`severity-${severity}`} 
                        checked={severityFilter === severity}
                        onCheckedChange={(checked) => {
                          setSeverityFilter(checked ? severity : null);
                        }}
                      />
                      <Label htmlFor={`severity-${severity}`} className="text-sm cursor-pointer">
                        {severity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Priority filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Filter className="h-3 w-3" />
                <span>Priority</span>
                {priorityFilter && <span className="ml-1 rounded-full w-2 h-2 bg-primary" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by Priority</h4>
                <div className="flex flex-col gap-2">
                  {priorityOptions.map((priority) => (
                    <div key={priority} className="flex items-center gap-2">
                      <Checkbox 
                        id={`priority-${priority}`} 
                        checked={priorityFilter === priority}
                        onCheckedChange={(checked) => {
                          setPriorityFilter(checked ? priority : null);
                        }}
                      />
                      <Label htmlFor={`priority-${priority}`} className="text-sm cursor-pointer">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Bugs Table */}
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70 w-[110px]"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center">
                ID {renderSortIndicator('id')}
                <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center">
                Title {renderSortIndicator('title')}
                <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status {renderSortIndicator('status')}
                <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70"
              onClick={() => handleSort('severity')}
            >
              <div className="flex items-center">
                Severity {renderSortIndicator('severity')}
                <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70"
              onClick={() => handleSort('priority')}
            >
              <div className="flex items-center">
                Priority {renderSortIndicator('priority')}
                <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
              </div>
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No bugs found matching your filters
              </TableCell>
            </TableRow>
          ) : (
            sortedBugs.map((bug) => (
              <TableRow key={bug.id} className="border-b hover:bg-muted/50">
                <TableCell className="font-medium font-mono text-sm">
                  <Link 
                    to={`/bug-detail/${bug.id}`} 
                    className="text-primary hover:underline"
                  >
                    {bug.formattedId}
                  </Link>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{bug.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {bug.description || "No description available"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className={cn("capitalize", getStatusColor(bug.status))}>
                        {bug.status.replace('-', ' ')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {statusOptions.map((status) => (
                        <DropdownMenuItem key={status}>
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getSeverityColor(bug.severity))}>
                    {bug.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getPriorityColor(bug.priority))}>
                    {bug.priority}
                  </Badge>
                </TableCell>
                <TableCell>{bug.assignedDeveloper || "-"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* Fixed button - using Link component directly inside onClick instead of 'as' prop */}
                    <Link to={`/bug-detail/${bug.id}`}>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
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

export default BugList;
