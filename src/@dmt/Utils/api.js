import jwtDecode from "jwt-decode";
import SimpleCrypto from "simple-crypto-js";
// const HOST = '';
const HOST = 'http://localhost:5002';


export const API_BASE_URL = HOST !== '' ? HOST : window.location.origin;

export const currentUser = () => {
  const userId = localStorage.getItem('id') !== undefined ? JSON.parse(localStorage.getItem('id')) : null;
  const user = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null;
  if (userId !== null && user !== null) {
    const secretKey = new SimpleCrypto(userId);
    return secretKey.decrypt(user)
  }
  return null;
};

export const API_URL = {
    //----------------Account-----------------//
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  FETCH_USER_ROLE: '/api/auth/user-permissions',
  FORGOT_PASSWORD: '/api/auth/forgot-password',

  //------------------Users------------------//
  FETCH_USERS: '/api/users/',
  CREATE_USER: '/api/users/create',
  UPDATE_USER: '/api/users/update',
  DELETE_USER: '/api/users/delete',
  RESET_PASSWORD: '/api/users/reset-password',

  //------------------Subsidiaries------------//
  FETCH_SUBSIDIARIES: '/api/organization/subsidiaries/',
  CREATE_SUBSIDIARY: '/api/organization/subsidiaries/create',
  UPDATE_SUBSIDIARY: '/api/organization/subsidiaries/update',

  //------------------Departments------------//
  FETCH_DEPARTMENTS: '/api/organization/departments/',
  CREATE_DEPARTMENT: '/api/organization/departments/create',
  UPDATE_DEPARTMENT: '/api/organization/departments/update',

  //-------------------Sections---------------//
  FETCH_SECTIONS: '/api/organization/sections/',
  CREATE_SECTION: '/api/organization/sections/create',
  UPDATE_SECTIONS: '/api/organization/sections/update',

  //-------------------Sub-Sections---------------//
  FETCH_SUB_SECTIONS: '/api/organization/sub-sections/',
  CREATE_SUB_SECTION: '/api/organization/sub-sections/create',
  UPDATE_SUB_SECTIONS: '/api/organization/sub-sections/update',

  //--------------------Risk Categories ------------//
  FETCH_RISK_CATEGORIES: '/api/risk-params/risk-categories/',
  CREATE_RISK_CATEGORY: '/api/risk-params/risk-categories/create',
  UPDATE_RISK_CATEGORY: '/api/risk-params/risk-categories/update',
  DELETE_RISK_CATEGORY: '/api/risk-params/risk-categories/delete',

  //--------------------Risk Controls ------------//
  FETCH_RISK_CONTROLS: '/api/risk-params/risk-controls/',
  CREATE_RISK_CONTROLS: '/api/risk-params/risk-controls/create',
  UPDATE_RISK_CONTROLS: '/api/risk-params/risk-controls/update',

  //--------------------Risk Probability ------------//
  FETCH_PROBABILITY: '/api/risk-params/risk-probability/',
  CREATE_PROBABILITY: '/api/risk-params/risk-probability/create',
  UPDATE_PROBABILITY: '/api/risk-params/risk-probability/update',

  //--------------------Risk Severity ------------//
  FETCH_SEVERITY: '/api/risk-params/risk-severity/',
  CREATE_SEVERITY: '/api/risk-params/risk-severity/create',
  UPDATE_SEVERITY: '/api/risk-params/risk-severity/update',

  //-------------------Loss Types ------------//
  FETCH_LOSS_TYPES: '/api/risk-params/loss-types/',
  CREATE_LOSS_TYPES: '/api/risk-params/loss-types/create',
  UPDATE_LOSS_TYPES: '/api/risk-params/loss-types/update',

  //-------------------Matrix-------------------//
  FETCH_MATRIX: '/api/risk-params/matrix',
  FETCH_ALL_MATRIX: '/api/risk-params/matrix/all',
  UPDATE_MATRIX: '/api/risk-params/matrix/update',

  //------------------- Roles -----------------//
  FETCH_PERMISSIONS: 'api/roles/actions',
  FETCH_ROLES: 'api/roles',
  CREATE_ROLES: 'api/roles/create',
  UPDATE_ROLES: 'api/roles/update',

  //------------------- Risk Universe -----------------//
  FETCH_RISKS: 'api/risk/risk-universe',
  FETCH_RISK_APPROVALS: 'api/risk/risk-universe/approvals',
  FETCH_RISK: 'api/risk/risk-universe/one',
  FETCH_UPLOADEDDOCS: 'api/risk/risk-universe/uploadeddocs',
  CREATE_RISK: 'api/risk/risk-universe/create',
  UPDATE_RISK: 'api/risk/risk-universe/update',
  APPROVE_RISK : 'api/risk/risk-universe/approve',
  DELETE_RISK: 'api/risk/risk-universe/delete',
  ASSESS_RISK: 'api/risk/risk-universe/assess',
  CALCULATE_RESIDUAL: 'api/risk/risk-universe/calculate',
  ASSESS_RISK : 'api/risk/risk-universe/assess',
  DOWNLOAD_TEMPLATE: 'api/risk/risk-universe/template',
  UPLOAD_TEMPLATE: 'api/risk/risk-universe/upload',
  UPDATE_UPLOADED_RISKS: 'api/risk/risk-universe/updatedUploads',
  UNCREATED_DOCS: 'api/risk/risk-universe/uncreated',
  CREATE_BULK_RISK: 'api/risk/risk-universe/import',


    //------------------- Risk Incident -----------------//
    CREATE_INCIDENT: 'api/risk/risk-incident/create',
    UPDATE_INCIDENT: 'api/risk/risk-incident/update',
    FETCH_INCIDENT: 'api/risk/risk-incident',
    DELETE_INCIDENT: 'api/risk/risk-incident/delete',
    

   //------------------- Risk Indicator -----------------//
   FETCH_INDICATOR: 'api/risk/risk-indicator/',
   INDICATOR_HISTORY: 'api/risk/risk-indicator/history',
   EDIT_RISK_INDICATOR: 'api/risk/risk-indicator/edit',
   

  //----------------------Root Causes ----------------- //
  FETCH_ROOT_CAUSES: 'api/risk/root-causes',
  CREATE_ROOT_CAUSE: 'api/risk/root-causes/create',
  UPDATE_ROOT_CAUSE: 'api/risk/root-causes/update',

  //----------------------Risk Owners ----------------- //
  FETCH_RISK_OWNERS: 'api/risk/risk-owner',
  FETCH_RISK_OWNERS_TYPES: 'api/risk/risk-owner/types',
  CREATE_RISK_OWNER: 'api/risk/risk-owner/create',
  UPDATE_RISK_OWNER: 'api/risk/risk-owner/update',

  //-------------------- Legal Compliance --------------------------//
  FETCH_LEGAL: '/api/compliance/legal/',
  CREATE_LEGAL: '/api/compliance/legal/create',
  UPDATE_LEGAL: '/api/compliance/legal/update',


  //-------------------- User Profile --------------------------//
  FETCH_PROFILE_DETAILS: '/api/profile',
  EDIT_PROFILE_DETAILS: '/api/profile/update',


  //-------------------- Enterprise Compliance ---------------------//
  FETCH_ENTERPRISE: '/api/compliance/enterprise/',
  CREATE_ENTERPRISE: '/api/compliance/enterprise/create',
  UPDATE_ENTERPRISE: '/api/compliance/enterprise/update',
  FETCH_ENTERPRISE_ALL: 'api/compliance/enterprise/main',
  FETCH_ENTERPRISE_SUB: '/api/compliance/enterprise/sub',
  DELETE_ENTERPRISE: '/api/compliance/enterprise/delete',
  COMPLY_ENTERPRISE: '/api/compliance/enterprise/comply',
  APPROVE_ENTERPRISE:'/api/compliance/enterprise/approve',



  //-------------------- Statutory Compliance ---------------------//
  FETCH_STATUTORY: '/api/compliance/statutory/',
  // FETCH_STATUTORY_MAIN: '/api/compliance/statutory/main/all',
  FETCH_STATUTORY_SUB: '/api/compliance/statutory/sub',
  CREATE_STATUTORY: '/api/compliance/statutory/create',
  UPDATE_STATUTORY: '/api/compliance/statutory/update',
  DELETE_STATUTORY: '/api/compliance/statutory/delete',
  APPROVE_COMPLIANCE:'/api/compliance/statutory/approve',
  COMPLY_STATUTORY:'/api/compliance/statutory/comply',
  FETCH_APPROVALS: '/api/compliance/statutory/approvals',
  FETCH_COMPLIANCES: '/api/compliance/statutory/compliances',
  FETCH_HISTORY: '/api/compliance/statutory/history',
  FETCH_MAIN_ALL: 'api/compliance/statutory/main',

  //---------------------- Utils/Helpers ---------------------------//
  FETCH_RISK_FREQUENCIES: '/api/utils/frequency/risk',
  FETCH_COMPLIANCE_FREQUENCIES: '/api/utils/frequency/compliance',
  FETCH_COUNTRIES: 'api/utils/countries',
  FETCH_CURRENCIES: 'api/utils/currencies',
  FETCH_CITIES: 'api/utils/cities',
  FETCH_CASE_TYPES: 'api/utils/case-types',
  FETCH_COMPLIANCE_PRIORITIES: 'api/utils/priorities',
  FETCH_APPETITE_TYPES: 'api/utils/risk-appetite-types',


  
  //-------------------- DASHBOARD APIS ---------------------//
  GET_UNIVERSE_CRITERIA: '/api/dashboard/criteria/',
  GET_RISK_SUMMARY: '/api/dashboard/risksummary/',
  GET_COMPLIANCE_SUMMARY: '/api/dashboard/compliancesummary',
  GET_DASHBOARD_SUMMARY: '/api/dashboard/dashboard',
}

export const REQUEST_STATUS = {
    STATUS_OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    PERMISSION_DENIED: 101,
  };