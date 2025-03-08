
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { TestStatus } from '@/utils/types/testTypes';

interface FilteredTestCasesCardProps {
  statusFilter: TestStatus | null;
  testCasesData: any;
  isLoadingTestCases: boolean;
  onClearFilter: () => void;
}

const FilteredTestCasesCard: React.FC<FilteredTestCasesCardProps> = ({ 
  statusFilter, 
  testCasesData, 
  isLoadingTestCases,
  onClearFilter
}) => {
  if (!statusFilter) return null;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Filtered Test Cases</CardTitle>
            <CardDescription>
              Showing test cases with status: {statusFilter}
            </CardDescription>
          </div>
          <button 
            className="text-sm text-primary hover:underline"
            onClick={onClearFilter}
          >
            Clear filter
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingTestCases ? (
          <div className="animate-pulse">Loading filtered test cases...</div>
        ) : testCasesData?.data.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No test cases found with this status
          </div>
        ) : (
          <div className="space-y-2">
            {testCasesData?.data.map((testCase: any) => (
              <div key={testCase.id} className="p-2 border rounded-md">
                <div className="font-medium">{testCase.title}</div>
                <div className="text-sm text-muted-foreground mt-1 truncate">
                  {testCase.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilteredTestCasesCard;
