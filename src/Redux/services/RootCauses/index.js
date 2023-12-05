import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";


class RootCausesApi {
    fetchRootCauses(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_ROOT_CAUSES}`,
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

export const rootCauseApi = new RootCausesApi;