import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, TextField } from "@mui/material";
import { riskApi } from "../../../Redux/services/RiskUniverse";

export default function NonCompliantDialog({ data }) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const editRiskIndicator = async (e) => {
    e.preventDefault();
    console.log("VALUE ",reason);
    try {
      await riskApi.updateRiskIndicator(reason,data.id); // Pass reason as payload to the API call
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
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
        <form onSubmit={editRiskIndicator}>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={reason}
              name="reason"
              onChange={(e)=> setReason(e.target.value)} // Capture input changes
              label="Reason" // Optional label for the TextField
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            {/* <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button> */}
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
