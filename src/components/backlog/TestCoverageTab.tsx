import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import TestCoverageIndicator from "@/components/backlog/TestCoverageIndicator";
import LinkTestCaseDialog from "@/components/backlog/LinkTestCaseDialog";
import { BacklogItem } from '@/utils/types/backlogTypes';
import { TestCase } from '@/utils/types/test/testCase';
import { TestStatus } from '@/utils/types/test/testStatus';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';

interface TestCoverageTabProps {
  backlogItemId: string;
  riskLevel?: "high" | "medium" | "low";
  backlogItem?: BacklogItem;
  onViewTestCase?: (testCase: TestCase) => void;
}

interface BacklogCoverage {
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  notExecutedTests: number;
  coveragePercentage: number;
}

const TestCoverageTab: React.FC<TestCoverageTabProps> = ({ 
  backlogItemId, 
  riskLevel,
  backlogItem,
  onViewTestCase
}) => {
  const { toast } = useToast();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [overallCoverage, setOverallCoverage] = useState(0);
  
  const itemId = backlogItem?.id || backlogItemId;

  useEffect(() => {
    const calculateCoverage = () => {
      const mockTotalTests = 10;
      const mockPassedTests = 7;
      const mockFailedTests = 2;
      const mockNotRunTests = 1;

      const coveragePercentage = (mockPassedTests / mockTotalTests) * 100;
      setOverallCoverage(coveragePercentage);
    };

    calculateCoverage();
  }, [itemId]);

  const handleOpenLinkDialog = () => {
    setIsLinkDialogOpen(true);
  };

  const handleCloseLinkDialog = () => {
    setIsLinkDialogOpen(false);
  };

  const handleTestCaseLinked = () => {
    toast({
      title: "Test case linked",
      description: "The test case has been successfully linked to the backlog item.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Coverage</CardTitle>
        <CardDescription>
          View and manage test coverage for this backlog item
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Overall Coverage</h3>
            <p className="text-sm text-muted-foreground">
              {overallCoverage}% of requirements covered
            </p>
          </div>
          <TestCoverageIndicator 
            coveragePercentage={overallCoverage} 
            size="lg" 
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Test Execution Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-green-500">3</div>
                <p className="text-sm text-muted-foreground">Passed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-red-500">1</div>
                <p className="text-sm text-muted-foreground">Failed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-yellow-500">1</div>
                <p className="text-sm text-muted-foreground">Blocked</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-gray-500">5</div>
                <p className="text-sm text-muted-foreground">Not Run</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Linked Test Cases</h3>
          <TestCaseTable onViewTestCase={onViewTestCase} />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleOpenLinkDialog}>Link Test Case</Button>
        </div>
      </CardContent>

      {backlogItem && (
        <LinkTestCaseDialog
          isOpen={isLinkDialogOpen}
          backlogItem={backlogItem}
          onClose={handleCloseLinkDialog}
          onSuccess={handleTestCaseLinked}
        />
      )}
    </Card>
  );
};

const TestCaseTable: React.FC<{onViewTestCase?: (testCase: TestCase) => void}> = ({ onViewTestCase }) => {
  const mockTestCases = [
    {
      id: "1",
      title: "Verify login functionality",
      status: "pass" as TestStatus,
      lastExecutionDate: new Date(),
    },
    {
      id: "2",
      title: "Check user profile update",
      status: "fail" as TestStatus,
      lastExecutionDate: new Date(),
    },
    {
      id: "3",
      title: "Validate data export",
      status: "blocked" as TestStatus,
      lastExecutionDate: new Date(),
    },
  ];

  const mockCoverage: BacklogTestCoverage = {
    totalTestCases: 5,
    passedTests: 3,
    failedTests: 1,
    notExecutedTests: 1,
    coveragePercentage: 80,
    lastUpdated: new Date()
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Execution</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTestCases.map((mockTest) => {
          const testCase = {
            id: mockTest.id,
            title: mockTest.title,
            description: "Mock test case",
            stepsToReproduce: ["Step 1", "Step 2"],
            expectedResults: "Expected result",
            status: mockTest.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastExecutionDate: mockTest.lastExecutionDate,
          } as TestCase;

          return (
            <TableRow key={testCase.id}>
              <TableCell className="font-medium">{testCase.title}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    testCase.status === "pass"
                      ? "bg-green-100 text-green-800"
                      : testCase.status === "fail"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {testCase.status}
                </Badge>
              </TableCell>
              <TableCell>
                {testCase.lastExecutionDate
                  ? testCase.lastExecutionDate.toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <TestCaseActions testCase={testCase} onViewTestCase={onViewTestCase} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

interface TestCaseActionsProps {
  testCase: TestCase;
  onViewTestCase?: (testCase: TestCase) => void;
}

const TestCaseActions: React.FC<TestCaseActionsProps> = ({ testCase, onViewTestCase }) => {
  const { toast } = useToast();

  const handleRemoveTestCase = () => {
    toast({
      title: "Test case unlinked",
      description: "The test case has been successfully unlinked from the backlog item.",
    });
  };

  const handleView = () => {
    if (onViewTestCase) {
      onViewTestCase(testCase);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>Unlink</DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will remove the test case
                from the backlog item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveTestCase}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TestCoverageTab;
