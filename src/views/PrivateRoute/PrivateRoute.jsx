/* eslint-disable quotes */
/* eslint-disable no-undef */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

const PrivateRoute = ({ children }) => {
  const authUser = ReactSession.get('userData');

  if (!authUser?.user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
