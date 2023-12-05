import { createSlice } from "@reduxjs/toolkit";
import { riskApi } from "../../services/RiskUniverse";


const initialState = {
    risks: [],
    riskCategories: [],
    subsidiaries: [],
    indicators: [],
    indicatorHistory: [],
    riskOwnerTypes:[]
}

const riskUniverseSlice = createSlice({
    name: 'risk',
    initialState,
    reducers: {
        fetchRisk: (state,action)=>{
            state.risks = action.payload;
            console.log("FEATURES_RISK ",state.risks)
        },
        fetchRiskCategories: (state,action)=>{
            state.riskCategories = action.payload;
        },
        fetchSubsidiaries: (state,action)=>{
            state.subsidiaries = action.payload;
        },
        setRiskIndicators: (state,action)=>{
            state.indicators = action.payload;
        },
        setRiskIndicatorHistory: (state,action)=>{
            state.indicatorHistory = action.payload;
        },
        setRiskOwnerTypes: (state,action)=>{
            state.riskOwnerTypes = action.payload;
        }
    }
})

export const { fetchRisk,fetchRiskCategories,fetchSubsidiaries,setRiskIndicators,setRiskIndicatorHistory } = riskUniverseSlice.actions;


// export const createRiskUniverse = (data) => async dispatch => {
//       const response = await riskApi.addRisk(dispatch,data);
//       console.log("RESPONSE ",response);
//       console.log(response.data);
//   };
  

export const fetchAllRisks = () => async dispatch =>{
    const data = await riskApi.fetchRisks(dispatch)
    console.log("RISK_DATA_DATATAT ",data)
    dispatch(fetchRisk(data));
}

export const fetchAllRiskCategories = () => async dispatch =>{
    const data = await riskApi.fetchCategories(dispatch)
    dispatch(fetchRiskCategories(data));
}

export const fetchAllSubsidiaries = () => async dispatch =>{
    const data = await riskApi.fetchSubsidiaries(dispatch)
    dispatch(fetchSubsidiaries(data));
}

export const fetchAllRiskIndicators = () => async dispatch =>{
    const data = await riskApi.fetchKeyRiskIndicators(dispatch)
    dispatch(setRiskIndicators(data));
}

export const fetchIndicatorHistory = (riskId) => async dispatch =>{
    const data = await riskApi.fetchKeyRiskIndicatorHistory(dispatch,riskId)
    dispatch(setRiskIndicatorHistory(data));
}

export default riskUniverseSlice.reducer;