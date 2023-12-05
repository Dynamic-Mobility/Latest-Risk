import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";


class ComplianceApi {

    // FETCH STATUTORY MAIN DATA
    fetchMainStatutoryCompliance(dispatch){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.get(`${API_URL.FETCH_MAIN_ALL}`,
            ).then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    // FETCH STATUTORY SUB DATA
    fetchSubStatutoryCompliances(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.FETCH_STATUTORY_SUB}`,data)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    // DELETE STATUTORY COMPLIANCE
    deleteStatutoryCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.DELETE_STATUTORY}`,data)
            .then((res) =>{
                resolve(res.data);
                console.log('I have been called to delete statutory!')
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    // UPDATE STATUTORY COMPLIANCE
    updateStatutoryCompliance(dispatch,updatedData){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)

            //---------MAP FORM DATA--------//
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
            axiosInstance.post(`${API_URL.UPDATE_STATUTORY}`,formData)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    // COMPLY STATUTORY COMPLIANCE
    complyStatutoryCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.COMPLY_STATUTORY}`,data)
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    
    // APPROVE STATUTORY COMPLIANCE
    approveStatutoryCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)
            axiosInstance.post(`${API_URL.APPROVE_COMPLIANCE}`,data )
            .then((res) =>{
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }

    createStatutoryCompliance(dispatch,data){
        return new Promise((resolve,reject)=>{
            const axiosInstance = useAxios(dispatch)

            // -------------MAP STATUTORY COMPLIANCE DATA--------------//
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
            axiosInstance.post(`${API_URL.CREATE_STATUTORY}`, formData).then((res) =>{
                console.log(res)
                resolve(res.data);
            })
            .catch((err) =>{
                reject(err);
                console.log(err);
            })
        })
    }
    
}

export const complianceApi = new ComplianceApi;