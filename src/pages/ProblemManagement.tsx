
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
                <Button variant="outline">
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
            
            <Button onClick={handleCreateProblem} disabled={showForm}>
              <FilePlus className="mr-2 h-4 w-4" />
              Create Problem
            </Button>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Total Problems</p>
                <h2 className="text-3xl font-bold">{totalProblems}</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Active Problems</p>
                <h2 className="text-3xl font-bold">{activeProblemsCount}</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Critical Problems</p>
                <h2 className="text-3xl font-bold">{criticalProblemsCount}</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">Known Errors</p>
                <h2 className="text-3xl font-bold">{knownErrorsCount}</h2>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {showForm ? (
          <Card className="p-6">
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
            
            <Card>
              <CardHeader className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="relative w-full sm:w-96">
                    <input
                      type="text"
                      placeholder="Search problems..."
                      className="w-full pl-3 pr-10 py-2 border rounded-md"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select 
                      className="border p-2 rounded-md"
                      value={statusFilter || ''}
                      onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="new">New</option>
                      <option value="under-investigation">Under Investigation</option>
                      <option value="root-cause-identified">Root Cause Identified</option>
                      <option value="known-error">Known Error</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    
                    <select 
                      className="border p-2 rounded-md"
                      value={priorityFilter || ''}
                      onChange={(e) => setPriorityFilter(e.target.value === '' ? null : e.target.value)}
                    >
                      <option value="">All Priorities</option>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                      <option value="P4">P4</option>
                    </select>
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
