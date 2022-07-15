// Author: Deep Adeshra (dp974154@dal.ca)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isUserLoggedIn } from './firebase';

const PrivateRoute = () => {
  return (
    isUserLoggedIn() ? <Outlet /> : <Navigate to="/login" />
  );
};

const PublicRoute = ({ restrictedToPublicOnly }) => {
  return (
    isUserLoggedIn() && restrictedToPublicOnly ? <Navigate to="/show_products" /> : <Outlet />
  );
};


export { PrivateRoute, PublicRoute };
