
import React from 'react';
import { FileText, XCircle, Package } from 'lucide-react';

// Helper function for status badge color
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Planned':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
    case 'Deployed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'Cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
  }
};

// Helper function for type badge color
export const getTypeColor = (type: string) => {
  switch (type) {
    case 'major':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
    case 'minor':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'patch':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'emergency':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
  }
};

// Helper function for approval status badge color
export const getApprovalStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    case 'pending':
    default:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
  }
};

// Helper function for item type icon
export const getItemTypeIcon = (type: string) => {
  switch (type) {
    case 'change':
      return <FileText className="h-4 w-4 mr-2" />;
    case 'incident':
      return <XCircle className="h-4 w-4 mr-2" />;
    case 'asset':
      return <Package className="h-4 w-4 mr-2" />;
    default:
      return <FileText className="h-4 w-4 mr-2" />;
  }
};
