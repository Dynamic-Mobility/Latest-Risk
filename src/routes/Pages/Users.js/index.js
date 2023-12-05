import React, { useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import Container from "@mui/material/Container";
import { Grid, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import AddDepartmentForm from "./AddDepartmentForm";
import { AddCircle } from "@mui/icons-material";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { usersApi } from "../../../Redux/services/Users";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/features/loading";
import { LoadingOverlay } from "../ComplianceModule/Statutory/LoadingComponent";
import Autocomplete from "@mui/material/Autocomplete";
import { getAutoCompleteValue } from "../../../@dmt/Utils/commonHelper";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  fetchAllDepartments,
  fetchAllSections,
  fetchAllSubSections,
  fetchAllSubsidiaries,
} from "../../../Redux/features/Subsidiaries";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAllRoles } from "../../../Redux/features/Roles";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchAllRiskOwnerTypes } from "../../../Redux/features/RiskOwners";
import { riskOwnerApi } from "../../../Redux/services/RiskOwners";
import ExternalAddDepartmentForm from "./ExternalAddDepartmentForm";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.USERS_TABLE, link: "/users-table" },
  { label: HEADER.CREATE_USER, isActive: true },
];

const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 20,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 20,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  button: {
    color: "#3F51B5",
    paddig: 10,
  },
}));

const SideBar = (props) => {
  const classes = useStyles();
  const { steps, activeStep, setActiveStep } = props;

  return (
    <div>
      {steps?.map((step, index) => (
        <Grid
          my={3}
          onClick={(e) => setActiveStep(index)}
          className={
            index === activeStep ? classes.isActive : classes.notActive
          }
          key={index}
        >
          <Typography>{step}</Typography>
        </Grid>
      ))}
    </div>
  );
};

// ----------INITIAL STATE------------//
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "12345678",
  companyId: null,
  companyName: "",
  organization: [
    {
      departmentId: null,
      departmentName: "",
      sectionId: null,
      sectionName: "",
      subSectionId: null,
      subSectionName: "",
      headId: null,
      headName: "",
    },
  ],
  confirmPassword: "12345678",
  phoneNumber: "",
  staffNumber: "",
  ext_Number: "",
  roleId: null,
  roleName: "",
};

const initialOrganization = {
  departmentId: null,
  departmentName: "",
  sectionId: null,
  sectionName: "",
  subSectionId: null,
  subSectionName: "",
};

const initialExternal = {
  name: "",
  email: "",
  phoneNumber: "",
  companyId: "",
  password: "12345678",
  confirmPassword: "12345678",
  riskOwnerTypeId: null,
  organization: [
    {
      departmentId: null,
      departmentName: "",
      sectionId: null,
      sectionName: "",
      subSectionId: null,
      subSectionName: "",
      headId: null,
      headName: "",
    },
  ],
};

