
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface ServiceAddButtonProps {
  onAddService: () => void;
}

const ServiceAddButton: React.FC<ServiceAddButtonProps> = ({ onAddService }) => {
  return (
    <Button onClick={onAddService} className="bg-primary text-white">
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Service
    </Button>
  );
};

export default ServiceAddButton;
