import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCriteria,
  setSelectedCriteria,
} from "../../../../Redux/features/RiskUniverse/dashboard";
import { Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CriteriaMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);
  const dispatch = useDispatch();
  const { selectedCriteria } = useSelector(
    ({ riskDashboard }) => riskDashboard
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const cretirias = [
    {
      id: 1,
      label: "Departments",
    },
    {
      id: 2,
      label: "Risk Categories",
    },
  ];

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (criteria) => {
    dispatch(setSelectedCriteria(criteria));
    setAnchorEl(null);
  };


  useEffect(() => {
    if (selectedCriteria) {
      dispatch(fetchCriteria(selectedCriteria));
    }
  }, [selectedCriteria]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          my: 2,
        }}
      >
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
        >
          {selectedCriteria ? selectedCriteria.label : "Select Criteria"}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {cretirias.map((cret) => (
            <MenuItem key={cret.id} onClick={() => handleMenuItemClick(cret)}>
              {cret.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default CriteriaMenu;


