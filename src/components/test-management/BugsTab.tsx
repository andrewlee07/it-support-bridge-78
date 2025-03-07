
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BugList from './BugList';

const BugsTab = () => {
  // Fetch bugs
  const { data: bugsData, isLoading: isLoadingBugs } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bug Tracking</CardTitle>
        <CardDescription>Track and manage bugs</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingBugs ? (
          <div className="animate-pulse">Loading bugs...</div>
        ) : (
          <BugList />
        )}
      </CardContent>
    </Card>
  );
};

export default BugsTab;
