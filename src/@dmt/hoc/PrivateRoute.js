import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import Loading from "../common/Loading";
import { LoadingOverlay } from "../../routes/Pages/ComplianceModule/Statutory/LoadingComponent";

const PrivateRoute = ({ permission, children }) => {
  const { userRole } = useSelector(({ role }) => role);
  const location = useLocation();

  const user = localStorage.getItem("token") === null ? false : true;

  

  const permissionsArray = Array.isArray(userRole?.permissions)
    ? userRole?.permissions
    : [userRole?.permissions];

  const hasPermission = user && permissionsArray.includes(permission);

  // check if user has permission and is authenticated
  if (!user) {
   return  <Navigate
      to={`/login?previousUrl=${encodeURIComponent(location.pathname)}`}
      replace
    />;
  }

   // check if userRole and its permissions have been fetched first before setting unauthorized logic.
   if (!userRole || !userRole.permissions) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

 
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
