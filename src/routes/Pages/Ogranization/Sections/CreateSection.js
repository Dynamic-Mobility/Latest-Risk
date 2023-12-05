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
  fetchAllSubsidiaries,
  fetchAllUsers,
} from "../../../../Redux/features/Subsidiaries";
import { getAutoCompleteValue } from "../../../../@dmt/Utils/commonHelper";

export default function CreateSection() {
  const [open, setOpen] = React.useState(false);
  const { users } = useSelector(({ auth }) => auth);
  const [currentSection, setCurrentSection] = React.useState(false);
  const { subsidiaries, departments } = useSelector(
    (store) => store.subsidiary
  );

//   "name": "test",
//   "description": "",
//   "companyId": "74ecc4c6-d1bc-4ccf-a4b6-2329a6f6eaec",
//   "departmentsId": "1ac25855-42f8-4914-be47-8119f51832ba",
//   "sectionHeadId": null

  const initialDetails = {
    name: "",
    description: "",
    companyId: "",
    departmentsId: "",
    sectionHeadId: null,
  };
  const [sectionDetails, setSectionDetails] = React.useState(initialDetails);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSODChange = (event, value) => {
    if (value !== null) {
      setSectionDetails({
        ...sectionDetails,
        sectionHeadId: value.id,
        sectionHead: value.firstName + " " + value.lastName,
      });
    } else {
      setSectionDetails({
        ...sectionDetails,
        sectionHeadId: "",
        // sectionHead: "",
      });
    }
  };

  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setSectionDetails({
        ...sectionDetails,
        companyId: value.id,
        // companyName: value.name,
      });
    } else {
      setSectionDetails({
         ...sectionDetails, 
         companyId: "", 
        //  companyName: ""
         });
    }
  };

  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setSectionDetails({
        ...sectionDetails,
        departmentsId: value.id,
        // departmentsName: value.name,
      });
    } else {
      setSectionDetails({
        ...sectionDetails,
        departmentsId: "",
        // departmentsName: "",
      });
    }
  };

  const handleOnSave = async (e) => {
    e.preventDefault();
    try {
      const res = await subsidiaryApi.creatSection(dispatch, sectionDetails);
      toast.success(res.message);
      handleClose();
      dispatch(fetchAllSections());
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllSubsidiaries());
    dispatch(fetchAllDepartments());
  }, []);

  return (
    <React.Fragment>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Create Section
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
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Section Name"
                  required
                  value={sectionDetails.name}
                  onChange={(e) =>
                    setSectionDetails({
                      ...sectionDetails,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={subsidiaries}
                  value={getAutoCompleteValue(
                    subsidiaries,
                    sectionDetails.companyId
                  )}
                  getOptionLabel={(option) => option.name}
                  onChange={handleOnSubsidiaryChange}
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
                  value={getAutoCompleteValue(
                    departments,
                    sectionDetails.departmentsId
                  )}
                  getOptionLabel={(option) => option.name}
                  onChange={handleOnDepartmentChange}
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
              {currentSection && (
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={getAutoCompleteValue(
                      users,
                      sectionDetails.sectionHeadId
                    )}
                    getOptionLabel={(option) =>
                      option.firstName + " " + option.lastName
                    }
                    onChange={handleOnSODChange}
                    renderOption={(option, { selected }) => (
                      <span key={option.id}>
                        {option.firstName} {option.lastName}
                      </span>
                    )}
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
              className="mt-4"
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
                  type={"submit"}
                  color="primary"
                  size="small"
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
