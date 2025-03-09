
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FormHeaderProps {
  isLoading: boolean;
  hasMandatoryFields: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  isLoading,
  hasMandatoryFields
}) => {
  return (
    <>
      {isLoading && (
        <div className="py-2">
          <p className="text-muted-foreground">Loading form configuration...</p>
        </div>
      )}
      
      {!isLoading && hasMandatoryFields && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Fields marked with * are mandatory and must be completed.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default FormHeader;
