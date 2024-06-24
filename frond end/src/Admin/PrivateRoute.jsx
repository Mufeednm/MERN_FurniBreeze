import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ element: Component,... rest }) => {
  const isAdminAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdminAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/AdminLogin" />
        )
      }
    />
  );
};

export default PrivateRoute;
