
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
} from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, AlertTriangle, Clock, Bug } from 'lucide-react';
import { TestCase, TestStatus, Bug, BugStatus } from '@/utils/types/testTypes';
import { BacklogItem } from '@/utils/types/backlogTypes';
import StatusBadge from './ui/StatusBadge';
import BugCreationDialog from './BugCreationDialog';

interface TestExecutionFormProps {
  testCase: TestCase;
  onExecute: (testCaseId: string, status: TestStatus, comments: string) => Promise<{ success: boolean }>;
  onLinkBug?: (testCaseId: string) => void;
  onBugCreated?: (bug: Bug, backlogItem?: BacklogItem) => void;
}

const TestExecutionForm: React.FC<TestExecutionFormProps> = ({ 
  testCase, 
  onExecute,
  onLinkBug,
  onBugCreated
}) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBugDialogOpen, setIsBugDialogOpen] = useState(false);

  const handleExecute = async (status: TestStatus) => {
    setIsSubmitting(true);
    const result = await onExecute(testCase.id, status, comments);
    setIsSubmitting(false);
    
    // If the test fails, offer to create a bug
    if (result.success && status === 'fail' && !isBugDialogOpen) {
      setIsBugDialogOpen(true);
    }
  };

  const handleBugCreated = (bug: Bug, backlogItem?: BacklogItem) => {
    if (onBugCreated) {
      onBugCreated(bug, backlogItem);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{testCase.title}</span>
          <StatusBadge status={testCase.status} />
        </CardTitle>
        <CardDescription>
          {testCase.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Steps to Reproduce</h3>
          <ol className="list-decimal pl-6 space-y-1">
            {testCase.stepsToReproduce.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Expected Results</h3>
          <p className="text-gray-700">{testCase.expectedResults}</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments">Execution Notes</Label>
          <Textarea 
            id="comments" 
            placeholder="Add your execution comments here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          {onLinkBug && (
            <Button 
              variant="outline" 
              onClick={() => onLinkBug(testCase.id)}
              disabled={isSubmitting}
            >
              <Bug className="h-4 w-4 mr-2" />
              Link Bug
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => setIsBugDialogOpen(true)}
            disabled={isSubmitting}
          >
            <Bug className="h-4 w-4 mr-2" />
            Create Bug
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isSubmitting}>
                <XCircle className="h-4 w-4 mr-2" />
                Fail
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mark as Failed?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to mark this test case as failed? 
                  This will update the test case status accordingly.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleExecute('fail')} className="bg-red-600 hover:bg-red-700">
                  Mark as Failed
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="outline" onClick={() => handleExecute('blocked')} disabled={isSubmitting}>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Blocked
          </Button>

          <Button variant="outline" onClick={() => handleExecute('not-run')} disabled={isSubmitting}>
            <Clock className="h-4 w-4 mr-2" />
            Not Run
          </Button>

          <Button variant="default" onClick={() => handleExecute('pass')} disabled={isSubmitting}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Pass
          </Button>
        </div>
      </CardFooter>

      {/* Bug Creation Dialog */}
      <BugCreationDialog
        testCase={testCase}
        isOpen={isBugDialogOpen}
        onClose={() => setIsBugDialogOpen(false)}
        onSuccess={handleBugCreated}
      />
    </Card>
  );
};

export default TestExecutionForm;
