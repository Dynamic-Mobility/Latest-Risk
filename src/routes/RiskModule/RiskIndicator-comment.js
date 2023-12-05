import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, TextField } from "@mui/material";

export default function RiskIndicatorComment({ open,setOpen }) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Chip
        onClick={handleClickOpen}
        variant="outlined"
        color="error"
        label="Non Compliant"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Provide a Reason for Non Compliance"}
        </DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField  fullWidth multiline rows={4} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
            <Button variant="contained">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
