import ForgotPassword from "../routes/Auth/ForgotPassword"
import Login from "../routes/Auth/Login"
import GraphDashboard from "../routes/Dashboard/GraphDashboard"
import MainDashboard from "../routes/Dashboard/MainDashboard"
import IncidentManagement from "../routes/Dashboard/Risk/IncidentManagement"
import RiskManagement from "../routes/Dashboard/Risk/RiskManagement"
import SubCompliance from "../routes/Dashboard/compliance/subCompliance"
import CreateIncident from "../routes/IncidentModule/CreateIncident"
import IncidentTable from "../routes/IncidentModule/IncidentTable"
import EnterpriseContent from "../routes/Pages/ComplianceModule/Enterprise/AddEditEnterpriseCompliance"
import EnterpriseComplianceTable from "../routes/Pages/ComplianceModule/Enterprise/EnterpriseComplianceTable"
import PolicyProcedure from "../routes/Pages/ComplianceModule/Policy-procedure"
import CreatePolicy from "../routes/Pages/ComplianceModule/Policy-procedure/CreatePolicy"
import CreateProcedure from "../routes/Pages/ComplianceModule/Policy-procedure/CreateProcedure"
import ComplianceConent from "../routes/Pages/ComplianceModule/Statutory/AddEditStatutoryCompliance"
import StatutoryComplianceTable from "../routes/Pages/ComplianceModule/Statutory/StatutoryComplianceTable"
import Users from "../routes/Pages/Users.js/index.js"
import UsersTable from "../routes/Pages/Users.js/UsersTable"
import CreateRisk from "../routes/RiskModule/CreateRisk/CreateNewRisk"
import RiskIndicatorHistory from "../routes/RiskModule/RiskIndicatorHistory"
import RiskIndicators from "../routes/RiskModule/RiskIndicators"
import RiskTable from "../routes/RiskModule/RiskTable"
import { PERMISSIONS } from "./permissions"
import Forbidden from "../routes/Forbidden"
import Profile from "../routes/Pages/Users.js/Profile"
import RiskActionsTable from "../routes/RiskModule/RiskActions"
import Compliance from "../routes/Dashboard/GraphDashboard/compliance"
import RiskDashboard from "../routes/Dashboard/GraphDashboard/RiskDashboard"
import IncidentDashboard from "../routes/Dashboard/GraphDashboard/IncidentDashboard"
import ProfileSettings from "../routes/Dashboard/ProfileSettings"
import RiskParameters from "../routes/RiskModule/RiskParameters"
import ActionableIncident from "../routes/Dashboard/Risk/ActionableIncident"
import LegalComplianceTable from "../routes/Pages/ComplianceModule/LegalCompliance/LegalTable"
import CreatLegalCompliance from "../routes/Pages/ComplianceModule/LegalCompliance/CreatLegalCompliance"
import RiskReport from "../routes/Dashboard/Risk/RiskReport"
import ComplianceReport from "../routes/Dashboard/compliance/ComplianceReport"
import CreateRiskReport from "../routes/Dashboard/Risk/RiskReport/CreateRiskReport"
import CreateComplianceReport from "../routes/Dashboard/compliance/CreateComplianceReport"
import Organization from "../routes/Pages/Ogranization"
import Subsidiary from "../routes/Pages/Ogranization/Subsidiaries"
import Departments from "../routes/Pages/Ogranization/Departments"
import Sections from "../routes/Pages/Ogranization/Sections"
import Subsections from "../routes/Pages/Ogranization/SubSections"


