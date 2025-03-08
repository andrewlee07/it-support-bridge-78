
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path: string;
  system?: 'incident' | 'change' | 'release' | 'test' | 'backlog' | 'asset';
}

interface CrossSystemBreadcrumbProps {
  items: BreadcrumbItem[];
  currentLabel?: string;
}

const getSystemColor = (system?: string) => {
  switch (system) {
    case 'incident':
      return 'text-red-500';
    case 'change':
      return 'text-blue-500';
    case 'release':
      return 'text-green-500';
    case 'test':
      return 'text-purple-500';
    case 'backlog':
      return 'text-orange-500';
    case 'asset':
      return 'text-cyan-500';
    default:
      return 'text-gray-500';
  }
};

const CrossSystemBreadcrumb: React.FC<CrossSystemBreadcrumbProps> = ({ items, currentLabel }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
            <Link 
              to={item.path} 
              className={`text-sm font-medium hover:underline ${getSystemColor(item.system)}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        
        {currentLabel && (
          <>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <li aria-current="page">
              <span className="text-sm font-medium text-muted-foreground">
                {currentLabel}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default CrossSystemBreadcrumb;
