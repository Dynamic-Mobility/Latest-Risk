import { createSlice } from "@reduxjs/toolkit";
import { rootCauseApi } from "../../services/RootCauses";


const initialState = {
    rootCauses: [],
}

const rootCauseSlice = createSlice({
    name: 'rootCause',
    initialState,
    reducers: {
        fetchRootCauses: (state,action)=>{
            state.rootCauses = action.payload;
        },
    }
})

export const { fetchRootCauses } = rootCauseSlice.actions;

export const fetchAllRootCauses = () => async dispatch =>{
    const data = await rootCauseApi.fetchRootCauses(dispatch)
    dispatch(fetchRootCauses(data));
}


export default rootCauseSlice.reducer;