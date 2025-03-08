
import React from 'react';
import { Button } from '@/components/ui/button';
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
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { TestStatus } from '@/utils/types/testTypes';

interface StatusButtonGroupProps {
  onExecute: (status: TestStatus) => void;
  isSubmitting: boolean;
}

export const StatusButtonGroup: React.FC<StatusButtonGroupProps> = ({ 
  onExecute, 
  isSubmitting 
}) => {
  return (
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
            <AlertDialogAction onClick={() => onExecute('fail')} className="bg-red-600 hover:bg-red-700">
              Mark as Failed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button variant="outline" onClick={() => onExecute('blocked')} disabled={isSubmitting}>
        <AlertTriangle className="h-4 w-4 mr-2" />
        Blocked
      </Button>

      <Button variant="outline" onClick={() => onExecute('not-run')} disabled={isSubmitting}>
        <Clock className="h-4 w-4 mr-2" />
        Not Run
      </Button>

      <Button variant="default" onClick={() => onExecute('pass')} disabled={isSubmitting}>
        <CheckCircle className="h-4 w-4 mr-2" />
        Pass
      </Button>
    </div>
  );
};
