import React from "react";
import { Grid,Container } from "@mui/material";
import Graph from "./Graph";
import IncidentByLoss from "./IncidentByLoss";
import SingleIncidentMapping from "./SingleIncidentMapping";
import IncidentActions from "./IncidentActions";

const Overall = () => {
  return (
    <>
        <Grid container my={2} spacing={2}>
          <Grid item md={6} xs={12}>
            <Graph />
          </Grid>
          <Grid item md={6} xs={12}>
            <IncidentByLoss />
          </Grid>
          <Grid container>
            <Grid item md={12} xs={12} spacing={2}>
              <SingleIncidentMapping />
            </Grid>
          </Grid>
          <IncidentActions />
        </Grid>
    </>
  );
};

export default Overall;
