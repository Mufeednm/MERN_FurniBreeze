import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const location = useLocation();
  const isAdminAuthenticated = !!localStorage.getItem('adminToken');

  // Check if the route starts with '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Effect to clear adminToken when leaving admin routes
  useEffect(() => {
    return () => {
      // Clear adminToken when leaving admin routes
      if (!isAdminRoute && isAdminAuthenticated) {
        localStorage.removeItem('adminToken');
      }
    };
  }, [isAdminRoute, isAdminAuthenticated]);

  // Check if it's an admin route and token is not present, then navigate to AdminLogin
  if (isAdminRoute && !isAdminAuthenticated) {
    return <Navigate to="/AdminLogin" />;
  }

  // If admin token is present, render the Element with props
  if (isAdminAuthenticated) {
    return <Element {...rest} />;
  }

  // If not an admin route and not authenticated, render default Navigate
  return <Navigate to="/" />;
};

export default PrivateRoute;
