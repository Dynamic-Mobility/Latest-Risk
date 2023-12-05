import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../services/Users";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  fetchUsers
} = userSlice.actions;


export const fetchAllUsers = () => async (dispatch) => {
  const data = await usersApi.fetchUsers(dispatch);
  dispatch(fetchUsers(data));
};

export default userSlice.reducer;
