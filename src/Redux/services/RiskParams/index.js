import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";

class CategoryApi {
  // UPDATE CATEGORY
  updateCategory(dispatch, data) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(`${API_URL.UPDATE_RISK_CATEGORY}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  creatCategory(dispatch, data) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(`${API_URL.CREATE_RISK_CATEGORY}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateControl(dispatch, data) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(`${API_URL.UPDATE_RISK_CONTROLS}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteCategory(dispatch, data) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(`${API_URL.DELETE_RISK_CATEGORY}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export const categoryApi = new CategoryApi();
