import React, { useEffect, useState } from "react";
import { Grid, Typography, Checkbox, Chip, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import RiskAdditionalControls from "./RiskAdditionalControls";
import ControlsAssignment from "./ControlsAssignment";
import ControlsImpact from "./ControlsImpact";
import {
  getAutoCompleteValue,
  getFilteredOptions,
} from "../../../@dmt/Utils/commonHelper";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRiskCategories } from "../../../Redux/features/RiskUniverse";
import { riskApi } from "../../../Redux/services/RiskUniverse";
import { toast } from "react-toastify";
import { Card, CardContent } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  fetchAllAppetiteTypes,
  fetchAllComplianceFrequencies,
  fetchAllLossTypes,
  fetchAllProbabilities,
  fetchAllRiskControls,
  fetchAllSections,
  fetchAllSeverities,
  fetchAllSubSections,
  fetchAllSubsidiaries,
} from "../../../Redux/features/Subsidiaries";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { fetchAllRootCauses } from "../../../Redux/features/RootCauses";
import { fetchAllDepartments } from "../../../Redux/features/Subsidiaries";
import { MenuItem, InputAdornment } from "@mui/material";
import AddRiskOwnerDialog from "./AddRiskOwnerDialog";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../../Pages/ComplianceModule/Statutory/LoadingComponent";
import { setLoading } from "../../../Redux/features/loading";
import { useLocation } from "react-router-dom";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";

const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 12,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 12,
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
  { label: HEADER.RISK_TABLE, link: "/risk-table" },
  { label: HEADER.CREATE_RISK, isActive: true },
];

