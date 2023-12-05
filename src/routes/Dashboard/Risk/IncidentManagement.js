import React, { useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import Container from "@mui/material/Container";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 12,
  },
  item: {
    // backgroundColor: "#3F51B5",
    height: 170,
    padding: 20,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
  },
  favorites: {
    backgroundColor: "white",
    height: 170,
    padding: 20,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    border: "1px solid #3F51B5",
  },
}));

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.INCIDENT_DASHBOARD, isActive: true },
];

const IncidentManagement = () => {
  const classes = useStyles();
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <TextField
                size="small"
                variant="outlined"
                color="primary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              my={4}
            >
              <Typography color="primary" fontWeight={800}>
                Modules
              </Typography>
              {/* <Typography color="primary" fontWeight={800}>
              Favorites
            </Typography> */}
            </Grid>
            <Grid container spacing={12}>
              <Grid className={classes.card} item md={6} xs={12}>
                <Link style={{ textDecoration: "none" }} to="/incident-table">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Incident Creation
                    </Typography>
                  </Grid>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/actionable-incident">
                <Grid
                  className={classes.item}
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <Typography sx={{ fontSize: "27px" }}>
                    Actionable Incidents
                  </Typography>
                </Grid>
                </Link>
              </Grid>
              <Grid className={classes.card} item md={6} xs={12}>
                <Grid
                  className={classes.item}
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <Typography sx={{ fontSize: "27px" }}>
                    Incident Reports
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid className={classes.card} item md={6} xs={12}>
              <Grid className={classes.favorites}>
                <Typography sx={{ fontSize: "27px" }}>
                  Compliance Reports
                </Typography>
              </Grid>
              <Grid className={classes.favorites}>
                <Typography sx={{ fontSize: "27px" }}>Risk Creation</Typography>
              </Grid>
              <Grid className={classes.favorites}>
                <Typography sx={{ fontSize: "27px" }}>
                  Incident Creation
                </Typography>
              </Grid>
            </Grid> */}
            </Grid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default IncidentManagement;
