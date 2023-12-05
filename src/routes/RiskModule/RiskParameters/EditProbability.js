import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { probabilityApi } from "../../../Redux/services/RiskParams/probability";
import { toast } from "react-toastify";
import { fetchAllProbabilities } from "../../../Redux/features/Subsidiaries";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProbability({
  handleOnClose,
  openDialog,
  probability,
}) {
  const dispatch = useDispatch();
  const [probabilityDetails, setProbabilityDetails] = React.useState({
    id: null,
    actualName: "",
  });

  const handleProbabilityName = (e) => {
    setProbabilityDetails({
      ...probabilityDetails,
      actualName: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await probabilityApi.updateProbability(dispatch, {
        id: probabilityDetails.id,
        name: probabilityDetails.actualName,
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
    if (probability) {
      setProbabilityDetails({
        id: probability.id,
        actualName: probability.actualName,
      });
    }
  }, [probability]);

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
        <DialogTitle>{"Edit Probability"}</DialogTitle>
        <DialogContent>
          <form>
            <Box sx={{ display: "grid" }}>
              <TextField
                value={probabilityDetails.actualName}
                onChange={handleProbabilityName}
                label="Name"
                name="probabilityName"
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
