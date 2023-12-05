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
import { fetchAllRiskControls } from "../../../Redux/features/Subsidiaries";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditControls({ handleOnClose, openDialog, control }) {
  const dispatch = useDispatch();
  const [controlDetails, setControlDetails] = React.useState({
    id: null,
    actualCategoryControlName: "",
    actualCategoryControlDescription: "",
  });

  const handleControlName = (e) => {
    setControlDetails({ ...controlDetails, actualCategoryControlName: e.target.value });
  };

  const handleDescription = (e) => {
    setControlDetails({
      ...controlDetails,
      actualCategoryControlDescription: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await categoryApi.updateControl(dispatch, {
        id: controlDetails.id,
        CategoryControlName: controlDetails.actualCategoryControlName,
        actualCategoryControlDescription: controlDetails.actualCategoryControlDescription,
      });
      if (res.success) {
        toast.success(res.message);
        handleOnClose();
        dispatch(fetchAllRiskControls());
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  React.useEffect(() => {
    if (control) {
      setControlDetails({
        id: control.id,
        actualCategoryControlName: control.actualCategoryControlName,
        actualCategoryControlDescription: control.actualCategoryControlDescription,
      });
    }
  }, [control]);

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
        <DialogTitle>{"Edit Risk Category"}</DialogTitle>
        <DialogContent>
          <form>
            <Box sx={{ display: "grid" }}>
              <TextField
                value={controlDetails.actualCategoryControlName}
                onChange={handleControlName}
                label="Name"
                name="controlName"
                size="small"
                sx={{ my: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Description"
                value={controlDetails.actualCategoryControlDescription}
                onChange={handleDescription}
                name="controlDescription"
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
