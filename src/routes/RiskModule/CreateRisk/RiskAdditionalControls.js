import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getAutoCompleteValue } from "../../../@dmt/Utils/commonHelper";
import {
  Add,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  Delete,
  Edit,
} from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEnterpriseCompliance } from "../../../Redux/features/Compliance/enterprise";
import { fetchStatutoryComplianceData } from "../../../Redux/features/Compliance/statutory";

const RiskAdditionalControls = (props) => {
  const {
    handleNext,
    handlePrev,
    riskDetails,
    setRiskDetails,
    activeIndex,
    setActiveIndex,
    handleAddAction,
    handleRemoveAction,
  } = props;

  const handleOnActionClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ActionItems
          {...{
            riskDetails,
            handleOnClick: handleOnActionClick,
            handleOnRemove: handleRemoveAction,
          }}
        />
        <ActionForm
          {...{
            riskDetails,
            setRiskDetails,
            index: activeIndex,
            handleOnAdd: handleAddAction,
          }}
        />
      </Box>
      {/* <Grid display={"flex"} alignItems={"center"}>
        <Typography color="primary">Action 1</Typography>
        <AddIcon color="primary" />
      </Grid>
      <Grid
        mt={3}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontWeight={700}>Add Action</Typography>
        <AddIcon fontWeight={700} />
      </Grid>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={dummyComplianceTypes}
        renderInput={(params) => (
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            {...params}
            label="Assign Additional Controls to Compliance Type"
          />
        )}
      />
      <TextField margin="normal" fullWidth label="Additional Controls Title" />
      <TextField
        multiline
        minRows={3}
        margin="normal"
        fullWidth
        label="Additional Controls Description"
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={dummyAuthority}
        renderInput={(params) => (
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            {...params}
            label="Authority"
          />
        )}
      />
      <TextField
        required
        onChange={handleAttachment}
        label="Support documentation"
        fullWidth
        select
        value={
          riskDetails?.additionalControlActions[index]?.complianceDetails
            .hasAttachment
        }
        variant="outlined"
      >
        <MenuItem value={false}>Not Required</MenuItem>
        <MenuItem value={true}>Required</MenuItem>
      </TextField>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={dummyAuthority}
        renderInput={(params) => (
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            {...params}
            label="Sub Compliance"
          />
        )}
      /> */}
    </>
  );
};

