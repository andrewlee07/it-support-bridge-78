
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
import { PlusCircle, X } from 'lucide-react';
import BugForm from './BugForm';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bugs</CardTitle>
          <CardDescription>Track and manage bugs</CardDescription>
        </div>
        <Button size="sm" onClick={() => setShowBugForm(!showBugForm)}>
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
      </CardHeader>
      <CardContent>
        {showBugForm ? (
          <BugForm onSuccess={handleBugFormSuccess} onCancel={() => setShowBugForm(false)} />
        ) : isLoadingBugs ? (
          <div className="animate-pulse p-4 rounded-lg border">Loading bugs...</div>
        ) : (
          <BugList bugs={typedBugs} />
        )}
      </CardContent>
    </Card>
  );
};

export default BugsTab;
