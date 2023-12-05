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
  { label: HEADER.RISK_DASHBOARD, isActive: true },
];

const RiskManagement = () => {
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
            
            <Grid container spacing={12}>
              <Grid className={classes.card} item md={6} xs={12}>
                <Link style={{ textDecoration: "none" }} to="/risk-table">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Risk Universe
                    </Typography>
                  </Grid>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/risk-indicators">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Risk Indicators
                    </Typography>
                  </Grid>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/incident-management"
                >
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Incident Management
                    </Typography>
                  </Grid>
                </Link>

                <Link style={{ textDecoration: "none" }} to="/risk-actions">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Risk Actions
                    </Typography>
                  </Grid>
                </Link>
              </Grid>
              <Grid className={classes.card} item md={6} xs={12}>
                <Link style={{ textDecoration: "none" }} to="/risk-report">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Risk Reports
                    </Typography>
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default RiskManagement;
