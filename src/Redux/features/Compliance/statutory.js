import { createSlice } from "@reduxjs/toolkit";
import { complianceApi } from "../../services/Compliance/statutory";


const initialState = {
    statutoryMainComplianceData: [],
    statutoryComplianceSub: [],
    selectedStatutory: null
}

const complianceSlice = createSlice({
    name: 'statutory',
    initialState,
    reducers: {
        fetchStatutoryCompliance: (state,action)=>{
            state.statutoryMainComplianceData = action.payload;
        },
        setStatutorySubData: (state,action)=>{
            state.statutoryComplianceSub = action.payload;
        },
        setSelectedStatutory:(state,action)=>{
            state.selectedStatutory = action.payload
        }
    }
})

export const { fetchStatutoryCompliance, setStatutorySubData,setSelectedStatutory } = complianceSlice.actions;

export const fetchStatutoryComplianceData = () => async dispatch =>{
    const data = await complianceApi.fetchMainStatutoryCompliance(dispatch)
    dispatch(fetchStatutoryCompliance(data));
}

export const getStatutoryComplianceSub = (id) => async dispatch =>{
    const data = await complianceApi.fetchSubStatutoryCompliances(dispatch,id)
    dispatch(setStatutorySubData(data));
}

export default complianceSlice.reducer;