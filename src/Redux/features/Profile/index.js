import { createSlice } from "@reduxjs/toolkit";
import { profileApi } from "../../services/profile";


const initialState = {
    profileDetails: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileDetails: (state,action)=>{
            state.profileDetails = action.payload;
        }
    }
})

export const { setProfileDetails } = profileSlice.actions;


export const fetchProfileDetails = () => async dispatch =>{
    const data = await profileApi.fetchUserProfile(dispatch)
    dispatch(setProfileDetails(data));
}


export default profileSlice.reducer;