
import React, { useState } from 'react';
import { Bug } from '@/utils/types/test/bug';
import { useBugFilters } from '@/hooks/useBugFilters';
import BugDashboardStats from './BugDashboardStats';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BugListProps {
  bugs: Bug[];
}

const BugList: React.FC<BugListProps> = ({ bugs }) => {
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

  // Create bug IDs for display
  const bugsWithFormattedIds = filteredBugs.map((bug, index) => ({
    ...bug,
    formattedId: `BUG${String(index + 1).padStart(5, '0')}`
  }));

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
        <div className="relative w-full sm:w-auto flex-1 max-w-sm">
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
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">ID</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Title</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Status</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Severity</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Priority</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Assigned To</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase">Reported By</th>
              </tr>
            </thead>
            <tbody>
              {bugsWithFormattedIds.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    No bugs found matching your filters
                  </td>
                </tr>
              ) : (
                bugsWithFormattedIds.map((bug) => (
                  <tr key={bug.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle font-mono text-xs">{bug.formattedId}</td>
                    <td className="p-4 align-middle">{bug.title}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className={cn("capitalize", getStatusColor(bug.status))}>
                        {bug.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className={cn("capitalize", getSeverityColor(bug.severity))}>
                        {bug.severity}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className={cn("capitalize", getPriorityColor(bug.priority))}>
                        {bug.priority}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{bug.assignedDeveloper || "-"}</td>
                    <td className="p-4 align-middle">{bug.reportedBy || bug.createdBy || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BugList;
