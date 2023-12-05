import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { currentUser } from "../Utils/api";
import { useNavigate,useLocation } from "react-router-dom";
import { userLogout } from "../../Redux/features/auth/authentication";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  appbar: {
    // backgroundColor: "#3F51B5",
    color: "white",
    fontWeight: "300",
    border: "1px solid #3F51B5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  image: {
    maxWidth: "100%",
    height: 180,
    marginLeft: 0,
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.setItem('previousUrl',location.pathname)
      await dispatch(userLogout());
      handleClose();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const user = currentUser();

  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Grid
      container
      className={classes.appbar}
      px={4}
      py={2}
      sx={{ backgroundColor: "primary.main" }}
    >
      <Grid item>
        <Typography fontWeight={800} variant={"h5"}>
          RSolve
        </Typography>
      </Grid>
      <Grid item display={"flex"} alignItems={"center"}>
        <Typography mx={2} fontWeight={700}>
          {user?.surname}
        </Typography>
        <AccountCircleIcon
          style={{ cursor: "pointer" }}
          aria-controls={anchorEl ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? "true" : undefined}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          keepMounted={false}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {user && (
            <div>
              <Link to="/profile" style={{textDecoration: 'none',color: 'black'}}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </div>
          )}
        </Menu>
      </Grid>
    </Grid>
  );
};



export default TopBar;
