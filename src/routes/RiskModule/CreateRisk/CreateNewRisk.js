import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TopBar from "../../../@dmt/common/TopBar";
import RiskSteps from "./index";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.RISK_TABLE, link: "/risk-table" },
  { label: HEADER.CREATE_RISK, isActive: true },
];

const CreateRisk = () => {
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <Grid
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {/* <Grid display={"flex"} alignItems={"center"}>
              <Typography color="primary">
                <Link style={{ textDecoration: "none" }} to="/">
                  Modules
                </Link>
              </Typography>
              <KeyboardArrowRightIcon color="primary" />
              <Typography color="primary">
                <Link style={{ textDecoration: "none" }} to="/risk-management">
                  Risk Management
                </Link>
              </Typography>
              <KeyboardArrowRightIcon color="primary" />
              <Typography color="primary">
                <Link style={{ textDecoration: "none" }} to="/risk-table">
                  Risk Universe
                </Link>
              </Typography>
              <KeyboardArrowRightIcon color="primary" />
              <Typography color="primary">
                <Link style={{ textDecoration: "none" }} to="/risk-table">
                  Create Risk (New)
                </Link>
              </Typography>
            </Grid> */}
            {/* <Grid>
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
            </Grid> */}
          </Grid>
          {/* <Grid
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            my={2}
          >
            <Typography color="primary" fontWeight={800}>
              Create Risk(New)
            </Typography>
          </Grid> */}
          <RiskSteps />
        </PageContainer>
      </Container>
    </>
  );
};

export default CreateRisk;
