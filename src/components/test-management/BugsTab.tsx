
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';
import BugList from './BugList';
import { Bug } from '@/utils/types/test/bug';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, X, Download } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      {/* Page Header with export and create buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bug Management</h1>
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
          
          <Button onClick={() => setShowBugForm(!showBugForm)}>
            {showBugForm ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Bug
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Card>
        {showBugForm ? (
          <CardContent className="pt-6">
            <BugForm onSuccess={handleBugFormSuccess} onCancel={() => setShowBugForm(false)} />
          </CardContent>
        ) : (
          <>
            <CardHeader className="pb-2">
              <CardTitle>Bugs</CardTitle>
              <CardDescription>Track and manage bugs across your projects</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBugs ? (
                <div className="animate-pulse p-4 rounded-lg border">Loading bugs...</div>
              ) : (
                <BugList bugs={typedBugs} />
              )}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default BugsTab;
