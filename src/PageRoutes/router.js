import React from "react";
import { pagesData } from "./index";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../@dmt/hoc/PrivateRoute";
import { PERMISSIONS } from "./permissions";
import { useNavigate } from "react-router-dom";


const RouterComponent = () => {
  const navigate = useNavigate();
  const pageRoutes = pagesData.map(({ path, title, element, privateRoute,permission }) => {
    if (privateRoute) {
      return (
        <Route key={title} element={<PrivateRoute permission={permission} navigate={navigate} />}>
          <Route path={`/${path}`} element={element} />;
        </Route>
      );
    }
    return <Route key={title} path={`/${path}`} element={element} />;
  });
  return (
    <>
      <Routes>{pageRoutes}</Routes>
    </>
  );
};

export default RouterComponent;
