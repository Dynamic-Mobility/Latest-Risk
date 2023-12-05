import { createSlice } from "@reduxjs/toolkit";
import { enterpriseApi } from "../../services/Compliance/enterprise";


const initialState = {
    enterpriseComplianceData: [],
    enterpriseComplianceSub: [],
}

const enterpriseComplianceSlice = createSlice({
    name: 'enterprise',
    initialState,
    reducers: {
        fetchEnterprise: (state,action)=>{
            state.enterpriseComplianceData = action.payload;
        },
        setEnterpriseSub: (state,action)=>{
            state.enterpriseComplianceSub = action.payload;
        },
    }
})

export const { fetchEnterprise,setEnterpriseSub } = enterpriseComplianceSlice.actions;

export const fetchAllEnterpriseCompliance = () => async dispatch =>{
    const data = await enterpriseApi.fetchEnterpriseCompliance(dispatch)
    dispatch(fetchEnterprise(data));
}

export const getEnterpriseComplianceSub = (id) => async dispatch =>{
    const data = await enterpriseApi.fetchSubEnterpriseCompliances(dispatch,id)
    dispatch(setEnterpriseSub(data));
}

export default enterpriseComplianceSlice.reducer;