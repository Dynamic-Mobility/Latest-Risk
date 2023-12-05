import React, { useEffect, useState } from "react";
import { Typography,Box} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchAllRiskControls } from "../../../Redux/features/Subsidiaries";
import EditProbability from "./EditProbability";
import EditCategory from "./EditCategory";
import EditControls from "./EditControls";


const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 12,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 12,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  backdrop: {
    backgroundColor: "black",
  },
}));

const Controls = () => {

  const options = ["Edit", "Delete"];
  const [anchorEls, setAnchorEls] = useState([]);
  const { riskControls } = useSelector(({ subsidiary }) => subsidiary);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  const handleClick = (index, event) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleOptionSelect = async (option, control, index) => {
    if (option === "Edit") {
      setSelectedControl(control);
      setOpenDialog(true);
    }
    handleClose(index);
  };

  useEffect(() => {
    dispatch(fetchAllRiskControls());
  }, []);

  return (
    <>
      <Typography
        fontWeight={"bold"}
        fontSize={"20px"}
        sx={{ color: "primary.main", mb: 4 }}
      >
        Risk Control Category
      </Typography>
      {riskControls.map((control, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>{control.actualCategoryControlName}</Typography>
            </Box>
            <Box>
              <IconButton
                aria-label="more"
                id={`long-button-${index}`}
                aria-controls={`long-menu-${index}`}
                aria-expanded={isOpen ? "true" : undefined}
                aria-haspopup="true"
                onClick={(event) => handleClick(index, event)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`long-menu-${index}`}
                MenuListProps={{
                  "aria-labelledby": `long-button-${index}`,
                }}
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleClose(index)}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={() => handleOptionSelect(option, control, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <hr />
          <EditControls
            handleOnClose={handleOnClose}
            handleClickOpen={handleClickOpen}
            openDialog={openDialog}
            control={selectedControl}
          />
        </Box>
      ))}
    </>
  );
};

export default Controls;
