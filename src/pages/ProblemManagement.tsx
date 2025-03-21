
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';
import ProblemList from '@/components/problems/ProblemList';
import ProblemForm from '@/components/problems/ProblemForm';
import KnownErrorDatabase from '@/components/problems/KnownErrorDatabase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProblemManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  
  const handleSubmit = (data: any) => {
    // In a real app, this would connect to an API
    console.log('Submitting problem:', data);
    setShowForm(false);
    toast.success('Problem record created successfully!');
  };
  
  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(`Exporting problems as ${type.toUpperCase()}`);
  };
  
  const handleCreateProblem = () => {
    setShowForm(true);
  };
  
  // Mock statistics for dashboard cards
  const totalProblems = 24;
  const activeProblemsCount = 12;
  const criticalProblemsCount = 5;
  const knownErrorsCount = 7;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header with export and create buttons */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Problem Management</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-secondary/50 border border-border/20 hover:bg-muted">
                  <Download className="mr-2 h-4 w-4" />
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
            
            <Button onClick={handleCreateProblem} disabled={showForm} className="bg-primary hover:bg-primary/90">
              <FilePlus className="mr-2 h-4 w-4" />
              Create Problem
            </Button>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Total Problems</p>
                <div className="text-4xl font-bold">{totalProblems}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Active Problems</p>
                <div className="text-4xl font-bold">{activeProblemsCount}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Critical Problems</p>
                <div className="text-4xl font-bold">{criticalProblemsCount}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <p className="text-sm font-medium text-muted-foreground">Known Errors</p>
                <div className="text-4xl font-bold">{knownErrorsCount}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {showForm ? (
          <Card className="p-6 bg-secondary/50 border border-border/20">
            <h2 className="text-xl font-semibold mb-4">Create New Problem</h2>
            <ProblemForm onSubmit={handleSubmit} />
          </Card>
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Problems</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="kedb">Known Error DB</TabsTrigger>
            </TabsList>
            
            <Card className="bg-secondary/50 border border-border/20">
              <CardHeader className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="relative w-full sm:w-96">
                    <Input
                      type="text"
                      placeholder="Search problems..."
                      className="w-full pl-3 pr-10 py-2 bg-secondary/80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select 
                      value={statusFilter || ''}
                      onValueChange={(value) => setStatusFilter(value === '' ? null : value)}
                    >
                      <SelectTrigger className="bg-secondary/80">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="under-investigation">Under Investigation</SelectItem>
                        <SelectItem value="root-cause-identified">Root Cause Identified</SelectItem>
                        <SelectItem value="known-error">Known Error</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={priorityFilter || ''}
                      onValueChange={(value) => setPriorityFilter(value === '' ? null : value)}
                    >
                      <SelectTrigger className="bg-secondary/80">
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Priorities</SelectItem>
                        <SelectItem value="P1">P1</SelectItem>
                        <SelectItem value="P2">P2</SelectItem>
                        <SelectItem value="P3">P3</SelectItem>
                        <SelectItem value="P4">P4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <TabsContent value="all" className="mt-0">
                  <ProblemList />
                </TabsContent>
                
                <TabsContent value="critical" className="mt-0">
                  <ProblemList filterPriority="P1" />
                </TabsContent>
                
                <TabsContent value="active" className="mt-0">
                  <ProblemList 
                    filterStatus={['new', 'under-investigation', 'root-cause-identified']} 
                  />
                </TabsContent>
                
                <TabsContent value="kedb" className="mt-0">
                  <KnownErrorDatabase />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default ProblemManagement;
