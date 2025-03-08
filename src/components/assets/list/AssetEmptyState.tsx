
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AssetEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const AssetEmptyState: React.FC<AssetEmptyStateProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default AssetEmptyState;
