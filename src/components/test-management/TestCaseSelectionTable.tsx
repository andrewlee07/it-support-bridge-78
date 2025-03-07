
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TestCase } from '@/utils/types/testTypes';
import StatusBadge from './ui/StatusBadge';
import { Play } from 'lucide-react';

interface TestCaseSelectionTableProps {
  testCases: TestCase[];
  selectedTestCases: string[];
  onToggleSelection: (testCaseId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onExecute: (testCase: TestCase) => void;
}

const TestCaseSelectionTable: React.FC<TestCaseSelectionTableProps> = ({
  testCases,
  selectedTestCases,
  onToggleSelection,
  onSelectAll,
  onClearAll,
  onExecute
}) => {
  const allSelected = testCases.length > 0 && selectedTestCases.length === testCases.length;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
          >
            Clear All
          </Button>
        </div>
        <div>
          <span className="text-sm">
            {selectedTestCases.length} of {testCases.length} selected
          </span>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={allSelected ? onClearAll : onSelectAll}
                  aria-label="Select all test cases"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  No test cases available for execution
                </TableCell>
              </TableRow>
            ) : (
              testCases.map((testCase) => (
                <TableRow key={testCase.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTestCases.includes(testCase.id)}
                      onCheckedChange={() => onToggleSelection(testCase.id)}
                      aria-label={`Select ${testCase.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{testCase.title}</TableCell>
                  <TableCell>
                    <StatusBadge status={testCase.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onExecute(testCase)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TestCaseSelectionTable;
