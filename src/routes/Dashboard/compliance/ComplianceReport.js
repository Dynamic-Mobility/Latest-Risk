import React from "react";
import TopBar from "../../../@dmt/common/TopBar";
import { Grid, Typography, Container, Box, Button } from "@mui/material";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { riskApi } from "../../../Redux/services/RiskUniverse";
import { Link } from "react-router-dom";
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
  { label: HEADER.COMPLIANCE_REPORT, isActive: true },
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

const ComplianceReport = () => {
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Statutory Report", "Enterprise Report", "Legal Report"];
  const initialState = {
    name: "",
    extension: "",
    data: "",
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await riskApi.uploadRiskDocument(dispatch, formData);
      setFormData(initialState);
      toast.success("File Uploaded Successfully");
    } catch (error) {
      setFormData(initialState);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = () => {
    setFormData(initialState);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseUrl = "";

      let reader = new FileReader();

      // convert file to base64
      reader.readAsDataURL(file);

      reader.onload = () => {
        // console.log("Called", reader);
        baseUrl = reader.result;

        // get file extension

        resolve(baseUrl);
      };
    });
  };

  const handleOnFileChange = async (files) => {
    const file = files[0];
    if (files.length === 1) {
      const baseUrl = await convertBase64(file);
      const fileExtension = "." + file.name.split(".").pop();
      setFormData({
        name: file.name,
        extension: fileExtension,
        data: baseUrl,
      });
    } else {
      setFormData(initialState);
    }
  };

  function Dropzone({ onFileUpload }) {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: onFileUpload,
    });

    return (
      <div
        {...getRootProps({
          className:
            "bg-white shadow-xl w-7/12 mx-auto h-32 border-dashed border flex items-center justify-center border-green-700 rounded",
        })}
      >
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center cursor-pointer">
          <FileUploadIcon className="text-green-700 text-2xl" />
          <p className="dropzone-content">
            Drag and drop file here or Choose file
          </p>
        </div>
      </div>
    );
  }

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
                            Statutory Report
                          </Typography>
                        </Item>
                        <Item location="after">
                          <Link to="/create-compliance-report">
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
                )}
                {activeStep === 1 && (
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
                            Enterprise Report
                          </Typography>
                        </Item>
                        <Item location="after">
                          <Link to="/create-compliance-report">
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
                )}
                {activeStep === 2 && (
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
                            Legal Report
                          </Typography>
                        </Item>
                        <Item location="after">
                          <Link to="/create-compliance-report">
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
                )}
              </Grid>
            </Grid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default ComplianceReport;
