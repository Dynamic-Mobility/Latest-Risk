import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { ThreeDots } from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    // top: "65%",
    // left: "20%",
    transform: "translate(-50%, -50%)",
    transform: "-webkit-translate(-50%, -50%)",
    transform: "-moz-translate(-50%, -50%)",
    transform: "-ms-translate(-50%, -50%)",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Box className={classes.loading} sx={{ display: "flex" }}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Box>
  );
};

export default Loading;
