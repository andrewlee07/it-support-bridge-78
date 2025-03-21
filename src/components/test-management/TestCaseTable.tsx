
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { File, Clock } from 'lucide-react';
import { TestCase } from '@/utils/types/testTypes';
import StatusBadge from './ui/StatusBadge';
import { format } from 'date-fns';
import TestCaseActions from './ui/TestCaseActions';

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
            <TableHead className="hidden md:table-cell">Related Requirement</TableHead>
            <TableHead className="hidden md:table-cell">Updated</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!testCases || testCases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-32">
                <div className="flex flex-col items-center justify-center">
                  <File className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No test cases found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            testCases.map((testCase) => (
              <TableRow 
                key={testCase.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView(testCase)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-start gap-2">
                    <div>
                      {testCase.title}
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1 md:hidden">
                        {testCase.relatedRequirement || 'No related requirement'}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={testCase.status} size="sm" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {testCase.relatedRequirement || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(testCase.updatedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <TestCaseActions
                    testCase={testCase}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
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
