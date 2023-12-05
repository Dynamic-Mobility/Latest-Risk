import { API_URL,API_BASE_URL } from "../../../@dmt/Utils/api";
import axios from "axios";
import SimpleCrypto from "simple-crypto-js"
import useAxios from "../axiosInstance";


const Login = (email,password) =>{
    const secretKey = new SimpleCrypto(email);
    const encodedPassword = secretKey.encrypt(password);
    const response = axios.post(API_BASE_URL + API_URL.LOGIN, {
        email:email,
        password: encodedPassword
    })
    return response;
}


const forgotPassword = (dispatch, data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(API_URL.FORGOT_PASSWORD, data)
        .then((res) => {
          resolve(res.data);
          console.log("RES ", res);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  
export const authService = {
    Login,
    forgotPassword
}