
import React from 'react';

interface FormSectionHeaderProps {
  title: string;
  description?: string;
}

const FormSectionHeader: React.FC<FormSectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
};

export default FormSectionHeader;
