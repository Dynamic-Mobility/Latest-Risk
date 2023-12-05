import React, { useState } from "react";
import TopBar from "../../../../@dmt/common/TopBar";
import { Container, Grid, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";

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
    padding: 10,
  },
}));

const SideBarCompliane = (props) => {
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
  { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
  { label: HEADER.LEGAL_COMPLIANCE, link: "/legal-compliance" },
  { label: HEADER.CREATE_LEGAL_COMPLIANCE, isActive: true },
];

const CreatLegalCompliance = () => {
  const steps = ["Legal Definition", "Finish"];
  const [activeStep, setActiveStep] = useState(0);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);

  const isLoading = useSelector((state) => state.loading);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <SideBarCompliane
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid item md={9} xs={12} sx={{ mt:1 }}>
              <TextField
                size="small"
                margin="normal"
                fullWidth
                label="Case Title"
              />
              <TextField
                size="small"
                margin="normal"
                fullWidth
                label="Case Description"
              />
              <TextField
                size="small"
                margin="normal"
                fullWidth
                label="Case Status"
              />
              <TextField
                size="small"
                margin="normal"
                fullWidth
                label="Case Verdict"
              />
              <TextField
                size="small"
                margin="normal"
                fullWidth
                label="Next hearing date"
              />
              <TextField
                size="small"
                margin="normal"
                fullWidth
                label="Action Taken"
              />
              {activeStep !== steps.length - 1 && (
                <>
                  <Button
                    sx={{
                      float: "right",
                      margin: 3,
                    }}
                    color="primary"
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                  <Button
                    sx={{
                      float: "right",
                      margin: 3,
                    }}
                    disabled={activeStep === 0}
                    color="primary"
                    variant="contained"
                    onClick={handlePrev}
                  >
                    Back
                  </Button>
                </>
              )}

              {activeStep === steps.length - 1 && (
                <>
                  {!isUpdate ? (
                    <>
                      <Button
                        // onClick={() => handleComplianceCreation()}
                        sx={{
                          float: "right",
                          margin: 3,
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        // onClick={() => handleComplianceUpdate()}
                        sx={{
                          float: "right",
                          margin: 3,
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </>
                  )}

                  <Button
                    sx={{
                      float: "right",
                      margin: 3,
                    }}
                    color="primary"
                    variant="contained"
                    onClick={handlePrev}
                  >
                    Back
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </PageContainer>
      </Container>
    </>
  );
};

export default CreatLegalCompliance;
