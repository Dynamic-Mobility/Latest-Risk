import { createSlice } from "@reduxjs/toolkit";
import { riskDashboardApi } from "../../../services/RiskUniverse/dashboard";


const initialState = {
    selectedCriteria: null,
    criteriaResponse: [],
    riskSummary: null,
}

const riskDashboardSlice = createSlice({
    name: 'risk-dashboard',
    initialState,
    reducers:{
        setSelectedCriteria: (state,action) =>{
            state.selectedCriteria = action.payload;
        },
        setCretiriaResponse:(state,action)=>{
            state.criteriaResponse = action.payload;
        },
        setRiskSummary:(state,action)=>{
            state.riskSummary = action.payload
        }
    }
})


export const { setSelectedCriteria,setCretiriaResponse,setRiskSummary } = riskDashboardSlice.actions;


export const fetchCriteria = (data) => async dispatch =>{
    const res = await riskDashboardApi.fetchUniverseCriteria(dispatch,data)
    dispatch(setCretiriaResponse(res))
}

export const fetchRiskSummaryData = () => async dispatch =>{
    const data = await riskDashboardApi.fetchRiskSummary(dispatch)
    dispatch(setRiskSummary(data));
}


export default riskDashboardSlice.reducer;