import React from "react";
import { Grid } from "@mui/material";
import IncidentCalender from "./IncidentCalender";
import IncidentPieChart from "./IncidentPieChart";
import IncidentSummaryTable from "./IncidentSummaryTable";

const IncidentActions = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={7}>
            <IncidentCalender />
        </Grid>
        <Grid item md={5}>
          <IncidentPieChart />
        </Grid>
      </Grid>
      <IncidentSummaryTable />
    </>
  );
};

export default IncidentActions;