const SideBarRisk = (props) => {
  const classes = useStyles();
  const { activeStep, setActiveStep, steps } = props;

  return (
    <div>
      {steps?.map((step, index) => (
        <Grid
          my={1}
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

const initialDetails = {
  riskTitle: "",
  riskEvent: "",
  categoryId: null,
  categoryName: "",
  companyId: null,
  companyName: "",
  departmentId: null,
  departmentName: "",
  sectionId: null,
  sectionName: "",
  subSectionId: null,
  subSectionName: "",
  rootCauses: [],
  riskImpact: [],
  riskImpactAmount: 0,
  riskImpactCurrency: "",
  riskCategoryControlId: null,
  riskCategoryControlName: "",
  controlActions: [],
  controlRatingName: "",
  controlRating: null,
  lossTypeName: "",
  lossTypeId: null,
  riskOwner: "",
  riskOwners: [],
  riskIndicator: "",
  keyIndicatorFrequencyId: 0,
  riskAppetiteAmount: 0,
  riskAppetiteTypeName: "",
  riskAppetiteTypeId: null,
  riskAppetiteDirection: "",
  riskProbabilityId: null,
  riskProbabilityName: "",
  riskSeverityId: null,
  riskSeverityName: "",
  riskVelocity: null,
  riskVelocityName: "",
  residualRisk: "",
  additionalControlActions: null,
};

const initialAction = {
  action: "",
  actionOwner: [],
  actionDate: "",
  emails: [],
  complianceType: "",
  complianceDetails: {
    id: null,
    title: "",
    description: "",
    authority: "",
    companyId: "",
    companyName: "",
    organization: [
      {
        departmentId: "",
        departmentName: "",
        sectionId: "",
        sectionName: "",
        subsectionId: null,
        subsectionName: "",
      },
    ],
    penaltyTypeName: "",
    penalty: 0,
    penaltyCurrency: "",
    primaryOwnerId: "",
    primaryOwnerName: "",
    secondaryOwnerId: "",
    secondaryOwnerName: "",
    escalationOwnerId: "",
    escalationOwnerName: "",
    priority: "",
    frequencyId: null,
    submissionDeadline: "",
    nextDeadline: "",
    hasSubCompliance: true,
    isSubCompliance: false,
    subId: null,
    hasAttachment: false,
  },
};

const FilteredSteps = [
  "Risk Definition",
  "Risk Assignment",
  "Risk Assessment",
  "Risk Impact & Control",
  "Additional Controls",
  "Finish",
];

const AllSteps = [
  "Risk Identification",
  "Risk Assignment",
  "Risk Assessment",
  "Risk Impact and Control",
  "Additional Controls",
  "Controls Assignment",
  "Controls Impact and Status",
  "Finish",
];

const RiskSteps = () => {
  const [riskDetails, setRiskDetails] = useState(initialDetails);
  const [activeIndex, setActiveIndex] = useState(null);
  const [steps, setSteps] = useState(FilteredSteps);

  const initialDialogValues = {
    open: false,
    name: "",
    index: "",
    title: "",
  };

  const velocity = [
    { id: 1, name: "Less than 1 yr" },
    { id: 2, name: "1 - 3 yrs" },
    { id: 3, name: "3 - 5 yrs" },
    { id: 4, name: "Above 5 yrs" },
  ];

  const existingControls = [
    { id: 1, name: "Effective" },
    // { id: 2, name: "Adequate" },
    // { id: 3, name: "Ineffective" },
    { id: 4, name: "Defective" },
  ];

  const currencies = [
    { id: 1, name: "KES" },
    { id: 2, name: "USD" },
    { id: 3, name: "EURO" },
  ];

  const directions = ["Positive", "Negative"];
  const [activeStep, setActiveStep] = useState(0);
  const [dialogValues, setDialogValues] = useState(initialDialogValues);
  const [riskImpact, setRiskImpact] = useState([]);
  const [riskControlsActions, setRiskControlsActions] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const isLoading = useSelector((state) => state.loading);
  const [isUpdate, setIsUpdate] = useState(false);
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const location = useLocation();

  const handleClickOpen = () => {
    showSuccessDialog(true);
  };

  const handleClose = () => {
    showSuccessDialog(false);
  };

  const { riskCategories } = useSelector(({ risk }) => risk);
  const {
    subsidiaries,
    departments,
    sections,
    subSections,
    riskFrequencies,
    appetiteTypes,
    probabilities,
    severities,
    lossTypes,
    riskControls,
  } = useSelector(({ subsidiary }) => subsidiary);
  const { rootCauses } = useSelector(({ rootCause }) => rootCause);
  const dispatch = useDispatch();
  const filter = createFilterOptions();
  const checkedIcon = <CheckBoxOutlined fontSize="small" />;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
  };

  // RISK CATEGORY ONCHANGE EVENT
  const handleOnRiskCategoryChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        categoryId: parseInt(value.id),
        categoryName: value.categoryName,
      });
    } else {
      setRiskDetails({ ...riskDetails, categoryId: null, categoryName: "" });
    }
  };

  const handleOnRootChange = (event, values) => {
    const data = [];
    if (values.length !== 0) {
      values.map((value) =>
        data.push({
          id: value.id ?? null,
          name: value.name,
        })
      );
    }
    setRiskDetails({ ...riskDetails, rootCauses: values });
  };

  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        companyId: value.id,
        companyName: value.name,
        departmentsId: null,
        departmentsName: "",
        sectionsId: null,
        sectionsName: "",
        subSectionsId: null,
        subSectionsName: "",
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        companyId: null,
        companyName: "",
        departmentId: null,
        departmentName: "",
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      });
    }
  };

  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        departmentId: null,
        departmentName: "",
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      });
    }
  };
  const handleOnSectionChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: "",
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      });
    }
  };

  const handleOnSubSectionChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        // complianceDetails: {
        // ...riskDetails.complianceDetails,
        subSectionId: value.id,
        subSectionName: value.name,
        // },
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        // complianceDetails: {
        // ...riskDetails.complianceDetails,
        subSectionId: null,
        subSectionName: "",
        // },
      });
    }
  };

  const handleFrequency = (e, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, keyIndicatorFrequencyId: value.id });
    } else {
      setRiskDetails({ ...riskDetails, keyIndicatorFrequencyId: null });
    }
  };

  const handleOnAppetiteChange = (e) => {
    const value = getAutoCompleteValue(appetiteTypes, e.target.value);
    if (value) {
      setRiskDetails({
        ...riskDetails,
        riskAppetiteTypeId: value.id,
        riskAppetiteTypeName: value.name,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskAppetiteTypeId: null,
        riskAppetiteTypeName: "",
      });
    }
  };

  const handleOnRiskApetiteDirection = (event, values) => {
    if (values !== null) {
      setRiskDetails({ ...riskDetails, riskAppetiteDirection: values });
    } else {
      setRiskDetails({ ...riskDetails, riskAppetiteDirection: "" });
    }
  };

  const handleProbabilityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        riskProbabilityId: parseInt(value.id),
        riskProbabilityName: value.actualName,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskProbabilityId: null,
        riskProbabilityName: "",
        residualRisk: null,
      });
    }
  };

  const handleSeverityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        riskSeverityId: parseInt(value.id),
        riskSeverityName: value.actualName,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskSeverityId: null,
        riskSeverityName: "",
        residualRisk: null,
      });
    }
  };

  const handleVelocityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        riskVelocity: parseInt(value.id),
        riskVelocityName: value.name,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskVelocity: null,
        riskVelocityName: "",
        residualRisk: null,
      });
    }
  };

  const handleOnImpactChange = (event, values) => {
    setRiskDetails({ ...riskDetails, riskImpact: values });
    setRiskImpact(values);
  };

  const handleOnLossTypeChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        lossTypeId: parseInt(value.id),
        lossTypeName: value.actualLossTypeName,
      });
    } else {
      setRiskDetails({ ...riskDetails, lossTypeId: null, lossTypeName: "" });
    }
  };

  const handleOnCategoryControlChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        riskCategoryControlId: parseInt(value.id),
        riskCategoryControlName: value.actualCategoryControlName,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskCategoryControlId: null,
        riskCategoryControlName: "",
      });
    }
  };

  const handleOnControlsChange = (event, values) => {
    setRiskDetails({ ...riskDetails, controlActions: values });
    setRiskControlsActions(values);
  };

  const handleControlsRatingChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        controlRating: parseInt(value.id),
        controlRatingName: value.name,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        controlRating: null,
        controlRatingName: "",
      });
    }
  };

  const handleAddAction = () => {
    let data = riskDetails;
    if (data.additionalControlActions !== null) {
      if (data.additionalControlActions[activeIndex]?.action !== "") {
        data = {
          ...data,
          additionalControlActions: [
            ...data.additionalControlActions,
            initialAction,
          ],
        };
      }
    } else {
      data = {
        ...data,
        additionalControlActions: [initialAction],
      };
    }

    setRiskDetails({
      ...data,
    });
    setActiveIndex(data.additionalControlActions.length - 1);
  };

  const handleOnSaveAction = () => {
    setActiveIndex(null);
    setActiveStep(4);
  };

  const handleRemoveAction = (index) => {
    const data = [...riskDetails.additionalControlActions];
    data.splice(index, 1);
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
    if (data.length === 0 || activeIndex === index) {
      setActiveIndex(null);
    }
    if (activeIndex && data.length > 0 && activeIndex >= data.length) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchAllRiskCategories());
    dispatch(fetchAllRootCauses());
    dispatch(fetchAllSubsidiaries());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllSections());
    dispatch(fetchAllSubSections());
    dispatch(fetchAllComplianceFrequencies());
    dispatch(fetchAllAppetiteTypes());
    dispatch(fetchAllProbabilities());
    dispatch(fetchAllLossTypes());
    dispatch(fetchAllRiskControls());
    dispatch(fetchAllSeverities());
  }, []);

  // get selected Frequency
  const selectedFrequency = getAutoCompleteValue(
    riskFrequencies,
    riskDetails.keyIndicatorFrequencyId
  );

  // save riskDetails
  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const res = await riskApi.addRisk(dispatch, riskDetails);
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

  // -----------UPDATE RISK----------//
  const handleRiskUpdate = async () => {
    try {
      dispatch(setLoading(true));
      const res = await riskApi.updateRisk(dispatch, riskDetails);
      if (res.success) {
        toast.success("Risk updated successfully");
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

  const handleDelete = (index) => {
    const data = [...riskDetails?.riskOwners];
    data.splice(index, 1);
    setRiskDetails({
      ...riskDetails,
      riskOwners: data,
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
                      Risk Created Successfully
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" sx={{ my: 2 }}>
                      Risk Updated Successfully
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

  // ------CALCULATE INHERENT --------//
  const calculateInherentRisk = async () => {
    const formData = {
      riskProbabilityId: riskDetails.riskProbabilityId,
      riskSeverityId: riskDetails.riskSeverityId,
      // riskVelocity: riskDetails.riskVelocity,
    };
    const data = await riskApi.assessRiskUniverse(dispatch, formData);

    if (data?.actualName && data?.actualValue) {
      await setRiskDetails({ ...riskDetails, inherentRisk: data });
    } else {
      setRiskDetails({ ...riskDetails, inherentRisk: "" });
    }
  };

  // ------CALCULATE RESIDUAL --------//

  const calculateResidual = async () => {
    const formData = {
      controlRating: riskDetails.controlRating,
      inherentActualName: riskDetails.inherentRisk?.actualName,
    };
    const data = await riskApi.calculateResidualRisk(dispatch, formData);
    console.log("DETAILS ",riskDetails)
    const formatResponse = (data) => {
      // format the API response
      const formattedResponse = {
        color: data.defaultName,
        name: data.actualName,
        usualOrder: data.defaultOrder,
        realOrder: data.actualOrder,
        usualValue: data.defaultValue,
        realValue: data.actualValue,
        isActive: data.active,
      };
      return formattedResponse;
    };

    const formattedResponse = formatResponse(data);

    if (formattedResponse?.name && formattedResponse?.realValue) {
      await setRiskDetails({ ...riskDetails, residualRisk: formattedResponse });
    } else {
      setRiskDetails({ ...riskDetails, residualRisk: "" });
    }

    return formattedResponse;
  };

  console.log("RISK_DETAILS ",riskDetails);

  useEffect(() => {
    if (
      
    
      riskDetails.controlRating !== null &&
      riskDetails.inherentActualName !== null
    ) {
      calculateResidual();
    }
  }, [
    riskDetails.riskProbabilityId,
    riskDetails.riskSeverityId,
    // riskDetails.riskVelocity,
    riskDetails.controlRating,
    riskDetails.riskCategoryControlId,
  ]);

  useEffect(() => {
    if (
      riskDetails.riskProbabilityId !== null &&
      riskDetails.riskSeverityId !== null
      // riskDetails.riskVelocity !== null
    ) {
      calculateInherentRisk();
    }
  }, [
    riskDetails.riskProbabilityId,
    riskDetails.riskSeverityId,
    // riskDetails.riskVelocity,
  ]);

  useEffect(() => {
    activeIndex !== null ? setSteps(AllSteps) : setSteps(FilteredSteps);
  }, [activeIndex]);

  // ROUTING TO UPDATE PAGE
  useEffect(() => {
    if (location && location.state !== undefined && location.state !== null) {
      setbreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
        { label: HEADER.CREATE_RISK, link: "/risk-table" },
        { label: HEADER.UPDATE_RISK, isActive: true },
      ]);
      setRiskDetails({ ...location.state });
      setIsUpdate(true);
    } else {
      setbreadcrumbs([
        { label: HEADER.DASHBOARD, link: "/" },
        { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
        { label: HEADER.CREATE_RISK, isActive: true },
      ]);
      setRiskDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location, initialDetails]);

  return (
    <Grid container spacing={3} my={2}>
      {isLoading && <LoadingOverlay />}
      <Grid item md={3} xs={12}>
        <SideBarRisk
          steps={steps}
          setSteps={setSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </Grid>
      <Grid item md={9} xs={12}>
        <SuccessDialog />
        {activeStep === 0 && (
          <>
            <TextField
              margin="normal"
              fullWidth
              label="Risk Title"
              value={riskDetails.riskTitle}
              onChange={(e) =>
                setRiskDetails({ ...riskDetails, riskTitle: e.target.value })
              }
            />
            <TextField
              multiline
              minRows={4}
              margin="normal"
              fullWidth
              label="Risk Event"
              value={riskDetails.riskEvent}
              onChange={(e) =>
                setRiskDetails({ ...riskDetails, riskEvent: e.target.value })
              }
            />
            <Autocomplete
              fullWidth
              options={riskCategories}
              value={getAutoCompleteValue(
                riskCategories,
                riskDetails?.categoryId
              )}
              getOptionLabel={(option) => option.categoryName}
              onChange={handleOnRiskCategoryChange}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Risk Category"
                />
              )}
            />
            <Autocomplete
              multiple
              fullWidth
              value={riskDetails?.rootCauses || []}
              options={rootCauses}
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
              onChange={handleOnRootChange}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const name = option.label || option.name;
                  // const name =
                  //   rootCauses?.find((rc) => rc.id === option.id)?.name ||
                  //   option.name;
                  return (
                    <Chip
                      title={name}
                      color={"primary"}
                      label={name}
                      onClick={(e) => renderDialog(option, index, "Root Cause")}
                      {...getTagProps({ index })}
                    />
                  );
                })
              }
              freeSolo
              selectOnFocus
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
                  sx={{ marginTop: 2 }}
                  variant={"outlined"}
                  {...params}
                  label="Root Causes"
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
              value={getAutoCompleteValue(subsidiaries, riskDetails?.companyId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnSubsidiaryChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  required
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Subsidiary"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={getFilteredOptions(
                departments,
                riskDetails,
                "companyId"
              )}
              value={getAutoCompleteValue(
                departments,
                riskDetails?.departmentId
              )}
              getOptionLabel={(option) => option.name}
              onChange={handleOnDepartmentChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  required
                  sx={{ marginTop: 2 }}
                  helperText={
                    riskDetails?.companyId === "" ? "Select Subsidiary" : ""
                  }
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Department"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={getFilteredOptions(
                sections,
                riskDetails,
                "departmentId",
                "departmentsId"
              )}
              value={getAutoCompleteValue(sections, riskDetails?.sectionId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnSectionChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  helperText={
                    riskDetails?.departmentId === "" ? "Select Department" : ""
                  }
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Section"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={getFilteredOptions(
                subSections,
                riskDetails,
                "sectionId",
                "sectionsId"
              )}
              value={getAutoCompleteValue(
                subSections,
                riskDetails?.subSectionId
              )}
              getOptionLabel={(option) => option.name}
              onChange={handleOnSubSectionChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  helperText={
                    riskDetails?.subSectionId === "" ? "Select Section" : ""
                  }
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Sub Section"
                />
              )}
            />
            <Card sx={{ marginTop: 2, padding: 2 }}>
              <AddRiskOwnerDialog
                riskDetails={riskDetails}
                setRiskDetails={setRiskDetails}
              />

              <CardContent>
                <Typography
                  // className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {riskDetails?.riskOwners?.map((owner, index) => (
                    <Chip
                      style={{ margin: "2px" }}
                      label={owner.name}
                      color="primary"
                      onDelete={() => handleDelete(index)}
                    />
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        {activeStep === 2 && (
          <>
            <TextField
              margin="normal"
              fullWidth
              label="Risk Indicator"
              value={riskDetails.riskIndicator}
              onChange={(e) =>
                setRiskDetails({
                  ...riskDetails,
                  riskIndicator: e.target.value,
                })
              }
            />
            <Autocomplete
              fullWidth
              options={riskFrequencies}
              onChange={handleFrequency}
              value={getAutoCompleteValue(
                riskFrequencies,
                riskDetails?.keyIndicatorFrequencyId
              )}
              getOptionLabel={(option) => option.name}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Risk Indicator Frequency"
                />
              )}
            />
            <TextField
              fullWidth
              sx={{ marginTop: 2 }}
              label="Risk Appetite"
              variant="outlined"
              type={"number"}
              value={riskDetails?.riskAppetiteAmount}
              onChange={(e) =>
                setRiskDetails({
                  ...riskDetails,
                  riskAppetiteAmount: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextField
                      select
                      style={{ width: "90px" }}
                      label=""
                      variant="standard"
                      value={riskDetails?.riskAppetiteTypeId}
                      onChange={handleOnAppetiteChange}
                      InputProps={{
                        disableUnderline: false,
                      }}
                    >
                      {appetiteTypes?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              fullWidth
              options={directions}
              value={riskDetails?.riskAppetiteDirection}
              getOptionLabel={(option) => option}
              onChange={handleOnRiskApetiteDirection}
              // renderOption={(option, { selected }) => (
              //   <span key={option}>{option}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Risk Apetite Direction"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={probabilities}
              value={getAutoCompleteValue(
                probabilities,
                riskDetails?.riskProbabilityId
              )}
              getOptionLabel={(option) => option.actualName}
              onChange={handleProbabilityChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.actualName}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  required
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Probability"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={severities}
              value={getAutoCompleteValue(
                severities,
                riskDetails?.riskSeverityId
              )}
              getOptionLabel={(option) => option.actualName}
              onChange={handleSeverityChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  required
                  sx={{ marginTop: 2 }}
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Severity"
                />
              )}
            />
            {/* <Autocomplete
              fullWidth
              options={velocity}
              value={getAutoCompleteValue(velocity, riskDetails?.riskVelocity)}
              getOptionLabel={(option) => option.name}
              onChange={handleVelocityChange}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  required
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Velocity"
                />
              )}
            /> */}
            <Grid item md={12} xs={12}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 2,
                  padding: 2,
                }}
              >
                {/* <Item sx={{ px: 4 }}> */}
                Inherent Risk :{" "}
                <Chip
                  label={
                    riskDetails.inherentRisk?.actualName
                      ? riskDetails?.inherentRisk?.actualName
                      : "Not Set"
                  }
                  sx={{
                    color: "white",
                    backgroundColor: riskDetails.inherentRisk?.defaultName,
                  }}
                />
                {/* </Item> */}
                {/* <Item sx={{ px: 4 }}> */}
                Value :{" "}
                <Chip
                  sx={{
                    color: "white",
                    backgroundColor: riskDetails.inherentRisk?.defaultName,
                  }}
                  label={
                    riskDetails.inherentRisk?.actualValue
                      ? riskDetails?.inherentRisk?.actualValue
                      : "Not Set"
                  }
                />
                {/* </Item> */}
              </Card>
            </Grid>
          </>
        )}
        {activeStep === 3 && (
          <>
            <Autocomplete
              multiple
              fullWidth
              value={riskDetails?.riskImpact || []}
              options={riskImpact}
              filterOptions={(option, params) => {
                const filtered = filter(option, params);
                if (params.inputValue !== "") {
                  const data = { id: null, name: params.inputValue };
                  filtered.push(data);
                }
                return filtered;
              }}
              autoHighlight
              onChange={handleOnImpactChange}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const name = option.label || option.name;
                  return (
                    <Chip
                      title={name}
                      color={"primary"}
                      label={name}
                      onClick={(e) => renderDialog(option, index, "Risk Impact")}
                      {...getTagProps({ index })}
                    />
                  );
                })
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
                  sx={{ marginTop: 2 }}
                  fullWidth
                  variant={"outlined"}
                  {...params}
                  label="Risk Impact(Qualitative)"
                />
              )}
            />
            <TextField
              fullWidth
              sx={{ marginTop: 2 }}
              label="Risk Impact(Quantitative)"
              type={"number"}
              variant="outlined"
              value={riskDetails?.riskImpactAmount}
              onChange={(e) => {
                setRiskDetails({
                  ...riskDetails,
                  riskImpactAmount: e.target.value,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextField
                      select
                      style={{ width: "90px" }}
                      label=""
                      variant="standard"
                      value={riskDetails?.riskImpactCurrency}
                      onChange={(e) =>
                        setRiskDetails({
                          ...riskDetails,
                          riskImpactCurrency: e.target.value,
                        })
                      }
                      InputProps={{
                        disableUnderline: true,
                      }}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              fullWidth
              options={lossTypes}
              value={getAutoCompleteValue(lossTypes, riskDetails?.lossTypeId)}
              getOptionLabel={(option) => option.actualLossTypeName}
              onChange={handleOnLossTypeChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Loss Type"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={riskControls}
              value={getAutoCompleteValue(
                riskControls,
                riskDetails?.riskCategoryControlId
              )}
              getOptionLabel={(option) => option.actualCategoryControlName}
              onChange={handleOnCategoryControlChange}
              // renderOption={(option, { selected }) => (
              //   <span key={option.id}>{option.name}</span>
              // )}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Control Category"
                />
              )}
            />
            <Autocomplete
              multiple
              fullWidth
              value={riskDetails?.controlActions}
              options={riskControlsActions}
              filterOptions={(option, params) => {
                const filtered = filter(option, params);
                if (params.inputValue !== "") {
                  const data = { id: null, name: params.inputValue };
                  filtered.push(data);
                }
                return filtered;
              }}
              autoHighlight
              onChange={handleOnControlsChange}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const name = option.label || option.name;
                  return (
                    <Chip
                      title={name}
                      color={"primary"}
                      label={name}
                      onClick={(e) => renderDialog(option, index)}
                      {...getTagProps({ index })}
                    />
                  );
                })
              }
              freeSolo
              selectOnFocus
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, state) => (
                <span key={option.name} {...props}>
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
                  sx={{ marginTop: 2 }}
                  fullWidth
                  variant={"outlined"}
                  {...params}
                  label="Existing Controls"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={existingControls}
              value={getAutoCompleteValue(
                existingControls,
                riskDetails?.controlRating
              )}
              getOptionLabel={(option) => option.name}
              onChange={handleControlsRatingChange}
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
                  sx={{ marginTop: 2 }}
                  {...params}
                  size={"small"}
                  variant={"outlined"}
                  label="Existing Controls Rating"
                />
              )}
            />
            <Grid item md={12} xs={12}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 2,
                  padding: 2,
                }}
              >
                Residual Risk :{" "}
                <Chip
                  label={
                    riskDetails?.residualRisk?.name
                      ? riskDetails?.residualRisk?.name
                      : "Not Set"
                  }
                  sx={{
                    color: "white",
                    backgroundColor: riskDetails?.residualRisk?.color,
                  }}
                />
                {/* Value :{" "}
                <Chip
                  sx={{
                    color: "white",
                    backgroundColor: riskDetails?.residualRisk?.color,
                  }}
                  label={
                    riskDetails?.residualRisk?.realValue
                      ? riskDetails?.residualRisk?.realValue
                      : "Not Set"
                  }
                /> */}
              </Card>
            </Grid>
            {/* <TextField margin="normal" fullWidth label="SHOW RESIDUAL RISK" /> */}
          </>
        )}
        {activeStep === 4 && (
          <RiskAdditionalControls
            {...{
              activeIndex,
              setActiveIndex,
              handleAddAction,
              handleRemoveAction,
              riskDetails,
              setRiskDetails,
            }}
          />
        )}
        {activeIndex !== null && (
          <>
            {activeStep === 5 && (
              <ControlsAssignment
                handleNext={handleNext}
                handlePrev={handlePrev}
                {...{
                  riskDetails,
                  setRiskDetails,
                  handleOnSubsidiaryChange,
                  handleOnDepartmentChange,
                  handleOnSectionChange,
                  handleOnSubSectionChange,
                  index: activeIndex,
                }}
              />
            )}
            {activeStep === 6 && (
              <ControlsImpact
                handlePrev={handlePrev}
                {...{
                  riskDetails,
                  setRiskDetails,
                  index: activeIndex,
                  handleOnSaveAction,
                }}
              />
            )}
          </>
        )}

        {activeStep === steps.length - 1 && (
          <Box width={"100%"}>
            <Preview
              riskDetails={riskDetails}
              selectedFrequency={selectedFrequency}
            />
          </Box>
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
            {/* <Button
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
            </Button> */}
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
  },
  title: {
    marginBottom: 10,
  },
}));

