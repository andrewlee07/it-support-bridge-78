
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Plus, Database, X } from 'lucide-react';
import { toast } from 'sonner';
import ProblemList from '@/components/problems/ProblemList';
import ProblemForm from '@/components/problems/ProblemForm';
import KnownErrorDatabase from '@/components/problems/KnownErrorDatabase';

const ProblemManagement = () => {
  const [activeTab, setActiveTab] = useState('problems');
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (data: any) => {
    // In a real app, this would connect to an API
    console.log('Submitting problem:', data);
    setShowForm(false);
    toast.success('Problem record created successfully!');
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Problem Management</h1>
            <p className="text-muted-foreground mt-1">
              Identify and address the root causes of recurring incidents
            </p>
          </div>
          
          {activeTab === 'problems' && (
            <Button className="shrink-0" onClick={() => setShowForm(!showForm)}>
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
        
        {showForm ? (
          <div className="glass-panel p-6 rounded-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Create New Problem</h2>
            <ProblemForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
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
        )}
      </div>
    </PageTransition>
  );
};

export default ProblemManagement;
