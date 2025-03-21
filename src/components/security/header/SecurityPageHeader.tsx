
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FilePlus, Share2 } from 'lucide-react';

interface SecurityPageHeaderProps {
  handleExport: (type: 'csv' | 'pdf') => void;
  handleCreateCase?: () => void; // New prop for creating a case
}

const SecurityPageHeader: React.FC<SecurityPageHeaderProps> = ({ 
  handleExport,
  handleCreateCase 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">Security Management</h1>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              Export to CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Export to PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={handleCreateCase}>
          <FilePlus className="mr-2 h-4 w-4" />
          Create Security Case
        </Button>
      </div>
    </div>
  );
};

export default SecurityPageHeader;
