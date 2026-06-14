import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    // Pas connecté → retourne une redirection
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default AuthGuard;