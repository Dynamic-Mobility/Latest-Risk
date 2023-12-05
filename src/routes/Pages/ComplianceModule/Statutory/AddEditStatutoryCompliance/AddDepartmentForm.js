import React from "react";
import { dummySubsidiary } from "../../../../../@dmt/constants/Fields";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  getFilteredOptions,
  getAutoCompleteValue,
} from "../../../../../@dmt/Utils/commonHelper";

const AddDepartmentForm = (props) => {
  const {
    departments,
    sections,
    subsections,
    organization,
    complianceDetails,
    index,
    handleOnDepartmentChange,
    handleOnSectionChange,
    handleOnSubSectionChange,
    handleRemoveDept,
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Autocomplete
            fullWidth
            id={`department_${index}`}
            options={getFilteredOptions(
              departments,
              complianceDetails,
              "companyId"
            )}
            value={getAutoCompleteValue(departments, organization.departmentId)}
            getOptionLabel={(option) => option.name}
            onChange={handleOnDepartmentChange(index)}
            renderInput={(params) => (
              <TextField
                fullWidth
                helperText={
                  complianceDetails.companyId === "" ? "Select Subsidiary" : ""
                }
                size="small"
                {...params}
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
            onChange={handleOnSectionChange(index)}
            renderInput={(params) => (
              <TextField
                helperText={
                  organization.departmentId === "" ? "Select Department" : ""
                }
                fullWidth
                size="small"
                {...params}
                label="Section"
              />
            )}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(subsections, organization, 'sectionId', 'sectionsId')}
            value={getAutoCompleteValue(subsections, organization.subSectionId)}
            getOptionLabel={option => option.name}
            onChange={handleOnSubSectionChange(index)}
            renderInput={(params) => (
              <TextField
                fullWidth
                size="small"
                {...params}
                label="Sub Section"
              />
            )}
          />
        </Grid>
        <Grid item md={1} xs={12}>
          <IconButton
            onClick={(e) => handleRemoveDept(index)}
            color={"secondary"}
            // onClick={(e) => handleRemoveDept(index)}
          >
            <CloseIcon fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default AddDepartmentForm;
