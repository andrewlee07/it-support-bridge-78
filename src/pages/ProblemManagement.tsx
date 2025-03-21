
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Plus, Database, X, Download } from 'lucide-react';
import { toast } from 'sonner';
import ProblemList from '@/components/problems/ProblemList';
import ProblemForm from '@/components/problems/ProblemForm';
import KnownErrorDatabase from '@/components/problems/KnownErrorDatabase';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ProblemManagement = () => {
  const [activeTab, setActiveTab] = useState('problems');
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (data: any) => {
    // In a real app, this would connect to an API
    console.log('Submitting problem:', data);
    setShowForm(false);
    toast.success('Problem record created successfully!');
  };
  
  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(`Exporting problems as ${type.toUpperCase()}`);
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Problem Management</h1>
            <p className="text-muted-foreground mt-1">
              Identify and address the root causes of recurring incidents
            </p>
          </div>
          
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
            
            {activeTab === 'problems' && (
              <Button 
                className="shrink-0 flex items-center" 
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    New Problem
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        {showForm ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Problem</h2>
            <ProblemForm onSubmit={handleSubmit} />
          </Card>
        ) : (
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="problems">Problems</TabsTrigger>
                <TabsTrigger value="kedb" className="flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Known Error DB
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="problems" className="mt-0">
                <ProblemList />
              </TabsContent>
              
              <TabsContent value="kedb" className="mt-0">
                <KnownErrorDatabase />
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </PageTransition>
  );
};

export default ProblemManagement;
