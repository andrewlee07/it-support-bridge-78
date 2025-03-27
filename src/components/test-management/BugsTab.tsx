
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import BugList from './BugList';
import { useBugs } from '@/hooks/useBugs';
import { useBugFilters } from '@/hooks/useBugFilters';
import BugDashboardStats from './BugDashboardStats';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BugsTab = () => {
  const { bugs, isLoading } = useBugs();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  
  // Initialize bug filters
  const {
    searchQuery,
    setSearchQuery,
    filteredBugs,
    hasActiveFilters,
    resetFilters,
    statusOptions,
    severityOptions,
    priorityOptions
  } = useBugFilters(bugs || []);

  const handleExport = (type: 'csv' | 'pdf') => {
    console.log(`Exporting bug data as ${type}`);
    // In a real app, this would trigger a data export
  };

  const handleCreateNew = () => {
    console.log('Creating new bug');
    // In a real app, this would open a create bug form
  };

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status === statusFilter ? null : status);
  };

  const handleSeverityFilter = (severity: string | null) => {
    setSeverityFilter(severity === severityFilter ? null : severity);
  };

  // Get the active tab value based on filters
  const getActiveTab = () => {
    if (statusFilter === 'open') return 'open';
    if (statusFilter === 'in-progress') return 'in-progress';
    if (statusFilter === 'resolved') return 'resolved';
    return 'all';
  };

  // Apply status filter when tab changes
  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setStatusFilter(null);
    } else {
      setStatusFilter(value);
    }
  };

  // Filter bugs based on status and severity
  const getFilteredBugsForTab = (tabValue: string) => {
    let result = [...filteredBugs];
    
    // Apply tab-specific status filter
    if (tabValue !== 'all') {
      result = result.filter(bug => bug.status === tabValue);
    }
    
    // Apply severity filter
    if (severityFilter) {
      result = result.filter(bug => bug.severity === severityFilter);
    }
    
    return result;
  };

  return (
    <div className="space-y-6">
      {/* Page Header with export and create buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bug Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage bugs across your projects
          </p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-secondary/50 border border-border/20 hover:bg-muted">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Bug
          </Button>
        </div>
      </div>

      {/* Dashboard Stats Cards */}
      <BugDashboardStats 
        bugs={bugs || []}
        onStatusClick={handleStatusFilter}
        onSeverityClick={handleSeverityFilter}
        activeStatusFilter={statusFilter}
        activeSeverityFilter={severityFilter}
      />

      {/* Search and Filters Bar */}
      <Card className="bg-secondary/50 border border-border/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bugs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-background"
              />
            </div>
            
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="h-8 px-2 lg:px-3"
              >
                Reset filters
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            <div className="flex flex-wrap gap-2">
              {severityFilter && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "flex items-center border border-border/30 gap-1 px-3 py-1",
                    severityFilter === 'critical' && "bg-red-100/50 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                    severityFilter === 'high' && "bg-orange-100/50 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
                    severityFilter === 'medium' && "bg-yellow-100/50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                    severityFilter === 'low' && "bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  )}
                >
                  Severity: {severityFilter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSeverityFilter(null)} 
                  />
                </Badge>
              )}
              
              {statusFilter && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "flex items-center border border-border/30 gap-1 px-3 py-1",
                    statusFilter === 'open' && "bg-blue-100/50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                    statusFilter === 'in-progress' && "bg-purple-100/50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                    statusFilter === 'resolved' && "bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  )}
                >
                  Status: {statusFilter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setStatusFilter(null)} 
                  />
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different bug types */}
      <Tabs defaultValue="all" value={getActiveTab()} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Bugs</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={getFilteredBugsForTab('all')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="open" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={getFilteredBugsForTab('open')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={getFilteredBugsForTab('in-progress')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={getFilteredBugsForTab('resolved')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BugsTab;
