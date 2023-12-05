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
import { fetchAllLossTypes } from "../../../Redux/features/Subsidiaries";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditLossType({
  handleOnClose,
  openDialog,
  lossType,
}) {
  const dispatch = useDispatch();
  const [lossTypeDetails, setLossTypeDetails] = React.useState({
    id: null,
    actualLossTypeName: "",
    actualLossTypeNameDescription: ""
  });

  const handleLossTypeName = (e) => {
    setLossTypeDetails({
      ...lossTypeDetails,
      actualLossTypeName: e.target.value,
    });
  };

  const handleLossTypeDescription = (e) => {
    setLossTypeDetails({
      ...lossTypeDetails,
      actualLossTypeNameDescription: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await probabilityApi.updateLossType(dispatch, {
        id: lossTypeDetails.id,
        lossTypeName: lossTypeDetails.actualLossTypeName,
        lossTypeNameDescription: lossTypeDetails.actualLossTypeNameDescription
      });
      if (res.success) {
        toast.success(res.message);
        handleOnClose();
        dispatch(fetchAllLossTypes());
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  React.useEffect(() => {
    if (lossType) {
      setLossTypeDetails({
        id: lossType.id,
        actualLossTypeName: lossType.actualLossTypeName,
        actualLossTypeNameDescription: lossType.actualLossTypeNameDescription
      });
    }
  }, [lossType]);

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
        <DialogTitle>{"Edit Loss Type"}</DialogTitle>
        <DialogContent>
          <form>
            <Box sx={{ display: "grid" }}>
              <TextField
                value={lossTypeDetails.actualLossTypeName}
                onChange={handleLossTypeName}
                label="Name"
                name="lossTypeName"
                size="small"
                sx={{ my: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                value={lossTypeDetails.actualLossTypeNameDescription}
                onChange={handleLossTypeDescription}
                label="Name"
                name="LossTypeDescription"
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
