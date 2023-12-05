import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
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

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const { closeDrawer, openDrawer, selectedUser } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  console.log("SELECTED USER ", selectedUser);

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
          <Typography>{selectedUser?.firstName}</Typography>
        </Box>
        <Grid container>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.td}>First Name</td>
                <td className={classes.td}>
                  {selectedUser?.firstName !== ""
                    ? selectedUser?.firstName
                    : "Not Set"}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Last Name</td>
                <td className={classes.td}>
                  {selectedUser?.lastName !== ""
                    ? selectedUser?.lastName
                    : "Not Set"}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Email</td>
                <td className={classes.td}>
                  {selectedUser?.email !== "" ? selectedUser?.email : "Not Set"}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Phone Number</td>
                <td className={classes.td}>
                  {selectedUser?.phoneNumber !== ""
                    ? selectedUser?.phoneNumber
                    : "Not Set"}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Staff Number</td>
                <td className={classes.td}>
                  {selectedUser?.staffNumber !== ""
                    ? selectedUser?.staffNumber
                    : "Not Set"}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Company</td>
                <td className={classes.td}>
                  {selectedUser?.companyName !== ""
                    ? selectedUser?.companyName
                    : "Not Set"}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Department</td>
                <td className={classes.td}>
                  {selectedUser?.organization?.map((org) => {
                    if (!org.departmentName) {
                      return null;
                    }
                    return (
                      <>
                        <li>{org?.departmentName}</li>
                      </>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Section</td>
                <td className={classes.td}>
                  {selectedUser?.organization.map((org) => {
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
                  {selectedUser?.organization.map((org,index) => {
                    if (!org.subSectionName) {
                      return null;
                    }
                    return (
                      <>
                        <li key={index}>{org.subSectionName}</li>
                      </>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className={classes.td}>Role</td>
                <td className={classes.td}>
                  {selectedUser?.roleName !== ""
                    ? selectedUser?.roleName
                    : "Not Set"}
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Drawer>
    </div>
  );
}
