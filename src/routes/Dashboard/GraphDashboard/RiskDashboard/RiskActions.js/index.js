import React from "react";
import { Grid } from "@mui/material";
import RiskCalender from "./RiskCalender";
import RiskPieChart from "./RiskPieChart";
import RiskActionSummaryTable from "./RiskActionSummaryTable";

const RiskActions = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={7}>
          <RiskCalender />
        </Grid>
        <Grid item md={5}>
          <RiskPieChart />
        </Grid>
      </Grid>
      <RiskActionSummaryTable />
    </>
  );
};

export default RiskActions;
