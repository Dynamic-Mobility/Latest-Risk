import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, TextField, Grid } from "@mui/material";

const EditProfile = ({ handleClickOpen, handleClose, open }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ maxWidth: 340, marginLeft: "auto", marginRight: "auto" }}
      >
        <DialogContent>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            id="outlined-basic"
            label="PhoneNumber"
            variant="outlined"
          />
        </DialogContent>
        <Button
          sx={{ mx: 3, my: 1 }}
          variant="contained"
          onClick={handleClose}
          autoFocus
        >
          Edit
        </Button>
      </Dialog>
    </>
  );
};

export default EditProfile;
