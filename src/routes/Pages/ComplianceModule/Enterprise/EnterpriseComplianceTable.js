import React from "react";
import { Box, Grid, Typography, Chip, Container } from "@mui/material";
import { dummyRisk } from "../../../RiskModule/dummyRiskData";
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CmtDropdownMenu from "../../../../@dmt/CmtDropdownMenu";
import { MoreHoriz } from "@mui/icons-material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
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
  StateStoring,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import TopBar from "../../../../@dmt/common/TopBar";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllEnterpriseCompliance,
  getEnterpriseComplianceSub,
} from "../../../../Redux/features/Compliance/enterprise";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { enterpriseApi } from "../../../../Redux/services/Compliance/enterprise";
import { setLoading } from "../../../../Redux/features/loading";
import { LoadingOverlay } from "../Statutory/LoadingComponent";
import ViewEnterprise from "./ViewEnterprise";
import { useNavigate } from "react-router-dom";
import ComplyDialog from "./ComplyDialog";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { PERMISSIONS } from "../../../../@dmt/hoc/Permissions";
import RoleGuard from "../../../../@dmt/hoc/RoleGuard";
import { validatePermission } from "../../../../@dmt/Utils/commonHelper";
import { ClipLoader } from "react-spinners";



// SIDE TAB STYLES
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "#3A3363",
    padding: 8,
    color: "white",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  notActive: {
    backgroundColor: "#E8EBF6",
    padding: 8,
    color: "black",
    borderRadius: 4,
    fontWeight: "300",
    cursor: "pointer",
  },
  button: {
    color: "#3F51B5",
    padding: 10,
  },
}));

const getActions = (permissions) => {
  let actions = [{ action: "view", label: "View", icon: <Visibility /> }];
  if (
    validatePermission(PERMISSIONS.ENTERPRISE_COMPLIANCE.UPDATE, permissions)
  ) {
    actions.push({ action: "edit", label: "Edit", icon: <Edit /> });
  }
  if (
    validatePermission(PERMISSIONS.ENTERPRISE_COMPLIANCE.DELETE, permissions)
  ) {
    actions.push({ action: "delete", label: "Delete", icon: <Delete /> });
  }
  return actions;
};

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
  { label: HEADER.ENTERPRISE_COMPLIANCE, isActive: true },
];



const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3A3363",
  height: "70px",
  width: "70px",
  marginTop: "20vh"
};

//----------------------- SIDEBAR TABS FOR MAIN COMPLIANCE ------------------------------ //
const SideBarCompliance = (props) => {
  const classes = useStyles();
  const { steps, activeStep, setActiveStep, displaySubData, loading } = props;

  return (
    <div>
      <Box className="sidebar h-[70vh]">
        {loading ? (
          <>
            <ClipLoader
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </>
        ) : (
          <>
            {Array.isArray(steps) &&
              steps?.map((step, index) => (
                <Grid
                  my={2}
                  onClick={(e) => displaySubData(step.id, index)}
                  className={
                    index === activeStep ? classes.isActive : classes.notActive
                  }
                  key={step.id}
                >
                  <Typography
                    sx={{ textTransform: "uppercase", fontSize: "14px" }}
                  >
                    {step.title}
                  </Typography>
                </Grid>
              ))}
          </>
        )}
      </Box>
    </div>
  );
};

