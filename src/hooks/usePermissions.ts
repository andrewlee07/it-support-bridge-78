
import { useCallback } from 'react';
import { User, UserRole } from '@/utils/types/user';
import { hasPermission, canPerformAction } from '@/utils/securityUtils';

export const usePermissions = (user: User | null) => {
  const hasPermissionByRole = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    
    // Check primary role
    if (requiredRoles.includes(user.role)) return true;
    
    // Check additional roles if they exist
    if (user.roles && user.roles.length > 0) {
      for (const role of user.roles) {
        if (requiredRoles.includes(role)) return true;
      }
    }
    
    return false;
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
