import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import TopBar from "../../../@dmt/common/TopBar";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 12,
  },
  item: {
    // backgroundColor: "#3F51B5",
    height: 120,
    padding: 20,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
  },
  favorites: {
    backgroundColor: "white",
    height: 120,
    padding: 20,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    border: "1px solid #3F51B5",
  },
}));

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, isActive: true },
];

const Organization = () => {
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const classes = useStyles();

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7",height:'97vh' }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid container spacing={2} sx={{my:4}}>
              <Grid item md={6}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/subsidiary"
                    >
                      <Grid
                        className={classes.item}
                        sx={{ backgroundColor: "primary.main" }}
                      >
                        <Typography sx={{ fontSize: "27px" }}>Subsidiary</Typography>
                      </Grid>
                    </Link>
                  </Grid>
                  <Grid item md={6}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/departments"
                    >
                      <Grid
                        className={classes.item}
                        sx={{ backgroundColor: "primary.main" }}
                      >
                        <Typography sx={{ fontSize: "27px" }}>Departments</Typography>
                      </Grid>
                    </Link>
                  </Grid>
                  <Grid item md={6}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/sections"
                    >
                      <Grid
                        className={classes.item}
                        sx={{ backgroundColor: "primary.main" }}
                      >
                        <Typography sx={{ fontSize: "27px" }}>Sections</Typography>
                      </Grid>
                    </Link>
                  </Grid>
                  <Grid item md={6}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/sub-sections"
                    >
                      <Grid
                        className={classes.item}
                        sx={{ backgroundColor: "primary.main" }}
                      >
                        <Typography sx={{ fontSize: "27px" }}>Sub Sections</Typography>
                      </Grid>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default Organization;
