import React, { useState } from "react";
import TopBar from "../../../../@dmt/common/TopBar";
import { Box, Grid, Typography, Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import {
  Column,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  StateStoring,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 10,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 10,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  button: {
    color: "#3F51B5",
    paddig: 10,
  },
}));

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.RISK_REPORT, isActive: true },
];

const SideBarReport = (props) => {
  const classes = useStyles();
  const { steps, activeStep, setActiveStep } = props;

  return (
    <div>
      {steps?.map((step, index) => (
        <Grid
          my={3}
          onClick={(e) => setActiveStep(index)}
          className={
            index === activeStep ? classes.isActive : classes.notActive
          }
          key={index}
        >
          <Typography>{step}</Typography>
        </Grid>
      ))}
    </div>
  );
};

const RiskReport = () => {
  const steps = ["Upload"];
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
          <Grid className="md:flex gap-4">
            <Grid item md={3} xs={12} className="md:w-3/12 w-full">
              <SideBarReport
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid item md={9} xs={12} mt={3} className="md:w-9/12 w-full">
              {activeStep === 0 && (
                <>
                  <>
                    <DataGrid
                      className="shadow-2xl"
                      id="risks"
                      // height={"70vh"}
                      columnAutoWidth={true}
                      // dataSource={indicators}
                      showColumnLines={true}
                      showRowLines={true}
                      showBorders={true}
                      allowColumnResizing={true}
                      rowAlternationEnabled={true}
                    >
                      <StateStoring
                        enabled={false}
                        type="localStorage"
                        storageKey="risks"
                      />
                      <SearchPanel visible={true} />
                      <Column
                        fixed={true}
                        fixedPosition="left"
                        caption="Action"
                        width={120}
                        alignment={"center"}
                        allowFiltering={false}
                      />
                      <Column
                        dataField="riskUniverseTitle"
                        minWidth={100}
                        caption="Title"
                        allowHeaderFiltering={true}
                        allowSearch={true}
                        allowFiltering={false}
                      />
                      <Column
                        dataField="riskCategoryName"
                        minWidth={100}
                        caption="Description"
                        allowHeaderFiltering={true}
                        allowSearch={true}
                        allowFiltering={false}
                      />
                      <Column
                        dataField="departmentName"
                        minWidth={100}
                        caption="Document Owner"
                        allowHeaderFiltering={true}
                        allowSearch={true}
                        allowFiltering={false}
                      />
                      <Column
                        dataField="riskIndicator"
                        minWidth={100}
                        caption="Attachment"
                        allowHeaderFiltering={true}
                        allowSearch={true}
                        allowFiltering={false}
                      />
                      <Scrolling rowRenderingMode="virtual" />
                      <Paging defaultPageSize={20} />
                      <Pager
                        visible={true}
                        displayMode={true}
                        showPageSizeSelector={false}
                        showInfo={true}
                        showNavigationButtons={true}
                      />
                      <Toolbar>
                        <Item location="before">
                          <Typography
                            variant="h5"
                            color="primary"
                            fontWeight={700}
                          >
                            Risk Report
                          </Typography>
                        </Item>
                        <Item location="after">
                          <Link to="/create-risk-report">
                            <Button variant="contained" color="primary">
                              Create Report
                            </Button>
                          </Link>
                        </Item>
                        <Item location="after" name="columnChooserButton" />
                        <Item location="after" name="searchPanel" />
                      </Toolbar>
                    </DataGrid>
                  </>
                </>
              )}
            </Grid>
          </Grid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default RiskReport;
