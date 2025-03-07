
import React from 'react';
import { TestCase } from '@/utils/types/testTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs } from '@/utils/mockData/testData';

interface TestCaseDetailsProps {
  testCase: TestCase;
}

const TestCaseDetails: React.FC<TestCaseDetailsProps> = ({ testCase }) => {
  // Fetch bugs to check if any are linked to this test case
  const { data: bugsResponse } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  const linkedBugs = bugsResponse?.data?.filter(
    (bug) => bug.relatedTestCase === testCase.id
  ) || [];

  // Map status to badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case 'fail':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'blocked':
        return <Badge className="bg-yellow-100 text-yellow-800">Blocked</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Not Run</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{testCase.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          {getStatusBadge(testCase.status)}
          {testCase.relatedRequirement && (
            <Badge variant="outline">
              Requirement: {testCase.relatedRequirement}
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{testCase.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Steps to Reproduce</h3>
        <ol className="list-decimal pl-5 space-y-2">
          {testCase.stepsToReproduce.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Expected Results</h3>
        <p className="text-gray-700">{testCase.expectedResults}</p>
      </div>

      {linkedBugs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Linked Bugs</h3>
          <div className="space-y-2">
            {linkedBugs.map((bug) => (
              <Card key={bug.id}>
                <CardContent className="py-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{bug.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                          {bug.severity} severity
                        </Badge>
                        <Badge variant="outline">{bug.status}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-500">
        <div>Created: {new Date(testCase.createdAt).toLocaleString()}</div>
        <div>Last updated: {new Date(testCase.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default TestCaseDetails;
