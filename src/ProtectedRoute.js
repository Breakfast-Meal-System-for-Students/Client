import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

function ProtectedRoute({ element: Element, requiredRole }) {
  const { user } = useAuth();
  console.log("~ user", user)
  const location = useLocation();
  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Element />;
}

export default ProtectedRoute;
