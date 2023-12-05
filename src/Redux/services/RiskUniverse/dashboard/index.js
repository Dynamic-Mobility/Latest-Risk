import { API_URL } from "../../../../@dmt/Utils/api";
import useAxios from "../../axiosInstance";

class RiskDashboardApi {


  fetchRiskSummary(dispatch) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .get(`${API_URL.GET_RISK_SUMMARY}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  fetchUniverseCriteria = (dispatch, data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(API_URL.GET_UNIVERSE_CRITERIA, data)
        .then((res) => {
          resolve(res.data);
          console.log("RES ", res);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };
}

export const riskDashboardApi = new RiskDashboardApi();
