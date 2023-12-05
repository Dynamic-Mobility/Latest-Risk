import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, TextField } from "@mui/material";
import { subsidiaryApi } from "../../../../Redux/services/Subsidiary";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { useEffect } from "react";
import { fetchAllSubsidiaries } from "../../../../Redux/features/Subsidiaries";



export default function EditSubsidiary({ selectedRow,open,setOpen}) {
  const { user } = useSelector(({ auth }) => auth);

  console.log("ROW_ROW ",selectedRow)


  const initialState = {
    name: "",
    tenantId: user?.tenant,
    description: "",
    country: "",
    city: "",
    street: "",
    address: "",
    building: "",
    imagePath: "",
    mission: "",
    active: true,
  };
  const [subsidiaryDetails, setSubsidiaryDetails] =
    React.useState(initialState);
  const dispatch = useDispatch();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSave = async (e) => {
    e.preventDefault();
    try {
      const res = await subsidiaryApi.editSubsidiary(dispatch, subsidiaryDetails);
      toast.success(res.message);
      handleClose();
      dispatch(fetchAllSubsidiaries);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    // Update form state when selectedRow changes
    if (selectedRow) {
      setSubsidiaryDetails({
        name: selectedRow.name || '',
        tenantId: user?.tenant,
        description: selectedRow.description || '',
        country: selectedRow.country || '',
        city: selectedRow.city || '',
        street: selectedRow.street || '',
        address: selectedRow.address || '',
        building: selectedRow.building || '',
        imagePath: selectedRow.imagePath || '',
        mission: selectedRow.mission || '',
        active: selectedRow.active || true,
      });
    }
  }, [selectedRow]);


  return (
    <React.Fragment>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Create Subsidiary
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Subsidiary"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleOnSave}>
            <Box width={"100%"} className="space-y-4 mt-4">
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  fullWidth
                  required
                  variant="outlined"
                  label="Subsidiary Name"
                  value={subsidiaryDetails.name}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  fullWidth
                  multiline={true}
                  minRows={3}
                  variant="outlined"
                  label="Description"
                  value={subsidiaryDetails.description}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Country"
                  value={subsidiaryDetails.country}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      country: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="City"
                  value={subsidiaryDetails.city}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      city: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Street"
                  value={subsidiaryDetails.street}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      street: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Address"
                  value={subsidiaryDetails.address}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      address: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Mission"
                  multiline={true}
                  minRows={3}
                  value={subsidiaryDetails.mission}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      mission: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  multiline={true}
                  minRows={3}
                  label="Vision"
                  value={subsidiaryDetails.vision}
                  onChange={(e) =>
                    setSubsidiaryDetails({
                      ...subsidiaryDetails,
                      vision: e.target.value,
                    })
                  }
                />
              </Grid>
            </Box>
            <Box className="mt-3" display="flex" justifyContent="flex-end" mb={4}>
              <Button
                onClick={handleClose}
                variant={"outlined"}
                color={"error"}
                size="small"
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
                  Edit
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
