import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={props =>
        isAuthenticated ? (
          <Element {...props} />
        ) : (
          <Navigate to="/login" state={{ from: props.location }} />
        )
      }
    />
  );
};

export default PrivateRoute;
