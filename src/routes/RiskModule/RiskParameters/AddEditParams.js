import * as React from "react";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { categoryApi } from "../../../Redux/services/RiskParams";
import { fetchAllRiskControls } from "../../../Redux/features/Subsidiaries";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  categoryName: "",
  categoryDescription: "",
};

export default function AddEditParam() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);

  console.log("STATE ", state);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const res = await categoryApi.creatCategory(dispatch, state);
      toast.success(res.message);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="cursor-pointer">
        <AddCircleIcon color="primary" onClick={handleClickOpen} />
      </div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Risk Categories: Create New Item"}
        </DialogTitle>
        <form>
          <DialogContent>
            <section className="grid space-y-4 my-4">
              <TextField
                onChange={(e) =>
                  setState({ ...state, categoryName: e.target.value })
                }
                label="Name"
                size="small"
              />
              <TextField
                onChange={(e) =>
                  setState({ ...state, categoryDescription: e.target.value })
                }
                label="Description"
                size="small"
              />
            </section>
          </DialogContent>
          <DialogActions>
            <section className="flex gap-2 items-center justify-end">
              <Button size="small" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button size="small" variant="contained" onClick={handleSave}>
                Save
              </Button>
            </section>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
