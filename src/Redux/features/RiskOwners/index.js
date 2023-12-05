import { createSlice } from "@reduxjs/toolkit";
import { riskOwnerApi } from "../../services/RiskOwners";

const initialState = {
  riskOwners: [],
  riskOwnerTypes: [],
};

const riskOwnerSlice = createSlice({
  name: "riskOwner",
  initialState,
  reducers: {
    fetchRiskOwner: (state, action) => {
      state.riskOwners = action.payload;
    },
    setRiskOwnerTypes: (state, action) => {
      state.riskOwnerTypes = action.payload;
    },
  },
});

export const {
  fetchRiskOwner,
  setRiskOwnerTypes,
} = riskOwnerSlice.actions;

export const fetchAllRiskOwners = () => async (dispatch) => {
  const data = await riskOwnerApi.fetchRiskOwners(dispatch);
  dispatch(fetchRiskOwner(data));
};

export const fetchAllRiskOwnerTypes = () => async (dispatch) => {
  const data = await riskOwnerApi.fetchRiskOwnerTypes(dispatch);
  dispatch(setRiskOwnerTypes(data));
};

export default riskOwnerSlice.reducer;
