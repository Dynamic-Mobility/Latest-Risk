import React, { useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import Container from "@mui/material/Container";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";

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
  { label: HEADER.COMPLIANCE_MANAGEMENT, isActive: true },
];

const SubCompliance = () => {
  const classes = useStyles();
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid mt={2} display={"flex"} justifyContent={"flex-end"}>
              <Grid>
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
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              m={2}
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
                <Link
                  style={{ textDecoration: "none" }}
                  to="/statutory-compliance"
                >
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Statutory Compliance
                    </Typography>
                  </Grid>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/enterprise-compliance"
                >
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Enterprise Compliance
                    </Typography>
                  </Grid>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/legal-compliance">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Legal Compliance
                    </Typography>
                  </Grid>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/policy-procedure">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Policy Procedures
                    </Typography>
                  </Grid>
                </Link>
              </Grid>
              <Grid className={classes.card} item md={6} xs={12}>
                <Link style={{ textDecoration: "none" }} to="/compliance-report">
                  <Grid
                    className={classes.item}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography sx={{ fontSize: "27px" }}>
                      Compliance Reports
                    </Typography>
                  </Grid>
                </Link>
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

export default SubCompliance;
