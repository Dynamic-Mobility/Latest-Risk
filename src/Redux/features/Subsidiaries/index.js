import { createSlice } from "@reduxjs/toolkit";
import { subsidiaryApi } from "../../services/Subsidiary";

const initialState = {
  subsidiaries: [],
  departments: [],
  sections: [],
  subSections: [],
  users: [],
  riskFrequencies: [],
  priorities: [],
  currencies: [],
  appetiteTypes: [],
  probabilities: [],
  severities: [],
  lossTypes: [],
  riskControls:[],
};

const subsidiarySlice = createSlice({
  name: "subsidiary",
  initialState,
  reducers: {
    fetchSubsidiary: (state, action) => {
      state.subsidiaries = action.payload;
    },
    fetchDepartment: (state, action) => {
      state.departments = action.payload;
    },
    fetchSection: (state, action) => {
      state.sections = action.payload;
    },
    fetchSubSection: (state, action) => {
      state.subSections = action.payload;
    },
    fetchUser: (state, action) => {
      state.users = action.payload;
    },
    fetchFrequency: (state, action) => {
      state.riskFrequencies = action.payload;
    },
    fetchPriority: (state, action) => {
      state.priorities = action.payload;
    },
    fetchCurrency: (state, action) => {
      state.currencies = action.payload;
    },
    fetchAppetiteTypes: (state, action) => {
      state.appetiteTypes = action.payload;
    },
    fetchRiskProbability: (state, action) => {
      state.probabilities = action.payload;
    },
    fetchSeverities: (state, action) => {
      state.severities = action.payload;
    },
    fetchLossType: (state, action) => {
        state.lossTypes = action.payload;
      },
    fetchRiskControl: (state, action) => {
        state.riskControls = action.payload;
      },
  },
});

export const {
  fetchSubsidiary,
  fetchDepartment,
  fetchSection,
  fetchSubSection,
  fetchUser,
  fetchFrequency,
  fetchPriority,
  fetchCurrency,
  fetchAppetiteTypes,
  fetchRiskProbability,
  fetchSeverities,
  fetchLossType,
  fetchRiskControl,
} = subsidiarySlice.actions;

export const fetchAllSubsidiaries = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchSubsidiaries(dispatch);
  dispatch(fetchSubsidiary(data));
};

export const fetchAllDepartments = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchDepartments(dispatch);
  dispatch(fetchDepartment(data));
};

export const fetchAllSections = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchSections(dispatch);
  dispatch(fetchSection(data));
};

export const fetchAllSubSections = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchSubSections(dispatch);
  dispatch(fetchSubSection(data));
};

export const fetchAllUsers = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchUsers(dispatch);
  dispatch(fetchUser(data));
};

export const fetchAllComplianceFrequencies = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchFrequencies(dispatch);
  dispatch(fetchFrequency(data));
};

export const fetchAllPriorities = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchPriorities(dispatch);
  dispatch(fetchPriority(data));
};

export const fetchAllCurrencies = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchCurrencies(dispatch);
  dispatch(fetchCurrency(data));
};
export const fetchAllAppetiteTypes = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchAppetiteTypes(dispatch);
  dispatch(fetchAppetiteTypes(data));
};
export const fetchAllProbabilities = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchProbability(dispatch);
  dispatch(fetchRiskProbability(data));
};
export const fetchAllSeverities = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchSeverity(dispatch);
  dispatch(fetchSeverities(data));
};
export const fetchAllLossTypes = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchLossTypes(dispatch);
  dispatch(fetchLossType(data));
};
export const fetchAllRiskControls = () => async (dispatch) => {
  const data = await subsidiaryApi.fetchRiskControls(dispatch);
  dispatch(fetchRiskControl(data));
};

export default subsidiarySlice.reducer;
