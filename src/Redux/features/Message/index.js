import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    responseMessage: '',
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers:{
        setMessage:(state,action) =>{
            state.responseMessage = action.payload;
        },
        clearMessage:(state,action)=>{
            state.responseMessage = "";
        }
    }
})


export const { setMessage, clearMessage } = messageSlice.actions;

export const fetchSuccess = (responseMessage)=> dispatch =>{
    console.log(responseMessage);
    dispatch(setMessage(responseMessage));
}

export const fetchError = (message) => dispatch =>{
    dispatch(setMessage(message));
}

export default messageSlice.reducer;