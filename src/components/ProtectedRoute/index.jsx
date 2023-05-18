import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component, isAuthenticated, ...rest }) => {
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
