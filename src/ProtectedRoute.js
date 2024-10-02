import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const  {user}  = useAuth();
  console.log(requiredRole)
  console.log(user)
  if (!user || !user.role.includes(user.role)  ) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;