import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, TextField, Autocomplete } from "@mui/material";
import { subsidiaryApi } from "../../../../Redux/services/Subsidiary";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  fetchAllDepartments,
  fetchAllSections,
  fetchAllSubSections,
  fetchAllSubsidiaries,
  fetchAllUsers,
} from "../../../../Redux/features/Subsidiaries";
import { getAutoCompleteValue } from "../../../../@dmt/Utils/commonHelper";

export default function CreateSubSection() {
  const [open, setOpen] = React.useState(false);
  const { users } = useSelector(({ auth }) => auth);
  const [currentSubSection, setCurrentSubsection] = React.useState(false);
  const { subsidiaries, departments, sections } = useSelector(
    (store) => store.subsidiary
  );



  const initialDetails = {
    name: "",
    description: "",
    companyId: null,
    departmentsId: null,
    sectionsId: null,
    subSectionHeadId: null,
  };

  const [subSectionDetails, setSubSectionDetails] =
    React.useState(initialDetails);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSODChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({
        ...subSectionDetails,
        subSectionHeadId: value.id,
        subSectionHead: value.firstName + " " + value.lastName,
      });
    } else {
      setSubSectionDetails({
        ...subSectionDetails,
        subSectionHeadId: "",
      });
    }
  };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({
        ...subSectionDetails,
        companyId: value.id,
      });
    } else {
      setSubSectionDetails({
        ...subSectionDetails,
        companyId: "",
      });
    }
  };
  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({
        ...subSectionDetails,
        departmentsId: value.id,
      });
    } else {
      setSubSectionDetails({
        ...subSectionDetails,
        departmentsId: "",
      });
    }
  };
  const handleOnSectionChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({
        ...subSectionDetails,
        sectionsId: value.id,
      });
    } else {
      setSubSectionDetails({
        ...subSectionDetails,
        sectionsId: "",
      });
    }
  };

  const handleOnSave = async (e) => {
    e.preventDefault();
    try {
      const res = await subsidiaryApi.creatSubSection(
        dispatch,
        subSectionDetails
      );
      toast.success(res.message);
      handleClose();
      dispatch(fetchAllSubSections());
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllSubsidiaries());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllSubSections());
    dispatch(fetchAllSections());
  }, []);

  return (
    <React.Fragment>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Create Sub Section
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Section"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleOnSave}>
            <Box sx={{ width: "100%" }} className="space-y-4 mt-4">
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Sub-section Name"
                  value={subSectionDetails.name}
                  onChange={(e) =>
                    setSubSectionDetails({
                      ...subSectionDetails,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={subsidiaries}
                  value={subsidiaries?.find(
                    (subsidiary) =>
                      subsidiary.id === subSectionDetails.companyId
                  )}
                  getOptionLabel={(option) => option.name}
                  onChange={handleOnSubsidiaryChange}
                  // renderOption={(option, { selected }) => (
                  //   <span key={option.id}>{option.name}</span>
                  // )}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      {...params}
                      label="Subsidiary"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={departments}
                  value={departments?.find(
                    (department) =>
                      department.id === subSectionDetails.departmentId
                  )}
                  getOptionLabel={(option) => option.name}
                  onChange={handleOnDepartmentChange}
                  // renderOption={(option, { selected }) => (
                  //   <span key={option.id}>{option.name}</span>
                  // )}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      {...params}
                      label="Department"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={sections}
                  value={sections?.find(
                    (section) => section.id === subSectionDetails.sectionsId
                  )}
                  getOptionLabel={(option) => option.name}
                  onChange={handleOnSectionChange}
                  // renderOption={(option, { selected }) => (
                  //   <span key={option.id}>{option.name}</span>
                  // )}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      {...params}
                      label="Section"
                    />
                  )}
                />
              </Grid>
              {currentSubSection && (
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={users?.find(
                      (user) => user.id === subSectionDetails.sectionHeadId
                    )}
                    getOptionLabel={(option) =>
                      option.firstName + " " + option.lastName
                    }
                    onChange={handleOnSODChange}
                    //   renderOption={(option, { selected }) => (
                    //     <span key={option.id}>
                    //       {option.firstName} {option.lastName}
                    //     </span>
                    //   )}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size={"small"}
                        variant={"outlined"}
                        {...params}
                        label="Section Head"
                      />
                    )}
                  />
                </Grid>
              )}
            </Box>
            <Box
              className="mt-3"
              display="flex"
              justifyContent="flex-end"
              mb={4}
            >
              <Button
                onClick={handleClose}
                size="small"
                variant={"outlined"}
                color={"error"}
              >
                Cancel
              </Button>
              <Box ml={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type={"submit"}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
