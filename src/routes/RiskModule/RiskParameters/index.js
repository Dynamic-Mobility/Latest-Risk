import React, { useEffect, useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import { Container, Typography, Grid, Box, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRiskCategories } from "../../../Redux/features/RiskUniverse";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditCategory from "./EditCategory";
import { categoryApi } from "../../../Redux/services/RiskParams";
import { toast } from "react-toastify";
import Severity from "./Severity";
import Probability from "./Probability";
import LossType from "./LossType";
import Controls from "./Controls";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import AddEditParam from "./AddEditParams";

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

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, link: "/profile-settings" },
  { label: HEADER.RISK_PARAMETERS, isActive: true },
];

const RiskParameters = () => {
  const steps = [
    "Risk Categories",
    "Probability & Severity",
    "Loss Type",
    "Risk Control Categories",
  ];

  const options = ["Edit", "Delete"];
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const [activeStep, setActiveStep] = useState(0);
  const [anchorEls, setAnchorEls] = useState([]);
  const classes = useStyles();
  const { riskCategories } = useSelector(({ risk }) => risk);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleOptionSelect = async (option, category, index) => {
    if (option === "Edit") {
      setSelectedCategory(category);
      setOpenDialog(true);
    } else if (option === "Delete") {
      setSelectedCategory(category);
      try {
        const res = await categoryApi.deleteCategory(dispatch, {
          id: category.id,
        });
        if (res.success) {
          toast.success("Category deleted successfully");
        } else if (!res.success) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
    handleClose(index);
  };

  useEffect(() => {
    dispatch(fetchAllRiskCategories());
  }, []);

  return (
    <>
      <Box
        sx={{ backgroundColor: "#f4f4f7", height: "98vh" }}
        className={openDialog ? classes.backdrop : ""}
      >
        <TopBar />
        <Container>
          <PageContainer breadcrumbs={breadcrumbs}>
            <Card sx={{ p: 2, mt: 3 }}>
              <section className="flex items-center justify-end">
                <AddEditParam />
              </section>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  {steps.map((step, index) => (
                    <Box
                      className={
                        index === activeStep
                          ? classes.isActive
                          : classes.notActive
                      }
                      onClick={() => setActiveStep(index)}
                      sx={{
                        p: 2,
                        my: 2,
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Typography key={index}>{step}</Typography>
                    </Box>
                  ))}
                </Grid>
                <Grid item md={9} xs={12} sx={{ my: 2 }}>
                  {activeStep === 0 && (
                    <>
                      <Typography
                        fontWeight={"bold"}
                        fontSize={"20px"}
                        sx={{ color: "primary.main", mb: 4 }}
                      >
                        Risk Categories
                      </Typography>
                      {riskCategories.map((category, index) => (
                        <Box key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography>{category.categoryName}</Typography>
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
                                    onClick={() =>
                                      handleOptionSelect(
                                        option,
                                        category,
                                        index
                                      )
                                    }
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          </Box>
                          <hr />
                          <EditCategory
                            handleOnClose={handleOnClose}
                            handleClickOpen={handleClickOpen}
                            openDialog={openDialog}
                            category={selectedCategory}
                          />
                        </Box>
                      ))}
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <Grid container spacing={12}>
                        <Grid item md={6} xs={12}>
                          <Probability />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Severity />
                        </Grid>
                      </Grid>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <LossType />
                    </>
                  )}
                  {activeStep === 3 && (
                    <>
                      <Controls />
                    </>
                  )}
                </Grid>
              </Grid>
            </Card>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default RiskParameters;
