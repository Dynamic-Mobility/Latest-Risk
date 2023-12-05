import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";

class ProbabilityApi {
  // UPDATE RISK
  updateProbability(dispatch, data) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(`${API_URL.UPDATE_PROBABILITY}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateLossType(dispatch, data) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(`${API_URL.UPDATE_LOSS_TYPES}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}

export const probabilityApi = new ProbabilityApi();
