import React, { useEffect } from "react";
import TopBar from "../../../../@dmt/common/TopBar";
import { Box, Grid, Card, Typography, Container } from "@mui/material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ApiIcon from "@mui/icons-material/Api";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CompareIcon from "@mui/icons-material/Compare";
import { useSelector, useDispatch } from "react-redux";
import OverallRisk from "./OverallRisk";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { useState } from "react";
import { fetchRiskSummaryData } from "../../../../Redux/features/RiskUniverse/dashboard";

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.GRAPH_DASHBOARD, link: "/graph-dashboard" },
  { label: HEADER.RISK_DASHBOARD, isActive: true },
];

const RiskDashboard = () => {
  const { riskSummary } = useSelector(({ riskDashboard }) => riskDashboard);
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRiskSummaryData());
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            {/* <Typography
              fontSize={"24px"}
              fontWeight={"bold"}
              sx={{ color: "#355EA9", marginBottom: 2, marginTop: 4 }}
            >
              Risk Dashboard
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[0]}`,
                    py: 2,
                    px: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <AssuredWorkloadIcon fontSize="large" />
                    <Typography>
                      No. of Risks Identified{" "}
                      <Typography
                        fontWeight={"bold"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          my: 1,
                        }}
                      >
                        {riskSummary?.totalRisks}
                      </Typography>
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[1]}`,
                    py: 2,
                    px: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <ApiIcon fontSize="large" />
                    <Typography>
                      Category with the highest Risk{" "}
                      <Typography
                        fontWeight="bold"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          my: 1,
                        }}
                      >
                        {riskSummary?.overallRiskCategory}
                      </Typography>
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[2]}`,
                    py: 2,
                    px: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <RoomPreferencesIcon fontSize="large" />
                    <Typography>
                      Overall Risk Rating
                      <Typography
                        fontWeight="bold"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          my: 1,
                        }}
                      >
                        {riskSummary?.riskRating}
                      </Typography>
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[3]}`,
                    py: 2,
                    px: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <CompareIcon fontSize="large" />
                    <Typography>
                      Risk Score
                      <Typography
                        fontWeight="bold"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          my: 1,
                        }}
                      >
                        {riskSummary?.riskScore}
                      </Typography>
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <OverallRisk /> */}
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default RiskDashboard;
