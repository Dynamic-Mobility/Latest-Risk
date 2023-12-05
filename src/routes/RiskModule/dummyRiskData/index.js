export const dummyRisk = [
    {
        "id": "52dac8c9-d530-4193-6000-08da73984b7e",
        "riskTitle": "Staff Defaults",
        "riskEvent": "Staff advances defaults",
        "categoryId": 1,
        "categoryName": "Credit Risk",
        "companyId": "b886eddc-0f7a-4163-6760-08da6fb44c7b",
        "companyName": "Fintech Frontiers Ltd",
        "departmentId": "da331615-ce08-4629-9fa0-08da6fb47203",
        "departmentName": "Risk",
        "sectionId": "47659fb2-458b-4abb-5866-08da6fb4d5ac",
        "sectionName": "Systems Development Section",
        "subSectionId": null,
        "subSectionName": null,
        "lossTypeId": 1,
        "lossTypeActualLossTypeName": "Direct Financial Loss",
        "riskCategoryControlId": 2,
        "riskCategoryControlActualCategoryControlName": "Mitigate",
        "controlRating": null,
        "controlRatingName": null,
        "riskDate": "2022-07-28T08:51:29.26",
        "rootCauses": [
            {
                "id": "c08d235c-357c-4ae8-79e9-08da739847c6",
                "name": " Staff exits update."
            },
            {
                "id": "ef3e610b-af1f-4d0d-79ea-08da739847c6",
                "name": "Advancing loans to staff who have exceeded the 1/3 rule."
            },
            {
                "id": "4a1c8b45-fd4e-43e0-79eb-08da739847c6",
                "name": "Poor financial management"
            }
        ],
        "controlActions": [
            {
                "id": "3f40a597-6671-4a50-3f1b-08da7398475f",
                "name": "Conduct training on Personal Financial Management to Staff."
            },
            {
                "id": "0390324e-6cc7-424c-3f1c-08da7398475f",
                "name": "Continuous follow up on staff who have exited with company advances."
            },
            {
                "id": "394b9609-e6c8-4fed-3f1d-08da7398475f",
                "name": "Ensure that the 1/3 rule is strictly adhered. Regular audit performance to ensure that this is strictly adhered to."
            }
        ],
        "mainCompliances": null,
        "additionalControlActions": null,
        "riskImpact": [
            {
                "id": "0d19ddcd-70b4-4f4b-3129-08da74541ca2",
                "name": "Possible loss of funds"
            },
            {
                "id": "415370b2-334a-4fbf-312a-08da74541ca2",
                "name": "Fines & Penalties for exceeding 1/3 rule"
            }
        ],
        "riskOwners": [
            {
                "id": "3d872544-a485-484f-7f90-08da7156a498",
                "name": "Dennis Njoroge",
                "ownerTypeId": 4,
                "ownerTypeName": "Internal"
            }
        ],
        "riskImpactAmount": 500000,
        "riskIndicator": "Credit amount over 30 days in arrears.",
        "keyIndicatorFrequencyId": 2,
        "keyIndicatorFrequencyName": "Annual",
        "riskAppetiteTypeId": 4,
        "riskAppetiteTypeName": "Amount",
        "riskAppetiteAmount": 5000,
        "riskAppetiteDirection": null,
        "previousRiskProbabilityId": 2,
        "previousRiskProbabilityActualName": "Low",
        "previousRiskSeverityId": 4,
        "previousRiskSeverityActualName": "High",
        "previousResidualRiskId": 0,
        "previousResidualRisk": null,
        "riskProbabilityId": 2,
        "riskProbabilityActualName": "Low",
        "riskSeverityId": 4,
        "riskSeverityActualName": "High",
        "riskVelocity": null,
        "riskVelocityName": null,
        "residualRiskId": null,
        "residualRisk": null,
        "residualRiskScore": null,
        "inherentRiskId": null,
        "inherentRisk": null,
        "inherentRiskScore": null,
        "riskScore": null,
        "isAssessed": 0,
        "assessmentStatus": "Not_Assessed",
        "assessmentDate": "2022-08-02T06:56:23.199454",
        "assessedBy": "66714dd7-10d8-4511-ba84-2b7c52b8ef18",
        "assessedByName": "root Admin",
        "isApproved": null,
        "approvalDate": null,
        "approvedBy": null,
        "approvedByName": null,
        "active": false
    },
    {
        "id": "a2160cd0-36ef-440e-afcd-08da9336c5ad",
        "riskTitle": "Non compliance with Statutory Regulations",
        "riskEvent": "Non compliance with regulators arising from failures in filing KRA returns e.g. WHT, VAT etc.",
        "categoryId": 2,
        "categoryName": "Compliance Risk",
        "companyId": "b886eddc-0f7a-4163-6760-08da6fb44c7b",
        "companyName": "Fintech Frontiers Ltd",
        "departmentId": "da331615-ce08-4629-9fa0-08da6fb47203",
        "departmentName": "Risk",
        "sectionId": "47659fb2-458b-4abb-5866-08da6fb4d5ac",
        "sectionName": "Systems Development Section",
        "subSectionId": null,
        "subSectionName": null,
        "lossTypeId": 3,
        "lossTypeActualLossTypeName": "Opportunity Cost",
        "riskCategoryControlId": 2,
        "riskCategoryControlActualCategoryControlName": "Mitigate",
        "controlRating": null,
        "controlRatingName": null,
        "riskDate": "2022-08-26T08:51:29.26",
        "rootCauses": [
            {
                "id": "e889c0f7-a40e-4132-7e9d-08da93347a8e",
                "name": "Filing of returns past the due date.."
            }
        ],
        "controlActions": [
            {
                "id": "25e29041-cfcb-4429-5b9a-08da933479ab",
                "name": "Regular  monitoring, reviews and compliance health checks by the compliance team."
            },
            {
                "id": "316cc51e-e182-44d8-5b9b-08da933479ab",
                "name": "Installation of the compliance system that will help in sending alerts to returning officers when the obligations are due."
            }
        ],
        "mainCompliances": null,
        "additionalControlActions": null,
        "riskImpact": [
            {
                "id": "3810ae54-69c9-49a3-5c67-08da9336c5dd",
                "name": "Fines & Penalties by regulators such as KRA"
            }
        ],
        "riskOwners": [
            {
                "id": "3d872544-a485-484f-7f90-08da7156a498",
                "name": "Dennis Njoroge",
                "ownerTypeId": 4,
                "ownerTypeName": "Internal"
            }
        ],
        "riskImpactAmount": 10000,
        "riskIndicator": "Fines & Penalties payable to the regulators.",
        "keyIndicatorFrequencyId": 2,
        "keyIndicatorFrequencyName": "Annual",
        "riskAppetiteTypeId": 4,
        "riskAppetiteTypeName": "Amount",
        "riskAppetiteAmount": 5000,
        "riskAppetiteDirection": "Positive",
        "previousRiskProbabilityId": null,
        "previousRiskProbabilityActualName": null,
        "previousRiskSeverityId": null,
        "previousRiskSeverityActualName": null,
        "previousResidualRiskId": null,
        "previousResidualRisk": null,
        "riskProbabilityId": 2,
        "riskProbabilityActualName": "Low",
        "riskSeverityId": 4,
        "riskSeverityActualName": "High",
        "riskVelocity": null,
        "riskVelocityName": null,
        "residualRiskId": 2,
        "residualRisk": "Low",
        "residualRiskScore": null,
        "inherentRiskId": null,
        "inherentRisk": null,
        "inherentRiskScore": null,
        "riskScore": null,
        "isAssessed": null,
        "assessmentStatus": "Not_Assessed",
        "assessmentDate": null,
        "assessedBy": null,
        "assessedByName": null,
        "isApproved": true,
        "approvalDate": "2022-09-20T09:56:25.2098767",
        "approvedBy": "66714dd7-10d8-4511-ba84-2b7c52b8ef18",
        "approvedByName": "root Admin",
        "active": false
    },
    {
        "id": "40ecec70-9b07-4399-7180-08dac225cb9c",
        "riskTitle": "Risk Test 2",
        "riskEvent": "Risk Test 2",
        "categoryId": 2,
        "categoryName": "Compliance Risk",
        "companyId": "b886eddc-0f7a-4163-6760-08da6fb44c7b",
        "companyName": "Fintech Frontiers Ltd",
        "departmentId": "da331615-ce08-4629-9fa0-08da6fb47203",
        "departmentName": "Risk",
        "sectionId": "47659fb2-458b-4abb-5866-08da6fb4d5ac",
        "sectionName": "Systems Development Section",
        "subSectionId": null,
        "subSectionName": null,
        "lossTypeId": 3,
        "lossTypeActualLossTypeName": "Opportunity Cost",
        "riskCategoryControlId": 2,
        "riskCategoryControlActualCategoryControlName": "Mitigate",
        "controlRating": 1,
        "controlRatingName": "Effective",
        "riskDate": "2022-11-09T10:41:17.6663319",
        "rootCauses": [
            {
                "id": "8089cca5-af85-45c3-2450-08dac225cb89",
                "name": "RootCause Test"
            }
        ],
        "controlActions": [
            {
                "id": "47677808-26ea-4c1c-fba8-08dac225cb7f",
                "name": "Control Action Test 1."
            },
            {
                "id": "82580ec9-5594-41c6-fba9-08dac225cb7f",
                "name": "Control Action Test 1."
            },
            {
                "id": "c802a9bc-3ecc-48b0-fbaa-08dac225cb7f",
                "name": "Additional Control Action Test 1."
            },
            {
                "id": "2f2e448f-f860-4e8a-fbab-08dac225cb7f",
                "name": "Additional Control Action Test 2."
            }
        ],
        "mainCompliances": null,
        "additionalControlActions": null,
        "riskImpact": [
            {
                "id": "a2a21a74-4d8e-4bd2-1aff-08dac2267860",
                "name": "RiskImpact Test"
            }
        ],
        "riskOwners": [
            {
                "id": "3d872544-a485-484f-7f90-08da7156a498",
                "name": "Dennis Njoroge",
                "ownerTypeId": 4,
                "ownerTypeName": "Internal"
            }
        ],
        "riskImpactAmount": 10000,
        "riskIndicator": "Fines & Penalties payable to the regulators.",
        "keyIndicatorFrequencyId": 2,
        "keyIndicatorFrequencyName": "Annual",
        "riskAppetiteTypeId": 4,
        "riskAppetiteTypeName": "Amount",
        "riskAppetiteAmount": 5000,
        "riskAppetiteDirection": "Positive",
        "previousRiskProbabilityId": null,
        "previousRiskProbabilityActualName": null,
        "previousRiskSeverityId": null,
        "previousRiskSeverityActualName": null,
        "previousResidualRiskId": null,
        "previousResidualRisk": null,
        "riskProbabilityId": 5,
        "riskProbabilityActualName": "Certain",
        "riskSeverityId": 5,
        "riskSeverityActualName": "Intolerable",
        "riskVelocity": 4,
        "riskVelocityName": "Above 5 yrs",
        "residualRiskId": null,
        "residualRisk": null,
        "residualRiskScore": 0,
        "inherentRiskId": 2,
        "inherentRisk": "Low",
        "inherentRiskScore": 16,
        "riskScore": null,
        "isAssessed": null,
        "assessmentStatus": "Not_Assessed",
        "assessmentDate": null,
        "assessedBy": null,
        "assessedByName": null,
        "isApproved": null,
        "approvalDate": null,
        "approvedBy": null,
        "approvedByName": null,
        "active": false
    },
    {
        "id": "b9a3a4a3-1767-42f3-7181-08dac225cb9c",
        "riskTitle": "Risk Test",
        "riskEvent": "Risk Test",
        "categoryId": 2,
        "categoryName": "Compliance Risk",
        "companyId": "b886eddc-0f7a-4163-6760-08da6fb44c7b",
        "companyName": "Fintech Frontiers Ltd",
        "departmentId": "da331615-ce08-4629-9fa0-08da6fb47203",
        "departmentName": "Risk",
        "sectionId": "47659fb2-458b-4abb-5866-08da6fb4d5ac",
        "sectionName": "Systems Development Section",
        "subSectionId": null,
        "subSectionName": null,
        "lossTypeId": 3,
        "lossTypeActualLossTypeName": "Opportunity Cost",
        "riskCategoryControlId": 2,
        "riskCategoryControlActualCategoryControlName": "Mitigate",
        "controlRating": 1,
        "controlRatingName": "Effective",
        "riskDate": "2022-11-09T10:59:12.8902595",
        "rootCauses": [
            {
                "id": "dbb84013-b094-4533-2451-08dac225cb89",
                "name": "RootCause Test"
            }
        ],
        "controlActions": [
            {
                "id": "b892789d-93f0-4930-fbac-08dac225cb7f",
                "name": "Control Action Test 1."
            },
            {
                "id": "3c00df31-beb2-4fe5-fbad-08dac225cb7f",
                "name": "Control Action Test 1."
            },
            {
                "id": "6e569f24-44ab-4c69-fbae-08dac225cb7f",
                "name": "Additional Control Action Test 1."
            },
            {
                "id": "0c38e5d1-93d6-4859-fbaf-08dac225cb7f",
                "name": "Additional Control Action Test 2."
            }
        ],
        "mainCompliances": null,
        "additionalControlActions": null,
        "riskImpact": [
            {
                "id": "53ad71d1-6ce7-49a3-1b00-08dac2267860",
                "name": "RiskImpact Test"
            }
        ],
        "riskOwners": [
            {
                "id": "3d872544-a485-484f-7f90-08da7156a498",
                "name": "Dennis Njoroge",
                "ownerTypeId": 4,
                "ownerTypeName": "Internal"
            }
        ],
        "riskImpactAmount": 10000,
        "riskIndicator": "Fines & Penalties payable to the regulators.",
        "keyIndicatorFrequencyId": 2,
        "keyIndicatorFrequencyName": "Annual",
        "riskAppetiteTypeId": 4,
        "riskAppetiteTypeName": "Amount",
        "riskAppetiteAmount": 5000,
        "riskAppetiteDirection": "Positive",
        "previousRiskProbabilityId": null,
        "previousRiskProbabilityActualName": null,
        "previousRiskSeverityId": null,
        "previousRiskSeverityActualName": null,
        "previousResidualRiskId": null,
        "previousResidualRisk": null,
        "riskProbabilityId": 5,
        "riskProbabilityActualName": "Certain",
        "riskSeverityId": 5,
        "riskSeverityActualName": "Intolerable",
        "riskVelocity": 4,
        "riskVelocityName": "Above 5 yrs",
        "residualRiskId": null,
        "residualRisk": null,
        "residualRiskScore": 0,
        "inherentRiskId": 2,
        "inherentRisk": "Low",
        "inherentRiskScore": 16,
        "riskScore": null,
        "isAssessed": null,
        "assessmentStatus": "Not_Assessed",
        "assessmentDate": null,
        "assessedBy": null,
        "assessedByName": null,
        "isApproved": null,
        "approvalDate": null,
        "approvedBy": null,
        "approvedByName": null,
        "active": false
    },
    {
        "id": "6c579c01-4baf-4c4d-311a-08dac63cc6c0",
        "riskTitle": "test title",
        "riskEvent": "test event",
        "categoryId": 2,
        "categoryName": "Compliance Risk",
        "companyId": "b886eddc-0f7a-4163-6760-08da6fb44c7b",
        "companyName": "Fintech Frontiers Ltd",
        "departmentId": "da331615-ce08-4629-9fa0-08da6fb47203",
        "departmentName": "Risk",
        "sectionId": "47659fb2-458b-4abb-5866-08da6fb4d5ac",
        "sectionName": "Systems Development Section",
        "subSectionId": null,
        "subSectionName": null,
        "lossTypeId": 1,
        "lossTypeActualLossTypeName": "Direct Financial Loss",
        "riskCategoryControlId": 1,
        "riskCategoryControlActualCategoryControlName": "Accept",
        "controlRating": 2,
        "controlRatingName": "Adequate",
        "riskDate": "2022-11-14T15:35:50.9898838",
        "rootCauses": [
            {
                "id": "4a1c8b45-fd4e-43e0-79eb-08da739847c6",
                "name": "Poor financial management"
            },
            {
                "id": "fcd47d0b-8116-4834-7e9c-08da93347a8e",
                "name": "Filing of returns past the due date.."
            }
        ],
        "controlActions": [
            {
                "id": "d0b09836-387d-49ab-40e9-08dac63cc6af",
                "name": "test"
            },
            {
                "id": "1d996dcf-f3fe-4582-40ea-08dac63cc6af",
                "name": "test3"
            }
        ],
        "mainCompliances": null,
        "additionalControlActions": null,
        "riskImpact": [],
        "riskOwners": [
            {
                "id": "3d872544-a485-484f-7f90-08da7156a498",
                "name": "Dennis Njoroge",
                "ownerTypeId": 4,
                "ownerTypeName": "Internal"
            }
        ],
        "riskImpactAmount": 7000,
        "riskIndicator": null,
        "keyIndicatorFrequencyId": 2,
        "keyIndicatorFrequencyName": "Annual",
        "riskAppetiteTypeId": 4,
        "riskAppetiteTypeName": "Amount",
        "riskAppetiteAmount": null,
        "riskAppetiteDirection": "Positive",
        "previousRiskProbabilityId": null,
        "previousRiskProbabilityActualName": null,
        "previousRiskSeverityId": null,
        "previousRiskSeverityActualName": null,
        "previousResidualRiskId": null,
        "previousResidualRisk": null,
        "riskProbabilityId": 3,
        "riskProbabilityActualName": "Possible",
        "riskSeverityId": 3,
        "riskSeverityActualName": "Moderate",
        "riskVelocity": 0,
        "riskVelocityName": null,
        "residualRiskId": null,
        "residualRisk": null,
        "residualRiskScore": 0,
        "inherentRiskId": 2,
        "inherentRisk": "Low",
        "inherentRiskScore": 4,
        "riskScore": null,
        "isAssessed": null,
        "assessmentStatus": "Not_Assessed",
        "assessmentDate": null,
        "assessedBy": null,
        "assessedByName": null,
        "isApproved": null,
        "approvalDate": null,
        "approvedBy": null,
        "approvedByName": null,
        "active": false
    },
    {
        "id": "584d1caf-514f-4c16-311b-08dac63cc6c0",
        "riskTitle": "test",
        "riskEvent": "test",
        "categoryId": 2,
        "categoryName": "Compliance Risk",
        "companyId": "b886eddc-0f7a-4163-6760-08da6fb44c7b",
        "companyName": "Fintech Frontiers Ltd",
        "departmentId": "da331615-ce08-4629-9fa0-08da6fb47203",
        "departmentName": "Risk",
        "sectionId": "47659fb2-458b-4abb-5866-08da6fb4d5ac",
        "sectionName": "Procument",
        "subSectionId": null,
        "subSectionName": null,
        "lossTypeId": 2,
        "lossTypeActualLossTypeName": "Indirect Financial Loss",
        "riskCategoryControlId": 2,
        "riskCategoryControlActualCategoryControlName": "Mitigate",
        "controlRating": 2,
        "controlRatingName": "Adequate",
        "riskDate": "2022-11-14T15:42:53.402216",
        "rootCauses": [
            {
                "id": "ef3e610b-af1f-4d0d-79ea-08da739847c6",
                "name": "Advancing loans to staff who have exceeded the 1/3 rule."
            },
            {
                "id": "4a1c8b45-fd4e-43e0-79eb-08da739847c6",
                "name": "Poor financial management"
            }
        ],
        "controlActions": [
            {
                "id": "372eec02-dc34-4b58-40ec-08dac63cc6af",
                "name": "test"
            }
        ],
        "mainCompliances": null,
        "additionalControlActions": null,
        "riskImpact": [],
        "riskOwners": [
            {
                "id": "3d872544-a485-484f-7f90-08da7156a498",
                "name": "Dennis Njoroge",
                "ownerTypeId": 4,
                "ownerTypeName": "Internal"
            }
        ],
        "riskImpactAmount": 700,
        "riskIndicator": null,
        "keyIndicatorFrequencyId": 2,
        "keyIndicatorFrequencyName": "Annual",
        "riskAppetiteTypeId": 4,
        "riskAppetiteTypeName": "Amount",
        "riskAppetiteAmount": null,
        "riskAppetiteDirection": "Positive",
        "previousRiskProbabilityId": null,
        "previousRiskProbabilityActualName": null,
        "previousRiskSeverityId": null,
        "previousRiskSeverityActualName": null,
        "previousResidualRiskId": null,
        "previousResidualRisk": null,
        "riskProbabilityId": 3,
        "riskProbabilityActualName": "Possible",
        "riskSeverityId": 3,
        "riskSeverityActualName": "Moderate",
        "riskVelocity": 0,
        "riskVelocityName": null,
        "residualRiskId": null,
        "residualRisk": null,
        "residualRiskScore": 0,
        "inherentRiskId": 2,
        "inherentRisk": "Low",
        "inherentRiskScore": 4,
        "riskScore": null,
        "isAssessed": null,
        "assessmentStatus": "Not_Assessed",
        "assessmentDate": null,
        "assessedBy": null,
        "assessedByName": null,
        "isApproved": null,
        "approvalDate": null,
        "approvedBy": null,
        "approvedByName": null,
        "active": false
    },
]