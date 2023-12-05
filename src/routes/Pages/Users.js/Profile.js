import React, { useEffect } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import {
  Grid,
  Card,
  Container,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "../../../Redux/features/Profile";
import { profileApi } from "../../../Redux/services/profile";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import profileImg from "../../../Assets/Images/auth/avatar.png";
import defaultImg from "../../../Assets/Images/auth/default.png";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, link: "/profile-settings" },
  { label: HEADER.USERS_TABLE, isActive: true },
];

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const dispatch = useDispatch();
  const { profileDetails } = useSelector(({ profile }) => profile);
  const [toggle, setToggle] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [profileInformation, setProfileInformation] = React.useState(() => {
    const storedProfileDetails = localStorage.getItem("profileDetails");
    return storedProfileDetails
      ? JSON.parse(storedProfileDetails)
      : {
          firstName: "",
          lastName: "",
          phoneNumber: "",
        };
  });

  const handleFirstName = (e) => {
    setProfileInformation({ ...profileInformation, firstName: e.target.value });
  };

  const handleLastName = (e) => {
    setProfileInformation({ ...profileInformation, lastName: e.target.value });
  };

  const handlePhoneNumber = (e) => {
    setProfileInformation({
      ...profileInformation,
      phoneNumber: e.target.value,
    });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await profileApi.updateUserProfile(
        dispatch,
        profileInformation
      );
      console.log("UPDATE RESPONSE ", res);
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Save the profileDetails data to local storage
    localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
  }, [profileDetails]);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7",paddingBottom: 2 }}>
        <TopBar />
        <Container>
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid sx={{my:2}}>
              <Grid>
                <Card sx={{ px: 4, py: 2 }}>
                  {profileInformation?.profile_pic ? (
                    <img
                      style={{
                        height: "180px",
                        width: "180px",
                        borderRadius: "999px",
                      }}
                      className="width"
                      src={profileImg}
                      alt=""
                    />
                  ) : (
                    <img
                      style={{
                        height: "180px",
                        width: "180px",
                        borderRadius: "999px",
                      }}
                      className="width"
                      src={defaultImg}
                      alt=""
                    />
                  )}

                  <Box sx={{ marginTop: "-44px", marginLeft: "140px" }}>
                    <Button
                      variant="contained"
                      size="small"
                      id="basic-button"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <ModeEditIcon fontSize={"12px"} /> Edit
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleCloseMenu}>
                        Remove Photo
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenu}>
                        Upload Photo
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Typography
                    fontWeight={"bold"}
                    sx={{ color: "primary.main", mt: 2 }}
                    fontSize={"20px"}
                  >
                    {profileDetails?.firstName} {profileDetails?.lastName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Typography sx={{ color: "primary.main" }}>
                      {profileDetails?.email}
                    </Typography>
                    <Box>||</Box>
                    <Typography sx={{ color: "primary.main" }}>
                      {profileDetails?.companyName}
                    </Typography>
                  </Box>
                  {!toggle && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleToggle}
                        sx={{
                          width: "200px",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          my: 2,
                        }}
                      >
                        Edit Profile
                      </Button>
                    </>
                  )}

                  {/* EDIT FORM  */}
                  {toggle && (
                    <>
                      {profileDetails && (
                        <Grid container>
                          <Grid item md={3}>
                            <form>
                              <TextField
                                fullWidth
                                value={profileInformation?.firstName}
                                onChange={handleFirstName}
                                name="firstName"
                                size="small"
                                sx={{ my: 1 }}
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <TextField
                                fullWidth
                                value={profileInformation?.lastName}
                                onChange={handleLastName}
                                size="small"
                                sx={{ my: 1 }}
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <TextField
                                fullWidth
                                value={profileInformation?.phoneNumber}
                                onChange={handlePhoneNumber}
                                size="small"
                                sx={{ my: 1 }}
                                id="outlined-basic"
                                label="Phone Number"
                                variant="outlined"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <Button
                                type="submit"
                                onClick={handleSubmit}
                                variant="contained"
                                size="small"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => handleToggle()}
                                sx={{ mx: 1 }}
                                variant="outlined"
                                size="small"
                              >
                                Cancel
                              </Button>
                            </form>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )}

                  {/* END OF EDIT FORMf */}
                </Card>
                <Card sx={{ my: 4, py: 2, px: 4 }}>
                  <Typography
                    fontWeight="bold"
                    sx={{ fontSize: "20px", color: "primary.main", py: 1 }}
                  >
                    Personal Details
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {/* <Typography>Phone : </Typography> */}
                    <Chip
                      label={profileDetails?.phoneNumber}
                      variant="contained"
                    />
                    <Chip
                      label={profileDetails?.companyName}
                      variant="contained"
                    />
                    <Chip
                      label={profileDetails?.roleName}
                      variant="contained"
                    />
                    <Chip
                      label={profileDetails?.organization?.[0]?.departmentName}
                      variant="contained"
                    />
                    <Chip
                      label={profileDetails?.organization?.[0]?.sectionName}
                      variant="contained"
                    />
                    <Chip label="Sub-Section" variant="contained" />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </PageContainer>
          <EditProfile
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
          />
        </Container>
      </Box>
    </>
  );
};

export default Profile;
