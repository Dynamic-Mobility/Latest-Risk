import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import BubbleChart from "./BubbleChart";
import Treemap from "./Treemap";
import RiskByLoss from "./RiskByLoss";
import RiskIndicatorTable from "./RiskIndicatorTable";
import OrganizationRiskTable from "./OrganizationRiskTable";
import RiskActions from "./RiskActions.js";
import CriteriaMenu from "./CriteriaMenu";
import { useSelector } from "react-redux";

const OverallRisk = () => {
  const { criteriaResponse } = useSelector(
    ({ riskDashboard }) => riskDashboard
  );

  // filter out empty objects from the array
  const filteredData = criteriaResponse.filter((item) =>{
    return(
      item.risks !== 0,
      item.probability !== 0,
      item.residualriskval !== 0
    )
  })

  return (
    <>
      <CriteriaMenu />
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <BubbleChart />
        </Grid>
        <Grid item md={5} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Residual Risk</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography>Risk Score</Typography>
            </Grid>
          </Grid>
          <hr />
          {filteredData.map((department) => (
            <>
              <Grid container spacing={2} my={1}>
                <Grid item md={4}>
                  <Typography>{department.name}</Typography>
                </Grid>
                <Grid item md={4}>
                  {department.residualrisk ? (
                    <>
                      <Chip label={department.residualrisk} color="success" />
                    </>
                  ) : (
                    <Chip label="Data not available" color="success" />
                  )}
                </Grid>
                <Grid item md={4}>
                  <Typography>{department.riskscore}</Typography>
                </Grid>
              </Grid>
              <hr />
            </>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2} my={4}>
        <Grid item md={6} xs={12}>
          <Treemap />
        </Grid>
        <Grid item md={6} xs={12}>
          <RiskByLoss />
        </Grid>
      </Grid>
      <RiskIndicatorTable />
      <OrganizationRiskTable />
      <RiskActions />
    </>
  );
};

export default OverallRisk;