export const pagesData = [
    {
        path: 'forgot-password',
        element: <ForgotPassword />,
        title: 'forgot password',
    },
    {
        path: 'login',
        element: <Login />,
        title: 'login',
    },
    {
        path: 'profile',
        element: <Profile />,
        title: 'profile',
    },
    {
        path: 'unauthorized',
        element: <Forbidden />,
        title: 'unauthorized',
    },
    {
        path: '',
        element: <MainDashboard />,
        title: 'home',
        privateRoute: true,
        permission: PERMISSIONS.USER.VIEW
    },
    {
        path: 'compliance-dashboard',
        element: <Compliance />,
        title: 'compliance-dashboard',
        privateRoute: true,
        permission: PERMISSIONS.USER.VIEW
    },
    {
        path: 'risk-dashboard',
        element: <RiskDashboard />,
        title: 'risk-dashboard',
        privateRoute: true,
        permission: PERMISSIONS.USER.VIEW
    },
    {
        path: 'incident-dashboard',
        element: <IncidentDashboard />,
        title: 'incident-dashboard',
        privateRoute: true,
        permission: PERMISSIONS.USER.VIEW
    },
    {
        path: 'users-table',
        element: <UsersTable />,
        title: 'users table',
        privateRoute: true,
        permission: PERMISSIONS.USER.ACCESS
    },
    {
        path: 'create-user',
        element: <Users />,
        title: 'users',
        privateRoute: true,
        permission: PERMISSIONS.USER.CREATE
    },
    {
        path: 'users-table/update-user',
        element: <Users />,
        title: 'edit users',
        privateRoute: true,
        permission: PERMISSIONS.USER.UPDATE
    },
    {
        path: 'risk-management',
        element: <RiskManagement />,
        title: 'Risk Management',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'risk-actions',
        element: <RiskActionsTable />,
        title: 'Risk Actions',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'risk-report',
        element: <RiskReport />,
        title: 'Risk Report',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'create-risk-report',
        element: <CreateRiskReport />,
        title: 'Create Risk Report',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'compliance-management',
        element: <SubCompliance />,
        title: 'sub compliance',
        privateRoute: true,
        permission: PERMISSIONS.STATUTORY_COMPLIANCE.VIEW
    },
    {
        path: 'compliance-report',
        element: <ComplianceReport />,
        title: 'Compliance Report',
        privateRoute: true,
        permission: PERMISSIONS.STATUTORY_COMPLIANCE.VIEW
    },
    {
        path: 'create-compliance-report',
        element: <CreateComplianceReport />,
        title: 'Create Compliance Report',
        privateRoute: true,
        permission: PERMISSIONS.STATUTORY_COMPLIANCE.ACCESS
    },
    {
        path: 'policy-procedure',
        element: <PolicyProcedure />,
        title: 'policy procedure',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'create-policy',
        element: <CreatePolicy />,
        title: 'policy',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'create-procedure',
        element: <CreateProcedure />,
        title: 'procedure',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'incident-management',
        element: <IncidentManagement />,
        title: 'incident management',
        privateRoute: true,
        permission: PERMISSIONS.RISK_INCIDENT.ACCESS
    },
    {
        path: 'actionable-incident',
        element: <ActionableIncident />,
        title: 'actionable incident',
        privateRoute: true,
        permission: PERMISSIONS.RISK_INCIDENT.ACCESS
    },
    {
        path: 'incident-table',
        element: <IncidentTable />,
        title: 'incident table',
        privateRoute: true,
        permission: PERMISSIONS.RISK_INCIDENT.ACCESS
    },
    {
        path: 'create-incident',
        element: <CreateIncident />,
        title: 'create incident',
        privateRoute: true,
        permission: PERMISSIONS.RISK_INCIDENT.CREATE
    },
    {
        path: 'incident-table/update-incident',
        element: <CreateIncident />,
        title: 'update incident',
        privateRoute: true,
        permission: PERMISSIONS.RISK_INCIDENT.UPDATE
    },
    {
        path: 'risk-table',
        element: <RiskTable />,
        title: 'risk table',
        privateRoute: true,
        permission:PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'risk-indicators',
        element: <RiskIndicators />,
        title: 'risk indicators',
        privateRoute: true,
        permission:PERMISSIONS.RISK_INDICATOR.VIEW
    },
    {
        path: 'risk-indicators/history',
        element: <RiskIndicatorHistory />,
        title: 'risk indicator history',
        privateRoute: true,
        permission:PERMISSIONS.RISK_INDICATOR.VIEW
    },
    {
        path: 'statutory-compliance',
        element: <StatutoryComplianceTable />,
        title: 'statutory compliance',
        privateRoute: true,
        permission:PERMISSIONS.STATUTORY_COMPLIANCE.VIEW
    },
    {
        path: 'createStatutory',
        element: <ComplianceConent />,
        title: 'create statutory',
        privateRoute: true,
        permission:PERMISSIONS.STATUTORY_COMPLIANCE.CREATE
    },
    {
        path: 'statutory-compliance/update-statutory',
        element: <ComplianceConent />,
        title: 'update statutory',
        privateRoute: true,
        permission:PERMISSIONS.STATUTORY_COMPLIANCE.UPDATE
    },
    {
        path: 'create-risk',
        element: <CreateRisk />,
        title: 'create risk',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.CREATE
    },
    {
        path: 'risk-table/update-risk',
        element: <CreateRisk />,
        title: 'update risk',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.UPDATE
    },
    {
        path: 'enterprise-compliance',
        element: <EnterpriseComplianceTable />,
        title: 'enterprise compliance',
        privateRoute: true,
        permission: PERMISSIONS.ENTERPRISE_COMPLIANCE.VIEW
    },
    {
        path: 'createEnterprise',
        element: <EnterpriseContent />,
        title: 'create enterprise',
        privateRoute: true,
        permission: PERMISSIONS.ENTERPRISE_COMPLIANCE.CREATE
    },
    {
        path: 'legal-compliance',
        element: <LegalComplianceTable />,
        title: 'legal compliance',
        privateRoute: true,
        permission: PERMISSIONS.ENTERPRISE_COMPLIANCE.CREATE
    },
    {
        path: 'create-legal-compliance',
        element: <CreatLegalCompliance />,
        title: 'legal compliance',
        privateRoute: true,
        permission: PERMISSIONS.ENTERPRISE_COMPLIANCE.CREATE
    },
    {
        path: 'enterprise-compliance/update-enterprise',
        element: <EnterpriseContent />,
        title: 'update enterprise',
        privateRoute: true,
        permission: PERMISSIONS.ENTERPRISE_COMPLIANCE.UPDATE
    },
    {
        path: 'graph-dashboard',
        element: <GraphDashboard />,
        title: 'graph dashboard',
        privateRoute: true,
        permission: PERMISSIONS.DASHBOARD.ACCESS
    },
    {
        path: 'profile-settings',
        element: <ProfileSettings />,
        title: 'profile settings',
        privateRoute: true,
        permission: PERMISSIONS.DASHBOARD.ACCESS
    },
    {
        path: 'risk-parameters',
        element: <RiskParameters />,
        title: 'risk parameters',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'organization',
        element: <Organization />,
        title: 'organization',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'subsidiary',
        element: <Subsidiary />,
        title: 'subsidiary',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'departments',
        element: <Departments />,
        title: 'departments',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'sections',
        element: <Sections />,
        title: 'sections',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
    {
        path: 'sub-sections',
        element: <Subsections />,
        title: 'sub-sections',
        privateRoute: true,
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS
    },
]