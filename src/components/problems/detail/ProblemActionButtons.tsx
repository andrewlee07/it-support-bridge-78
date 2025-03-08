
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ProblemActionButtonsProps {
  canClose: boolean;
  canReopen: boolean;
  isClosed: boolean;
  onCloseProblem: (notes: string) => void;
  onReopenProblem: (reason: string) => void;
}

const ProblemActionButtons = ({ 
  canClose, 
  canReopen, 
  isClosed, 
  onCloseProblem, 
  onReopenProblem 
}: ProblemActionButtonsProps) => {
  const [isClosingDialogOpen, setIsClosingDialogOpen] = useState(false);
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);
  const [closureNotes, setClosureNotes] = useState('');
  const [reopenReason, setReopenReason] = useState('');

  const handleCloseProblemClick = () => {
    onCloseProblem(closureNotes);
    setIsClosingDialogOpen(false);
    setClosureNotes('');
  };

  const handleReopenProblemClick = () => {
    onReopenProblem(reopenReason);
    setIsReopenDialogOpen(false);
    setReopenReason('');
  };

  return (
    <div className="space-x-2">
      {canClose && !isClosed && (
        <Dialog open={isClosingDialogOpen} onOpenChange={setIsClosingDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Close Problem</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Close Problem</DialogTitle>
              <DialogDescription>
                Add any final notes before closing this problem record.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={closureNotes}
              onChange={(e) => setClosureNotes(e.target.value)}
              placeholder="Add any final notes..."
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsClosingDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCloseProblemClick}>
                Close Problem
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {canReopen && (
        <Dialog open={isReopenDialogOpen} onOpenChange={setIsReopenDialogOpen}>
          <DialogTrigger asChild>
            <Button>Reopen Problem</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reopen Problem</DialogTitle>
              <DialogDescription>
                Provide a reason for reopening this problem record.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={reopenReason}
              onChange={(e) => setReopenReason(e.target.value)}
              placeholder="Reason for reopening..."
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReopenDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReopenProblemClick}>
                Reopen Problem
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProblemActionButtons;
