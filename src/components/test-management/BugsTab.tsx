
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import BugList from './BugList';
import { useBugs } from '@/hooks/useBugs';

const BugsTab = () => {
  const { bugs, isLoading } = useBugs();

  const handleExport = () => {
    console.log('Exporting bug data');
    // In a real app, this would trigger a data export
  };

  const handleCreateNew = () => {
    console.log('Creating new bug');
    // In a real app, this would open a create bug form
  };

  // Count stats for the dashboard cards
  const totalBugs = bugs?.length || 0;
  const openBugs = bugs?.filter(bug => bug.status === 'open')?.length || 0;
  const criticalBugs = bugs?.filter(bug => bug.severity === 'critical')?.length || 0;
  const highPriorityBugs = bugs?.filter(bug => bug.priority === 'high')?.length || 0;

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
          <Button
            variant="outline"
            size="default"
            onClick={handleExport}
            className="bg-secondary/50 border border-border/20 hover:bg-muted"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button onClick={handleCreateNew} size="default" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Bug
          </Button>
        </div>
      </div>

      {/* Tabs for different bug types */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Bugs</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={bugs || []} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="open" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={(bugs || []).filter(bug => bug.status === 'open')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={(bugs || []).filter(bug => bug.status === 'in-progress')} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-4">
          <Card className="bg-secondary/50 border border-border/20">
            <CardContent className="p-0">
              <BugList bugs={(bugs || []).filter(bug => bug.status === 'resolved')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BugsTab;
