import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { subsidiaryApi } from "../../../../Redux/services/Subsidiary";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { fetchAllDepartments, fetchAllSubsidiaries, fetchAllUsers } from "../../../../Redux/features/Subsidiaries";
import { getAutoCompleteValue } from "../../../../@dmt/Utils/commonHelper";

export default function CreateDepartment() {
  const [open, setOpen] = React.useState(false);
  const { users } = useSelector((store) => store.user);
  const { subsidiaries } = useSelector(( store ) => store.subsidiary);
  const [currentDept, setCurrentDept] = React.useState(false);

  console.log("SUB ",subsidiaries)


  const initialState = {
    name: "",
    description: "",
    companyId: null,
    departmentHeadId: null,
  };
  const [deptDetails, setDeptDetails] =
    React.useState(initialState);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnHODChange = (event, value) => {
    if (value !== null) {
      setDeptDetails({ ...deptDetails, departmentHeadId: value.id, departmentHead: value.firstName + ' ' + value.lastName });
    } else {
      setDeptDetails({ ...deptDetails, departmentHeadId: null, departmentHead: '' });
    }
  };

  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setDeptDetails({ ...deptDetails, companyId: value.id, companyName: value.name });
    } else {
      setDeptDetails({ ...deptDetails, companyId: '', companyName: '' });
    }
  };

  const handleOnSave = async (e) => {
    e.preventDefault();
    try {
      const res = await subsidiaryApi.creatDepartment(
        dispatch,
        deptDetails
      );
      toast.success(res.message);
      handleClose();
      dispatch(fetchAllDepartments());
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };


  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllSubsidiaries());
  },[])

  return (
    <React.Fragment>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Create Department
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Department"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleOnSave}>
            <Box width={"100%"} className="space-y-4 mt-4">
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    label="Department Name"
                    value={deptDetails.name}
                    onChange={(e) =>
                      setDeptDetails({ ...deptDetails, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Description"
                    value={deptDetails.description}
                    onChange={(e) =>
                      setDeptDetails({
                        ...deptDetails,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid>
                {currentDept && (
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={getAutoCompleteValue(
                        users,
                        deptDetails.departmentHeadId
                      )}
                      getOptionLabel={(option) =>
                        option.firstName + " " + option.lastName
                      }
                      disablePortal
                      onChange={handleOnHODChange}
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
                          label="Department Head"
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    fullWidth
                    options={subsidiaries}
                    value={getAutoCompleteValue(
                      subsidiaries,
                      deptDetails.companyId
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
            </Box>
            <Box className="mt-2" display="flex" justifyContent="flex-end" mb={4}>
              <Button
                variant={"outlined"}
                color={"secondary"}
                onClick={handleClose}
                size="small"
              >
                Cancel
              </Button>
              <Box ml={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type={"submit"}
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
