import axios from "axios";
import { API_BASE_URL, API_URL, currentUser } from "../../@dmt/Utils/api";
import jwt_decode from "jwt-decode";
import dayjs from "moment";
import SimpleCrypto from "simple-crypto-js";
import { REQUEST_STATUS } from "../../@dmt/Utils/api";
import { setAuthUser, logoutUser } from "../features/auth/authentication";

const useAxios = (dispatch) => {
  // Pick current user
  const authUser = currentUser();
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const userDetails = jwt_decode(authUser?.token);
    const isExpired = dayjs.unix(userDetails.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }

    // Refresh token
    try {
      const response = await axios.post(
        `${API_BASE_URL}${API_URL.REFRESH_TOKEN}`,
        {
          token: authUser?.token,
          tenant: authUser.tenant,
          refreshToken: authUser.refreshToken,
        }
      );

      if (response.status === REQUEST_STATUS.STATUS_OK) {
        const updatedDetails = jwt_decode(response.data.token);
        const secretKey = new SimpleCrypto(updatedDetails.userId);
        const user = {
          ...updatedDetails,
          refreshToken: response.data.refreshToken,
          token: response.data.token,
        };
        dispatch(setAuthUser(user));
        localStorage.setItem("user", JSON.stringify(secretKey.encrypt(user)));
        localStorage.setItem("id", JSON.stringify(updatedDetails.userId));
        req.headers.Authorization = `Bearer ${response.data.token}`;
      }

      return req;
    } catch (error) {
      // Handle refresh token error
      // You can redirect the user to the login page or perform any other necessary actions
      dispatch(logoutUser());
      throw error;
    }
  });

  // Axios response
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response) {
        // Access Token was expired
        if (err.response?.status === REQUEST_STATUS.UNAUTHORIZED) {
          dispatch(logoutUser());
        }
        if (err.response?.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxios;
