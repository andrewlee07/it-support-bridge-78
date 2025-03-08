
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description: string;
  backLink?: string;
  backLinkText?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  backLink, 
  backLinkText = 'Back'
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between">
      <div>
        {backLink && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(backLink)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backLinkText}
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
