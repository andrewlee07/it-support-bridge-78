
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PORTAL } from '@/utils/routes/portalRouteConstants';

interface PortalPermissionGuardProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const PortalPermissionGuard: React.FC<PortalPermissionGuardProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const { user, userHasPermission } = useAuth();
  
  // Verify user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Verify user is an end user
  if (user.role !== 'user') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Check for specific permission if required
  if (requiredPermission && !userHasPermission(requiredPermission)) {
    return <Navigate to={PORTAL} replace />;
  }
  
  return <>{children}</>;
};

export default PortalPermissionGuard;
