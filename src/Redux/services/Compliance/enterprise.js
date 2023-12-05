import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";


class EnterpriseApi {

    fetchEnterpriseCompliance(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_ENTERPRISE_ALL}`).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    // FETCH STATUTORY SUB DATA
    fetchSubEnterpriseCompliances(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.FETCH_ENTERPRISE_SUB}`,data)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

     // DELETE ENTERPRISE COMPLIANCE
     deleteEnterpriseCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.DELETE_ENTERPRISE}`,data)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

     // UPDATE ENTERPRISE COMPLIANCE
     updateEnterpriseCompliance(dispatch,updatedData){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)

            // ---------FORMAT FORM DATA---------//
            const formData = {
                id: updatedData.id,
                title: updatedData.title,
                description: updatedData.description,
                authority: updatedData.authority,
                companyId: updatedData.companyId,
                organization: updatedData.organization,
                penaltyTypeName: updatedData.penaltyTypeName,
                penalty: updatedData.penalty,
                penaltyNarrative: updatedData.penaltyNarrative,
                penaltyCurrency: updatedData.penaltyCurrency,
                primaryOwnerId: updatedData.primaryOwnerId,
                secondaryOwnerId: updatedData.secondaryOwnerId,
                escalationOwnerId: updatedData.escalationOwnerId,
                priority: updatedData.priority,
                frequencyId: updatedData.frequencyId,
                active: updatedData.active,
                submissionDeadline: updatedData.submissionDeadline,
                nextDeadline: updatedData.nextDeadline,
                sourceDoc: updatedData.sourceDoc,
                isSubCompliance: updatedData.isSubCompliance,
                hasSubCompliance: updatedData.hasSubCompliance,
                subId: updatedData.subId,
                hasAttachment: updatedData.hasAttachment,
              }
            axiosInstance.post(`${API_URL.UPDATE_ENTERPRISE}`,formData)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

     // COMPLY ENTERPRISE COMPLIANCE
     complyEnterpriseCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.COMPLY_ENTERPRISE}`,data)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }


    // APPROVE ENTERPRISE COMPLIANCE
    approveEnterpriseCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.APPROVE_ENTERPRISE}`,data )
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    createEnterpriseCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)

            // -------------MAP ENTERPRISE COMPLIANCE DATA--------------//
            const formData = {
                id: data.id,
                title: data.title,
                description: data.description,
                authority: data.authority,
                riskUniverseId: data.riskUniverseId,
                companyId: data.companyId,
                organization: data.organization,
                penaltyTypeName: data.penaltyTypeName,
                penalty: data.penalty,
                penaltyNarrative: data.penaltyNarrative,
                penaltyCurrency: data.penaltyCurrency,
                primaryOwnerId: data.primaryOwnerId,
                secondaryOwnerId: data.secondaryOwnerId,
                escalationOwnerId: data.escalationOwnerId,
                currency: data.currency,
                priority: data.priority,
                frequencyId: data.frequencyId,
                obligationStatus: data.obligationStatus,
                active: data.active,
                submissionDeadline: data.submissionDeadline,
                nextDeadline: data.nextDeadline,
                complianceType: data.complianceType,
                sourceDoc: data.sourceDoc,
                isSubCompliance: data.isSubCompliance,
                hasSubCompliance: data.hasSubCompliance,
                subId: data.subId,
                hasAttachment: data.hasAttachment
              }
            axiosInstance.post(`${API_URL.CREATE_ENTERPRISE}`, formData).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

}

export const enterpriseApi = new EnterpriseApi;