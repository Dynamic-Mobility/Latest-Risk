import { createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../../services/Compliance/dashboard";


const initialState = {
    complianceSummary: null,
}

const ComplianceDashboardSlice = createSlice({
    name: 'complianceSummary',
    initialState,
    reducers: {
        setComplianceSummary:(state,action)=>{
            state.complianceSummary = action.payload
        }
    }
})

export const { setComplianceSummary } = ComplianceDashboardSlice.actions;

export const fetchComplianceSummaryData = () => async dispatch =>{
    const data = await dashboardApi.fetchComplianceSummary(dispatch)
    dispatch(setComplianceSummary(data));
}

export default ComplianceDashboardSlice.reducer;