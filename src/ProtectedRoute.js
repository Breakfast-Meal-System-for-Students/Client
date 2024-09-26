import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useAuth();

  if (!user || user.role < requiredRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;