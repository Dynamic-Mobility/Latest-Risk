import React from "react";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { useState } from "react";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import TopBar from "../../../../@dmt/common/TopBar";
import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 14,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 14,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  button: {
    color: "#3F51B5",
    padding: 10,
  },
}));

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
  { label: HEADER.POLICY_PROCEDURE, link: "/policy-procedure" },
  { label: HEADER.CREATE_PROCEDURE, isActive: true },
];

const SideBarProcedure = (props) => {
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

const CreateProcedure = () => {
  const steps = ["Procedure"];
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <Grid className="md:flex gap-4">
            <Grid item md={3} xs={12} className="md:w-3/12 w-full">
              <SideBarProcedure steps={steps} activeStep={activeStep} />
            </Grid>
            <Grid item md={9} xs={12} mt={2} className="md:w-9/12 w-full">
              {activeStep === 0 && (
                <>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Procedure Title"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Procedure Description"
                    sx={{ my: 1 }}
                  />

                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Procedure Review Deadline"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="file"
                    sx={{ my: 1 }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Procedure Owner Department"
                    sx={{ my: 1 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary">
                      Save
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </PageContainer>
      </Container>
    </>
  );
};

export default CreateProcedure;
