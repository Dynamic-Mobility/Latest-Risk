import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Container,
  Button,
  MenuItem,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment, Checkbox, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAutoCompleteValue } from "../../@dmt/Utils/commonHelper";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { createFilterOptions } from "@mui/material";
import { setLoading } from "../../Redux/features/loading";
import { toast } from "react-toastify";
import {
  fetchAllRiskCategories,
  fetchAllRisks,
} from "../../Redux/features/RiskUniverse";
import {
  fetchAllLossTypes,
  fetchAllAppetiteTypes,
} from "../../Redux/features/Subsidiaries";
import { fetchAllRiskOwners } from "../../Redux/features/RiskOwners";
import { incidentApi } from "../../Redux/services/RiskIncident";
import { HEADER } from "../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../@dmt/constants/BreadCrumbs/PageContainer";
import TopBar from "../../@dmt/common/TopBar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { LoadingOverlay } from "../Pages/ComplianceModule/Statutory/LoadingComponent";
import { useLocation } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


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
    paddig: 10,
  },
}));

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.INCIDENT_MANAGEMENT, link: "/incident-management" },
  { label: HEADER.INCIDENT_TABLE, link: "/incident-table" },
  { label: HEADER.CREATE_INCIDENT, isActive: true },
];

const SideBarIncident = (props) => {
  const classes = useStyles();
  const { steps, activeStep, setActiveStep } = props;

  return (
    <div>
      {steps?.map((step, index) => (
        <Grid
          my={2}
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

const CreateIncident = () => {
  const initialDetails = {
    incidentTitle: "",
    riskUniverseId: null,
    riskUniverseTypeName: "",
    narration: "",
    incidentDate: "",
    lossTypeId: null,
    lossTypeQuantityTypeId: null,
    lossTypeQuantity: 0,
    riskCategoryControlId: null,
    incidentOwners: [],
    incidentActions: [],
    actionDate: "",
  };
  const initialDialogValues = {
    open: false,
    name: "",
    index: "",
    title: "",
  };

  const steps = [
    "Incident Definition",
    "Incident Impact",
    "Incident Action",
    "Finish",
  ];

  const [actions, setActions] = useState([]);
  const [incidentDetails, setIncidentDetails] = useState(initialDetails);
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const [dialogValues, setDialogValues] = useState(initialDialogValues);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const location = useLocation();
  const [selectedIncidentDate, handleSelectedIncidentDate] = useState(
    new Date()
  );
  const { risks, riskCategories } = useSelector(({ risk }) => risk);
  const [isUpdate, setIsUpdate] = useState(false);
  const { riskOwners } = useSelector(({ riskOwner }) => riskOwner);
  const { lossTypes, appetiteTypes } = useSelector(
    ({ subsidiary }) => subsidiary
  );
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const checkedIcon = <CheckBoxOutlined fontSize="small" />;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const filter = createFilterOptions();
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

  //   const handleReset = () => {
  //     setIncidentDetails(initialDetails);
  //     setIsUpdate(false);
  //     setActiveStep(0);
  //   };

  const handleOnRiskChange = (event, value) => {
    if (value !== null) {
      setIncidentDetails({
        ...incidentDetails,
        riskUniverseTypeName: value.name,
        riskUniverseId: value.id,
      });
    } else {
      setIncidentDetails({
        ...incidentDetails,
        riskUniverseName: "",
        riskUniverseId: null,
      });
    }
  };

  const handleOnIncidentActions = (event, values) => {
    console.log("WE ARE THE VALUES ", values);
    setIncidentDetails({ ...incidentDetails, incidentActions: values });
    setActions(values);
  };

  const handleOnLossTypeChange = (event, value) => {
    if (value !== null) {
      setIncidentDetails({
        ...incidentDetails,
        lossTypeId: parseInt(value.id),
      });
    } else {
      setIncidentDetails({ ...incidentDetails, lossTypeId: null });
    }
  };

  const handleOnRiskCategoryChange = (event, value) => {
    if (value !== null) {
      setIncidentDetails({
        ...incidentDetails,
        riskCategoryControlId: parseInt(value.id),
        category: value.name,
      });
    } else {
      setIncidentDetails({
        ...incidentDetails,
        riskCategoryControlId: null,
        categoryName: "",
      });
    }
  };

  const handleOnIncidentOwners = (event, values) => {
    const data = [];
    if (values.length !== 0) {
      values.map((value) =>
        data.push({
          id: value.id ?? null,
          name: value.name,
        })
      );
    }
    setIncidentDetails({ ...incidentDetails, incidentOwners: values });
  };

  // get selected Risk
  const chosenRisk = getAutoCompleteValue(
    risks,
    incidentDetails.riskUniverseId
  );

  console.log("I AM CHOSEN ", chosenRisk);

  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
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
                      Incident Created Successfully
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" sx={{ my: 2 }}>
                      Incident Updated Successfully
                    </Typography>
                  </>
                )}
                <Link to="/risk-management">
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

  // save incidentDetails
  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const res = await incidentApi.addRiskIncident(dispatch, incidentDetails);
      if (res.success) {
        toast.success(res.message);
        setShowSuccessDialog(true);
      } else {
        toast.error(res.message);
        setShowSuccessDialog(false);
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  // -----------UPDATE INCIDENT----------//
  const handleRiskUpdate = async () => {
    try {
      dispatch(setLoading(true));
      const res = await incidentApi.updateRiskIncident(
        dispatch,
        incidentDetails
      );
      if (res.success) {
        toast.success("Incident updated successfully");
        setShowSuccessDialog(true);
      } else {
        toast.error("Something Went Wrong");
        setShowSuccessDialog(false);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (chosenRisk?.riskAppetiteTypeId) {
      setIncidentDetails({
        ...incidentDetails,
        lossTypeQuantityTypeId: chosenRisk?.riskAppetiteTypeId,
      });
    }
  }, [chosenRisk]);

  useEffect(() => {
    dispatch(fetchAllRisks());
    dispatch(fetchAllLossTypes());
    dispatch(fetchAllAppetiteTypes());
    dispatch(fetchAllRiskCategories());
    dispatch(fetchAllRiskOwners());
  }, []);

  // ROUTING TO UPDATE PAGE
  useEffect(() => {
    if (location && location.state !== undefined && location.state !== null) {
      setbreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
        { label: HEADER.INCIDENTS_TABLE, link: "/incident-table" },
        { label: HEADER.UPDATE_INCIDENT, isActive: true },
      ]);
      setIncidentDetails({ ...location.state });
      setIsUpdate(true);
    } else {
      setbreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
        { label: HEADER.CREATE_INCIDENT, isActive: true },
      ]);
      setIncidentDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  return (
    <>
      <TopBar />
      <Container maxWidth="xl" my={4}>
        {isLoading && <LoadingOverlay />}
        <PageContainer breadcrumbs={breadcrumbs}>
          <SuccessDialog />
          <Grid className="md:flex gap-4">
            <Grid item md={3} xs={12} className="md:w-3/12 w-full">
              <SideBarIncident
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid item md={9} xs={12} className="md:w-9/12 w-full">
              {activeStep === 0 && (
                <>
                  <TextField
                    value={incidentDetails.incidentTitle}
                    onChange={(e) =>
                      setIncidentDetails({
                        ...incidentDetails,
                        incidentTitle: e.target.value,
                      })
                    }
                    margin="normal"
                    fullWidth
                    label="Incident Title"
                  />
                  <TextField
                    value={incidentDetails.narration}
                    onChange={(e) =>
                      setIncidentDetails({
                        ...incidentDetails,
                        narration: e.target.value,
                      })
                    }
                    margin="normal"
                    fullWidth
                    label="Incident Narration"
                  />
                  <TextField
                    value={
                      incidentDetails.incidentDate !== ""
                        ? incidentDetails.incidentDate
                        : selectedIncidentDate
                    }
                    onChange={(e) =>
                      setIncidentDetails({
                        ...incidentDetails,
                        incidentDate: e.target.value,
                      })
                    }
                    margin="normal"
                    fullWidth
                    type="date"
                    label="Incident Date"
                  />
                  <Autocomplete
                    fullWidth
                    value={getAutoCompleteValue(
                      risks,
                      incidentDetails.riskUniverseId
                    )}
                    options={risks}
                    onChange={handleOnRiskChange}
                    getOptionLabel={(option) => option.riskTitle || ""}
                    getOptionSelected={(option, value) =>
                      option.riskTitle === value.riskTitle
                    }
                    autoHighlight
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        variant={"outlined"}
                        {...params}
                        label="Associated Risk"
                      />
                    )}
                  />
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Autocomplete
                    fullWidth
                    options={lossTypes}
                    value={getAutoCompleteValue(
                      lossTypes,
                      incidentDetails?.lossTypeId
                    )}
                    getOptionLabel={(option) => option.actualLossTypeName}
                    onChange={handleOnLossTypeChange}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        size={"small"}
                        sx={{ my: 2 }}
                        variant={"outlined"}
                        label="Loss Type"
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    value={chosenRisk?.riskIndicator}
                    variant={"outlined"}
                    sx={{ my: 2 }}
                    label="Risk Indicator"
                    disabled
                  />
                  <TextField
                    fullWidth
                    value={chosenRisk?.keyIndicatorFrequencyName}
                    variant={"outlined"}
                    label="Frequency"
                    sx={{ my: 2 }}
                    disabled
                  />
                  <TextField
                    fullWidth
                    label={`Risk Appetite Type`}
                    variant="outlined"
                    type={"number"}
                    sx={{ my: 2 }}
                    value={incidentDetails?.lossTypeQuantity}
                    onChange={(e) =>
                      setIncidentDetails({
                        ...incidentDetails,
                        lossTypeQuantity: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextField
                            disabled
                            select
                            style={{ width: "90px" }}
                            variant="standard"
                            label=""
                            value={chosenRisk?.riskAppetiteTypeId}
                            onChange={(e) =>
                              setIncidentDetails({
                                ...incidentDetails,
                                riskAppetiteTypeId: e.target.value,
                              })
                            }
                            InputProps={{
                              disableUnderline: true,
                            }}
                          >
                            {appetiteTypes?.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                          <Chip
                            variant="outlined"
                            color="success"
                            label={
                              chosenRisk?.riskAppetiteAmount
                                ? chosenRisk?.riskAppetiteAmount
                                : "Not Set"
                            }
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    value={chosenRisk?.riskAppetiteDirection}
                    variant={"outlined"}
                    sx={{ my: 2 }}
                    label="Risk Appetite Direction"
                    disabled
                  />
                  <Autocomplete
                    fullWidth
                    options={riskCategories}
                    value={getAutoCompleteValue(
                      riskCategories,
                      incidentDetails?.riskCategoryControlId
                    )}
                    getOptionLabel={(option) => option.categoryName}
                    onChange={handleOnRiskCategoryChange}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        size={"small"}
                        sx={{ my: 2 }}
                        variant={"outlined"}
                        label="Risk Category"
                      />
                    )}
                  />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <Autocomplete
                    multiple
                    fullWidth
                    value={incidentDetails?.incidentActions}
                    options={actions}
                    filterOptions={(option, params) => {
                      const filtered = filter(option, params);
                      if (params.inputValue !== "") {
                        const data = { id: null, name: params.inputValue };
                        filtered.push(data);
                      }
                      return filtered;
                    }}
                    autoHighlight
                    onChange={handleOnIncidentActions}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          title={option?.name}
                          color={"primary"}
                          label={option.name}
                          onClick={(e) =>
                            renderDialog(option, index, "Incident Actions")
                          }
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    freeSolo
                    selectOnFocus
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name}
                    renderOption={(props, option, state) => (
                      <span key={option?.name} {...props}>
                        <Checkbox
                          color={"primary"}
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={state.selected}
                        />
                        {option?.name}
                      </span>
                    )}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        variant={"outlined"}
                        {...params}
                        label="Incident Action"
                      />
                    )}
                  />
                  <Autocomplete
                    multiple
                    fullWidth
                    value={incidentDetails?.incidentOwners}
                    options={riskOwners}
                    filterOptions={(option, params) => {
                      const filtered = filter(option, params);
                      if (params.inputValue !== "") {
                        const data = {
                          id: null,
                          name: params.inputValue,
                          description: "",
                        };
                        filtered.push(data);
                      }
                      return filtered;
                    }}
                    autoHighlight
                    disableCloseOnSelect
                    onChange={handleOnIncidentOwners}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          title={option.name}
                          color={"primary"}
                          label={option.name}
                          onClick={(e) =>
                            renderDialog(option, index, "Incident Owners")
                          }
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    freeSolo
                    selectOnFocus
                    getOptionLabel={(option) => option?.name || ""}
                    renderOption={(props, option, state) => (
                      <ListItem key={option.id} {...props} disablePadding>
                        <ListItemText
                          id={`checkbox-list-label-${option.id}`}
                          primary={option.name}
                          secondary={
                            <Typography
                              sx={{ display: "grid" }}
                              variant={"caption"}
                            >
                              <span>
                                {option?.organization?.map(
                                  (org, index) => org.departmentName + " | "
                                )}
                              </span>
                              <span>
                                {option?.organization?.map(
                                  (org, index) => org.sectionName + " | "
                                )}
                              </span>
                              <span>
                                {option?.organization?.map(
                                  (org, index) => org.subSectionName + " | "
                                )}
                              </span>
                              <Divider />
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        sx={{ my: 2 }}
                        variant={"outlined"}
                        {...params}
                        label="Incident Owners"
                      />
                    )}
                  />

                  <TextField
                    value={
                      incidentDetails.actionDate !== ""
                        ? incidentDetails.actionDate
                        : selectedIncidentDate
                    }
                    onChange={(e) =>
                      setIncidentDetails({
                        ...incidentDetails,
                        actionDate: e.target.value,
                      })
                    }
                    margin="normal"
                    fullWidth
                    type="date"
                    label="Action Date"
                  />
                </>
              )}

              {activeStep === 3 && (
                <>
                  <Preview incidentDetails={incidentDetails} />
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
                        onClick={handleRiskUpdate}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </PageContainer>
      </Container>
    </>
  );
};

// ---------------Preview Styles------------------- //
const styles = makeStyles((theme) => ({
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
    marginTop: "14px",
  },
  title: {
    marginBottom: 10,
  },
}));

export const Preview = (props) => {
  const { incidentDetails, isView } = props;
  const { risks } = useSelector(({ risk }) => risk);
  // const { riskCategories, probabilities, lossTypes, severities, riskControls } =
  //   useSelector(({ riskParams }) => riskParams);
  const { riskCategories } = useSelector(({ risk }) => risk);
  const { lossTypes } = useSelector(({ subsidiary }) => subsidiary);
  const classes = styles();
  const selectedRisk = getAutoCompleteValue(
    risks,
    incidentDetails?.riskUniverseId
  );

  const selectedLossType = getAutoCompleteValue(
    lossTypes,
    incidentDetails?.lossTypeId
  );

  console.log("LOSS TYPE ", selectedLossType);

  const selectedCategory = getAutoCompleteValue(
    riskCategories,
    incidentDetails?.riskCategoryControlId
  );

  return (
    <>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.td}>Incident Title</td>
            <td className={classes.td}>
              {incidentDetails?.incidentTitle !== ""
                ? incidentDetails?.incidentTitle
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Narration</td>
            <td className={classes.td}>
              {incidentDetails?.narration !== ""
                ? incidentDetails?.narration
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Date</td>
            <td className={classes.td}>
              {incidentDetails?.incidentDate !== ""
                ? incidentDetails?.incidentDate
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Loss Types</td>
            <td className={classes.td}>
              {selectedLossType
                ? selectedLossType.actualLossTypeName
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Loss Type Quantity</td>
            <td className={classes.td}>
              {incidentDetails?.lossTypeQuantity !== ""
                ? incidentDetails?.lossTypeQuantity
                : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Categories</td>
            <td className={classes.td}>
              {selectedCategory ? selectedCategory?.categoryName : "Not Set"}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Actions</td>
            <td className={classes.td}>
              {incidentDetails?.incidentActions?.map((item, index) => {
                if (!item.name) {
                  return null;
                }
                return (
                  <>
                    <li key={index}>{item.name}</li>
                  </>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Owner</td>
            <td className={classes.td}>
              {incidentDetails?.incidentOwners.map((owner, index) => {
                if (!owner.name) {
                  return null;
                }
                return <li key={owner.id}>{owner?.name}</li>;
              })}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Action Date</td>
            <td className={classes.td}>
              {incidentDetails?.actionDate !== ""
                ? incidentDetails?.actionDate
                : "Not Set"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CreateIncident;
