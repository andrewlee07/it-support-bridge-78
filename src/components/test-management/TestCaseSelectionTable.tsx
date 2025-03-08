
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { TestCase } from '@/utils/types/test/testCase';
import StatusBadge from './ui/StatusBadge';
import { format } from 'date-fns';

export interface TestCaseSelectionTableProps {
  testCases: TestCase[];
  selectedTestCases: string[];
  onSelect: (testCaseId: string) => void;
  onToggle?: (testCaseId: string) => void; // Alternative name for backward compatibility
}

const TestCaseSelectionTable: React.FC<TestCaseSelectionTableProps> = ({
  testCases,
  selectedTestCases,
  onSelect,
  onToggle
}) => {
  // Handle either onSelect or onToggle callback
  const handleToggle = (testCaseId: string) => {
    if (onSelect) {
      onSelect(testCaseId);
    } else if (onToggle) {
      onToggle(testCaseId);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testCases.map((testCase) => (
          <TableRow key={testCase.id}>
            <TableCell>
              <Checkbox
                checked={selectedTestCases.includes(testCase.id)}
                onCheckedChange={() => handleToggle(testCase.id)}
              />
            </TableCell>
            <TableCell className="font-medium">{testCase.title}</TableCell>
            <TableCell>
              <StatusBadge status={testCase.status} size="xs" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {format(new Date(testCase.createdAt), 'MMM d, yyyy')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TestCaseSelectionTable;
