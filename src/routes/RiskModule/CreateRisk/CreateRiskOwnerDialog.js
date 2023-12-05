import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { riskOwnerApi } from "../../../Redux/services/RiskOwners";
import { fetchAllRiskOwnerTypes, fetchAllRiskOwners, fetchRiskOwner } from "../../../Redux/features/RiskOwners";
import { toast } from "react-toastify";
import { fetchAllUsers } from "../../../Redux/features/Users";
import { getAutoCompleteValue } from "../../../@dmt/Utils/commonHelper";
import { Autocomplete, TextField, Grid } from "@mui/material";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const { subsidiaries, departments, sections, subSections } = useSelector(
    ({ subsidiary }) => subsidiary
  );
  const { riskOwnerTypes, riskOwners } = useSelector(
    ({ riskOwner }) => riskOwner
  );
  const { users } = useSelector(({ user }) => user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const initialDetails = {
    name: "",
    email: "",
    phoneNumber: "",
    companyId: "",
    riskOwnerTypeId: "",
    user: "",
  };

  const [riskDetails, setRiskDetails] = React.useState(initialDetails);

  useEffect(() => {
    dispatch(fetchAllRiskOwnerTypes());
    dispatch(fetchAllUsers());
  }, []);

  //   onchange functions
  const handleNameChange = (e) => {
    setRiskDetails({ ...riskDetails, name: e.target.value });
  };
  const handleEmailChange = (e) => {
    setRiskDetails({ ...riskDetails, email: e.target.value });
  };
  const handlePhoneNumberChange = (e) => {
    setRiskDetails({ ...riskDetails, phoneNumber: e.target.value });
  };
  const handleSubsidiaryChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        companyId: value.id,
        companyName: value.name,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        companyId: null,
        companyName: "",
      });
    }
  };

  const handleRiskOwnerTypeIdChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        riskOwnerType: value.name,
        riskOwnerTypeId: value.id,
        user: "",
        name: "",
        email: "",
        phoneNumber: "",
        companyId: "",
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskOwnerType: "",
        riskOwnerTypeId: null,
      });
    }
  };

  const handleRiskUserChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        user: value.id,
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        phoneNumber: value.phoneNumber,
        companyId: value.companyId,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        // riskOwnerType: '',
        // riskOwnerTypeId: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await riskOwnerApi.addRiskOwner(dispatch, riskDetails);
      if (res.success) {
        toast.success("RiskOwner added successfully");
        await dispatch(fetchAllRiskOwners())
        handleClose();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
    }
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Risk Owner
      </Button>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid item md={12} xs={12}>
                <Autocomplete
                  fullWidth
                  options={riskOwnerTypes}
                  value={getAutoCompleteValue(
                    riskOwnerTypes,
                    riskDetails.riskOwnerTypeId
                  )}
                  getOptionLabel={(option) => option.ownerType}
                  onChange={handleRiskOwnerTypeIdChange}
                //   renderOption={(option, { selected }) => (
                //     <span key={option.id}>{option.ownerType}</span>
                //   )}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      sx={{ marginTop: 2 }}
                      {...params}
                      size={"small"}
                      variant={"outlined"}
                      label="RiskOwnerTypes"
                    />
                  )}
                />
              </Grid>
              {riskDetails.riskOwnerTypeId === 7 ? (
                <>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={getAutoCompleteValue(users, riskDetails.user)}
                      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                      onChange={handleRiskUserChange}
                    //   renderOption={(option, { selected }) => (
                    //     <span
                    //       key={option.id}
                    //     >{`${option.firstName} ${option.lastName}`}</span>
                    //   )}
                      renderInput={(params) => (
                        <TextField
                          sx={{ marginTop: 2 }}
                          fullWidth
                          {...params}
                          size={"small"}
                          variant={"outlined"}
                          label="Users"
                        />
                      )}
                    />
                  </Grid>
                  <>
                    <Grid item md={12} xs={12}>
                      <TextField
                        m="5px"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        label="Name"
                        variant="outlined"
                        value={riskDetails.name}
                        onChange={handleNameChange}
                      />
                      <TextField
                        fullWidth
                        sx={{ marginTop: 2 }}
                        label="Email"
                        variant="outlined"
                        value={riskDetails.email}
                        onChange={handleEmailChange}
                      />
                    </Grid>
                  </>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      sx={{ marginTop: 2 }}
                      label="PhoneNumber"
                      variant="outlined"
                      value={riskDetails.phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={getAutoCompleteValue(
                        subsidiaries,
                        riskDetails.companyId
                      )}
                      getOptionLabel={(option) => option.name}
                      onChange={handleSubsidiaryChange}
                    //   renderOption={(option, { selected }) => (
                    //     <span key={option.id}>{option.name}</span>
                    //   )}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ marginTop: 2 }}
                          {...params}
                          size={"small"}
                          variant={"outlined"}
                          label="Subsidiary"
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={12} xs={12}>
                    <TextField
                      m="5px"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      label="Name"
                      variant="outlined"
                      value={riskDetails.name}
                      onChange={handleNameChange}
                    />
                    <TextField
                      fullWidth
                      sx={{ marginTop: 2 }}
                      label="Email"
                      variant="outlined"
                      value={riskDetails.email}
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      sx={{ marginTop: 2 }}
                      fullWidth
                      label="PhoneNumber"
                      variant="outlined"
                      value={riskDetails.phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={getAutoCompleteValue(
                        subsidiaries,
                        riskDetails.companyId
                      )}
                      getOptionLabel={(option) => option.name}
                      onChange={handleSubsidiaryChange}
                    //   renderOption={(option, { selected }) => (
                    //     <span key={option.id}>{option.name}</span>
                    //   )}
                      renderInput={(params) => (
                        <TextField
                          sx={{ marginTop: 2 }}
                          fullWidth
                          {...params}
                          size={"small"}
                          variant={"outlined"}
                          label="Subsidiary"
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