const Preview = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const { riskDetails, isView, index, selectedFrequency } = props;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classes = styles();
  const action =
    activeStep > 0
      ? riskDetails.additionalControlActions[activeStep - 1]
      : null;

  return (
    <Grid container>
      <Grid item md={3} xs={12}>
        <Grid
          onClick={() => setActiveStep(0)}
          className={activeStep === 0 ? classes.isActive : classes.notActive}
        >
          <Typography>Risk</Typography>
        </Grid>
        {riskDetails.additionalControlActions?.map((action, index) => (
          <Grid
            onClick={() => setActiveStep(index + 1)}
            key={index}
            className={
              index + 1 === activeStep ? classes.isActive : classes.notActive
            }
          >
            {/* <Typography key={index}>{action.action}</Typography> */}
            <Typography key={index}>Additional Control {index + 1}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid item md={9} xs={12}>
        {activeStep === 0 && (
          <>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className={classes.td}>Risk Title</td>
                  <td className={classes.td}>
                    {riskDetails.riskTitle !== ""
                      ? riskDetails.riskTitle
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Event</td>
                  <td className={classes.td}>
                    {riskDetails.riskEvent !== ""
                      ? riskDetails.riskEvent
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Category</td>
                  <td className={classes.td}>
                    {riskDetails.categoryName !== ""
                      ? riskDetails.categoryName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Causes</td>
                  <td className={classes.td}>
                    {riskDetails.rootCauses?.length !== 0
                      ? riskDetails.rootCauses?.map((rootCause) => (
                          <li key={rootCause.id}>{rootCause.name}</li>
                        ))
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Subsidiary</td>
                  <td className={classes.td}>
                    {riskDetails.companyName !== ""
                      ? riskDetails.companyName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Department</td>
                  <td className={classes.td}>
                    {riskDetails.departmentName !== ""
                      ? riskDetails.departmentName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Section</td>
                  <td className={classes.td}>
                    {riskDetails.sectionName !== ""
                      ? riskDetails.sectionName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Sub Section</td>
                  <td className={classes.td}>
                    {riskDetails.subSectionName !== ""
                      ? riskDetails.subSectionName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Owner</td>
                  <td className={classes.td}>
                    {riskDetails.riskOwners?.map((owner) => (
                      <li key={owner.id}>{owner.name}</li>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Impact</td>
                  <td className={classes.td}>
                    {riskDetails.riskImpact?.length !== 0
                      ? riskDetails.riskImpact?.map((impact, index) => (
                          <li key={index}>{impact.name}</li>
                        ))
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>
                    Risk Impact Amount in {riskDetails.riskImpactCurrency}
                  </td>
                  <td className={classes.td}>
                    {riskDetails.riskImpactAmount !== 0
                      ? riskDetails.riskImpactAmount
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Control Category</td>
                  <td className={classes.td}>
                    {riskDetails.riskCategoryControlName !== ""
                      ? riskDetails.riskCategoryControlName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Control/Mitigation Actions</td>
                  <td className={classes.td}>
                    {riskDetails.controlActions?.length !== 0
                      ? riskDetails.controlActions?.map(
                          (controlAction, index) => (
                            <li key={index}>{controlAction.name}</li>
                          )
                        )
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Loss Type</td>
                  <td className={classes.td}>
                    {riskDetails.lossTypeName !== ""
                      ? riskDetails?.lossTypeName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Indicator</td>
                  <td className={classes.td}>
                    {riskDetails.riskIndicator !== ""
                      ? riskDetails.riskIndicator
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Risk Indicator Frequency</td>
                  <td className={classes.td}>
                    {selectedFrequency ? selectedFrequency.name : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>
                    Risk Appetite Amount {riskDetails.riskAppetiteTypeName}
                  </td>
                  <td className={classes.td}>
                    {riskDetails.riskAppetiteAmount !== 0
                      ? riskDetails.riskAppetiteAmount
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>
                    Risk Appetite Direction {riskDetails.riskAppetiteDirection}
                  </td>
                  <td className={classes.td}>
                    {riskDetails.riskAppetiteDirection !== ""
                      ? riskDetails.riskAppetiteDirection
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Probability</td>
                  <td className={classes.td}>
                    {riskDetails.riskProbabilityName !== ""
                      ? riskDetails.riskProbabilityName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Severity</td>
                  <td className={classes.td}>
                    {riskDetails.riskSeverityName !== ""
                      ? riskDetails.riskSeverityName
                      : "Not Set"}
                  </td>
                </tr>
                {/* <tr>
                  <td className={classes.td}>Risk Velocity</td>
                  <td className={classes.td}>
                    {riskDetails.riskVelocityName !== ""
                      ? riskDetails.riskVelocityName
                      : "Not Set"}
                  </td>
                </tr> */}
              </tbody>
            </table>
          </>
        )}
        {activeStep > 0 && action && (
          <>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className={classes.td}>Action Title</td>
                  <td className={classes.td}>
                    {action.action !== "" ? action.action : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Action Date</td>
                  <td className={classes.td}>
                    {action.actionDate !== "" ? action.actionDate : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Compliance Type</td>
                  <td className={classes.td}>
                    {action.complianceType !== ""
                      ? action.complianceType
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Action Owners</td>
                  <td className={classes.td}>
                    {action.actionOwner?.map((owner) => (
                      <li>{owner.name}</li>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Emails</td>
                  <td className={classes.td}>
                    {action.emails?.map((email) => (
                      <li>{email}</li>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Compliance Title</td>
                  <td className={classes.td}>
                    {action.complianceDetails.title !== ""
                      ? action.complianceDetails.title
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Description</td>
                  <td className={classes.td}>
                    {action.complianceDetails.description !== ""
                      ? action.complianceDetails.description
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Authority</td>
                  <td className={classes.td}>
                    {action.complianceDetails.authority !== ""
                      ? action.complianceDetails.authority
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Company Name</td>
                  <td className={classes.td}>
                    {action.complianceDetails.companyName !== ""
                      ? action.complianceDetails.companyName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Organization</td>
                  <td className={classes.td}>
                    {action.complianceDetails.organization.map((org) => (
                      <>
                        <li>{org.departmentName}</li>
                        <li>{org.sectionName}</li>
                        <li>{org.subSectionName}</li>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Penalty Type</td>
                  <td className={classes.td}>
                    {action.complianceDetails.penaltyTypeName !== ""
                      ? action.complianceDetails.penaltyTypeName
                      : "Not Set"}
                  </td>
                </tr>
                {/* <tr>
                    <td className={classes.td}>penalty Currency</td>
                    <td className={classes.td}>
                      {action.complianceDetails.penaltyCurrency !== ''
                        ? action.complianceDetails.penaltyCurrency
                        : 'Not Set'}
                    </td>
                  </tr> */}
                <tr>
                  <td className={classes.td}>PrimaryOwnerName</td>
                  <td className={classes.td}>
                    {action.complianceDetails.primaryOwnerName !== ""
                      ? action.complianceDetails.primaryOwnerName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>SecondaryOwner</td>
                  <td className={classes.td}>
                    {action.complianceDetails.secondaryOwnerName !== ""
                      ? action.complianceDetails.secondaryOwnerName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>EscalationOwner</td>
                  <td className={classes.td}>
                    {action.complianceDetails.escalationOwnerName !== ""
                      ? action.complianceDetails.escalationOwnerName
                      : "Not Set"}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td}>Priority</td>
                  <td className={classes.td}>
                    {action.complianceDetails.priority !== ""
                      ? action.complianceDetails.priority
                      : "Not Set"}
                  </td>
                </tr>
                {/* <tr>
                    <td className={classes.td}>Frequency</td>
                    <td className={classes.td}>
                      {selectedFrequency?.name !== '' ? selectedFrequency?.name : 'Not Set'}
                    </td>
                  </tr> */}
                <tr>
                  <td className={classes.td}>Submission Deadline</td>
                  <td className={classes.td}>
                    {action.complianceDetails.submissionDeadline !== ""
                      ? action.complianceDetails.submissionDeadline
                      : "Not Set"}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default RiskSteps;
