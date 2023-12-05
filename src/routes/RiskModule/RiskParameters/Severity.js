import React, { useEffect, useState } from "react";
import { Typography,Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchAllSeverities } from "../../../Redux/features/Subsidiaries";
import EditProbability from "./EditProbability";
import EditSeverity from "./EditSeverity";

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

const Severity = () => {

  const options = ["Edit", "Delete"];
  const [anchorEls, setAnchorEls] = useState([]);
  const classes = useStyles();
  const { severities } = useSelector(({ subsidiary }) => subsidiary);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState("");

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

  const handleOptionSelect = async (option, severity, index) => {
    if (option === "Edit") {
      setSelectedSeverity(severity);
      setOpenDialog(true);
    }
    handleClose(index);
  };

  useEffect(() => {
    dispatch(fetchAllSeverities());
  }, []);

  return (
    <>
      <Typography
        fontWeight={"bold"}
        fontSize={"20px"}
        sx={{ color: "primary.main", mb: 4 }}
      >
        Severity
      </Typography>
      {severities.map((severity, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>{severity.actualName}</Typography>
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
                    onClick={() => handleOptionSelect(option, severity, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <hr />
          <EditSeverity
            handleOnClose={handleOnClose}
            handleClickOpen={handleClickOpen}
            openDialog={openDialog}
            severity={selectedSeverity}
          />
        </Box>
      ))}
    </>
  );
};

export default Severity;
