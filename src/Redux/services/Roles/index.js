import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";
import { currentUser } from "../../../@dmt/Utils/api";



class RolesApi {

    fetchUserRoles(dispatch,userId){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_USER_ROLE}?id=${userId}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    
    fetchRoles(dispatch,companyId){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_ROLES}`,{
                headers: {
                    Company: companyId
                  }
            }
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

export const rolesApi = new RolesApi();