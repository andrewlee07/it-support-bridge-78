
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';
import BugList from './BugList';
import { Bug } from '@/utils/types/testTypes';

const BugsTab = () => {
  // Fetch bugs
  const { data: bugsData, isLoading: isLoadingBugs } = useQuery({
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
      createdAt: bug.createdAt,
      updatedAt: bug.updatedAt,
      createdBy: bug.createdBy || bug.reportedBy || '',
      reportedBy: bug.reportedBy
    }));
  };

  // Type cast to ensure compatibility
  const typedBugs: Bug[] = bugsData?.data 
    ? convertApiBugsToBugs(bugsData.data) 
    : [];

  return (
    <div className="space-y-4">
      {isLoadingBugs ? (
        <div className="animate-pulse p-4 rounded-lg border">Loading bugs...</div>
      ) : (
        <BugList bugs={typedBugs} />
      )}
    </div>
  );
};

export default BugsTab;
