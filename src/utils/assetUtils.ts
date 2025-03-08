
import { Asset } from './types/asset';

/**
 * Get the appropriate status color class based on the asset status
 */
export const getAssetStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'available':
    case 'in-use':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'inactive':
    case 'retired':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
};

