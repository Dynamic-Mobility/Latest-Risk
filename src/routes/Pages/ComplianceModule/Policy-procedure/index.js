import React, { useState } from "react";
import TopBar from "../../../../@dmt/common/TopBar";
import { Grid, Typography, TextField, Container, Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Column,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
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
  { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
  // { label: HEADER.STATUTORY_TABLE, link: "/statutory-compliance" },
  { label: HEADER.POLICY_PROCEDURE, isActive: true },
];

const SideBarProcedures = (props) => {
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

const PolicyProcedure = () => {
  const steps = ["Policy", "Procedure"];
  const [activeStep, setActiveStep] = useState(0);
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const [category, setCategory] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handlePreview = (event) => {
    setPreview(event.target.value);
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          {/* <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <SideBarProcedures
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>

            <Grid item md={9} xs={12} my={1}>
              {activeStep === 0 && (
                <>
                  <Grid item md={3} xs={12}>
                    <Box mt={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}
                          label="Select User Category"
                          onChange={handleChange}
                        >
                          <MenuItem value={1}>Policy</MenuItem>
                          <MenuItem value={2}>Procedure</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  {category === 1 && (
                    <>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Policy Title"
                        sx={{ my: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Policy Description"
                        sx={{ my: 2 }}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Policy Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={status}
                          label="Select User Category"
                          onChange={handleStatus}
                        >
                          <MenuItem value={1}>Complied</MenuItem>
                          <MenuItem value={2}>Not Complied</MenuItem>
                        </Select>
                      </FormControl>
                      {status === 2 && (
                        <>
                          <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            label="Provide a reason"
                            sx={{ my: 2 }}
                          />
                        </>
                      )}
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Policy Review Deadline"
                        sx={{ my: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Policy Owner Department"
                        sx={{ my: 2 }}
                      />
                    </>
                  )}
                  {category === 2 && (
                    <>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Procedure Title"
                        sx={{ my: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Procedure Description"
                        sx={{ my: 2 }}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Procedure Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={status}
                          label="Select User Category"
                          onChange={handleStatus}
                        >
                          <MenuItem value={1}>Complied</MenuItem>
                          <MenuItem value={2}>Not Complied</MenuItem>
                        </Select>
                      </FormControl>
                      {status === 2 && (
                        <>
                          <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            label="Provide a reason"
                            sx={{ my: 2 }}
                          />
                        </>
                      )}
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Procedure Review Deadline"
                        sx={{ my: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Procedure Owner Department"
                        sx={{ my: 2 }}
                      />
                    </>
                  )}
                </>
              )}
              {activeStep === 1 && (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>
                      Select Category
                    </InputLabel>
                    <Select
                      sx={{ mt: 2 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={preview}
                      label="Select User Category"
                      onChange={handlePreview}
                    >
                      <MenuItem value={1}>Policy</MenuItem>
                      <MenuItem value={2}>Procedure</MenuItem>
                    </Select>
                  </FormControl>

                  {preview === 1 && (
                    <>
                      <DataGrid
                        id="statutory"
                        columnAutoWidth={true}
                        // dataSource={statutoryComplianceSub}
                        showColumnLines={true}
                        showRowLines={true}
                        showBorders={true}
                        // height={"75vh"}
                        allowColumnResizing={true}
                        rowAlternationEnabled={true}
                      >
                        <Column
                          dataField="title"
                          width={150}
                          caption="Policy Title"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                        />
                        <Column
                          dataField="description"
                          width={200}
                          caption="Policy Description"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                        />
                        <Column
                          dataField="complianceStatus"
                          width={200}
                          caption="Policy Status"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                          // cellRender={complyAction}
                        />
                        <Column
                          dataField="submissionDeadline"
                          width={200}
                          caption="Policy Review Deadline"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                          // cellRender={convertDate}
                        />
                        <Column
                          dataField="approvalStatus"
                          width={200}
                          caption="Policy Owner"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                          // cellRender={approveCompliance}
                        />
                        <Column
                          dataField="authority"
                          minWidth={100}
                          caption="Reason for Non- Compliance and Recommendation"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                        />
                        <Scrolling rowRenderingMode="virtual" />
                        <Paging defaultPageSize={20} />
                        <Pager
                          visible={true}
                          // allowedPageSizes={allowedPageSizes}
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
                              Policy
                            </Typography>
                          </Item>

                          <Item location="after" name="columnChooserButton" />
                        </Toolbar>
                      </DataGrid>
                    </>
                  )}
                  {preview === 2 && (
                    <>
                       <DataGrid
                        id="statutory"
                        columnAutoWidth={true}
                        // dataSource={statutoryComplianceSub}
                        showColumnLines={true}
                        showRowLines={true}
                        showBorders={true}
                        // height={"75vh"}
                        allowColumnResizing={true}
                        rowAlternationEnabled={true}
                      >
                        <Column
                          dataField="title"
                          width={150}
                          caption="Procedure Title"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                        />
                        <Column
                          dataField="description"
                          width={200}
                          caption="Procedure Description"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                        />
                        <Column
                          dataField="complianceStatus"
                          width={200}
                          caption="Procedure Status"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                          // cellRender={complyAction}
                        />
                        <Column
                          dataField="submissionDeadline"
                          width={200}
                          caption="Procedure Review Deadline"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                          // cellRender={convertDate}
                        />
                        <Column
                          dataField="approvalStatus"
                          width={200}
                          caption="Procedure Owner"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                          // cellRender={approveCompliance}
                        />
                        <Column
                          dataField="authority"
                          minWidth={100}
                          caption="Reason for Non- Compliance and Recommendation"
                          allowHeaderFiltering={true}
                          allowSearch={true}
                          allowFiltering={false}
                        />
                        <Scrolling rowRenderingMode="virtual" />
                        <Paging defaultPageSize={20} />
                        <Pager
                          visible={true}
                          // allowedPageSizes={allowedPageSizes}
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
                              Procedure
                            </Typography>
                          </Item>

                          <Item location="after" name="columnChooserButton" />
                        </Toolbar>
                      </DataGrid>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid> */}

          <Grid container spacing={2}>
            <Grid item md={3} mt={6}>
              <SideBarProcedures
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid item md={9}>
              {activeStep === 0 && (
                <>
                  <DataGrid
                    id="statutory"
                    columnAutoWidth={true}
                    // dataSource={statutoryComplianceSub}
                    showColumnLines={true}
                    showRowLines={true}
                    showBorders={true}
                    // height={"75vh"}
                    allowColumnResizing={true}
                    rowAlternationEnabled={true}
                  >
                    <Column
                      dataField="title"
                      width={150}
                      caption="Policy Title"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="description"
                      width={200}
                      caption="Policy Description"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="complianceStatus"
                      width={200}
                      caption="Policy Status"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                      // cellRender={complyAction}
                    />
                    <Column
                      dataField="submissionDeadline"
                      width={200}
                      caption="Policy Review Deadline"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                      // cellRender={convertDate}
                    />
                    <Column
                      dataField="approvalStatus"
                      width={200}
                      caption="Policy Owner"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                      // cellRender={approveCompliance}
                    />
                    <Column
                      dataField="authority"
                      minWidth={100}
                      caption="Reason for Non- Compliance and Recommendation"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="authority"
                      minWidth={100}
                      caption="Attachments"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Scrolling rowRenderingMode="virtual" />
                    <Paging defaultPageSize={20} />
                    <Pager
                      visible={true}
                      // allowedPageSizes={allowedPageSizes}
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
                          Policy
                        </Typography>
                      </Item>
                      <Item location="after">
                        <Link to="/create-policy">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <AddCircle /> Add Policy
                        </Button>
                        </Link>
                      </Item>
                      <Item location="after" name="columnChooserButton" />
                    </Toolbar>
                  </DataGrid>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <DataGrid
                    id="statutory"
                    columnAutoWidth={true}
                    // dataSource={statutoryComplianceSub}
                    showColumnLines={true}
                    showRowLines={true}
                    showBorders={true}
                    // height={"75vh"}
                    allowColumnResizing={true}
                    rowAlternationEnabled={true}
                  >
                    <Column
                      dataField="title"
                      width={150}
                      caption="Procedure Title"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="description"
                      width={200}
                      caption="Procedure Description"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="complianceStatus"
                      width={200}
                      caption="Procedure Status"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                      // cellRender={complyAction}
                    />
                    <Column
                      dataField="submissionDeadline"
                      width={200}
                      caption="Procedure Review Deadline"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                      // cellRender={convertDate}
                    />
                    <Column
                      dataField="approvalStatus"
                      width={200}
                      caption="Procedure Owner"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                      // cellRender={approveCompliance}
                    />
                    <Column
                      dataField="authority"
                      minWidth={100}
                      caption="Reason for Non- Compliance and Recommendation"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Column
                      dataField="authority"
                      minWidth={100}
                      caption="Attachments"
                      allowHeaderFiltering={true}
                      allowSearch={true}
                      allowFiltering={false}
                    />
                    <Scrolling rowRenderingMode="virtual" />
                    <Paging defaultPageSize={20} />
                    <Pager
                      visible={true}
                      // allowedPageSizes={allowedPageSizes}
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
                          Procedure
                        </Typography>
                      </Item>
                      <Item location="after">
                        <Link to="/create-procedure">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <AddCircle /> Add Procedure
                        </Button>
                        </Link>
                      </Item>
                      <Item location="after" name="columnChooserButton" />
                    </Toolbar>
                  </DataGrid>
                </>
              )}
            </Grid>
          </Grid>
        </PageContainer>
      </Container>
    </>
  );
};

export default PolicyProcedure;
