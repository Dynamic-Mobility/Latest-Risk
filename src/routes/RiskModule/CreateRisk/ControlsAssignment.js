import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import {
  fetchAllDepartments,
  fetchAllSubsidiaries,
  fetchAllSections,
  fetchAllSubSections,
} from "../../../Redux/features/Subsidiaries";
import { Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { Box, Chip, Checkbox } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";
import { RiskAddDepartment } from "./RiskAddDepartment";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { fetchAllUsers } from "../../../Redux/features/Users";
import {
  getAutoCompleteValue,
  getFilteredOptions,
} from "../../../@dmt/Utils/commonHelper";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { fetchAllRiskOwners } from "../../../Redux/features/RiskOwners";
import Divider from "@mui/material/Divider";

const initialOrganization = {
  departmentId: null,
  departmentName: "",
  sectionId: null,
  sectionName: "",
  subSectionId: null,
  subSectionName: "",
};

const ControlsAssignment = (props) => {
  const initialDialogValues = {
    open: false,
    name: "",
    index: "",
    title: "",
  };

  // ---------- CONSTANTS ------------- //
  const dispatch = useDispatch();
  const checkedIcon = <CheckBoxOutlined fontSize="small" />;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const { subsidiaries, departments, sections, subSections } = useSelector(
    ({ subsidiary }) => subsidiary
  );
  const { riskOwners } = useSelector(({ riskOwner }) => riskOwner);
  const { users } = useSelector(({ user }) => user);
  const { handleNext, handlePrev, riskDetails, setRiskDetails, index } = props;
  const [riskEmails, setRiskEmails] = useState([]);
  const [dialogValues, setDialogValues] = useState(initialDialogValues);

  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
  };

  const filter = createFilterOptions();

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  // ------------ ONCHANGE EVENTS ----------------- //
  const handleOnSubsidiaryChange = (e, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index]?.complianceDetails,
        companyId: values.id,
        companyName: values.name,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handlePrimaryOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index]?.complianceDetails,
        primaryOwnerId: values.id,
        primaryOwnerName: values.firstName + "" + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleSecondaryOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index]?.complianceDetails,
        secondaryOwnerId: values.id,
        secondaryOwnerName: values.firstName + "" + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleEscalationOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index]?.complianceDetails,
        escalationOwnerId: values.id,
        escalationOwnerName: values.firstName + "" + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleOnDepartmentChange = (i) => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [
      ...additionalControlActions[index]?.complianceDetails.organization,
    ];
    if (value !== null) {
      data[i] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      };
    } else {
      data[i] = {
        departmentId: null,
        departmentName: "",
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
    });
  };
  const handleOnSectionChange = (i) => (event, value) => {
    console.log("SECTION_VALUE ",value)
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [
      ...additionalControlActions[index]?.complianceDetails.organization,
    ];
    if (value !== null) {
      data[i] = {
        ...data[i],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: "",
      };
    } else {
      data[i] = {
        ...data[i],
        sectionId: null,
        sectionName: "",
        subSectionId: null,
        subSectionName: "",
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
    });
  };
  const handleOnSubSectionChange = (i) => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [
      ...additionalControlActions[index]?.complianceDetails.organization,
    ];
    // const data = [...riskDetails.complianceDetails.organization];
    if (value !== null) {
      data[i] = {
        ...data[i],
        subSectionId: value.id,
        subSectionName: value.name,
      };
    } else {
      data[i] = {
        ...data[i],
        subSectionId: null,
        subSectionName: "",
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
      // organization: [...data],
    });
  };
  const handleActionOwnerChange = (e, values) => {
    let data = riskDetails?.additionalControlActions;
    data[index] = { ...data[index], actionOwner: values };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  //handle button actions
  const handleAddDepartment = () => {
    let data = riskDetails.additionalControlActions;
    if (data[index]?.complianceDetails.organization) {
      data[index] = {
        ...data[index],
        complianceDetails: {
          ...data[index]?.complianceDetails,
          organization: [
            ...data[index]?.complianceDetails.organization,
            initialOrganization,
          ],
        },
      };
    } else {
      data[index] = {
        ...data[index],
        complianceDetails: {
          ...data[index]?.complianceDetails,
          organization: [initialOrganization],
        },
      };
    }

    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleRemoveDept = (i) => {
    let data = riskDetails.additionalControlActions;

    if (data[index].complianceDetails?.organization?.length > 1) {
      data[index]?.complianceDetails.organization.splice(i, 1);
      setRiskDetails({ ...riskDetails, additionalControlActions: data });
    } else {
      alert("At least One Department is Required");
      // dispatch(fetchError('At least One Department is Required'));
    }
  };

  const handleRiskEmailsChange = (e, values) => {
    let data = riskDetails?.additionalControlActions;
    data[index] = { ...data[index], emails: values };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  useEffect(() => {
    dispatch(fetchAllSubsidiaries());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllSections());
    dispatch(fetchAllSubSections());
    dispatch(fetchAllRiskOwners());
    dispatch(fetchAllUsers());
  }, []);

  return (
    <>
      <Autocomplete
        multiple
        fullWidth
        value={riskDetails?.additionalControlActions[index]?.actionOwner ?? []}
        options={riskOwners}
        autoHighlight
        onChange={handleActionOwnerChange}
        getOptionLabel={(option) => option.name}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            return (
              <Chip
                key={index}
                title={option.name}
                color={"primary"}
                label={option.name}
                onClick={(e) => renderDialog(option, index)}
                {...getTagProps({ index })}
              />
            );
          })
        }
        freeSolo
        selectOnFocus
        disableCloseOnSelect
        renderOption={(props, option, state) => (
          <ListItem key={option.id} disablePadding {...props}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={state.selected}
                checkedIcon={checkedIcon}
                //onChange= {e => handleOnCheck(e, owner)}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${option.id}`,
                }}
              />
            </ListItemIcon>

            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.name}
              secondary={
                <Typography sx={{ display: "grid" }} variant={"caption"}>
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
            variant={"outlined"}
            {...params}
            label="Action Owner"
          />
        )}
      />
      <Autocomplete
        multiple
        fullWidth
        value={riskDetails?.additionalControlActions[index]?.emails ?? []}
        options={riskEmails}
        autoHighlight
        onChange={handleRiskEmailsChange}
        filterOptions={(option, params) => {
          const filtered = filter(option, params);
          if (params.inputValue !== "") {
            filtered.push(params.inputValue);
          }
          return filtered;
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              title={option}
              //  style={{ backgroundColor: `${!validateEmail(option) ? 'red' : '#'}`, color: "white" }}
              color={`${!validateEmail(option) ? "error" : "primary"}`}
              //  variant={`${!validateEmail(option) ? 'outlined' : 'contained'}`}
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        freeSolo
        selectOnFocus
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        // renderOption={(option, state) => (
        //   <span key={option}>
        //     <Checkbox
        //       color={"primary"}
        //       icon={icon}
        //       checkedIcon={checkedIcon}
        //       style={{ marginRight: 8 }}
        //       checked={state.selected}
        //     />
        //     {option}
        //   </span>
        // )}
        renderInput={(params) => (
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            variant={"outlined"}
            {...params}
            type="email"
            label="Email"
          />
        )}
      />
      <Autocomplete
        fullWidth
        options={subsidiaries}
        value={getAutoCompleteValue(
          subsidiaries,
          riskDetails.additionalControlActions[index]?.complianceDetails
            .companyId
        )}
        getOptionLabel={(option) => option.name}
        onChange={handleOnSubsidiaryChange}
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
      <Grid item md={12} xs={12}>
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
      {riskDetails.additionalControlActions[index]?.complianceDetails
        .organization.length !== 0 &&
        riskDetails.additionalControlActions[
          index
        ]?.complianceDetails.organization?.map((org, index) => (
          <Grid key={index} item md={12} xs={12}>
            <Box mt={3}>
              <RiskAddDepartment
                {...{
                  departments,
                  sections,
                  subSections,
                  org,
                  handleOnDepartmentChange,
                  handleOnSectionChange,
                  handleOnSubSectionChange,
                  index,
                  handleRemoveDept,
                  riskDetails,
                  setRiskDetails,
                }}
              />
            </Box>
          </Grid>
        ))}
      <Autocomplete
        fullWidth
        options={users}
        value={getAutoCompleteValue(
          users,
          riskDetails?.additionalControlActions[index]?.complianceDetails
            ?.primaryOwnerId
        )}
        getOptionLabel={(option) =>
          option.name ?? option.firstName + " " + option.lastName
        }
        onChange={handlePrimaryOwnerChange}
        renderOption={(props, option, state) => (
          <ListItem key={option.id} {...props} disablePadding>
            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.firstName + " " + option.lastName}
              secondary={
                <Typography sx={{ display: "grid" }} variant={"caption"}>
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
            sx={{ marginTop: 2 }}
            required
            fullWidth
            {...params}
            size={"small"}
            variant={"outlined"}
            label="Primary Owner"
          />
        )}
      />
      <Autocomplete
        fullWidth
        options={users}
        value={getAutoCompleteValue(
          users,
          riskDetails?.additionalControlActions[index]?.complianceDetails
            ?.secondaryOwnerId
        )}
        getOptionLabel={(option) =>
          option.name ?? option.firstName + " " + option.lastName
        }
        onChange={handleSecondaryOwnerChange}
        renderOption={(props, option, state) => (
          <ListItem key={option.id} {...props} disablePadding>
            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.firstName + " " + option.lastName}
              secondary={
                <Typography sx={{ display: "grid" }} variant={"caption"}>
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
            required
            fullWidth
            sx={{ marginTop: 2 }}
            {...params}
            size={"small"}
            variant={"outlined"}
            label="Secondary Owner"
          />
        )}
      />
      <Autocomplete
        fullWidth
        options={users}
        value={getAutoCompleteValue(
          users,
          riskDetails?.additionalControlActions[index]?.complianceDetails
            ?.escalationOwnerId
        )}
        getOptionLabel={(option) =>
          option.name ?? option.firstName + " " + option.lastName
        }
        onChange={handleEscalationOwnerChange}
        renderOption={(props, option, state) => (
          <ListItem key={option.id} {...props} disablePadding>
            <ListItemText
              id={`checkbox-list-label-${option.id}`}
              primary={option.firstName + " " + option.lastName}
              secondary={
                <Typography sx={{ display: "grid" }} variant={"caption"}>
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
            required
            sx={{ marginTop: 2 }}
            fullWidth
            {...params}
            size={"small"}
            variant={"outlined"}
            label="Escalation Owner"
          />
        )}
      />
    </>
  );
};

export default ControlsAssignment;
