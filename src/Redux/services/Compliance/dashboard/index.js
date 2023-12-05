import { API_URL } from "../../../../@dmt/Utils/api";
import useAxios from "../../axiosInstance";


class DashboardApi {
  fetchComplianceSummary(dispatch) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .get(`${API_URL.GET_COMPLIANCE_SUMMARY}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export const dashboardApi = new DashboardApi();
