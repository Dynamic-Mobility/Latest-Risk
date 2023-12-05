import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Chip,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { dummyRisk } from "./dummyRiskData";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CmtDropdownMenu from "../../@dmt/CmtDropdownMenu";
import { MoreHoriz } from "@mui/icons-material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { HEADER } from "../../@dmt/constants/BreadCrumbs/HeaderMessages";
import {
  Column,
  Item,
  Pager,
  Paging,
  SearchPanel,
  StateStoring,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import TopBar from "../../@dmt/common/TopBar";
import PageContainer from "../../@dmt/constants/BreadCrumbs/PageContainer";
import { fetchAllRisks } from "../../Redux/features/RiskUniverse";
import { useSelector, useDispatch } from "react-redux";
import { riskApi } from "../../Redux/services/RiskUniverse";
import { setLoading } from "../../Redux/features/loading";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../Pages/ComplianceModule/Statutory/LoadingComponent";
import TemporaryDrawer from "./ViewRisk";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import RoleGuard from "../../@dmt/hoc/RoleGuard";
import { PERMISSIONS } from "../../PageRoutes/permissions";
import { validatePermission } from "../../@dmt/Utils/commonHelper";

const getActions = (permissions) => {
  let actions = [{ action: "view", label: "View", icon: <Visibility /> }];
  if (validatePermission(PERMISSIONS.RISK_UNIVERSE.UPDATE, permissions)) {
    actions.push({ action: "edit", label: "Edit", icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.RISK_UNIVERSE.DELETE, permissions)) {
    actions.push({ action: "delete", label: "Delete", icon: <Delete /> });
  }
  return actions;
};

// RISK DATA FORMAT FUNCTIONS
const riskImpactFunc = ({ displayValue }) => {
  return displayValue?.map((value, index) => (
    <li key={index}>{value.name}</li>
  ));
};

const ownerFunc = ({ displayValue }) => {
  return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
};

const actionOwnerFunc = ({ displayValue }) => {
  return displayValue?.map((value, index) => (
    <li key={index}>{value.actionOwner}</li>
  ));
};

const riskOwnerFunc = ({ displayValue }) => {
  return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
};

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.RISK_TABLE, isActive: true },
];

