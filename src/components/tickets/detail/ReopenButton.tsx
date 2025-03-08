
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ReopenButtonProps {
  isServiceRequest: boolean;
  onReopen: () => void;
}

const ReopenButton: React.FC<ReopenButtonProps> = ({ isServiceRequest, onReopen }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onReopen}
      className="gap-2"
    >
      <RefreshCw className="h-4 w-4" />
      Re-open {isServiceRequest ? 'Request' : 'Incident'}
    </Button>
  );
};

export default ReopenButton;
