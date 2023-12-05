import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAutoCompleteValue } from "../../../../@dmt/Utils/commonHelper";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

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

export default function ViewStatutory(props) {
  const classes = useStyles();
  const { closeDrawer, openDrawer, selectedCompliance } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const { riskFrequencies } = useSelector(({ subsidiary }) => subsidiary);

  const action =
    activeStep > 0
      ? selectedCompliance.additionalControlActions[activeStep - 1]
      : null;

  if (!selectedCompliance) {
    return null;
  }

  // get value of selected frequency to display in preview
  const selectedFrequency = getAutoCompleteValue(
    riskFrequencies,
    selectedCompliance.keyIndicatorFrequencyId
  );

  console.log("SELECTED ", selectedCompliance);
  return (
    <div>
      <Drawer anchor={"right"} open={openDrawer} onClose={closeDrawer}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
            px: 2,
            backgroundColor: "#2F3B6E",
            color: "white",
            mb: 2,
          }}
        >
          <CloseIcon onClick={closeDrawer} sx={{ cursor: "pointer" }} />
          <Typography>{selectedCompliance.title}</Typography>
        </Box>
        <table className={classes.table}>
          <tbody>
            <tr>
              <td className={classes.td}>Compliance Title</td>
              <td className={classes.td}>
                {selectedCompliance?.title !== ""
                  ? selectedCompliance?.title
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Compliance Description</td>
              <td className={classes.td}>
                {selectedCompliance?.description !== ""
                  ? selectedCompliance?.description
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Company</td>
              <td className={classes.td}>
                {selectedCompliance?.companyName !== ""
                  ? selectedCompliance?.companyName
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Department</td>
              <td className={classes.td}>
                {selectedCompliance?.organization?.map((org) => {
                  if (!org.departmentName) {
                    return null;
                  }
                  return (
                    <>
                      <li key={org.id}>{org.departmentName}</li>
                    </>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Section</td>
              <td className={classes.td}>
                {selectedCompliance.organization.map((org) => {
                  if (!org.sectionName) {
                    return null;
                  }
                  return (
                    <>
                      <li>{org.sectionName}</li>
                    </>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Sub Section</td>
              <td className={classes.td}>
                {selectedCompliance.organization.map((org) => {
                  if (!org.subSectionName) {
                    return null;
                  }
                  return (
                    <>
                      <li>{org.subSectionName}</li>
                    </>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Authority</td>
              <td className={classes.td}>
                {selectedCompliance?.authority !== ""
                  ? selectedCompliance?.authority
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>
                Penalty in {selectedCompliance?.penaltyCurrency}
              </td>
              <td className={classes.td}>
                {selectedCompliance?.penalty !== ""
                  ? selectedCompliance?.penalty
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Primary Owner</td>
              <td className={classes.td}>
                {selectedCompliance?.primaryOwnerName !== ""
                  ? selectedCompliance?.primaryOwnerName
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Secondary Owner</td>
              <td className={classes.td}>
                {selectedCompliance?.secondaryOwnerName !== ""
                  ? selectedCompliance?.secondaryOwnerName
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Escalation Owner</td>
              <td className={classes.td}>
                {selectedCompliance?.escalationOwnerName !== ""
                  ? selectedCompliance?.escalationOwnerName
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Penalty Type</td>
              <td className={classes.td}>
                {selectedCompliance?.penaltyTypeName !== ""
                  ? selectedCompliance?.penaltyTypeName
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Priority</td>
              <td className={classes.td}>
                {selectedCompliance?.priority !== ""
                  ? selectedCompliance?.priority
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Frequency</td>
              <td className={classes.td}>
                {selectedFrequency?.name !== ""
                  ? selectedFrequency?.name
                  : "Not Set"}
              </td>
            </tr>
            <tr>
              <td className={classes.td}>Submission Deadline</td>
              <td className={classes.td}>
                {selectedCompliance?.submissionDeadline !== ""
                  ? selectedCompliance?.submissionDeadline
                  : "Not Set"}
              </td>
            </tr>
          </tbody>
        </table>
      </Drawer>
    </div>
  );
}
