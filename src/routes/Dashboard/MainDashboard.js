import React from "react";
import Container from "@mui/material/Container";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TopBar from "../../@dmt/common/TopBar";
import { Link } from "react-router-dom";

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

const MainDashboard = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <Grid mt={2} display={"flex"} justifyContent={"flex-end"}>
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
            my={2}
          >
            <Typography color="primary" fontWeight={800}>
              Modules
            </Typography>
            {/* <Typography color="primary" fontWeight={800}>
            Favorites
          </Typography> */}
          </Grid>
          <Grid container spacing={4}>
            <Grid className={classes.card} item md={6} xs={12}>
              <Link style={{ textDecoration: "none" }} to="/graph-dashboard">
                <Grid
                  className={classes.item}
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <Typography sx={{ fontSize: "27px" }}>
                      Dashboard and Reports
                    </Typography>
                  </div>
                </Grid>
              </Link>

              <Link style={{ textDecoration: "none" }} to="/risk-management">
                <Grid
                  className={classes.item}
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <Typography sx={{ fontSize: "27px" }}>
                      Risk Management
                    </Typography>
                  </div>
                </Grid>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to="/compliance-management"
              >
                <Grid
                  className={classes.item}
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <Typography sx={{ fontSize: "27px" }}>
                      Compliance Management
                    </Typography>
                  </div>
                </Grid>
              </Link>
              <Grid
                className={classes.item}
                sx={{ backgroundColor: "primary.main" }}
              >
                <div className="flex items-center justify-center h-full">
                  <Typography sx={{ fontSize: "27px" }}>
                    Continuity Management
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Grid className={classes.card} item md={6} xs={12}>
              <Grid
                className={classes.item}
                sx={{ backgroundColor: "primary.main" }}
              >
                <div className="flex items-center justify-center h-full">
                  <Typography sx={{ fontSize: "27px" }}>Governance</Typography>
                </div>
              </Grid>
              <Grid
                className={classes.item}
                sx={{ backgroundColor: "primary.main" }}
              >
                <div className="flex items-center justify-center h-full">
                  <Typography sx={{ fontSize: "27px" }}>
                    Data Protection
                  </Typography>
                </div>
              </Grid>

              <Link style={{ textDecoration: "none" }} to="/profile-settings">
                <Grid
                  className={classes.item}
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <Typography sx={{ fontSize: "27px" }}>
                      Profile Settings
                    </Typography>
                  </div>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MainDashboard;
