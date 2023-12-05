import { createSlice } from "@reduxjs/toolkit";
import { incidentApi } from "../../services/RiskIncident/index.js";


const initialState = {
    incidents: [],
}

const riskIncidentSlice = createSlice({
    name: 'incident',
    initialState,
    reducers: {
        setIncidents: (state,action)=>{
            state.incidents = action.payload;
        }
    }
})

export const { setIncidents } = riskIncidentSlice.actions;
  

export const fetchAllIncidents = () => async dispatch =>{
    const data = await incidentApi.fetchRiskIncident(dispatch)
    dispatch(setIncidents(data));
}


export default riskIncidentSlice.reducer;