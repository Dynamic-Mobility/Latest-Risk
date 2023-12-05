import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";



class ProfileApi {

    fetchUserProfile(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_PROFILE_DETAILS}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }


    updateUserProfile(dispatch,formData){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.EDIT_PROFILE_DETAILS}`,formData).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err.message);
            })
        })
    }

    
   
}

export const profileApi = new ProfileApi();