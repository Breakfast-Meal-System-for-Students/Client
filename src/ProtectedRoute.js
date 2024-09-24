import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useAuth();

  // Kiểm tra xem người dùng có đăng nhập và có quyền truy cập không
  if (!user || user.role < requiredRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;