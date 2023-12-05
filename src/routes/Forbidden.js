import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <>
      <Box sx={{backgroundColor: '#f4f4f7'}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box>
            <Typography variant="h1" fontWeight={"bold"}>
              403
            </Typography>
            <Typography fontWeight={"bold"} my={2} sx={{ textAlign: "center" }}>
              Restricted Access
            </Typography>
            <Link to="/">
              <Button size="small" variant="contained">
                Return to Main Page
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Forbidden;
