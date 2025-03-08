
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bug, ListTodo } from 'lucide-react';

interface TicketToBugButtonProps {
  isServiceRequest: boolean;
  onClick: () => void;
}

const TicketToBugButton: React.FC<TicketToBugButtonProps> = ({ 
  isServiceRequest, 
  onClick 
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full"
    >
      {isServiceRequest ? (
        <>
          <ListTodo className="h-4 w-4 mr-2" />
          Create Backlog Item
        </>
      ) : (
        <>
          <Bug className="h-4 w-4 mr-2" />
          Create Bug
        </>
      )}
    </Button>
  );
};

export default TicketToBugButton;
