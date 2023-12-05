import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField, Box } from "@mui/material";
import { categoryApi } from "../../../Redux/services/RiskParams";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllRiskCategories } from "../../../Redux/features/RiskUniverse";
import { fetchAllProbabilities } from "../../../Redux/features/Subsidiaries";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditSeverity({
  handleOnClose,
  openDialog,
  severity,
}) {
  const dispatch = useDispatch();
  const [severityDetails, setSeverityDetails] = React.useState({
    id: null,
    actualName: "",
  });

  const handleProbabilityName = (e) => {
    setSeverityDetails({
      ...severityDetails,
      actualName: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await categoryApi.updateCategory(dispatch, {
        id: severityDetails.id,
        actualName: severityDetails.actualName,
      });
      if (res.success) {
        toast.success(res.message);
        handleOnClose();
        dispatch(fetchAllProbabilities());
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  React.useEffect(() => {
    if (severity) {
      setSeverityDetails({
        id: severity.id,
        actualName: severity.actualName,
      });
    }
  }, [severity]);

  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOnClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{"Edit Severity"}</DialogTitle>
        <DialogContent>
          <form>
            <Box sx={{ display: "grid" }}>
              <TextField
                value={severityDetails.actualName}
                onChange={handleProbabilityName}
                label="Name"
                name="severityName"
                size="small"
                sx={{ my: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button size="small" variant="outlined" onClick={handleOnClose}>
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                type="submit"
                size="small"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
