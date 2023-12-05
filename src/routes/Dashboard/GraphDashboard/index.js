import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import TopBar from "../../../@dmt/common/TopBar";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";

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
  { label: HEADER.GRAPH_DASHBOARD, isActive: true },
];

const GraphDashboard = () => {
  const classes = useStyles();
  const [breadcrumbs,setbreadcrumbs] = useState(initialBreadcrumbs);


  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid container spacing={4}>
              <Grid className={classes.card} sx={{my:4}} item md={6} xs={12}>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/compliance-dashboard"
                >
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Compliance Dashboard
                    </Typography>
                  </Grid>
                </Link>

                <Link style={{ textDecoration: "none" }} to="/risk-dashboard">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Risk Dashboard
                    </Typography>
                  </Grid>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/incident-dashboard"
                >
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Incident Dashboard
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

export default GraphDashboard;
