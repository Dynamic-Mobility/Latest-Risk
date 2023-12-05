import { createSlice } from "@reduxjs/toolkit";
import { rolesApi } from "../../services/Roles";

const initialState = {
    userRole : null,
    roles: []
}


const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers:{
        setUserRole:(state,action) =>{
            state.userRole = action.payload;
        },
        setRoles:(state,action) =>{
            state.roles = action.payload;
        },

    }
})


export const { setUserRole,setRoles } = rolesSlice.actions

export const getUserRole = (userId) => async dispatch =>{
    const data = await rolesApi.fetchUserRoles(dispatch,userId);
    dispatch(setUserRole(data));
}

export const getAllRoles = (companyId) => async dispatch =>{
    const data = await rolesApi.fetchRoles(dispatch,companyId);
    dispatch(setRoles(data));
}



export default rolesSlice.reducer;