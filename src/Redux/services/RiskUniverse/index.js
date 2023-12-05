import { API_URL } from "../../../@dmt/Utils/api";
import useAxios from "../axiosInstance";

class RiskApi {
  addRisk = (dispatch, data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);


      // -----------FORMAT DATA-----------//
      const formData = { ...data };
      const riskImpact = [];
      data.riskImpact.map((datum) =>
        riskImpact.push({
          id: datum.id,
          riskImpact: datum.name,
        })
      );
      const rootCauses = [];
      data.rootCauses.map((datum) =>
        rootCauses.push({
          id: datum.id,
          rootCause: datum.name,
        })
      );
      const controlActions = [];
      data.controlActions.map((datum) =>
        controlActions.push({
          id: datum.id,
          action: datum.name,
        })
      );
      formData.controlActions = controlActions;
      formData.rootCauses = rootCauses;
      formData.riskImpact = riskImpact;

      // ------------MAPPING THE RISK UNIVERSE DATA----------------//
      const formattedData = {
        riskTitle: formData.riskTitle,
        riskEvent: formData.riskEvent,
        categoryId: formData.categoryId,
        companyId: formData.companyId,
        departmentId: formData.departmentId,
        sectionId: formData.sectionId,
        subSectionId: formData.subSectionId,
        rootCauses: formData.rootCauses,
        riskImpact: formData.riskImpact,
        riskImpactAmount: formData.riskImpactAmount,
        controlRating: formData.controlRating,
        controlActions: formData.controlActions,
        additionalControlActions: formData.additionalControlActions,
        lossTypeId: formData.lossTypeId,
        riskCategoryControlId: formData.riskCategoryControlId,
        riskDate: formData.riskDate,
        riskOwners:formData.riskOwners,
        riskIndicator: formData.riskIndicator,
        keyIndicatorFrequencyId: formData.keyIndicatorFrequencyId,
        riskAppetiteTypeId: formData.riskAppetiteTypeId,
        riskAppetiteAmount: formData.riskAppetiteAmount,
        riskAppetiteDirection: formData.riskAppetiteDirection,
        riskProbabilityId: formData.riskProbabilityId,
        riskSeverityId: formData.riskSeverityId,
        riskVelocity: formData.riskVelocity,
      }
      axiosInstance
        .post(API_URL.CREATE_RISK, formattedData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  fetchRisks(dispatch) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .get(`${API_URL.FETCH_RISKS}`)
        .then((res) => {
          let formattedData = res.data
          formattedData = formattedData.map(datum => {
            let additionalControlActions = []
            let controlActions = [],
              riskImpact = [],
              rootCauses = [];
            datum.additionalControlActions?.map(action =>
              additionalControlActions.push({
                ...action,
                actionDate:  action.actionDate?.split('T')[0]
              }),
            );
            datum.controlActions.map(action =>
              controlActions.push({
                id: action.id,
                name: action.action,
              }),
            );
            datum.riskImpact.map(risk =>
              riskImpact.push({
                id: risk.id,
                name: risk.riskImpact,
              }),
            );
            datum.rootCauses.map(root =>
              rootCauses.push({
                id: root.id,
                name: root.rootCause,
              }),
            );
            return { ...datum,additionalControlActions, controlActions: controlActions, riskImpact: riskImpact, rootCauses: rootCauses };
          });
          resolve(formattedData);
        })
        .catch((err) => {
          reject(err);
          console.log(err.message);
        });
    });
  }

  fetchCategories(dispatch) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .get(`${API_URL.FETCH_RISK_CATEGORIES}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log(err.message);
        });
    });
  }

  fetchSubsidiaries(dispatch) {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .get(`${API_URL.FETCH_SUBSIDIARIES}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log(err.message);
        });
    });
  }

  calculateResidualRisk = (dispatch, data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(API_URL.CALCULATE_RESIDUAL, data)
        .then((res) => {
          resolve(res.data);
          console.log("RES ", res);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };


   // UPDATE RISK
   updateRisk(dispatch,data){
    return new Promise((resolve,reject)=>{
        const axiosInstance = useAxios(dispatch)

         // -----------FORMAT DATA-----------//
      const formData = { ...data };
      const riskImpact = [];
      data.riskImpact.map((datum) =>
        riskImpact.push({
          id: datum.id,
          riskImpact: datum.name,
        })
      );
      const rootCauses = [];
      formData.rootCauses.map((datum) =>
        rootCauses.push({
          id: datum.id,
          rootCause: datum.name,
        })
      );
      const controlActions = [];
      formData.controlActions.map((datum) =>
        controlActions.push({
          id: datum.id,
          action: datum.name,
        })
      );
      formData.controlActions = controlActions;
      formData.rootCauses = rootCauses;
      formData.riskImpact = riskImpact;

      // ------------MAPPING THE RISK UNIVERSE DATA----------------//
      const formattedData = {
        id:formData.id,
        riskTitle: formData.riskTitle,
        riskEvent: formData.riskEvent,
        categoryId: formData.categoryId,
        companyId: formData.companyId,
        departmentId: formData.departmentId,
        sectionId: formData.sectionId,
        subSectionId: formData.subSectionId,
        rootCauses: formData.rootCauses,
        riskImpact: formData.riskImpact,
        riskImpactAmount: formData.riskImpactAmount,
        controlRating: formData.controlRating,
        controlActions: formData.controlActions,
        additionalControlActions: formData.additionalControlActions,
        lossTypeId: formData.lossTypeId,
        riskCategoryControlId: formData.riskCategoryControlId,
        riskDate: formData.riskDate,
        riskOwners:formData.riskOwners,
        riskIndicator: formData.riskIndicator,
        keyIndicatorFrequencyId: formData.keyIndicatorFrequencyId,
        riskAppetiteTypeId: formData.riskAppetiteTypeId,
        riskAppetiteAmount: formData.riskAppetiteAmount,
        riskAppetiteDirection: formData.riskAppetiteDirection,
        riskProbabilityId: formData.riskProbabilityId,
        riskSeverityId: formData.riskSeverityId,
        riskVelocity: formData.riskVelocity,
      }
        axiosInstance.post(`${API_URL.UPDATE_RISK}`,formattedData)
        .then((res) =>{
            resolve(res.data);
        })
        .catch((err) =>{
            reject(err);
        })
    })
}

  assessRiskUniverse = (dispatch, data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch);
      axiosInstance
        .post(API_URL.ASSESS_RISK, data)
        .then((res) => {
          resolve(res.data);
          console.log("RES ", res);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };


  // Upload risk document
   uploadRiskDocument = (dispatch,data) => {
    return new Promise((resolve, reject) => {
      const axiosInstance = useAxios(dispatch,data);
      axiosInstance
        .post(API_URL.UPLOAD_TEMPLATE,data)
        .then((res) => {
          resolve(res.data);
          console.log("RES ", res);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

   // DELETE RISK UNIVERSE
   deleteRiskUniverse(dispatch,data){
    return new Promise((resolve,reject)=>{
        const axiosInstance = useAxios(dispatch)
        axiosInstance.post(`${API_URL.DELETE_RISK}`,data)
        .then((res) =>{
            resolve(res.data);
        })
        .catch((err) =>{
            reject(err);
        })
    })
}


// KEY RISK INDICATORS
fetchKeyRiskIndicators(dispatch) {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(dispatch);
    axiosInstance
      .get(`${API_URL.FETCH_INDICATOR}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log(err.message);
      });
  });
}

fetchKeyRiskIndicatorHistory(dispatch,riskId) {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(dispatch);
    axiosInstance
      .post(`${API_URL.INDICATOR_HISTORY}`, {id: riskId})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log(err.message);
      });
  });
}

updateRiskIndicator(dispatch,riskId) {
  return new Promise((resolve, reject) => {
    const axiosInstance = useAxios(dispatch);
    axiosInstance
      .post(`${API_URL.EDIT_RISK_INDICATOR}`, {id: riskId})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log(err.message);
      });
  });
}

}

export const riskApi = new RiskApi();
