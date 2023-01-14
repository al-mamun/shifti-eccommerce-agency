/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import { CartData } from 'context/CartContext';

const PrivateRoute = ({ children }) => {
  // const authUser = ReactSession.get('userData');
  // const { userData, authData } = useContext(CartData);
  // if (!userData?.user) {
  //   authData;
  // }
  const userDataFormSession = sessionStorage.getItem('__react_session__');
  const data = JSON.parse(userDataFormSession);
  const userData = data.userData;

  if (!userData?.user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/signin-simple" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
