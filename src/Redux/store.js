import { configureStore } from "@reduxjs/toolkit";
import authReducer from '././features/auth/authentication'
import rolesReducer from '././features/Roles/index'
import subsidiaryReducer from '././features/Subsidiaries'
import riskUniverseReducer from '././features/RiskUniverse'
import rootCauseReducer from '././features/RootCauses'
import complianceReducer from './features/Compliance/statutory'
import enterpriseReducer from './features/Compliance/enterprise'
import statutoryReducer from './features/Compliance/statutory'
import messageReducer from '././features/Message'
import riskOwnerReducer from './features/RiskOwners'
import userReducer from './features/Users'
import loadingReducer from './features/loading';
import incidentReducer from './features/RiskIncident'
import complianceDashboardReducer from './features/Compliance/dashboard';
import profileReducer from './features/Profile';
import riskDashboardReducer from './features/RiskUniverse/dashboard'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        role: rolesReducer,
        subsidiary: subsidiaryReducer,
        risk: riskUniverseReducer,
        incident: incidentReducer,
        message: messageReducer,
        rootCause: rootCauseReducer,
        enterprise: enterpriseReducer,
        statutory: statutoryReducer,
        riskOwner: riskOwnerReducer,
        user: userReducer,
        loading: loadingReducer,
        complianceSummary: complianceDashboardReducer,
        riskDashboard:riskDashboardReducer
    }
})

