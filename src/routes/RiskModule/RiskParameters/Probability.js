import React, { useEffect, useState } from "react";
import { Typography,Box} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchAllProbabilities } from "../../../Redux/features/Subsidiaries";
import EditProbability from "./EditProbability";


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

const Probability = () => {

  const options = ["Edit", "Delete"];
  const [anchorEls, setAnchorEls] = useState([]);
  const { probabilities } = useSelector(({ subsidiary }) => subsidiary);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProbability, setSelectedProbability] = useState("");

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

  const handleOptionSelect = async (option, probability, index) => {
    if (option === "Edit") {
      setSelectedProbability(probability);
      setOpenDialog(true);
    }
    handleClose(index);
  };

  useEffect(() => {
    dispatch(fetchAllProbabilities());
  }, []);

  return (
    <>
      <Typography
        fontWeight={"bold"}
        fontSize={"20px"}
        sx={{ color: "primary.main", mb: 4 }}
      >
        Probabilities
      </Typography>
      {probabilities.map((probability, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>{probability.actualName}</Typography>
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
                    onClick={() => handleOptionSelect(option, probability, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <hr />
          <EditProbability
            handleOnClose={handleOnClose}
            handleClickOpen={handleClickOpen}
            openDialog={openDialog}
            probability={selectedProbability}
          />
        </Box>
      ))}
    </>
  );
};

export default Probability;
