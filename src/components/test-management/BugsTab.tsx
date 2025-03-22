
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';
import BugList from './BugList';
import { Bug } from '@/utils/types/test/bug';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, X, Download, FileText } from 'lucide-react';
import BugForm from './BugForm';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const BugsTab = () => {
  const [showBugForm, setShowBugForm] = useState(false);
  const { toast } = useToast();
  
  // Fetch bugs
  const { data: bugsData, isLoading: isLoadingBugs, refetch } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  // Convert API bugs to our Bug type
  const convertApiBugsToBugs = (apiBugs: any[]): Bug[] => {
    return apiBugs.map(bug => ({
      id: bug.id,
      title: bug.title,
      description: bug.description,
      stepsToReproduce: Array.isArray(bug.stepsToReproduce) 
        ? bug.stepsToReproduce 
        : [bug.stepsToReproduce],
      severity: bug.severity,
      priority: bug.priority,
      status: bug.status,
      assignedDeveloper: bug.assignedTo,
      relatedTestCase: bug.relatedTestCase,
      attachment: bug.attachment,
      createdAt: new Date(bug.createdAt),
      updatedAt: new Date(bug.updatedAt),
      createdBy: bug.createdBy || bug.reportedBy || '',
      reportedBy: bug.reportedBy
    }));
  };

  // Type cast to ensure compatibility
  const typedBugs: Bug[] = bugsData?.data 
    ? convertApiBugsToBugs(bugsData.data) 
    : [];

  const handleBugFormSuccess = () => {
    setShowBugForm(false);
    refetch();
    toast({
      title: "Bug reported",
      description: "The bug has been reported successfully.",
    });
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    toast({
      title: `Exporting bugs as ${type.toUpperCase()}`,
      description: `Your bug report will be downloaded as a ${type.toUpperCase()} file.`,
    });
    // In a real implementation, we would call an API to generate the export file
  };

  const handleCreateBug = () => {
    setShowBugForm(!showBugForm);
  };

  return (
    <div className="space-y-6">
      {/* Page Header with export and create buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bug Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Button onClick={handleCreateBug} className="gap-2" variant="default">
            {showBugForm ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                New Bug
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Subheader text */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">Bugs</h2>
        <p className="text-muted-foreground">Track and manage bugs across your projects</p>
      </div>

      {/* Card for bug form */}
      {showBugForm && (
        <Card>
          <CardContent className="pt-6">
            <BugForm onSuccess={handleBugFormSuccess} onCancel={() => setShowBugForm(false)} />
          </CardContent>
        </Card>
      )}

      {/* Tabs for different bug views */}
      {!showBugForm && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 bg-background/90 backdrop-blur-sm border">
            <TabsTrigger value="all">All Bugs</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                {isLoadingBugs ? (
                  <div className="animate-pulse p-4 rounded-lg border">Loading bugs...</div>
                ) : (
                  <BugList bugs={typedBugs} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-4">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                {isLoadingBugs ? (
                  <div className="animate-pulse p-4 rounded-lg border">Loading critical bugs...</div>
                ) : (
                  <BugList bugs={typedBugs.filter(bug => bug.severity === 'critical')} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="high" className="space-y-4">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                {isLoadingBugs ? (
                  <div className="animate-pulse p-4 rounded-lg border">Loading high priority bugs...</div>
                ) : (
                  <BugList bugs={typedBugs.filter(bug => bug.priority === 'high')} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="open" className="space-y-4">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                {isLoadingBugs ? (
                  <div className="animate-pulse p-4 rounded-lg border">Loading open bugs...</div>
                ) : (
                  <BugList bugs={typedBugs.filter(bug => bug.status === 'open')} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default BugsTab;
