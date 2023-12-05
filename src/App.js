import React, { useEffect } from "react";
import "./App.css";
import ForgotPassword from "./routes/Auth/ForgotPassword";
import Login from "./routes/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDashboard from "./routes/Dashboard/MainDashboard";
import RiskTable from "./routes/RiskModule/RiskTable";
import CreateRisk from "./routes/RiskModule/CreateRisk/CreateNewRisk";
import SubCompliance from "./routes/Dashboard/compliance/subCompliance";
import StatutoryComplianceTable from "./routes/Pages/ComplianceModule/Statutory/StatutoryComplianceTable";
import IncidentManagement from "./routes/Dashboard/Risk/IncidentManagement";
import RiskManagement from "./routes/Dashboard/Risk/RiskManagement";
import IncidentTable from "./routes/IncidentModule/IncidentTable";
import RiskIndicators from "./routes/RiskModule/RiskIndicators";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./@dmt/Utils/api";
import { getUserRole } from "./Redux/features/Roles";
import PrivateRoute from "./@dmt/hoc/PrivateRoute";
import { PERMISSIONS } from "./@dmt/constants/RoleConstants";
import { Navigate } from "react-router-dom";
import Departments from "./routes/Pages/Ogranization/Departments";
import Subsidiary from "./routes/Pages/Ogranization/Subsidiaries";
import Sections from "./routes/Pages/Ogranization/Sections";
import Subsections from "./routes/Pages/Ogranization/SubSections";
import Users from "./routes/Pages/Users.js";
import Roles from "./routes/Pages/Roles";
import ComplianceConent from "./routes/Pages/ComplianceModule/Statutory/AddEditStatutoryCompliance";
import Success from "./@dmt/common/Success";
import EnterpriseContent from "./routes/Pages/ComplianceModule/Enterprise/AddEditEnterpriseCompliance";
import EnterpriseComplianceTable from "./routes/Pages/ComplianceModule/Enterprise/EnterpriseComplianceTable";
import UsersTable from "./routes/Pages/Users.js/UsersTable";
import jwtDecode from "jwt-decode";
import RoleBasedGuard from "./@dmt/hoc";
import RiskIndicatorHistory from "./routes/RiskModule/RiskIndicatorHistory";
import CreateIncident from "./routes/IncidentModule/CreateIncident";
import PolicyProcedure from "./routes/Pages/ComplianceModule/Policy-procedure";
import CreatePolicy from "./routes/Pages/ComplianceModule/Policy-procedure/CreatePolicy";
import CreateProcedure from "./routes/Pages/ComplianceModule/Policy-procedure/CreateProcedure";
import GraphDashboard from "./routes/Dashboard/GraphDashboard";
import RouterComponent from "./PageRoutes/router";

function App() {
  const dispatch = useDispatch();
  const user = currentUser();
  
  const token = localStorage.getItem("token");
 
  const { userRole } = useSelector(({ role }) => role);


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(getUserRole(decodedToken?.userId));
    }
  }, [token]);

  return (
    <>
      <Router>
        <RouterComponent />
      </Router>
    </>
  );
}
export default App;
