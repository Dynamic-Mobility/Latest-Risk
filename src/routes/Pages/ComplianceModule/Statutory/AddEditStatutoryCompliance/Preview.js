import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { getAutoCompleteValue } from "../../../../../@dmt/Utils/commonHelper";

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
    marginTop: "12px",
  },
  title: {
    marginBottom: 10,
  },
}));

const Preview = (props) => {
  const classes = useStyles();
  const { complianceDetails } = props;
  const { frequencies } = useSelector(({ subsidiary }) => subsidiary);
  const selectedFrequency = getAutoCompleteValue(frequencies, complianceDetails.frequency);
  return (
    <>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.td}>Compliance Title</td>
            <td className={classes.td}>
              {complianceDetails?.title !== ""
                ? complianceDetails?.title
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Compliance Description</td>
            <td className={classes.td}>
              {complianceDetails?.description !== ""
                ? complianceDetails?.description
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Company</td>
            <td className={classes.td}>
              {complianceDetails?.companyName !== ""
                ? complianceDetails?.companyName
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Department</td>
            <td className={classes.td}>
              {complianceDetails?.organization?.map((org) => {
                if (!org.departmentName) {
                  return null;
                }
                return (
                  <>
                    <li>{org.departmentName}</li>
                  </>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Section</td>
            <td className={classes.td}>
              {complianceDetails.organization?.map((org) => {
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
              {complianceDetails.organization?.map((org) => {
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
              {complianceDetails?.authority !== ""
                ? complianceDetails?.authority
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>
              Penalty in {complianceDetails?.penaltyCurrency}
            </td>
            <td className={classes.td}>
              {complianceDetails?.penalty !== ""
                ? complianceDetails?.penalty
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Primary Owner</td>
            <td className={classes.td}>
              {complianceDetails?.primaryOwnerName !== ""
                ? complianceDetails?.primaryOwnerName
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Secondary Owner</td>
            <td className={classes.td}>
              {complianceDetails?.secondaryOwnerName !== ""
                ? complianceDetails?.secondaryOwnerName
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Escalation Owner</td>
            <td className={classes.td}>
              {complianceDetails?.escalationOwnerName !== ""
                ? complianceDetails?.escalationOwnerName
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Penalty Type</td>
            <td className={classes.td}>
              {complianceDetails?.penaltyTypeName !== ""
                ? complianceDetails?.penaltyTypeName
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Priority</td>
            <td className={classes.td}>
              {complianceDetails?.priority !== ""
                ? complianceDetails?.priority
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Frequency</td>
            <td className={classes.td}>
              {selectedFrequency ? selectedFrequency.name : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Submission Deadline</td>
            <td className={classes.td}>
              {complianceDetails?.submissionDeadline !== ""
                ? complianceDetails?.submissionDeadline
                : "Not Set"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Preview;
