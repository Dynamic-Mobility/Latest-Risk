import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";

class IncidentApi {
  addRiskIncident = (dispatch, data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(API_URL.CREATE_INCIDENT, data)
        .then((res) => {
          resolve(res.data);
          console.log("RES ", res);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  fetchRiskIncident(dispatch) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .get(`${API_URL.FETCH_INCIDENT}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log(err.message);
        });
    });
  }



   // UPDATE RISK
   updateRiskIncident(dispatch,data){
    return new Promise((resolve,reject)=>{
        const axiosInstance = useAxios(dispatch)
        axiosInstance.post(`${API_URL.UPDATE_INCIDENT}`,data)
        .then((res) =>{
            resolve(res.data);
        })
        .catch((err) =>{
            reject(err);
        })
    })
}


   // DELETE RISK INCIDENT
   deleteRiskIncident(dispatch,data){
    return new Promise((resolve,reject)=>{
        const axiosInstance = useAxios(dispatch)
        axiosInstance.post(`${API_URL.DELETE_INCIDENT}`,data)
        .then((res) =>{
            resolve(res.data);
        })
        .catch((err) =>{
            reject(err);
        })
    })
}



}

export const incidentApi = new IncidentApi();
