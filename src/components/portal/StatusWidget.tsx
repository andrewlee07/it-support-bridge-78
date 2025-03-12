
import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface StatusWidgetProps {
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

const StatusWidget: React.FC<StatusWidgetProps> = ({ status, message }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-900/30 dark:text-yellow-300';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-300';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'error':
      case 'info':
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className={`p-3 rounded-md border flex items-start ${getStatusColor()}`}>
      <div className="mr-3 mt-0.5">
        {getStatusIcon()}
      </div>
      <div>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default StatusWidget;
