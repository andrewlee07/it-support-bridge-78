
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { File } from 'lucide-react';
import { TestCase } from '@/utils/types/testTypes';
import StatusBadge from './ui/StatusBadge';

interface TestCaseTableProps {
  testCases: TestCase[] | undefined;
  onView: (testCase: TestCase) => void;
  onEdit: (testCase: TestCase) => void;
  onDelete: (id: string) => void;
}

const TestCaseTable: React.FC<TestCaseTableProps> = ({
  testCases,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Related Requirement</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-32">
                <div className="flex flex-col items-center justify-center">
                  <File className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No test cases found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            testCases?.map((testCase) => (
              <TableRow 
                key={testCase.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView(testCase)}
              >
                <TableCell className="font-medium">
                  {testCase.title}
                </TableCell>
                <TableCell>
                  <StatusBadge status={testCase.status} />
                </TableCell>
                <TableCell>
                  {testCase.relatedRequirement || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell>
                  {new Date(testCase.updatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestCaseTable;
