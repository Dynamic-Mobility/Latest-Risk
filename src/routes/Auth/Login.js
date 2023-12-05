import React,{useState} from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import loginImg from "../../../src/Assets/Images/auth/login-img.png";
import logo from "../../../src/Assets/Images/auth/logo.png";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../.././Redux/features/auth/authentication";
import Loading from "../../@dmt/common/Loading";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserRole } from "../../Redux/features/Roles";
import jwtDecode from "jwt-decode";
import { authService } from "../../Redux/services/auth";


const useStyles = makeStyles((theme) => ({
  right: {
    backgroundColor: "#3A3363",
  },
  image: {
    maxWidth: "100%",
    height: 200,
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isLoading } = useSelector((store) => store.auth);
  const [loading,setLoading] = useState(false);




  // const forgotPassword = async () =>{
  //   const res = await authService.forgotPassword(decodedToken?.userId);
  //   console.log("Forgot Password ", res);
  // }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is Required"),
      password: Yup.string()
        .min(6, "Password must be 6 to 15 characters long")
        .max(15, "Password must not exceed 15 characters long")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(login(values));
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        if (token) {
          await dispatch(getUserRole(decodedToken.userId));

          // set the return url
          const previousUrl = localStorage.getItem('previousUrl');
          // check if previousUrl exists.
          if (previousUrl) {
            // remove the stored previous url from local storage
            localStorage.removeItem('previousUrl');
            history(previousUrl);
          } else {
            history("/");
          }
        }
      } catch (error) {
        toast.error(error);
      }
      finally{
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container maxWidth="xl">
        {isLoading && <Loading />}
        <Grid container height="100vh">
          <Grid px={{ md: 4, xs: 1 }} item md={6} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Box mt={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img className={classes.image} src={logo} alt="" />
                </Box>
                <Typography
                  color="primary"
                  fontWeight={800}
                  marginBottom={4}
                  variant="h5"
                >
                  Login
                </Typography>
                <Box>
                  <TextField
                    // id="email"
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    name="email"
                    label="Email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Box sx={{ color: "red" }}>{formik.errors.email}</Box>
                  ) : null}
                </Box>
                <Box>
                  <TextField
                    id="password"
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <Box sx={{ color: "red" }}>{formik.errors.password}</Box>
                  ) : null}
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  color="primary"
                  variant="outlined"
                  control={<Checkbox />}
                  label="Remember me"
                />
                <Typography sx={{cursor: 'pointer'}} color="primary">
                  Forgot Password?
                </Typography>
              </Box>
              <Box>
                <Button
                  disabled={loading}
                  type="submit"
                  style={{
                    borderRadius: "4px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    marginTop: "24px",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid
            sx={{
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "center",
            }}
            className={classes.right}
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

export default Login;
