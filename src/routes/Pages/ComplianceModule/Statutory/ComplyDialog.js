import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Chip, TextField, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { complianceApi } from "../../../../Redux/services/Compliance/statutory";
import { setLoading } from "../../../../Redux/features/loading";
import { toast } from "react-toastify";
import { getStatutoryComplianceSub } from "../../../../Redux/features/Compliance/statutory";

export default function ComplyDialog(props) {
  const { displayValue, data } = props;
  let initialdetails = {
    id: data.id,
    action: 0,
    documentUrl: {
      name: "",
      extension: "",
      data: "",
    },
    reason: "",
    additionalPenalty: 0,
    penaltyNarrative: "",
    actionsTaken: [],
  };
  let [formDetails, setFormDetails] = React.useState(initialdetails);
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Convert base 64 function
  const convertBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseUrl = "";

      let reader = new FileReader();

      // convert file to base64
      reader.readAsDataURL(file);

      reader.onload = () => {
        // console.log("Called", reader);
        baseUrl = reader.result;

        // get file extension
        const fileExtension = "." + file.name.split(".").pop();
        setFormDetails({
          ...formDetails,
          action: 1,
          documentUrl: {
            name: file.name,
            extension: fileExtension,
            data: baseUrl,
          },
        });
        resolve(baseUrl);
      };
    });
  };

  // FORM ONCHANGE EVENTS
  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const base64 = convertBase64(file);
  };

  // COMPLY FUNCTION
  const handleComply = async () => {
    const formData = {
      ...formDetails,
      action: 1,
    };
    try {
      const res = await complianceApi.complyStatutoryCompliance(
        dispatch,
        formData
      );
      if (res.success) {
        toast.success("Complied Successfully!");
        dispatch(getStatutoryComplianceSub({ id: data.id }));
        handleClose();
      } else {
        toast.error(res.message);
        handleClose();
      }
    } catch (error) {
      toast.error(error);
    }
    // dispatch(complianceApi.complyStatutoryCompliance(formData));
    // dispatch(fetchCompliances());
  };

  // WAIVE FUNCTION
  const handleWaive = () => {
    const formData = {
      ...formDetails,
    };
    // dispatch(complyCompliance(formData));
    // dispatch(fetchCompliances());
    handleClose();
  };

  const handleNarrativeChange = (e) => {
    setFormDetails({
      ...formDetails,
      action: 2,
      penaltyNarrative: e.target.value,
    });
  };

  const handleAmountChange = (e) => {
    setFormDetails({
      ...formDetails,
      action: 2,
      additionalPenalty: e.target.value,
    });
  };

  return (
    <div>
      <Chip
        label={displayValue}
        variant="outlined"
        sx={{
          borderColor:
            data.complianceStatus === "Comply_Now"
              ? "red"
              : data.complianceStatus === "Complied"
              ? "green"
              : "orange",
        }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "8px",
            }}
          >
            {data.complianceStatus === "Comply_Now" ? (
              <>
                <Typography gutterBottom={true} variant={"subtitle1"}>
                  Are you sure you want to Comply Now?
                </Typography>
                {data.hasAttachment === true ? (
                  <TextField
                    onChange={handleFileRead}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="file"
                    variant="outlined"
                  ></TextField>
                ) : (
                  ""
                )}
                <Box sx={{ display: "flex", gap: 4 }}>
                  <Button
                    onClick={() => handleComply()}
                    variant="outlined"
                    color="primary"
                    autoFocus
                  >
                    Yes Proceed
                  </Button>
                  <Button
                    onClick={() => handleClose()}
                    variant="contained"
                    color="primary"
                    autoFocus
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              ""
            )}
            {data.complianceStatus === "Not_Complied" ? (
              <>
                <Typography gutterBottom={true} variant={"subtitle1"}>
                  Do you want to waiver the Penalty?
                </Typography>
                <TextField
                  onChange={handleFileRead}
                  fullWidth
                  style={{ marginBottom: "10px" }}
                  type="file"
                  variant="outlined"
                ></TextField>
                {/* check both */}
                {data.penaltyType === 0 ? (
                  <>
                    <TextField
                      style={{ marginBottom: "10px" }}
                      onChange={handleNarrativeChange}
                      value={formDetails.penaltyNarrative}
                      name="narrative"
                      fullWidth
                      label="Narrative"
                      multiline
                      rows={4}
                      variant="outlined"
                    ></TextField>
                    <TextField
                      onChange={handleAmountChange}
                      value={formDetails.additionalPenalty}
                      style={{ marginBottom: "10px" }}
                      name="quantitative"
                      fullWidth
                      type={"number"}
                      label="Amount"
                      variant="outlined"
                    ></TextField>
                  </>
                ) : (
                  ""
                )}

                {/* check amount */}
                {data.penaltyType === 1 ? (
                  <>
                    <TextField
                      onChange={handleAmountChange}
                      value={formDetails.penaltyTypeName}
                      style={{ marginBottom: "10px" }}
                      name="quantitative"
                      fullWidth
                      type={"number"}
                      label="Amount"
                      variant="outlined"
                    ></TextField>
                  </>
                ) : (
                  ""
                )}

                {/* check narrative */}
                {data.penaltyType === 2 ? (
                  <>
                    <TextField
                      style={{ marginBottom: "10px" }}
                      onChange={handleNarrativeChange}
                      value={formDetails.penaltyNarrative}
                      name="narrative"
                      fullWidth
                      label="Narrative"
                      multiline
                      rows={4}
                      variant="outlined"
                    ></TextField>
                  </>
                ) : (
                  ""
                )}
                <Button
                  onClick={handleWaive}
                  variant="contained"
                  color="primary"
                >
                  Waive
                </Button>
              </>
            ) : (
              ""
            )}
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Yes Proceed
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
