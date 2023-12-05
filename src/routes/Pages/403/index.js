import React from "react";
// import { Button, IconButton, InputBase } from "@material/core";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  errorNumber: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 30,
    textShadow: "10px 6px 8px hsla(0,0%,45.9%,.8)",
  },
  searchRoot: {
    position: "relative",
    width: 260,
    [theme.breakpoints.up("md")]: {
      width: 350,
    },
    "& .searchBtn": {
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
    },
    "& .MuiInputBase-root": {
      width: "100%",
    },
    "& .MuiInputBase-input": {
      height: 48,
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      boxSizing: "border-box",
      padding: "5px 50px 5px 15px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const Error403 = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Box fontSize={{ xs: 100, sm: 160 }} className={classes.errorNumber}>
          403
        </Box>
        <Box fontSize={{ xs: 16, sm: 24 }} mb={8} color="grey.500">
          We are sorry, you do not have the permission to access this page.
        </Box>
        <Box className={classes.searchRoot}>
          <InputBase
            placeholder={"Search..."}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton className="searchBtn">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box mt={8}>
          <Link to={"/"}>
            <Button variant="contained" color="primary">
              {/* <IntlMessages id="extraPages.goHome" /> */}
              <h3>Hello World</h3>
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Error403;
