import useAxios from "../axiosInstance";
import { API_URL } from "../../../@dmt/Utils/api";


class UsersApi {
    addUser = (dispatch, data) => {
        return new Promise((resolve, reject) => {
          const axiosInstance = useAxios(dispatch);

          // ----------------MAP USER DATA-----------------------------//
          const formData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userName: data.email,
            password: data.password,
            companyId: data.companyId,
            organization: data.organization,
            confirmPassword: data.confirmPassword,
            phoneNumber: data.phoneNumber,
            staffNumber: data.staffNumber,
            ext_Number: data.ext_Number,
            roleId: data.roleId
          }
          axiosInstance
            .post(API_URL.CREATE_USER, formData)
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err.message);
            });
        });
      };

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

     // UPDATE USER
     updateUser(dispatch,data){
      return new Promise((resolve,reject)=>{
          const axiosInstance = useAxios(dispatch)

          //---------MAP FORM DATA--------//
          const formData = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            image: data.image,
            deleteCurrentImage: data.deleteCurrentImage,
            staffNumber: data.staffNumber,
            ext_Number: data.ext_Number,
            organization: data.organization,
            roleId: data.roleId
            }
          axiosInstance.post(`${API_URL.UPDATE_USER}`,formData)
          .then((res) =>{
              resolve(res.data);
          })
          .catch((err) =>{
              reject(err);
          })
      })
  }
}

export const usersApi = new UsersApi();