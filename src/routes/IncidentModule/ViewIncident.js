import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAutoCompleteValue } from "../../@dmt/Utils/commonHelper";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#E8EBF6",
    padding: 12,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
    marginRight: 4,
    marginLeft: 4,
  },
  notActive: {
    backgroundColor: "#fff",
    padding: 12,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
    marginRight: 4,
    marginLeft: 4,
  },
  button: {
    color: "#3F51B5",
    paddig: 10,
  },
  td: {
    border: "1px solid #dddddd",
    padding: "8px",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    maxHeight: "70vh",
  },
  title: {
    marginBottom: 10,
  },
}));

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const { closeDrawer, openDrawer, selectedIncident } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const { riskFrequencies } = useSelector(({ subsidiary }) => subsidiary);

  const action =
    activeStep > 0
      ? selectedIncident.additionalControlActions[activeStep - 1]
      : null;

  if (!selectedIncident) {
    return null;
  }

   // get value of selected frequency to display in preview
   const selectedFrequency = getAutoCompleteValue(riskFrequencies,selectedIncident.keyIndicatorFrequencyId);

   console.log("SELECTED ",selectedIncident)
  return (
    <div>
      <Drawer anchor={"right"} open={openDrawer} onClose={closeDrawer}>
        <Box sx={{display: 'flex',alignItems:'center',justifyContent:'space-between',py:2,px:2,backgroundColor:"#2F3B6E",color:'white',mb:2}}>
        <CloseIcon onClick={closeDrawer} sx={{cursor:'pointer'}} />
        <Typography>{selectedIncident.riskTitle}</Typography>
        </Box>
        <Grid container>
          <Grid item md={3} xs={12}>
            <Grid
              onClick={() => setActiveStep(0)}
              className={
                activeStep === 0 ? classes.isActive : classes.notActive
              }
            >
              <Typography>Risk</Typography>
            </Grid>
            {selectedIncident.additionalControlActions?.map((action, index) => (
              <Grid
                onClick={() => setActiveStep(index + 1)}
                key={index}
                className={
                  index + 1 === activeStep
                    ? classes.isActive
                    : classes.notActive
                }
              >
                {/* <Typography key={index}>{action.action}</Typography> */}
                <Typography key={index}>
                  Additional Control {index + 1}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid item md={9} xs={12}>
            {activeStep === 0 && (
              <>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td className={classes.td}>Risk Title</td>
                      <td className={classes.td}>
                        {selectedIncident.riskTitle !== ""
                          ? selectedIncident.riskTitle
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Event</td>
                      <td className={classes.td}>
                        {selectedIncident.riskEvent !== ""
                          ? selectedIncident.riskEvent
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Category</td>
                      <td className={classes.td}>
                        {selectedIncident.categoryName !== ""
                          ? selectedIncident.categoryName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Causes</td>
                      <td className={classes.td}>
                        {selectedIncident.rootCauses?.length !== 0
                          ? selectedIncident.rootCauses?.map((rootCause) => (
                              <li key={rootCause.id}>{rootCause.name}</li>
                            ))
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Subsidiary</td>
                      <td className={classes.td}>
                        {selectedIncident.companyName !== ""
                          ? selectedIncident.companyName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Department</td>
                      <td className={classes.td}>
                        {selectedIncident.departmentName !== ""
                          ? selectedIncident.departmentName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Section</td>
                      <td className={classes.td}>
                        {selectedIncident.sectionName !== ""
                          ? selectedIncident.sectionName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Sub Section</td>
                      <td className={classes.td}>
                        {selectedIncident.subSectionName !== ""
                          ? selectedIncident.subSectionName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Owner</td>
                      <td className={classes.td}>
                        {selectedIncident.riskOwners?.map((owner) => (
                          <li key={owner.id}>{owner.name}</li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Impact</td>
                      <td className={classes.td}>
                        {selectedIncident.riskImpact?.length !== 0
                          ? selectedIncident.riskImpact?.map((impact, index) => (
                              <li key={index}>{impact.name}</li>
                            ))
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>
                        Risk Impact Amount in {selectedIncident.riskImpactCurrency}
                      </td>
                      <td className={classes.td}>
                        {selectedIncident.riskImpactAmount !== 0
                          ? selectedIncident.riskImpactAmount
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Control Category</td>
                      <td className={classes.td}>
                        {selectedIncident.riskCategoryControlName !== ""
                          ? selectedIncident.riskCategoryControlName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Control/Mitigation Actions</td>
                      <td className={classes.td}>
                        {selectedIncident.controlActions?.length !== 0
                          ? selectedIncident.controlActions?.map(
                              (controlAction, index) => (
                                <li key={index}>{controlAction.name}</li>
                              )
                            )
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Loss Type</td>
                      <td className={classes.td}>
                        {selectedIncident.lossTypeName !== ""
                          ? selectedIncident.lossTypeName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Indicator</td>
                      <td className={classes.td}>
                        {selectedIncident.riskIndicator !== ""
                          ? selectedIncident.riskIndicator
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Indicator Frequency</td>
                      <td className={classes.td}>
                        {selectedFrequency ? selectedFrequency.name : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>
                        Risk Appetite Amount {selectedIncident.riskAppetiteTypeName}
                      </td>
                      <td className={classes.td}>
                        {selectedIncident.riskAppetiteAmount !== 0
                          ? selectedIncident.riskAppetiteAmount
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>
                        Risk Appetite Direction{" "}
                        {selectedIncident.riskAppetiteDirection}
                      </td>
                      <td className={classes.td}>
                        {selectedIncident.riskAppetiteDirection !== ""
                          ? selectedIncident.riskAppetiteDirection
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Probability</td>
                      <td className={classes.td}>
                        {selectedIncident.riskProbabilityName !== ""
                          ? selectedIncident.riskProbabilityName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Severity</td>
                      <td className={classes.td}>
                        {selectedIncident.riskSeverityName !== ""
                          ? selectedIncident.riskSeverityName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Risk Velocity</td>
                      <td className={classes.td}>
                        {selectedIncident.riskVelocityName !== ""
                          ? selectedIncident.riskVelocityName
                          : "Not Set"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {activeStep > 0 && action && (
              <>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td className={classes.td}>Action Title</td>
                      <td className={classes.td}>
                        {action.action !== "" ? action.action : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Action Date</td>
                      <td className={classes.td}>
                        {action.actionDate !== ""
                          ? action.actionDate
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Compliance Type</td>
                      <td className={classes.td}>
                        {action.complianceType !== ""
                          ? action.complianceType
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Action Owners</td>
                      <td className={classes.td}>
                        {action.actionOwner?.map((owner) => (
                          <li>{owner.name}</li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Emails</td>
                      <td className={classes.td}>
                        {action.emails?.map((email) => (
                          <li>{email}</li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Compliance Title</td>
                      <td className={classes.td}>
                        {action.complianceDetails.title !== ""
                          ? action.complianceDetails.title
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Description</td>
                      <td className={classes.td}>
                        {action.complianceDetails.description !== ""
                          ? action.complianceDetails.description
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Authority</td>
                      <td className={classes.td}>
                        {action.complianceDetails.authority !== ""
                          ? action.complianceDetails.authority
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Company Name</td>
                      <td className={classes.td}>
                        {action.complianceDetails.companyName !== ""
                          ? action.complianceDetails.companyName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Organization</td>
                      <td className={classes.td}>
                        {action.complianceDetails.organization.map((org) => (
                          <>
                            <li>{org.departmentName}</li>
                            <li>{org.sectionName}</li>
                            <li>{org.subSectionName}</li>
                          </>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Penalty Type</td>
                      <td className={classes.td}>
                        {action.complianceDetails.penaltyTypeName !== ""
                          ? action.complianceDetails.penaltyTypeName
                          : "Not Set"}
                      </td>
                    </tr>
                    {/* <tr>
                    <td className={classes.td}>penalty Currency</td>
                    <td className={classes.td}>
                      {action.complianceDetails.penaltyCurrency !== ''
                        ? action.complianceDetails.penaltyCurrency
                        : 'Not Set'}
                    </td>
                  </tr> */}
                    <tr>
                      <td className={classes.td}>PrimaryOwnerName</td>
                      <td className={classes.td}>
                        {action.complianceDetails.primaryOwnerName !== ""
                          ? action.complianceDetails.primaryOwnerName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>SecondaryOwner</td>
                      <td className={classes.td}>
                        {action.complianceDetails.secondaryOwnerName !== ""
                          ? action.complianceDetails.secondaryOwnerName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>EscalationOwner</td>
                      <td className={classes.td}>
                        {action.complianceDetails.escalationOwnerName !== ""
                          ? action.complianceDetails.escalationOwnerName
                          : "Not Set"}
                      </td>
                    </tr>
                    <tr>
                      <td className={classes.td}>Priority</td>
                      <td className={classes.td}>
                        {action.complianceDetails.priority !== ""
                          ? action.complianceDetails.priority
                          : "Not Set"}
                      </td>
                    </tr>
                    {/* <tr>
                    <td className={classes.td}>Frequency</td>
                    <td className={classes.td}>
                      {selectedFrequency?.name !== '' ? selectedFrequency?.name : 'Not Set'}
                    </td>
                  </tr> */}
                    <tr>
                      <td className={classes.td}>Submission Deadline</td>
                      <td className={classes.td}>
                        {action.complianceDetails.submissionDeadline !== ""
                          ? action.complianceDetails.submissionDeadline
                          : "Not Set"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