const Users = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [userDetails, setUserDetails] = useState(initialState);
  const [externalDetails, setExternalDetails] = useState(initialExternal);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const { subsidiaries, departments, sections, subSections } = useSelector(
    ({ subsidiary }) => subsidiary
  );
  const { riskOwnerTypes } = useSelector(({ riskOwner }) => riskOwner);
  const { organization } = userDetails;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const { roles } = useSelector(({ role }) => role);
  const steps = ["Personal Details", "Work Details", "Preview"];
  const [isUpdate, setIsUpdate] = useState(false);

  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log("CATEGORY ", category);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    showSuccessDialog(false);
  };

  // filter out internal types
  const filteredTypes = riskOwnerTypes?.filter(
    (type) => type.ownerType !== "Internal"
  );

  const handleRemoveDept = (index) => {
    const data = [...organization];
    if (data.length - 1 !== 0) {
      data.splice(index, 1);
      setUserDetails({ ...userDetails, organization: data });
    } else {
      toast.error("At least One Department is Required");
    }
  };
  const handleAddDepartment = () => {
    setUserDetails({
      ...userDetails,
      organization: [...userDetails.organization, initialOrganization],
    });
  };

  const handleOnDepartmentChange = (index) => (event, value) => {
    const data = [...userDetails.organization];
    if (value !== null) {
      data[index] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    } else {
      data[index] = {
        departmentId: null,
        departmentName: "",
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };

  const handleOnExternalDepartmentChange = (index) => (event, value) => {
    const data = [...externalDetails.organization];
    if (value !== null) {
      data[index] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    } else {
      data[index] = {
        departmentId: null,
        departmentName: "",
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    }
    setExternalDetails({ ...externalDetails, organization: [...data] });
  };

  const handleOnSectionChange = (index) => (event, value) => {
    const data = [...organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    } else {
      data[index] = {
        ...data[index],
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };

  const handleOnExternalSectionChange = (index) => (event, value) => {
    const data = [...externalDetails?.organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    } else {
      data[index] = {
        ...data[index],
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    }
    setExternalDetails({ ...externalDetails, organization: [...data] });
  };

  const handleOnSubSectionChange = (index) => (event, value) => {
    const data = [...organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        subSectionId: value.id,
        subSectionName: value.name,
        headId: null,
        headName: "",
      };
    } else {
      data[index] = {
        ...data[index],
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };

  const handleOnExternalSubSectionChange = (index) => (event, value) => {
    const data = [...externalDetails?.organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        subSectionId: value.id,
        subSectionName: value.name,
        headId: null,
        headName: "",
      };
    } else {
      data[index] = {
        ...data[index],
        subSectionId: null,
        subSectionName: "",
        headId: null,
        headName: "",
      };
    }
    setExternalDetails({ ...externalDetails, organization: [...data] });
  };

  const handleOnHeadChange = (index) => (event, value) => {
    console.log("VALUE ", value);
    const data = [...organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        headId: value.headId,
        headName: value.headName,
      };
    } else {
      data[index] = {
        ...data[index],
        headId: null,
        headName: "",
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };

  const handleOnExternalHeadChange = (index) => (event, value) => {
    const data = [...externalDetails?.organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        headId: value.headId,
        headName: value.headName,
      };
    } else {
      data[index] = {
        ...data[index],
        headId: null,
        headName: "",
      };
    }
    setExternalDetails({ ...externalDetails, organization: [...data] });
  };

  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setUserDetails({
        ...userDetails,
        companyId: value.id,
        companyName: value.name,
        roleId: null,
        roleName: "",
        organization: [initialOrganization],
      });
      // dispatch(fetchRoles(value.id));
    } else {
      setUserDetails({
        ...userDetails,
        companyId: null,
        companyName: "",
        roleId: null,
        roleName: "",
        organization: [initialOrganization],
      });
      // dispatch(fetchRoles('All'))
    }
  };

  const handleOnRoleChange = (event, value) => {
    if (value !== null) {
      setUserDetails({
        ...userDetails,
        roleId: value.id,
        roleName: value.name,
      });
    } else {
      setUserDetails({ ...userDetails, roleId: null, roleName: "" });
    }
  };

  const handleOnRiskOwnerTypeChange = (event, value) => {
    if (value !== null) {
      setExternalDetails({
        ...externalDetails,
        riskOwnerTypeId: value.id,
        riskOwnerTypeName: value.ownerType,
      });
    } else {
      setExternalDetails({
        ...externalDetails,
        riskOwnerTypeId: null,
        riskOwnerTypeName: "",
      });
    }
  };

  const handleOnExternalSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setExternalDetails({
        ...externalDetails,
        companyId: value.id,
        companyName: value.name,
        organization: [initialOrganization],
      });
    } else {
      setExternalDetails({
        ...externalDetails,
        companyId: null,
        companyName: "",
        organization: [initialOrganization],
      });
    }
  };

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setExternalDetails((externalDetails) => ({
        ...externalDetails,
        name: value + " " + externalDetails.name.split(" ")[1],
      }));
    } else if (name === "lastName") {
      setExternalDetails((externalDetails) => ({
        ...externalDetails,
        name: externalDetails.name.split(" ")[0] + " " + value,
      }));
    }
  };

  // ----------CREATE USER-----------//
  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const res = await usersApi.addUser(dispatch, userDetails);
      toast.success(res);
      setShowSuccessDialog(true);
      // if (res.success) {
      //   setShowSuccessDialog(true);
      // } else {
      //   toast.error(res.message);
      //   setShowSuccessDialog(false);
      // }
    } catch (error) {
      console.log(error);
      toast.error(error);
      setShowSuccessDialog(false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmitExternal = async () => {
    try {
      dispatch(setLoading(true));
      const res = await usersApi.addUser(dispatch, externalDetails);
      toast.success(res);
      setShowSuccessDialog(true);
      // if (res.success) {
      //   setShowSuccessDialog(true);
      // } else {
      //   toast.error(res.message);
      //   setShowSuccessDialog(false);
      // }
    } catch (error) {
      console.log(error);
      toast.error(error);
      setShowSuccessDialog(false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // const handleSubmitExternal = async () => {
  //   try {
  //     dispatch(setLoading(true));
  //     const res = await riskOwnerApi.addRiskOwner(dispatch, externalDetails);
  //     toast.success(res);
  //     setShowSuccessDialog(true);
     
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error);
  //     setShowSuccessDialog(false);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  // UPDATE USER
  const updateUser = async () => {
    try {
      dispatch(setLoading(true));
      await usersApi.updateUser(dispatch, userDetails);
      toast.success("User Edited Successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(fetchAllSubsidiaries());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllSections());
    dispatch(fetchAllRiskOwnerTypes());
    dispatch(fetchAllSubSections());
  }, []);

  // ------------FETCH ROLES BASED ON COMPANY SELECTED----------------//
  useEffect(() => {
    if (userDetails.companyId) {
      dispatch(getAllRoles(userDetails?.companyId));
    }
  }, [userDetails?.companyId]);

  // UPDATE USER DATA
  useEffect(() => {
    if (location && location.state !== undefined && location.state !== null) {
      setBreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.USERS_TABLE, link: "/users-table" },
        { label: HEADER.EDIT_USER, isActive: true },
      ]);
      setUserDetails(location.state);
      setIsUpdate(true);
    } else {
      setBreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.USERS_TABLE, link: "/users-table" },
        { label: HEADER.CREATE_USER, isActive: true },
      ]);
      setUserDetails(initialState);
      setIsUpdate(false);
    }
  }, [location, initialState]);

  //----------------- SUCCESS DIALOG --------------------------//
  const SuccessDialog = () => {
    return (
      <div>
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showSuccessDialog}
        >
          <Dialog
            open={showSuccessDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  my: 4,
                }}
              >
                <TaskAltIcon sx={{ height: 70, width: 70, color: "green" }} />
                {!isUpdate ? (
                  <>
                    <Typography variant="h5" sx={{ my: 2 }}>
                      User Created Successfully
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" sx={{ my: 2 }}>
                      User Edited Successfully
                    </Typography>
                  </>
                )}

                <Link to="/">
                  {" "}
                  <Button variant="contained" color="success" sx={{ my: 2 }}>
                    Back to Dashboard
                  </Button>
                </Link>
              </Box>
            </DialogContent>
          </Dialog>
        </Backdrop>
      </div>
    );
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        {isLoading && <LoadingOverlay />}
        <SuccessDialog />
        <Container maxWidth="xl">
          {isLoading && <LoadingOverlay />}
          <PageContainer breadcrumbs={breadcrumbs}>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <Box mt={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select User Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Select User Category"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Internal User</MenuItem>
                      <MenuItem value={2}>External User</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            {category === 1 && (
              <>
                <Grid container spacing={3}>
                  <Grid md={3} item xs={12}>
                    <SideBar
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      steps={steps}
                    />
                  </Grid>
                  <Grid md={9} item xs={12} my={3}>
                    {activeStep === 0 && (
                      <>
                        <Grid container spacing={2}>
                          <Grid md={6} item xs={12}>
                            <TextField
                              name="firstName"
                              fullWidth
                              value={userDetails.firstName}
                              onChange={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  firstName: e.target.value,
                                })
                              }
                              label="firstName"
                            />
                          </Grid>
                          <Grid md={6} item xs={12}>
                            <TextField
                              fullWidth
                              value={userDetails.lastName}
                              onChange={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  lastName: e.target.value,
                                })
                              }
                              label="lastName"
                            />
                          </Grid>
                          <Grid md={6} item xs={12}>
                            <TextField
                              fullWidth
                              value={userDetails.email}
                              onChange={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  email: e.target.value,
                                })
                              }
                              label="Email"
                            />
                          </Grid>
                          <Grid md={6} item xs={12}>
                            <TextField
                              fullWidth
                              value={userDetails.phoneNumber}
                              onChange={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  phoneNumber: e.target.value,
                                })
                              }
                              label="PhoneNumber"
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {activeStep === 1 && (
                      <>
                        <Grid container spacing={2}>
                          <Grid md={4} item xs={12}>
                            <TextField
                              fullWidth
                              value={userDetails.staffNumber}
                              onChange={(e) =>
                                setUserDetails({
                                  ...userDetails,
                                  staffNumber: e.target.value,
                                })
                              }
                              label="Staff Number"
                            />
                          </Grid>
                          <Grid md={4} item xs={12}>
                            <Autocomplete
                              fullWidth
                              options={subsidiaries}
                              value={getAutoCompleteValue(
                                subsidiaries,
                                userDetails.companyId
                              )}
                              getOptionLabel={(option) => option.name}
                              onChange={handleOnSubsidiaryChange}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  {...params}
                                  // size={"small"}
                                  variant={"outlined"}
                                  label="Subsidiary"
                                />
                              )}
                            />
                          </Grid>
                          <Grid md={4} item xs={12}>
                            <Autocomplete
                              fullWidth
                              options={roles}
                              value={getAutoCompleteValue(
                                roles,
                                userDetails.roleId
                              )}
                              getOptionLabel={(option) => option.name}
                              onChange={handleOnRoleChange}
                              renderInput={(params) => (
                                <TextField
                                  fullWidth
                                  {...params}
                                  variant={"outlined"}
                                  label="Role"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Box width={"100%"} mt={5} mb={2} display={"flex"}>
                          <Button
                            onClick={handleAddDepartment}
                            type={"button"}
                            size={"small"}
                            startIcon={<AddCircle />}
                            variant={"outlined"}
                            color={"primary"}
                          >
                            Assign Department
                          </Button>
                        </Box>

                        {organization.length !== 0 &&
                          organization.map((org, index) => (
                            <Box key={index} mt={3}>
                              <AddDepartmentForm
                                {...{
                                  departments,
                                  sections,
                                  subSections,
                                  organization: org,
                                  userDetails,
                                  handleOnDepartmentChange,
                                  handleOnSectionChange,
                                  handleOnSubSectionChange,
                                  handleOnHeadChange,
                                  index,
                                  handleRemoveDept,
                                }}
                              />
                            </Box>
                          ))}
                      </>
                    )}

                    {category === 1 && activeStep === 2 && <Preview {...{ userDetails }} />}

                    {activeStep !== steps.length - 1 && (
                      <>
                        <Button
                          sx={{
                            float: "right",
                            margin: 3,
                          }}
                          color="primary"
                          variant="contained"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                        <Button
                          sx={{
                            float: "right",
                            margin: 3,
                          }}
                          disabled={activeStep === 0}
                          color="primary"
                          variant="contained"
                          onClick={handlePrev}
                        >
                          Back
                        </Button>
                      </>
                    )}

                    {activeStep === steps.length - 1 && (
                      <>
                        {!isUpdate ? (
                          <>
                            <Button
                              sx={{
                                float: "right",
                                margin: 3,
                              }}
                              color="primary"
                              variant="contained"
                              onClick={handleSubmit}
                            >
                              Save
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              sx={{
                                float: "right",
                                margin: 3,
                              }}
                              color="primary"
                              variant="contained"
                              onClick={updateUser}
                            >
                              Save
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            )}

            {category === 2 && (
              <>
                <Grid container spacing={3}>
                  <Grid md={3} item xs={12}>
                    <SideBar
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      steps={steps}
                    />
                  </Grid>
                  <Grid md={9} item xs={12} my={3}>
                    {activeStep === 0 && (
                      <>
                        <Grid container spacing={2}>
                          <Grid md={6} item xs={12}>
                            <TextField
                              name="firstName"
                              fullWidth
                              value={externalDetails.firstName}
                              onChange={(e) =>
                                setExternalDetails({
                                  ...externalDetails,
                                  firstName: e.target.value,
                                })
                              }
                              label="firstName"
                            />
                          </Grid>
                          <Grid md={6} item xs={12}>
                            <TextField
                              fullWidth
                              value={externalDetails.lastName}
                              onChange={(e) =>
                                setExternalDetails({
                                  ...externalDetails,
                                  lastName: e.target.value,
                                })
                              }
                              label="lastName"
                            />
                          </Grid>
                          <Grid md={6} item xs={12}>
                            <TextField
                              fullWidth
                              value={externalDetails.email}
                              onChange={(e) =>
                                setExternalDetails({
                                  ...externalDetails,
                                  email: e.target.value,
                                })
                              }
                              label="Email"
                            />
                          </Grid>
                          <Grid md={6} item xs={12}>
                            <TextField
                              fullWidth
                              value={externalDetails.phoneNumber}
                              onChange={(e) =>
                                setExternalDetails({
                                  ...externalDetails,
                                  phoneNumber: e.target.value,
                                })
                              }
                              label="PhoneNumber"
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {activeStep === 1 && (
                      <>
                        <Grid container spacing={2}>
                          <Grid md={4} item xs={12}>
                            <Autocomplete
                              fullWidth
                              options={subsidiaries}
                              value={getAutoCompleteValue(
                                subsidiaries,
                                externalDetails.companyId
                              )}
                              getOptionLabel={(option) => option.name}
                              onChange={handleOnExternalSubsidiaryChange}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  {...params}
                                  // size={"small"}
                                  variant={"outlined"}
                                  label="Subsidiary"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <Autocomplete
                              fullWidth
                              options={filteredTypes}
                              value={getAutoCompleteValue(
                                filteredTypes,
                                externalDetails.riskOwnerTypeId
                              )}
                              getOptionLabel={(option) => option.ownerType}
                              onChange={handleOnRiskOwnerTypeChange}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  {...params}
                                  // size={"small"}
                                  variant={"outlined"}
                                  label="Risk Owner Type"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <Box width={"100%"} mt={5} mb={2} display={"flex"}>
                              <Button
                                onClick={handleAddDepartment}
                                type={"button"}
                                size={"small"}
                                startIcon={<AddCircle />}
                                variant={"outlined"}
                                color={"primary"}
                              >
                                Assign Department
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={12} xs={12}>
                            {externalDetails?.organization?.length !== 0 &&
                              externalDetails?.organization?.map((org, index) => (
                                <Box key={index} mt={3}>
                                  <ExternalAddDepartmentForm
                                    {...{
                                      departments,
                                      sections,
                                      subSections,
                                      organization: org,
                                      externalDetails,
                                      handleOnExternalDepartmentChange,
                                      handleOnExternalSectionChange,
                                      handleOnExternalSubSectionChange,
                                      handleOnExternalHeadChange,
                                      index,
                                      handleRemoveDept,
                                    }}
                                  />
                                </Box>
                              ))}
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {activeStep === 2 && (
                      <ExternalPreview {...{ externalDetails }} />
                    )}

                    {activeStep !== steps.length - 1 && (
                      <>
                        <Button
                          sx={{
                            float: "right",
                            margin: 3,
                          }}
                          color="primary"
                          variant="contained"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                        <Button
                          sx={{
                            float: "right",
                            margin: 3,
                          }}
                          disabled={activeStep === 0}
                          color="primary"
                          variant="contained"
                          onClick={handlePrev}
                        >
                          Back
                        </Button>
                      </>
                    )}

                    {activeStep === steps.length - 1 && (
                      <>
                        {!isUpdate ? (
                          <>
                            {category === 1 && (
                              <>
                                <Button
                                  sx={{
                                    float: "right",
                                    margin: 3,
                                  }}
                                  color="primary"
                                  variant="contained"
                                  onClick={handleSubmit}
                                >
                                  Save
                                </Button>
                              </>
                            )}
                            {category === 2 && (
                              <>
                                <Button
                                  sx={{
                                    float: "right",
                                    margin: 3,
                                  }}
                                  color="primary"
                                  variant="contained"
                                  onClick={handleSubmitExternal}
                                >
                                  Save
                                </Button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              sx={{
                                float: "right",
                                margin: 3,
                              }}
                              color="primary"
                              variant="contained"
                              onClick={updateUser}
                            >
                              Save
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

const previewStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#E8EBF6",
    padding: 12,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
    marginRight: 4,
    marginLeft: 4,
  },
  notActive: {
    backgroundColor: "#fff",
    padding: 12,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
    marginRight: 4,
    marginLeft: 4,
  },
  button: {
    color: "#3F51B5",
    paddig: 10,
  },
  td: {
    border: "1px solid #dddddd",
    padding: "8px",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    maxHeight: "70vh",
    marginTop: "12px",
  },
  title: {
    marginBottom: 10,
  },
}));

const Preview = (props) => {
  const { userDetails } = props;
  const { organization } = userDetails;
  const classes = previewStyles();
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td className={classes.td}>First Name</td>
          <td className={classes.td}>
            {userDetails.firstName !== "" ? userDetails.firstName : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Last Name</td>
          <td className={classes.td}>
            {userDetails.lastName !== "" ? userDetails.lastName : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Email</td>
          <td className={classes.td}>
            {userDetails.email !== "" ? userDetails.email : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Phone Number</td>
          <td className={classes.td}>
            {userDetails.phoneNumber !== ""
              ? userDetails.phoneNumber
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Staff Number</td>
          <td className={classes.td}>
            {userDetails.staffNumber !== ""
              ? userDetails.staffNumber
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Company</td>
          <td className={classes.td}>
            {userDetails?.companyName !== ""
              ? userDetails?.companyName
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Department</td>
          <td className={classes.td}>
            {userDetails?.organization?.map((org) => {
              if (!org.departmentName) {
                return null;
              }
              return (
                <>
                  <li>{org.departmentName}</li>
                </>
              );
            })}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Section</td>
          <td className={classes.td}>
            {userDetails.organization.map((org) => {
              if (!org.sectionName) {
                return null;
              }
              return (
                <>
                  <li>{org.sectionName}</li>
                </>
              );
            })}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Sub Section</td>
          <td className={classes.td}>
            {userDetails.organization.map((org) => {
              if (!org.subSectionName) {
                return null;
              }
              return (
                <>
                  <li>{org.subSectionName}</li>
                </>
              );
            })}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Role</td>
          <td className={classes.td}>
            {userDetails?.roleName !== "" ? userDetails?.roleName : "Not Set"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ExternalPreview = (props) => {
  const { externalDetails } = props;
  const classes = previewStyles();
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td className={classes.td}>First Name</td>
          <td className={classes.td}>
            {externalDetails.firstName !== ""
              ? externalDetails.firstName
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Last Name</td>
          <td className={classes.td}>
            {externalDetails.lastName !== ""
              ? externalDetails.lastName
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Email</td>
          <td className={classes.td}>
            {externalDetails.email !== "" ? externalDetails.email : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Phone Number</td>
          <td className={classes.td}>
            {externalDetails.phoneNumber !== ""
              ? externalDetails.phoneNumber
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Subsidiary</td>
          <td className={classes.td}>
            {externalDetails.companyName !== ""
              ? externalDetails.companyName
              : "Not Set"}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Owner Type</td>
          <td className={classes.td}>
            {externalDetails.riskOwnerTypeName !== ""
              ? externalDetails.riskOwnerTypeName
              : "Not Set"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Users;
