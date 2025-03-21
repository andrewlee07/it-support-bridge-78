
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getNextProblemId } from '@/utils/mockData/problems';

const CreateProblemButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    toast.info("Creating new problem", {
      description: `Problem ID: ${getNextProblemId()}`,
      duration: 3000,
    });
    navigate('/problems/new');
  };

  return (
    <Button className="ml-4" onClick={handleClick}>
      <Plus className="mr-2 h-4 w-4" />
      New Problem
    </Button>
  );
};

export default CreateProblemButton;
