
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileText } from 'lucide-react';
import CreateKnownErrorDialog from '../CreateKnownErrorDialog';
import { Problem } from '@/utils/types/problem';
import { toast } from 'sonner';

interface ProblemActionButtonsProps {
  problem: Problem;
  canClose: boolean;
  canReopen: boolean;
  isClosed: boolean;
  onCloseProblem: (notes: string) => void;
  onReopenProblem: (reason: string) => void;
}

const ProblemActionButtons: React.FC<ProblemActionButtonsProps> = ({
  problem,
  canClose,
  canReopen,
  isClosed,
  onCloseProblem,
  onReopenProblem
}) => {
  const [knownErrorDialogOpen, setKnownErrorDialogOpen] = useState(false);
  const [closeProblemDialogOpen, setCloseProblemDialogOpen] = useState(false);
  const [reopenDialogOpen, setReopenDialogOpen] = useState(false);
  
  const handleCreateKnownError = (knownErrorId: string) => {
    toast.success(`Created Known Error #${knownErrorId} from this problem`);
    // In a real app, we'd update the problem with the relation
  };
  
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {!isClosed && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setKnownErrorDialogOpen(true)}
        >
          <AlertCircle className="h-4 w-4" />
          <span>Create Known Error</span>
        </Button>
      )}
      
      {canClose && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Simple implementation - would show dialog in real app
            onCloseProblem("Problem closed after resolution.");
          }}
        >
          Close Problem
        </Button>
      )}
      
      {canReopen && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Simple implementation - would show dialog in real app
            onReopenProblem("Problem reopened for further investigation.");
          }}
        >
          Reopen Problem
        </Button>
      )}
      
      {/* Known Error Dialog */}
      <CreateKnownErrorDialog
        open={knownErrorDialogOpen}
        onOpenChange={setKnownErrorDialogOpen}
        problem={problem}
        onSuccess={handleCreateKnownError}
      />
    </div>
  );
};

export default ProblemActionButtons;
