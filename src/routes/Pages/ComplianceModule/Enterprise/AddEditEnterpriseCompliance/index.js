import React, { useState, useEffect } from "react";
import TopBar from "../../../../../@dmt/common/TopBar";
import { HEADER } from "../../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { Grid, Typography, Container, Box } from "@mui/material";
import PageContainer from "../../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { getAutoCompleteValue } from "../../../../../@dmt/Utils/commonHelper";
import AddDepartmentForm from "../../Statutory/AddEditStatutoryCompliance/AddDepartmentForm";
import { enterpriseApi } from "../../../../../Redux/services/Compliance/enterprise";
import {
  fetchAllDepartments,
  fetchAllSections,
  fetchAllSubSections,
  fetchAllSubsidiaries,
  fetchAllUsers,
  fetchAllComplianceFrequencies,
  fetchAllPriorities,
  fetchAllCurrencies,
} from "../../../../../Redux/features/Subsidiaries";
import { fetchAllRisks } from "../../../../../Redux/features/RiskUniverse";
import Preview from "./Preview";
import { toast } from "react-toastify";
import { fetchStatutoryComplianceData } from "../../../../../Redux/features/Compliance/statutory";
import DialogContent from "@mui/material/DialogContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import { LoadingOverlay } from "../../Statutory/LoadingComponent";
import { setLoading } from "../../../../../Redux/features/loading";
import { useLocation } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 14,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 14,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  button: {
    color: "#3F51B5",
    padding: 10,
  },
}));

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
  { label: HEADER.ENTERPRISE_COMPLIANCE, link: "/enterprise-compliance" },
  { label: HEADER.CREATE_ENTERPRISE_COMPLIANCE, isActive: true },
];

const initialDetails = {
  title: "",
  description: "",
  authority: "",
  riskUniverseId: "",
  companyId: "",
  organization: [
    {
      departmentId: null,
      departmentName: "",
      sectionId: null,
      sectionName: "",
      subSectionId: null,
      subSectionName: "",
    },
  ],
  penaltyTypeName: "",
  penalty: 0,
  penaltyNarrative: "",
  penaltyCurrency: "KES",
  primaryOwnerId: null,
  secondaryOwnerId: null,
  escalationOwnerId: null,
  priority: "",
  frequencyId: 0,
  active: true,
  submissionDeadline: "",
  complianceType: "",
  sourceDoc: "",
  isSubCompliance: false,
  hasSubCompliance: true,
  subId: null,
  hasAttachment: false,
};