const ActionItems = (props) => {
  const { riskDetails, handleOnClick, handleOnRemove } = props;

  return (
    <>
      {riskDetails.additionalControlActions &&
        riskDetails.additionalControlActions?.map((act, index) => {
          if (act.action === "" || act.action === null) {
            return null;
          }
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={index}
            >
              <Typography>{act.action}</Typography>

              <Box>
                <IconButton onClick={(e) => handleOnClick(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={(e) => handleOnRemove(index)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}
    </>
  );
};

const ActionForm = (props) => {
  const { riskDetails, setRiskDetails, index, handleOnAdd } = props;
  const { enterpriseComplianceData } = useSelector(
    ({ enterprise }) => enterprise
  );
  const { statutoryMainComplianceData } = useSelector(
    ({ statutory }) => statutory);
  const dispatch = useDispatch();

  // filter hasSubCompliance is true
  const hasSubStatutory = Array.isArray(statutoryMainComplianceData) ? statutoryMainComplianceData?.filter(
    (data) => data.hasSubCompliance === true
  ) : []; 

  const hasSubEnterprise = Array.isArray(enterpriseComplianceData) ? enterpriseComplianceData?.filter(
    (data) => data.hasSubCompliance === true
  ) : [];

  const handleOnComplianceType = (e) => {
    const { name, value } = e.target;
    let data = riskDetails.additionalControlActions;
    data[index] = { ...data[index], [name]: value };
    setRiskDetails({ ...riskDetails, complianceType: data });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      [name]: value,
      complianceDetails: {
        ...data[index].complianceDetails,
        title: value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleDescriptionChange = (e) => {
    const data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        [e.target.name]: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleAuthorityChange = (e) => {
    const data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        [e.target.name]: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleComplianceOption = (e, values) => {
    let data = riskDetails?.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails?.additionalControlActions[index]?.complianceDetails,
        subId: values?.id,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleAttachment = (e) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        hasAttachment: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const complianceTypes = [
    { id: 1, name: "Statutory Compliance" },
    { id: 2, name: "Legal Compliance" },
    { id: 3, name: "Enterprise Compliance" },
  ];

  const getEnterprise = async () => {
    await dispatch(fetchAllEnterpriseCompliance());
  };

  const getStatutory = async () => {
    await dispatch(fetchStatutoryComplianceData());
  };

  useEffect(() => {
    getEnterprise();
    getStatutory();
  }, []);

  return (
    <>
      <Grid>
        <Grid item sm={12} xs={12} md={12}>
          <Box
            sx={{
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "primary.main",
            }}
          >
            <Typography>{"Add Action"}</Typography>
            <IconButton onClick={handleOnAdd}>
              <Add />
            </IconButton>
          </Box>
        </Grid>
        {index !== null && (
          <>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                required
                onChange={handleOnComplianceType}
                label="Assign additional controls to compliance type"
                name="complianceType"
                fullWidth
                select
                value={
                  riskDetails?.additionalControlActions[index]?.complianceType
                }
                variant="outlined"
              >
                {complianceTypes?.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                sx={{ marginTop: 2 }}
                name="action"
                fullWidth
                label="Additional controls title"
                type="text"
                onChange={handleOnChange}
                value={riskDetails?.additionalControlActions[index]?.action}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                multiline
                name="description"
                minRows={4}
                variant="outlined"
                label={"Additional Controls Description"}
                value={
                  riskDetails?.additionalControlActions[index]
                    ?.complianceDetails.description
                }
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                variant="outlined"
                name="authority"
                label="Authority"
                value={
                  riskDetails?.additionalControlActions[index]
                    ?.complianceDetails.authority
                }
                onChange={handleAuthorityChange}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                sx={{ marginTop: 2 }}
                required
                onChange={handleAttachment}
                label="Support documentation"
                fullWidth
                select
                value={
                  riskDetails?.additionalControlActions[index]
                    ?.complianceDetails.hasAttachment
                }
                variant="outlined"
              >
                <MenuItem value={false}>Not Required</MenuItem>
                <MenuItem value={true}>Required</MenuItem>
                {/* {sourceDocsOptions?.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              {riskDetails?.additionalControlActions[index]?.complianceType ===
              "Statutory Compliance" ? (
                <>
                  <Autocomplete
                    fullWidth
                    options={hasSubStatutory}
                    value={getAutoCompleteValue(
                      hasSubStatutory,
                      riskDetails?.additionalControlActions[index]
                        ?.complianceDetails?.subId
                    )}
                    getOptionLabel={(option) => option.title}
                    onChange={handleComplianceOption}
                    // renderOption={(option, { selected }) => (
                    //   <span key={option.id}>{option.title}</span>
                    // )}
                    renderInput={(params) => (
                      <TextField
                        sx={{ marginTop: 2 }}
                        fullWidth
                        {...params}
                        size={"small"}
                        variant={"outlined"}
                        label="Link additional controls to an existing compliance requirement"
                      />
                    )}
                  />
                </>
              ) : (
                ""
              )}

              {riskDetails?.additionalControlActions[index]?.complianceType ===
              "Enterprise Compliance" ? (
                <>
                  <Autocomplete
                    fullWidth
                    options={hasSubEnterprise}
                    value={getAutoCompleteValue(
                      hasSubEnterprise,
                      riskDetails?.additionalControlActions[index]
                        ?.complianceDetails?.subId
                    )}
                    getOptionLabel={(option) => option.title}
                    onChange={handleComplianceOption}
                    // renderOption={(option, { selected }) => (
                    //   <span key={option.id}>{option.title}</span>
                    // )}
                    renderInput={(params) => (
                      <TextField
                        sx={{ marginTop: 2 }}
                        fullWidth
                        {...params}
                        size={"small"}
                        variant={"outlined"}
                        label="Link additional controls to an existing compliance requirement"
                      />
                    )}
                  />
                </>
              ) : (
                ""
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default RiskAdditionalControls;
