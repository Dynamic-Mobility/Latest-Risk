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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCategory({ handleOnClose, openDialog, category }) {
  const dispatch = useDispatch();
  const [categoryDetails, setCategoryDetails] = React.useState({
    id: null,
    categoryName: "",
    categoryDescription: "",
  });

  const handleCategoryName = (e) => {
    setCategoryDetails({ ...categoryDetails, categoryName: e.target.value });
  };

  const handleDescription = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      categoryDescription: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await categoryApi.updateCategory(dispatch, {
        id: categoryDetails.id,
        categoryName: categoryDetails.categoryName,
      });
      if (res.success) {
        toast.success(res.message);
        handleOnClose();
        dispatch(fetchAllRiskCategories());
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  React.useEffect(() => {
    if (category) {
      setCategoryDetails({
        id: category.id,
        categoryName: category.categoryName,
        categoryDescription: category.categoryDescription,
      });
    }
  }, [category]);
  

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
                value={categoryDetails.categoryName}
                onChange={handleCategoryName}
                label="Name"
                name="categoryName"
                size="small"
                sx={{ my: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Description"
                value={categoryDetails.categoryDescription}
                onChange={handleDescription}
                name="categoryDescription"
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
