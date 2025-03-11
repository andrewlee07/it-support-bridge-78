import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BacklogTestCoverage } from '@/utils/types';

interface TraceabilityMatrixProps {
  data: any;
}

const statusColors = {
  passed: "text-green-500",
  failed: "text-red-500",
  blocked: "text-yellow-500",
  not_executed: "text-gray-500",
};

// Calculate test coverage for a backlog item
const calculateCoverage = (testCases: any[]): BacklogTestCoverage => {
  const totalTests = testCases.length;
  const passedTests = testCases.filter(tc => tc.status === 'passed').length;
  const failedTests = testCases.filter(tc => tc.status === 'failed').length;
  const notExecutedTests = testCases.filter(tc => tc.status === 'not_executed').length;
  
  return {
    totalTests: totalTests,
    passedTests: passedTests,
    failedTests: failedTests,
    skippedTests: notExecutedTests,
    lastRun: new Date(),
    
    // For backward compatibility
    totalTestCases: totalTests,
    notExecutedTests,
    coveragePercentage: totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0,
    lastUpdated: new Date()
  };
};

const TraceabilityMatrix: React.FC<TraceabilityMatrixProps> = ({ data }) => {
  return (
    <ScrollArea>
      <Table>
        <TableCaption>
          A comprehensive traceability matrix displaying backlog items, associated test cases, and their statuses.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Backlog Item</TableHead>
            <TableHead>Test Cases</TableHead>
            <TableHead>Coverage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => {
            const coverage = calculateCoverage(item.testCases);

            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  {item.testCases.length > 0 ? (
                    <div className="flex flex-col space-y-1">
                      {item.testCases.map((testCase: any) => (
                        <Badge
                          key={testCase.id}
                          variant="secondary"
                          className={`gap-1.5 ${statusColors[testCase.status]}`}
                        >
                          {testCase.title}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500">No test cases</div>
                  )}
                </TableCell>
                <TableCell>{coverage.coveragePercentage}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default TraceabilityMatrix;
