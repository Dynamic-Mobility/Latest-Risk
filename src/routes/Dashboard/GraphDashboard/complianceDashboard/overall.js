import React from "react";
import { Grid, Typography, Container, Card, Box } from "@mui/material";
import Piechart from "./piechart";
import Graph from "./overalgraph";
import DepartmentGraph from "./DepartmentGraph";
import EnterpriseDashboard from "./enterpriseCompliance";
import PendingIncidentManagement from "./pendingIncidentManagements";
import StatutoryComplianceDashboard from "./statutoryCompliance";
import UpcomingStatutoryObligations from "./statutoryCompliance/UpcomingStatutoryObligations";
import NonCompliance from "./NonCompliance";
import LegalCompliance from "./LegalCompliance";
import { fetchComplianceSummaryData } from "../../../../Redux/features/Compliance/dashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ApiIcon from "@mui/icons-material/Api";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CompareIcon from "@mui/icons-material/Compare";
import PolicyIcon from "@mui/icons-material/Policy";
import BroadcastOnPersonalIcon from "@mui/icons-material/BroadcastOnPersonal";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { useState } from "react";

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
  { label: HEADER.COMPLIANCE_DASHBOARD, isActive: true },
];

const Overall = () => {
  const dispatch = useDispatch();
  const { complianceSummary } = useSelector(
    ({ complianceSummary }) => complianceSummary
  );
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);

  const getComplianceSummary = async () => {
    await dispatch(fetchComplianceSummaryData());
  };

  useEffect(() => {
    getComplianceSummary();
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7",py:2,marginTop: -5 }}>
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            {/* <Typography
              fontSize={"24px"}
              fontWeight={"bold"}
              sx={{ color: "#355EA9", marginBottom: 2, marginTop: 3 }}
            >
              Compliance Dashboard
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[0]}`,
                    py: 4,
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
                    <AssuredWorkloadIcon fontSize="large" />
                    <Typography fontWeight="bold">
                      Overall Compliance {complianceSummary?.overallCompliance}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[1]}`,
                    py: 4,
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
                    <ApiIcon fontSize="large" />
                    <Typography fontWeight="bold">
                      Enterprise Compliance{" "}
                      {complianceSummary?.enterpriseCompliance}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[2]}`,
                    py: 4,
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
                    <RoomPreferencesIcon fontSize="large" />
                    <Typography fontWeight="bold">
                      Statutory Compliance{" "}
                      {complianceSummary?.statutoryCompliance}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card
                  sx={{
                    color: "white",
                    backgroundColor: `${backGroundColors[3]}`,
                    py: 4,
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
                    <Typography fontWeight="bold">
                      Legal Compliance {complianceSummary?.legalCompliance}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Grid container my={2} spacing={2}>
              <Grid item md={7} xs={12}>
                <Graph />
              </Grid>
              <Grid item md={5} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Grid item xs={12}>
                      <Card
                        sx={{
                          color: "black",
                          backgroundColor: `${backGroundColors[4]}`,
                          py: 3,
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
                          <PolicyIcon fontSize="large" />
                          <Typography fontWeight="bold">
                            Policies and Procedures
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Grid item xs={12}>
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
                          <BroadcastOnPersonalIcon fontSize="large" />
                          <Typography fontWeight="bold">
                            Penalties in Local Currency
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Piechart />
              </Grid>
            </Grid>
            <DepartmentGraph />
            <EnterpriseDashboard />
            <PendingIncidentManagement />
            <StatutoryComplianceDashboard />
            <UpcomingStatutoryObligations />
            <NonCompliance />
            <LegalCompliance /> */}
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default Overall;
