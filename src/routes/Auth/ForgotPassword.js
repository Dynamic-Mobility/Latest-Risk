import React, { useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import loginImg from "../../../src/Assets/Images/auth/password.png";
import logo from "../../../src/Assets/Images/auth/logo.png";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
  right: {
    backgroundColor: "#F4F5FB",
  },
  image: {
    maxWidth: "100%",
    height: 200,
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  return (
    <>
      <Container maxWidth="xl">
        <Grid container height="100vh">
          <Grid
            className={classes.right}
            px={{ md: 4, xs: 1 }}
            item
            md={6}
            xs={12}
          >
            <Box mt={4}>
              <img className={classes.image} src={logo} alt="" />
              <Typography
                color="primary"
                fontWeight={800}
                marginBottom={4}
                variant="h5"
              >
                Forgot Password
              </Typography>
              <Box>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  defaultValue={email}
                  margin="normal"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box>
              <Button
                style={{
                  borderRadius: "4px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  marginTop: "24px",
                }}
                variant="contained"
                color="primary"
              >
                Reset Password
              </Button>
              <Typography color="primary" mt={4}>
                Don't remember your email? Contact Support
              </Typography>
            </Box>
          </Grid>
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
            md={6}
            xs={12}
          >
            <img src={loginImg} alt="" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ForgotPassword;
