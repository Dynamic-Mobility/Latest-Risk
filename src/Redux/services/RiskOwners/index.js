import useAxios from "../axiosInstance";
import { API_URL } from "../../../@dmt/Utils/api";


class RiskOwnersApi {
    fetchRiskOwners(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_RISK_OWNERS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchRiskOwnerTypes(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_RISK_OWNERS_TYPES}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    addRiskOwner = (dispatch,data) =>{
        return new Promise((resolve,reject) =>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(API_URL.CREATE_RISK_OWNER,data)
            .then((res) =>{
                resolve(res.data)
                console.log("RES ",res)
            })
            .catch((err) =>{
                reject(err.message)
            })
        })
    }
}

export const riskOwnerApi = new RiskOwnersApi();