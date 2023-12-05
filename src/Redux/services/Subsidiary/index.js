import useAxios from "../axiosInstance";
import { API_URL } from "../../../@dmt/Utils/api";


class SubsidiaryApi {

    creatSubsidiary(dispatch, data) {
        return new Promise((resolve, reject) => {
          const axiosInstance = useAxios(dispatch);
          axiosInstance
            .post(`${API_URL.CREATE_SUBSIDIARY}`, data)
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

    creatDepartment(dispatch, data) {
        return new Promise((resolve, reject) => {
          const axiosInstance = useAxios(dispatch);
          axiosInstance
            .post(`${API_URL.CREATE_DEPARTMENT}`, data)
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

    creatSection(dispatch, data) {
        return new Promise((resolve, reject) => {
          const axiosInstance = useAxios(dispatch);
          axiosInstance
            .post(`${API_URL.CREATE_SECTION}`, data)
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

    creatSubSection(dispatch, data) {
        return new Promise((resolve, reject) => {
          const axiosInstance = useAxios(dispatch);
          axiosInstance
            .post(`${API_URL.CREATE_SUB_SECTION}`, data)
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }

    fetchSubsidiaries(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_SUBSIDIARIES}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    editSubsidiary(dispatch,payload){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.UPDATE_SUBSIDIARY}`,payload).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchDepartments(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_DEPARTMENTS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchSections(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_SECTIONS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchSubSections(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_SUB_SECTIONS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchUsers(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_USERS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchFrequencies(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_COMPLIANCE_FREQUENCIES}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchPriorities(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_COMPLIANCE_PRIORITIES}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchCurrencies(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_CURRENCIES}`,
            ).then((res) =>{
                resolve(res.data);
                console.log("CURRENCIES_RESPONSE ",res.data)
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchAppetiteTypes(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_APPETITE_TYPES}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchProbability(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_PROBABILITY}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchSeverity(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_SEVERITY}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchLossTypes(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_LOSS_TYPES}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    fetchRiskControls(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_RISK_CONTROLS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }
}

export const subsidiaryApi = new SubsidiaryApi();