const RiskTable = () => {
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const { risks } = useSelector(({ risk }) => risk);
  const isLoading = useSelector((state) => state.loading);
  const { userRole } = useSelector(({ role }) => role);
  const dispatch = useDispatch();
  const userActions = (data) => getActions(userRole?.permissions);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedRisk, setSelectedRisk] = React.useState(null);
  const navigate = useNavigate();

  const onOpenDrawer = (data) => {
    setSelectedRisk(data);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedRisk(null);
  };

  // ---------CRUD OPERATIONS-----------//
  // ACTIONS
  const onEditRisk = (data) => {
    navigate("update-risk", { state: data });
    console.log("UPDATED_RISK_DATA ",data);
  };

  const onAssesRisk = () => {};

  const onMenuClick = async (menu, data) => {
    if (menu.action === "edit") {
      onEditRisk(data);
    } else if (menu.action === "delete") {
      try {
        dispatch(setLoading(true));
        await riskApi.deleteRiskUniverse(dispatch, { id: data.id });
        toast.success("Record deleted successfully");
        dispatch(fetchAllRisks());
      } catch (error) {
        toast.error("An error occurred while deleting");
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

  useEffect(() => {
    dispatch(fetchAllRisks());
  }, []);

  // FORMAT JSON DATA
  let formattedData = [...risks];
  formattedData.map((data) => {
    let controlActions = [];
    let riskImpact = [];
    let rootCauses = [];
    let riskOwners = [];
    // control actions
    data.controlActions.map((action) =>
      controlActions.push({
        id: action.id,
        name: action.name,
      })
    );
    // risk impact
    data.riskImpact.map((impact) =>
      riskImpact.push({
        id: impact.id,
        name: impact.name,
      })
    );
    // root causes
    data.rootCauses.map((root) =>
      rootCauses.push({
        id: root.id,
        name: root.rootCause,
      })
    );
    data.riskOwners.map((owner) =>
      riskOwners.push({
        id: owner.id,
        name: owner.name,
      })
    );
    return {
      ...data,
      controlActions: controlActions,
      riskImpact: riskImpact,
      rootCauses: rootCauses,
      riskOwners: riskOwners,
    };
  });

  const actionAdditionalControls = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };

  const rootCauseFunc = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };

  const convertDate = ({ displayValue, data }) => {
    let formattedDate = data.riskDate;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };

  const inherentChip = (data, displayValue) => {
    if (data?.data?.inherentRisk === "High") {
      return (
        <Chip
          variant="contained"
          style={{ backgroundColor: "#E78617" }}
          label={data?.data?.inherentRisk}
        />
      );
    } else if (data?.data?.inherentRisk === "Moderate") {
      return (
        <Chip
          variant="contained"
          style={{backgroundColor: "#E7BD17"}}
          label={data?.data?.inherentRisk}
        />
      );
    } else if (data?.data?.inherentRisk === "Low") {
      return (
        <Chip
          variant="contained"
          color="success"
          label={data?.data?.inherentRisk}
        />
      );
    }
  };

  const scoreFunc = (data, displayValue) => {
    displayValue = data?.data?.riskScore;
    if (data?.data?.inherentRisk === "High") {
      return (
        <Chip
          variant="contained"
          style={{ backgroundColor: "#E78617" }}
          label={displayValue}
        />
      );
    } else if (data?.data?.inherentRisk === "Moderate") {
      return (
        <Chip
          variant="contained"
          style={{backgroundColor: "#E7BD17"}}
          label={displayValue}
        />
      );
    }else if (data?.data?.inherentRisk === "Low") {
      return (
        <Chip
          variant="contained"
          color="success"
          label={displayValue}
        />
      );
    }
  };

  const residual = (data, displayValue) => {
    if (data?.data?.residualRisk === "High") {
      return (
        <Chip
          variant="contained"
          style={{ backgroundColor: "#E78617" }}
          label={data?.data?.residualRisk}
        />
      );
    } else if (data?.data?.residualRisk === "Moderate") {
      return (
        <Chip
          variant="contained"
          style={{backgroundColor: "#E7BD17"}}
          label={data?.data?.residualRisk}
        />
      );
    } else if (data?.data?.residualRisk === "Low") {
      return (
        <Chip
          variant="contained"
          color="success"
          label={data?.data?.residualRisk}
        />
      );
    }
  };

  const additionalFunc = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => (
      <Typography key={index}>{value?.action}</Typography>
    ));
  };

  // Export data to excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
  };



  return (
    <>
      <Box className="bg-[#F4F4F7] pb-4">
        <TopBar />
        <TemporaryDrawer
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          selectedRisk={selectedRisk}
        />
        {isLoading && <LoadingOverlay />}
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <DataGrid
              className="shadow-2xl my-3"
              id="risks"
              height="75vh"
              columnAutoWidth={true}
              dataSource={formattedData}
              showColumnLines={true}
              showRowLines={true}
              showBorders={true}
              allowColumnResizing={true}
              rowAlternationEnabled={true}
            >
              {/* <FilterRow visible={true} /> */}
              {/* <StateStoring
              enabled={false}
              type="localStorage"
              storageKey="risks"
            /> */}
              {/* <FilterPanel visible={true} /> */}
              <SearchPanel visible={true} />
              {/* <HeaderFilter visible={true} allowSearch={true} /> */}
              <Column
                fixed="true"
                caption="Action"
                width={120}
                alignment={"center"}
                allowFiltering={false}
                cellRender={actionLink}
              />
              <Column
                dataField="riskTitle"
                width={150}
                caption="Risk Title"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="riskEvent"
                width={200}
                caption="Risk Event"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />

              <Column
                dataField="riskOwners"
                minWidth={100}
                caption="Risk Owner"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={ownerFunc}
              />
              <Column
                dataField="categoryName"
                minWidth={150}
                caption="Risk Category"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="departmentName"
                minWidth={150}
                caption="Department"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={dummyRisk.department}
              />
              <Column
                dataField="sectionName"
                minWidth={150}
                caption="Section"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="rootCauses"
                minWidth={200}
                caption="Root Causes"
                allowHeaderFiltering={true}
                allowSearch={true}
                cellRender={rootCauseFunc}
                allowFiltering={false}
              />
              <Column
                dataField="riskImpact"
                minWidth={200}
                caption="Risk Impact"
                cellRender={riskImpactFunc}
              />
              <Column
                dataField="riskImpactAmount"
                minWidth={200}
                alignment={"left"}
                caption="Risk Impact Amount"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="riskCategoryControlActualCategoryControlName"
                minWidth={200}
                caption="Risk Control Category"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="controlActions"
                minWidth={200}
                caption="Existing Mitigations/Control"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={actionAdditionalControls}
              />

              <Column
                dataField="lossTypeActualLossTypeName"
                minWidth={100}
                caption="Loss Type"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="keyIndicatorFrequencyName"
                minWidth={100}
                caption="Risk Frequency"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="riskIndicator"
                minWidth={100}
                caption="Risk Indicator"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="riskAppetiteAmount"
                minWidth={100}
                alignment={"left"}
                caption="Risk Appetite"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="riskProbabilityActualName"
                minWidth={100}
                caption="Probability"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="riskSeverityActualName"
                minWidth={100}
                caption="Severity"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              {/* <Column
                dataField="riskVelocityName"
                minWidth={100}
                caption="Velocity"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              /> */}
              <Column
                dataField="inherentRisk"
                minWidth={100}
                caption="Inherent Risk"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={inherentChip}
              />
              <Column
                dataField="riskScore"
                minWidth={100}
                alignment={"left"}
                caption="Risk Score"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={scoreFunc}
              />
              <Column
                dataField="residualRisk"
                minWidth={100}
                caption="Residual Risk"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={residual}
              />
              <Column
                dataField="additionalControlActions"
                minWidth={200}
                caption="Additional Mitigations/Control"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={additionalFunc}
              />
              <Column
                dataField="riskDate"
                width={200}
                caption="Action Date"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={convertDate}
              />
              <Column
                dataField="riskOwners"
                width={200}
                caption="Risk Owner"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
                cellRender={riskOwnerFunc}
              />
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
                    Risk Universe
                  </Typography>
                </Item>
                <Item location="after">
                  <RoleGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/create-risk"}
                    >
                      <Button
                        variant="contained"
                        size={"small"}
                        // className={classes.btn}
                        // onClick={onAddUser}
                        color="primary"
                        // style={{ marginBottom: "10px" }}
                      >
                        <AddCircle /> Create New Risk
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
                    // style={{ marginBottom: '10px' }}
                  >
                    <DownloadIcon /> Export to Excel
                  </Button>
                </Item>
                <Item location="after" name="columnChooserButton" />
                <Item location="after" name="searchPanel" />
              </Toolbar>
            </DataGrid>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default RiskTable;
