
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import ProblemForm from './ProblemForm';
import { createProblem, getNextProblemId } from '@/utils/mockData/problems';
import { toast } from 'sonner';

const CreateProblemButton = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: any) => {
    try {
      createProblem(data);
      setOpen(false);
      toast.success('Problem created successfully');
    } catch (error) {
      toast.error('Failed to create problem');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Problem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Problem</DialogTitle>
        </DialogHeader>
        <ProblemForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProblemButton;
