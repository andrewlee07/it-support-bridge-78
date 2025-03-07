
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';
import BugList from './BugList';

const BugsTab = () => {
  // Fetch bugs
  const { data: bugsData, isLoading: isLoadingBugs } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  return (
    <div className="space-y-4">
      {isLoadingBugs ? (
        <div className="animate-pulse p-4 rounded-lg border">Loading bugs...</div>
      ) : (
        <BugList bugs={bugsData?.data || []} />
      )}
    </div>
  );
};

export default BugsTab;
