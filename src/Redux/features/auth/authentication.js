import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/auth";
import { API_URL, API_BASE_URL } from "../../../@dmt/Utils/api";
import jwt_decode from "jwt-decode";
import { REQUEST_STATUS } from "../../../@dmt/Utils/api";
import SimpleCrypto from "simple-crypto-js";

export const login = createAsyncThunk(
  API_BASE_URL + API_URL,
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await authService.Login(email, password);
      if (res.status === REQUEST_STATUS.STATUS_OK) {
        const decodedData = jwt_decode(res.data.token);
        localStorage.setItem("token", res.data.token);
        const secretKey = new SimpleCrypto(decodedData.userId);
        const user = {
          ...decodedData,
          refreshToken: res.data.refreshToken,
          token: res.data.token,
        };
        localStorage.setItem("user", JSON.stringify(secretKey.encrypt(user)));
        localStorage.setItem("id", JSON.stringify(decodedData.userId));
        return user;
      }
      return null;
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);

// describe initiaLstate
const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

// create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = null;
    },
  },
});

export const { setAuthUser, logoutUser } = authSlice.actions;

export const userLogout = () => (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("id");
};

export default authSlice.reducer;
