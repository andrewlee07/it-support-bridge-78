
import React from 'react';
import { 
  AlertCircle, 
  Bug, 
  ClipboardList, 
  FileText, 
  Package, 
  Search, 
  Box, 
  Calendar 
} from 'lucide-react';

// Helper function to get the appropriate icon based on entity type
export const getIconForResultType = (type: string) => {
  switch (type) {
    case 'incident':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case 'bug':
      return <Bug className="h-4 w-4 text-red-500" />;
    case 'testCase':
      return <FileText className="h-4 w-4 text-purple-500" />;
    case 'backlogItem':
      return <ClipboardList className="h-4 w-4 text-orange-500" />;
    case 'release':
      return <Package className="h-4 w-4 text-green-500" />;
    case 'asset':
      return <Box className="h-4 w-4 text-blue-500" />;
    case 'change':
      return <Calendar className="h-4 w-4 text-cyan-500" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};
