
import React from 'react';

interface ChangeRequestDescriptionProps {
  description: string;
  implementationPlan: string;
  rollbackPlan: string;
}

const ChangeRequestDescription: React.FC<ChangeRequestDescriptionProps> = ({
  description,
  implementationPlan,
  rollbackPlan
}) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-sm">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Implementation Plan</h3>
          <p className="text-sm">{implementationPlan}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Rollback Plan</h3>
          <p className="text-sm">{rollbackPlan}</p>
        </div>
      </div>
    </>
  );
};

export default ChangeRequestDescription;
