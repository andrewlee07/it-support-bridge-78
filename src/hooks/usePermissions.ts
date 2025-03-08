
import { useCallback } from 'react';
import { User, UserRole } from '@/utils/types/user';
import { hasPermission, canPerformAction } from '@/utils/securityUtils';

export const usePermissions = (user: User | null) => {
  const hasPermissionByRole = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const userHasPermission = useCallback((permissionName: string): boolean => {
    if (!user) return false;
    return hasPermission(user, permissionName);
  }, [user]);

  const userCanPerformAction = useCallback((resource: string, action: string): boolean => {
    if (!user) return false;
    return canPerformAction(user, resource, action as any);
  }, [user]);

  return { 
    hasPermissionByRole, 
    userHasPermission, 
    userCanPerformAction 
  };
};
