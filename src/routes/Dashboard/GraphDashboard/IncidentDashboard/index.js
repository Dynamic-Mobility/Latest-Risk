import React,{useState} from "react";
import TopBar from "../../../../@dmt/common/TopBar";
import { Box, Grid, Card, Typography, Container } from "@mui/material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ApiIcon from "@mui/icons-material/Api";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CompareIcon from "@mui/icons-material/Compare";
import { useSelector } from "react-redux";
import Overall from "./Overall";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";


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
  { label: HEADER.INCIDENT_DASHBOARD, isActive: true },
];

const IncidentDashboard = () => {
  const { complianceSummary } = useSelector(
    ({ complianceSummary }) => complianceSummary
  );
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            {/* <Typography
              fontSize={"24px"}
              fontWeight={"bold"}
              sx={{ color: "#355EA9", marginBottom: 2, marginTop: 3 }}
            >
              Incident Dashboard
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
                      No. of Incidents Identified{" "}
                      {complianceSummary?.overallCompliance}
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
                    px: 0.4,
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
                    <ApiIcon fontSize="large" />
                    <Typography fontWeight="bold">
                      Loss amount due to incidents{" "}
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
                      Overall incidents risk rating{" "}
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
                      gap: 2,
                    }}
                  >
                    <CompareIcon fontSize="large" />
                    <Typography fontWeight="bold">
                      Maximum single loss incident{" "}
                      {complianceSummary?.legalCompliance}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Overall /> */}
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default IncidentDashboard;
