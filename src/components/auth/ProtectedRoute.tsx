
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
  allowEndUser?: boolean; // Whether end users can access this route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = "/login",
  allowEndUser = false
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Redirect end users if they try to access staff-only routes
  useEffect(() => {
    if (user && user.role === 'user' && !allowEndUser && !location.pathname.startsWith('/portal')) {
      console.log('End user attempting to access staff route, redirecting to portal');
      window.location.href = '/portal';
    }
  }, [user, location, allowEndUser]);

  if (loading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If user is an end user and trying to access non-portal routes
  if (user.role === 'user' && !allowEndUser && !location.pathname.startsWith('/portal')) {
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