const SideBarCompliance = (props) => {
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

const EnterpriseContent = () => {
  const steps = [
    "Compliance Definition",
    "Control Assignement",
    "Control Impact & Status",
    "Finish",
  ];
  const sourceDocsOptions = [
    { id: 1, label: "True", value: true },
    { id: 1, label: "False", value: false },
  ];
  const options = ["Both", "Quantitative", "Qualitative"];
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const [complianceDetails, setComplianceDetails] = useState(initialDetails);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const location = useLocation();

  const {
    subsidiaries,
    departments,
    sections,
    subsections,
    users,
    priorities,
    riskFrequencies,
    currencies,
  } = useSelector(({ subsidiary }) => subsidiary);
  const { risks } = useSelector(({ risk }) => risk);
  const { enterpriseComplianceData } = useSelector(
    ({ enterprise }) => enterprise
  );
  const isLoading = useSelector((state) => state.loading);

  const handleClose = () => {
    showSuccessDialog(false);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleComplianceOption = (e, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        subId: value.id,
        isSubCompliance: true,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        subId: null,
        isSubCompliance: false,
      });
    }
  };

  const handleTypeChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        companyId: value.id,
        companyName: value.name,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        companyId: null,
        companyName: "",
      });
    }
  };

  const handleRiskChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        riskUniverseName: value.name,
        riskUniverseId: value.id,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        riskUniverseName: "",
        riskUniverseId: null,
      });
    }
  };
  const handleOnDepartmentChange = (index) => (event, value) => {
    const data = [...complianceDetails.organization];
    if (value !== null) {
      data[index] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      };
    } else {
      data[index] = {
        departmentId: null,
        departmentName: "",
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      };
    }
    setComplianceDetails({ ...complianceDetails, organization: [...data] });
  };

  const handleOnSectionChange = (index) => (event, value) => {
    const data = [...complianceDetails.organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: "",
      };
    } else {
      data[index] = {
        ...data[index],
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      };
    }
    setComplianceDetails({ ...complianceDetails, organization: [...data] });
  };
  const handleOnSubSectionChange = (index) => (event, value) => {
    const data = [...complianceDetails.organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        subSectionId: value.id,
        subSectionName: value.name,
      };
    } else {
      data[index] = {
        ...data[index],
        subSectionId: null,
        subSectionName: "",
      };
    }
    setComplianceDetails({ ...complianceDetails, organization: [...data] });
  };

  const handleOnPrimaryOwnerChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        primaryOwnerId: value.id,
        primaryOwnerName: value.firstName + " " + value.lastName,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        primaryOwnerId: null,
        primaryOwnerName: "",
      });
    }
  };
  const handleOnSecondaryOwnerChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        secondaryOwnerId: value.id,
        secondaryOwnerName: value.firstName + " " + value.lastName,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        secondaryOwnerId: null,
        secondaryOwnerName: "",
      });
    }
  };

  const handleAttachment = (e) => {
    setComplianceDetails({
      ...complianceDetails,
      hasAttachment: e.target.value,
    });
  };

  const handleOnEscalationOwnerChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        escalationOwnerId: value.id,
        escalationOwnerName: value.firstName + " " + value.lastName,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        escalationOwnerId: null,
        escalationOwnerName: "",
      });
    }
  };

  const handleRemoveDept = (index) => {
    const data = [...complianceDetails?.organization];
    if (data?.length - 1 !== 0) {
      data.splice(index, 1);
      setComplianceDetails({ ...complianceDetails, organization: data });
    } else {
      //   dispatch(fetchError('At least One Department is Required'));
    }
  };

  useEffect(() => {
    setComplianceDetails({
      ...complianceDetails,
      submissionDeadline: moment(selectedDeadline).format("YYYY-MM-DD"),
    });
  }, [selectedDeadline]);

  //   useEffect(() => {
  //     setComplianceDetails({
  //       ...complianceDetails,
  //       companyId: currentSubsidiary,
  //     });
  //   }, [currentSubsidiary]);

  // ROUTING TO UPDATE PAGE
  useEffect(() => {
    if (location && location.state !== undefined && location.state !== null) {
      setbreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
        { label: HEADER.ENTERPRISE_COMPLIANCE, link: "/enterprise-compliance" },
        { label: HEADER.UPDATE_ENTERPRISE_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails({
        ...location.state,
        isSubCompliance: location.state?.subId ? true : false,
      });
      setIsUpdate(true);
    } else {
      setbreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
        { label: HEADER.ENTERPRISE_COMPLIANCE, link: "/enterprise-compliance" },
        { label: HEADER.CREATE_ENTERPRISE_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location,initialDetails]);

  useEffect(() => {
    dispatch(fetchAllSubsidiaries());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllSections());
    dispatch(fetchAllSubSections());
    dispatch(fetchAllUsers());
    dispatch(fetchAllRisks());
    dispatch(fetchAllComplianceFrequencies());
    dispatch(fetchStatutoryComplianceData());
    dispatch(fetchAllPriorities());
    dispatch(fetchAllCurrencies());
  }, []);

  const initialOrganization = {
    departmentId: null,
    departmentName: "",
    sectionId: null,
    sectionName: "",
    subSectionId: null,
    subSectionName: "",
  };
  const handleAddDepartment = () => {
    setComplianceDetails({
      ...complianceDetails,
      organization: [...complianceDetails.organization, initialOrganization],
    });
  };

  const handleFrequency = (e, value) => {
    if (value !== null) {
      setComplianceDetails({ ...complianceDetails, frequencyId: value.id });
    } else {
      setComplianceDetails({ ...complianceDetails, subId: null });
    }
  };

  const handleComplianceCreation = async () => {
    try {
      dispatch(setLoading(true));
      const res = await enterpriseApi.createEnterpriseCompliance(
        dispatch,
        complianceDetails
      );
      if (res.success) {
        toast.success("Compliance created successfully");
        setShowSuccessDialog(true);
      } else {
        toast.error("An error occurred while creating");
        setShowSuccessDialog(false);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  //-------FILTER HAS SUB COMPLIANCE---------//
  const hasSubComplianceData =
    Array.isArray(enterpriseComplianceData) &&
    enterpriseComplianceData?.filter(
      (datum) =>
        datum.id !== complianceDetails?.id && datum.hasSubCompliance === true
    );

  // ------------UPDATE ENTERPRISE COMPLIANCE----------------//
  const handleComplianceUpdate = async () => {
    try {
      dispatch(setLoading(true));
      const res = await enterpriseApi.updateEnterpriseCompliance(
        dispatch,
        complianceDetails
      );
      if (res.success) {
        toast.success("Compliance updated successfully");
        setShowSuccessDialog(true);
      } else {
        toast.error("An error occurred while creating");
        setShowSuccessDialog(false);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  //----------------- SUCCESS DIALOG --------------------------//
  const SuccessDialog = () => {
    return (
      <div>
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showSuccessDialog}
        >
          <Dialog
            fullWidth
            maxWidth={"sm"}
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
                      Compliance Created Successfully
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" sx={{ my: 2 }}>
                      Compliance Updated Successfully
                    </Typography>
                  </>
                )}

                <Link to="/compliance-management">
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
      <TopBar />
      {isLoading && <LoadingOverlay />}
      <SuccessDialog />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <Grid container spacing={3}>
            <Grid item md={3} my={3} xs={12}>
              <SideBarCompliance
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid my={4} item md={9} xs={12}>
              {activeStep === 0 && (
                <>
                  <TextField
                    size="small"
                    value={complianceDetails.title}
                    onChange={(e) =>
                      setComplianceDetails({
                        ...complianceDetails,
                        title: e.target.value,
                      })
                    }
                    margin="normal"
                    fullWidth
                    label="Compliance Title"
                  />
                  <TextField
                    multiline
                    minRows={2}
                    margin="normal"
                    fullWidth
                    label="Compliance Description"
                    value={complianceDetails.description}
                    onChange={(e) =>
                      setComplianceDetails({
                        ...complianceDetails,
                        description: e.target.value,
                      })
                    }
                  />
                  <TextField
                    size="small"
                    multiline
                    minRows={2}
                    margin="normal"
                    fullWidth
                    label="Authority"
                    value={complianceDetails.authority}
                    onChange={(e) =>
                      setComplianceDetails({
                        ...complianceDetails,
                        authority: e.target.value,
                      })
                    }
                  />
                  <Autocomplete
                    fullWidth
                    options={risks}
                    value={getAutoCompleteValue(
                      risks,
                      complianceDetails?.riskUniverseId
                    )}
                    getOptionLabel={(option) => option.riskTitle}
                    onChange={handleRiskChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Associated Risk"
                      />
                    )}
                  />
                  <TextField
                    size="small"
                    required
                    onChange={handleAttachment}
                    label="Source Document"
                    fullWidth
                    select
                    value={complianceDetails?.hasAttachment}
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                  >
                    <MenuItem value={false}>Not Required</MenuItem>
                    <MenuItem value={true}>Required</MenuItem>
                  </TextField>
                  <Autocomplete
                    fullWidth
                    options={hasSubComplianceData}
                    value={getAutoCompleteValue(
                      hasSubComplianceData,
                      complianceDetails?.subId
                    )}
                    getOptionLabel={(option) => option.title}
                    onChange={handleComplianceOption}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Select Compliance"
                      />
                    )}
                  />
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Autocomplete
                    fullWidth
                    options={subsidiaries}
                    value={getAutoCompleteValue(
                      subsidiaries,
                      complianceDetails?.companyId
                    )}
                    getOptionLabel={(option) => option.name}
                    onChange={handleOnSubsidiaryChange}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Subsidiary"
                      />
                    )}
                  />
                  <Grid item md={12} xs={12}>
                    <Box width={"100%"} mt={5} mb={2} display={"flex"}>
                      <Button
                        onClick={handleAddDepartment}
                        type={"button"}
                        size={"small"}
                        startIcon={<AddCircleIcon />}
                        variant={"outlined"}
                        color={"primary"}
                      >
                        Assign Department
                      </Button>
                    </Box>
                  </Grid>

                  {complianceDetails?.organization?.length !== 0 &&
                    complianceDetails?.organization?.map((org, index) => (
                      <Grid key={index} item md={12} xs={12}>
                        <Box mt={3}>
                          <AddDepartmentForm
                            {...{
                              departments,
                              sections,
                              subsections,
                              organization: org,
                              complianceDetails,
                              handleOnDepartmentChange,
                              handleOnSectionChange,
                              handleOnSubSectionChange,
                              index,
                              handleRemoveDept,
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={users}
                    value={getAutoCompleteValue(
                      users,
                      complianceDetails.primaryOwnerId
                    )}
                    getOptionLabel={(option) =>
                      option.name ?? option.firstName + " " + option.lastName
                    }
                    onChange={handleOnPrimaryOwnerChange}
                    renderOption={(props, option, state) => (
                      <ListItem key={option.id} {...props} disablePadding>
                        <ListItemText
                          id={`checkbox-list-label-${option.id}`}
                          primary={option.firstName + " " + option.lastName}
                          secondary={
                            <Typography variant={"caption"}>
                              {option?.organization?.map(
                                (org, index) => org.departmentName + " | "
                              )}
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Primary Owner"
                      />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={getAutoCompleteValue(
                      users,
                      complianceDetails.secondaryOwnerId
                    )}
                    getOptionLabel={(option) =>
                      option.name ?? option.firstName + " " + option.lastName
                    }
                    onChange={handleOnSecondaryOwnerChange}
                    id="combo-box-demo"
                    renderOption={(props, option, state) => (
                      <ListItem key={option.id} {...props} disablePadding>
                        <ListItemText
                          id={`checkbox-list-label-${option.id}`}
                          primary={option.firstName + " " + option.lastName}
                          secondary={
                            <Typography variant={"caption"}>
                              {option?.organization?.map(
                                (org, index) => org.departmentName + " | "
                              )}
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Secondary Owner"
                      />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={getAutoCompleteValue(
                      users,
                      complianceDetails.escalationOwnerId
                    )}
                    getOptionLabel={(option) =>
                      option.name ?? option.firstName + " " + option.lastName
                    }
                    onChange={handleOnEscalationOwnerChange}
                    renderOption={(props, option, state) => (
                      <ListItem key={option.id} {...props} disablePadding>
                        <ListItemText
                          id={`checkbox-list-label-${option.id}`}
                          primary={option.firstName + " " + option.lastName}
                          secondary={
                            <Typography variant={"caption"}>
                              {option?.organization?.map(
                                (org, index) => org.departmentName + " | "
                              )}
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Escalation Owner"
                      />
                    )}
                  />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <Autocomplete
                    fullWidth
                    options={options}
                    onChange={(e, newValue) =>
                      setComplianceDetails({
                        ...complianceDetails,
                        penaltyTypeName: newValue,
                      })
                    }
                    value={complianceDetails?.penaltyTypeName}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...params}
                        label="Penalty Types"
                      />
                    )}
                  />

                  {complianceDetails?.penaltyTypeName === options[0] && (
                    <>
                      <Grid
                        sx={{ marginTop: 2, marginBottom: 2 }}
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          size="small"
                          label="Penalty"
                          type={"number"}
                          variant="outlined"
                          value={complianceDetails?.penalty}
                          onChange={(e) => {
                            setComplianceDetails({
                              ...complianceDetails,
                              penalty: e.target.value,
                            });
                          }}
                          InputProps={{
                            startAdornment: (
                              // <InputAdornment position="start">
                              <TextField
                                select
                                size="small"
                                style={{ width: "90px" }}
                                label=""
                                value={complianceDetails?.penaltyCurrency}
                                variant={"standard"}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                onChange={(e) =>
                                  setComplianceDetails({
                                    ...complianceDetails,
                                    penaltyCurrency: e.target.value,
                                  })
                                }
                              >
                                {currencies?.map((option) => (
                                  <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                              // </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={4}
                          variant="outlined"
                          label={"Narrative"}
                          value={complianceDetails?.penaltyNarrative}
                          onChange={(e) =>
                            setComplianceDetails({
                              ...complianceDetails,
                              penaltyNarrative: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </>
                  )}

                  {complianceDetails?.penaltyTypeName === options[1] && (
                    <Grid
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Penalty"
                        size="small"
                        type={"number"}
                        variant="outlined"
                        value={complianceDetails?.penalty}
                        onChange={(e) => {
                          setComplianceDetails({
                            ...complianceDetails,
                            penalty: e.target.value,
                          });
                        }}
                        InputProps={{
                          startAdornment: (
                            // <InputAdornment position="start">
                            <TextField
                              select
                              size="small"
                              style={{ width: "90px" }}
                              variant={"standard"}
                              label=""
                              value={complianceDetails?.penaltyCurrency}
                              InputProps={{
                                disableUnderline: true,
                              }}
                              onChange={(e) =>
                                setComplianceDetails({
                                  ...complianceDetails,
                                  penaltyCurrency: e.target.value,
                                })
                              }
                            >
                              {currencies?.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                            // </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )}

                  {complianceDetails?.penaltyTypeName === options[2] && (
                    <Grid
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        variant="outlined"
                        label={"Narrative"}
                        value={complianceDetails?.penaltyNarrative}
                        onChange={(e) =>
                          setComplianceDetails({
                            ...complianceDetails,
                            penaltyNarrative: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  )}

                  <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="demo-simple-select-label">
                      Priority
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={complianceDetails.priority}
                      label="Priority"
                      onChange={(e) =>
                        setComplianceDetails({
                          ...complianceDetails,
                          priority: e.target.value,
                        })
                      }
                    >
                      {priorities?.map((item, index) => (
                        <MenuItem value={item.name} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <Autocomplete
                      fullWidth
                      options={riskFrequencies}
                      onChange={handleFrequency}
                      value={getAutoCompleteValue(
                        riskFrequencies,
                        complianceDetails?.frequencyId
                      )}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          size={"small"}
                          variant={"outlined"}
                          label="Frequency"
                        />
                      )}
                    />
                    {/* <InputLabel id="demo-simple-select-label">
                      Frequency
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={complianceDetails.frequency}
                      label="Frequency"
                      onChange={(e) =>
                        setComplianceDetails({
                          ...complianceDetails,
                          frequency: e.target.value,
                        })
                      }
                    >
                      {frequencies?.map((item, index) => (
                        <MenuItem value={item.id} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select> */}
                  </FormControl>
                  <TextField
                    label={"Submission Deadline"}
                    name="actionDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    type="date"
                    sx={{ mt: 2 }}
                    variant="outlined"
                    value={complianceDetails.submissionDeadline}
                    onChange={(e) =>
                      setComplianceDetails({
                        ...complianceDetails,
                        submissionDeadline: e.target.value,
                      })
                    }
                  />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <Preview complianceDetails={complianceDetails} />
                </>
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
                      <Button
                        onClick={() => handleComplianceCreation()}
                        sx={{
                          float: "right",
                          margin: 3,
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleComplianceUpdate()}
                        sx={{
                          float: "right",
                          margin: 3,
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </>
                  )}

                  <Button
                    sx={{
                      float: "right",
                      margin: 3,
                    }}
                    color="primary"
                    variant="contained"
                    onClick={handlePrev}
                  >
                    Back
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </PageContainer>
      </Container>
    </>
  );
};

export default EnterpriseContent;
