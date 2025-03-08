
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Persist current location to localStorage for post-login redirect
    if (!loading && !user) {
      localStorage.setItem('redirectAfterLogin', location.pathname);
    }
  }, [user, loading, location]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <div>Unauthorized</div>; // Or redirect to an unauthorized page
  }

  return <>{children}</>;
};
