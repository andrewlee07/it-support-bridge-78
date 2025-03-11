
import React from 'react';
import { 
  Bell,
  AlertTriangle,
  Bug,
  ClipboardList,
  FileText,
  Package,
  Box,
  Calendar,
  FileCheck,
  AlertCircle,
  CheckSquare
} from 'lucide-react';

interface IconProps {
  className?: string;
}

export const getIconForResultType = (type: string, props: IconProps = {}) => {
  const defaultClass = "h-5 w-5";
  const className = props.className ? `${defaultClass} ${props.className}` : defaultClass;
  
  switch (type) {
    case 'incident':
      return <AlertTriangle className={`${className} text-red-500`} />;
    case 'bug':
      return <Bug className={`${className} text-red-500`} />;
    case 'testCase':
      return <FileCheck className={`${className} text-purple-500`} />;
    case 'backlogItem':
      return <ClipboardList className={`${className} text-orange-500`} />;
    case 'release':
      return <Package className={`${className} text-green-500`} />;
    case 'asset':
      return <Box className={`${className} text-blue-500`} />;
    case 'change':
      return <Calendar className={`${className} text-cyan-500`} />;
    case 'knowledge':
      return <FileText className={`${className} text-indigo-500`} />;
    case 'task':
      return <CheckSquare className={`${className} text-emerald-500`} />;
    default:
      return <Bell className={`${className} text-muted-foreground`} />;
  }
};

export const getStatusIconForTask = (status: string, props: IconProps = {}) => {
  const defaultClass = "h-5 w-5";
  const className = props.className ? `${defaultClass} ${props.className}` : defaultClass;
  
  switch (status) {
    case 'new':
      return <AlertCircle className={`${className} text-blue-500`} />;
    case 'in-progress':
      return <Calendar className={`${className} text-purple-500`} />;
    case 'on-hold':
      return <AlertTriangle className={`${className} text-orange-500`} />;
    case 'completed':
      return <CheckSquare className={`${className} text-green-500`} />;
    case 'cancelled':
      return <AlertTriangle className={`${className} text-gray-500`} />;
    default:
      return <AlertCircle className={`${className} text-muted-foreground`} />;
  }
};

export const getPriorityIcon = (priority: string, props: IconProps = {}) => {
  const defaultClass = "h-5 w-5";
  const className = props.className ? `${defaultClass} ${props.className}` : defaultClass;
  
  switch (priority) {
    case 'critical':
      return <AlertTriangle className={`${className} text-red-500`} />;
    case 'high':
      return <AlertTriangle className={`${className} text-orange-500`} />;
    case 'medium':
      return <AlertCircle className={`${className} text-yellow-500`} />;
    case 'low':
      return <AlertCircle className={`${className} text-green-500`} />;
    default:
      return <AlertCircle className={`${className} text-muted-foreground`} />;
  }
};
