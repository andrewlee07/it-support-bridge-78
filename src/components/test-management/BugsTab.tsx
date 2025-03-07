
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

  // Type cast to ensure compatibility
  const typedBugs = bugsData?.data as Bug[] || [];

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
