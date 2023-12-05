import React, { useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";


const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 10,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 10,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  button: {
    color: "#3F51B5",
    paddig: 10,
  },
}));

const SideBarReport = (props) => {
  const classes = useStyles();
  const { steps, activeStep, setActiveStep } = props;

  return (
    <div>
      {steps?.map((step, index) => (
        <Grid
          my={3}
          onClick={(e) => setActiveStep(index)}
          className={
            index === activeStep ? classes.isActive : classes.notActive
          }
          key={index}
        >
          <Typography>{step}</Typography>
        </Grid>
      ))}
    </div>
  );
};

const initialBreadcrumbs = [
    { label: HEADER.DASHBOARD, link: "/" },
    { label: HEADER.COMPLIANCE_MANAGEMENT, link: '/compliance-management' },
    { label: HEADER.COMPLIANCE_REPORT, link:'/compliance-report'},
    { label: HEADER.CREATE_COMPLIANCE_REPORT, isActive: true },
  ];

const CreateComplianceReport = () => {
  const steps = ["Report Definition"];
  const [activeStep, setActiveStep] = useState(0);
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  return (
    <>
      <Box className="bg-[#f4f4f7] h-screen">
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid container spacing={4}>
              <Grid item md={3} xs={12}>
                <SideBarReport {...{ steps, activeStep, setActiveStep }} />
              </Grid>
              <Grid item md={9} xs={12} sx={{ mt: 3 }}>
                <Box className="bg-white shadow-2xl rounded p-3">
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Title"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Description"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Owner"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Attachment"
                    sx={{ my: 1 }}
                  />
                  <Box className="flex items-center justify-end">
                    <Button variant="contained" color="primary">
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default CreateComplianceReport;
