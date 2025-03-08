
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Ticket } from '@/utils/types/ticket';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getNextProblemId } from '@/utils/mockData/problems';

interface CreateProblemButtonProps {
  incident: Ticket;
}

const CreateProblemButton: React.FC<CreateProblemButtonProps> = ({ incident }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateProblem = () => {
    // In a real app, this would make an API call to create a problem record
    const problemId = getNextProblemId();
    
    // Close the dialog and show success message
    setIsDialogOpen(false);
    
    // Show a success toast
    toast.success('Problem record created', {
      description: `Problem record ${problemId} created from incident ${incident.id}`,
      action: {
        label: 'View',
        onClick: () => navigate(`/problems/${problemId}`),
      },
    });
    
    // Navigate to the problem record
    navigate(`/problems/${problemId}`);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <AlertTriangle className="h-4 w-4" />
          Create Problem
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Problem Record</DialogTitle>
          <DialogDescription>
            Create a problem record from this incident to investigate and address the root cause.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="font-medium mb-2">Incident Details</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-medium">ID:</span> {incident.id}
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-medium">Title:</span> {incident.title}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Description:</span> {incident.description}
          </p>
          
          <div className="flex items-center mt-4 p-2 bg-amber-50 border border-amber-200 rounded-md">
            <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" />
            <div>
              <span className="text-sm">
                This will create a new Problem record with information from this incident.
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateProblem}>
            Create Problem Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProblemButton;
