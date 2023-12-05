import React from "react";
import { Grid, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import { Close } from "@mui/icons-material";
import {
  getAutoCompleteValue,
  getFilteredOptions,
} from "../../../@dmt/Utils/commonHelper";

const ExternalAddDepartmentForm = (props) => {
  const {
    departments,
    sections,
    subSections,
    organization,
    externalDetails,
    index,
    handleOnExternalDepartmentChange,
    handleOnExternalSectionChange,
    handleOnExternalSubSectionChange,
    handleOnExternalHeadChange,
    handleRemoveDept,
  } = props;

  const deptHeads = [
    { headName: "Department", headId: 1 },
    { headName: "Section", headId: 2 },
    { headName: "SubSection", headId: 3 },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Autocomplete
            fullWidth
            id={`department_${index}`}
            options={getFilteredOptions(departments, externalDetails, "companyId")}
            value={getAutoCompleteValue(departments, organization.departmentId)}
            getOptionLabel={(option) => option.name}
            onChange={handleOnExternalDepartmentChange(index)}
            // renderOption={(option, { selected }) => (
            //   <span key={option.id}>{option.name}</span>
            // )}
            renderInput={(params) => (
              <TextField
                required
                helperText={
                  externalDetails.companyId === "" ? "Select Subsidiary" : ""
                }
                fullWidth
                {...params}
                size={"small"}
                variant={"outlined"}
                label="Department"
              />
            )}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(
              sections,
              organization,
              "departmentId",
              "departmentsId"
            )}
            value={getAutoCompleteValue(sections, organization.sectionId)}
            getOptionLabel={(option) => option.name}
            onChange={handleOnExternalSectionChange(index)}
            // renderOption={(option, { selected }) => (
            //   <span key={option.id}>{option.name}</span>
            // )}
            renderInput={(params) => (
              <TextField
                helperText={
                  organization.departmentId === "" ? "Select Department" : ""
                }
                fullWidth
                {...params}
                size={"small"}
                variant={"outlined"}
                label="Section"
              />
            )}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(
              subSections,
              organization,
              "sectionId",
              "sectionsId"
            )}
            value={getAutoCompleteValue(subSections, organization.subSectionId)}
            getOptionLabel={(option) => option.name}
            onChange={handleOnExternalSubSectionChange(index)}
            // renderOption={(option, { selected }) => (
            //   <span key={option.id}>{option.name}</span>
            // )}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                size={"small"}
                variant={"outlined"}
                label="Sub-Section"
              />
            )}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <Autocomplete
            fullWidth
            // options={getFilteredOptions(deptHeads, organization, 'headId', 'headId')}
            options={deptHeads}
            value={getAutoCompleteValue(
              deptHeads,
              organization.headId,
              "headId"
            )}
            getOptionLabel={(option) => option.headName}
            onChange={handleOnExternalHeadChange(index)}
            // renderOption={(option, { selected }) => (
            //   <span key={option.headId}>{option.headName}</span>
            // )}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                size={"small"}
                variant={"outlined"}
                label="Select Head"
              />
            )}
          />
        </Grid>
        <Grid item md={1} xs={12}>
          <IconButton
            color={"secondary"}
            onClick={(e) => handleRemoveDept(index)}
          >
            <Close fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ExternalAddDepartmentForm;