const EnterpriseComplianceTable = () => {
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const { userRole } = useSelector(({ role }) => role);
  const { enterpriseComplianceData, enterpriseComplianceSub } = useSelector(
    ({ enterprise }) => enterprise
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedCompliance, setSelectedCompliance] = React.useState(null);
  const userActions = (data) => getActions(userRole?.permissions);
  const navigate = useNavigate();

  // ACTIONS
  const onEditRisk = (data) => {
    navigate("update-enterprise", { state: data });
  };

  const onAssesRisk = () => {};

  // VIEW DRAWER FUNCTIONS
  const onOpenDrawer = (data) => {
    setSelectedCompliance(data);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedCompliance(null);
  };

  // --------CRUD OPERATIONS----------//
  const onMenuClick = async (menu, data) => {
    if (menu.action === "edit") {
      onEditRisk(data);
    } else if (menu.action === "delete") {
      try {
        dispatch(setLoading(true));
        await enterpriseApi.deleteEnterpriseCompliance(dispatch, {
          id: data.id,
        });
        toast.success("Record Deleted Successfully!");
      } catch (error) {
        toast.error("An error occured!");
      } finally {
        dispatch(setLoading(false));
      }
    } else if (menu.action === "view") {
      onOpenDrawer(data);
    }
  };

  const actionLink = ({ data, rowIndex }) => {
    return (
      <CmtDropdownMenu
        items={userActions(data)}
        onItemClick={(menu) => onMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz sx={{ cursor: "pointer" }} />}
      />
    );
  };

  // ----------------MAKE API CALL TO GET SUB DATA--------------//
  const displaySubData = async (id, index) => {
    await dispatch(getEnterpriseComplianceSub({ id }));
    setActiveStep(index);
  };

  //------------COMPLY STATUS ACTION------------------//
  const complyAction = ({ displayValue, data }) => {
    return <ComplyDialog displayValue={displayValue} data={data} />;
  };

  const approveEnterprise = async (id) => {
    try {
      const res = await enterpriseApi.approveEnterpriseCompliance(dispatch, {
        id,
      });
      if (res.success) {
        toast.success(res.message);
        dispatch(getEnterpriseComplianceSub({ id }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const approveCompliance = ({ displayValue, data }) => {
    if (data.approvalStatus === "Approved") {
      return (
        <Chip
          label={displayValue}
          variant="outlined"
          sx={{ borderColor: "green" }}
        />
      );
    } else if (data.approvalStatus === "Pending Approval") {
      return (
        <Chip
          onClick={() => approveEnterprise(data.id)}
          label={displayValue}
          variant="outlined"
          sx={{ borderColor: "red", cursor: "pointer" }}
        />
      );
    }
  };

  // DECLARE STEPS VARIABLE
  const steps = enterpriseComplianceData;

  const convertDate = ({ displayValue, data }) => {
    let formattedDate = data.submissionDeadline;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };

  // Export data to excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(enterpriseComplianceSub);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
  };

  const fetchMainData = async() =>{
    try {
      setLoading(true);
    await dispatch(fetchAllEnterpriseCompliance());
    } catch (error) {}
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMainData();
  }, []);

  return (
    <>
      <Box className="bg-[#F4F4F7]">
        <TopBar />
        <ViewEnterprise
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          selectedCompliance={selectedCompliance}
        />
        {isLoading && <LoadingOverlay />}
        <Container maxWidth="xl">
          <Grid container maxWidth="xl" spacing={4}>
            <Grid item md={3} xs={12}>
              <Typography variant="h5" fontWeight={"bold"}>
                Main Compliance
              </Typography>
              <Box sx={{ mt: 8 }}>
                <SideBarCompliance
                  {...{
                    loading,
                    steps,
                    activeStep,
                    setActiveStep,
                    displaySubData,
                  }}
                />
              </Box>
            </Grid>
            <Grid item md={9} xs={12}>
              <PageContainer breadcrumbs={breadcrumbs}>
                <DataGrid
                  className="shadow-2xl my-4"
                  id="statutory"
                  columnAutoWidth={true}
                  dataSource={enterpriseComplianceSub}
                  showColumnLines={true}
                  showRowLines={true}
                  showBorders={true}
                  height={"75vh"}
                  allowColumnResizing={true}
                  rowAlternationEnabled={true}
                >
                  {/* <FilterRow visible={true} /> */}
                  {/* <FilterPanel visible={true} /> */}
                  {/* <SearchPanel visible={true} /> */}
                  {/* <HeaderFilter visible={true} allowSearch={true} /> */}
                  <Column
                    caption="Action"
                    width={120}
                    alignment={"center"}
                    allowFiltering={false}
                    cellRender={actionLink}
                  />
                  <Column
                    dataField="title"
                    width={150}
                    caption="Obligation Title"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="description"
                    width={200}
                    caption="Obligation Description"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="complianceStatus"
                    width={200}
                    caption="Compliance Status"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={complyAction}
                  />
                  <Column
                    dataField="submissionDeadline"
                    width={200}
                    caption="Submission Deadline"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={convertDate}
                  />
                  <Column
                    dataField="approvalStatus"
                    width={200}
                    caption="Approval Status"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={approveCompliance}
                  />
                  <Column
                    dataField="authority"
                    minWidth={100}
                    caption="Authority"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="companyName"
                    minWidth={100}
                    caption="Company"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={dummyRisk.department}
                  />
                  <Column
                    dataField="sectionName"
                    minWidth={100}
                    caption="Section"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="subSection"
                    minWidth={100}
                    caption="Sub-Section"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="penalty"
                    minWidth={100}
                    caption="Penalty"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="primaryOwnerName"
                    minWidth={100}
                    caption="Primary Owner"
                  />
                  <Column
                    dataField="secondaryOwnerName"
                    minWidth={100}
                    caption="Secondary Owner"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="escalationOwnerName"
                    minWidth={100}
                    caption="Escalation Owner"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="priority"
                    minWidth={100}
                    caption="Priority"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={false}
                  />
                  <Column
                    dataField="frequencyName"
                    minWidth={100}
                    caption="Frequency"
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
                      <Typography variant="h5" color="primary" fontWeight={700}>
                        Enterprise Compliance
                      </Typography>
                    </Item>
                    <Item location="after">
                      <RoleGuard
                        permission={PERMISSIONS.ENTERPRISE_COMPLIANCE.CREATE}
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/createEnterprise"}
                        >
                          <Button
                            variant="contained"
                            size={"small"}
                            // className={classes.btn}
                            // onClick={onAddUser}
                            color="primary"
                          >
                            <AddCircle /> Create Compliance(New)
                          </Button>
                        </Link>
                      </RoleGuard>
                    </Item>
                    <Item location="after">
                      <Button
                        variant="outlined"
                        size={"small"}
                        color="primary"
                        onClick={exportToExcel}
                      >
                        <DownloadIcon /> Export to Excel
                      </Button>
                    </Item>
                    {/* <Item location="before">
            <RoleBasedGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <FileUpload />
                 Import Risks
              </Button>
            </RoleBasedGuard>
          </Item> */}
                    <Item location="after" name="columnChooserButton" />
                    {/* <Item location="after" name="searchPanel" /> */}
                  </Toolbar>
                </DataGrid>
              </PageContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default EnterpriseComplianceTable;
