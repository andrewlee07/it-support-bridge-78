
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getReleases } from '@/utils/api/releaseApi';
import TestCaseDetailView from '@/components/test-management/coverage/TestCaseDetailView';
import TraceabilityMatrix from '@/components/test-management/traceability/TraceabilityMatrix';
import ReleaseReadinessAssessment from '@/components/test-management/readiness/ReleaseReadinessAssessment';

const TestCoverageAndTraceability = () => {
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('testCases');

  // Fetch releases for selection
  const { data: releasesResponse, isLoading: isLoadingReleases } = useQuery({
    queryKey: ['releases'],
    queryFn: getReleases,
  });

  const releases = releasesResponse?.data || [];

  return (
    <PageTransition>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Test Coverage & Traceability</h1>
            <p className="text-muted-foreground mt-1">
              Track test coverage, manage test-to-backlog traceability, and assess release readiness
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <Select value={selectedReleaseId} onValueChange={setSelectedReleaseId}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Select a release" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingReleases ? (
                  <SelectItem value="loading" disabled>
                    Loading releases...
                  </SelectItem>
                ) : releases.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No releases found
                  </SelectItem>
                ) : (
                  releases.map(release => (
                    <SelectItem key={release.id} value={release.id}>
                      {release.title} ({release.version})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!selectedReleaseId ? (
          <Card>
            <CardHeader>
              <CardTitle>Select a Release</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                Please select a release to view test coverage and traceability information
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full md:w-[500px]">
              <TabsTrigger value="testCases">Test Cases</TabsTrigger>
              <TabsTrigger value="traceability">Traceability Matrix</TabsTrigger>
              <TabsTrigger value="readiness">Release Readiness</TabsTrigger>
            </TabsList>

            <TabsContent value="testCases" className="space-y-4">
              <TestCaseDetailView releaseId={selectedReleaseId} />
            </TabsContent>

            <TabsContent value="traceability" className="space-y-4">
              <TraceabilityMatrix releaseId={selectedReleaseId} />
            </TabsContent>

            <TabsContent value="readiness" className="space-y-4">
              <ReleaseReadinessAssessment releaseId={selectedReleaseId} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default TestCoverageAndTraceability;
