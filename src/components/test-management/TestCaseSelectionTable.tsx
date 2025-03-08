
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { TestCase } from '@/utils/types/test/testCase';
import StatusBadge from './ui/StatusBadge';
import { format } from 'date-fns';

export interface TestCaseSelectionTableProps {
  testCases: TestCase[];
  selectedTestCases: string[];
  onSelect?: (testCaseId: string) => void;
  onToggle?: (testCaseId: string) => void; // Alternative name for the same action
  onToggleSelection?: (testCaseId: string) => void; // Another alternative name
  onSelectAll?: () => void;
  onClearAll?: () => void;
  onExecute?: (testCase: TestCase) => void;
}

const TestCaseSelectionTable: React.FC<TestCaseSelectionTableProps> = ({
  testCases,
  selectedTestCases,
  onSelect,
  onToggle,
  onToggleSelection,
  onSelectAll,
  onClearAll,
  onExecute
}) => {
  // Handle either onSelect, onToggle, or onToggleSelection callback
  const handleToggle = (testCaseId: string) => {
    if (onSelect) {
      onSelect(testCaseId);
    } else if (onToggle) {
      onToggle(testCaseId);
    } else if (onToggleSelection) {
      onToggleSelection(testCaseId);
    }
  };

  const handleExecute = (testCase: TestCase) => {
    if (onExecute) {
      onExecute(testCase);
    }
  };

  return (
    <div>
      {(onSelectAll || onClearAll) && (
        <div className="flex justify-end space-x-2 mb-2">
          {onSelectAll && (
            <button 
              onClick={onSelectAll}
              className="text-sm text-primary hover:underline"
            >
              Select All
            </button>
          )}
          {onClearAll && (
            <button 
              onClick={onClearAll}
              className="text-sm text-muted-foreground hover:underline"
            >
              Clear All
            </button>
          )}
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            {onExecute && <TableHead className="w-20">Actions</TableHead>}
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
              {onExecute && (
                <TableCell>
                  <button
                    onClick={() => handleExecute(testCase)}
                    className="text-primary hover:underline text-sm"
                  >
                    Execute
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestCaseSelectionTable;
