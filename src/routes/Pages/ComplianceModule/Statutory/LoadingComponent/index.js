import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { ThreeDots } from "react-loader-spinner";
import { Typography } from "@mui/material";

export const LoadingOverlay = () => {
  return (
    <div>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
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
      </Backdrop>
    </div>
  );
};
