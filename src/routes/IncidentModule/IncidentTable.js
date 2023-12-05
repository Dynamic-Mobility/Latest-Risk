import React from "react";
import { Container, Typography } from "@mui/material";
import { dummyRisk } from "../RiskModule/dummyRiskData";
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CmtDropdownMenu from "../../@dmt/CmtDropdownMenu";
import { MoreHoriz } from "@mui/icons-material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { HEADER } from "../../@dmt/constants/BreadCrumbs/HeaderMessages";
import {
  Column,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  ColumnChooser,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  StateStoring,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import TopBar from "../../@dmt/common/TopBar";
import PageContainer from "../../@dmt/constants/BreadCrumbs/PageContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllIncidents } from "../../Redux/features/RiskIncident";
import TemporaryDrawer from "./ViewIncident";
import { useNavigate } from "react-router-dom";
import { incidentApi } from "../../Redux/services/RiskIncident";
import { setLoading } from "../../Redux/features/loading";
import { toast } from "react-toastify";

// FORMAT JSON DATA
let formattedData = [...dummyRisk];
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
      name: root.name,
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

const getActions = (permissions) => {
  let actions = [{ action: "view", label: "View", icon: <Visibility /> }];
  actions.push({ action: "edit", label: "Edit", icon: <Edit /> });
  // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.UPDATE, permissions)) {
  // }
  // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.DELETE, permissions)) {
  actions.push({ action: "delete", label: "Delete", icon: <Delete /> });
  // }
  return actions;
};

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.INCIDENT_MANAGEMENT, link: "/incident-management" },
  { label: HEADER.INCIDENT_TABLE, isActive: true },
];

const IncidentTable = () => {
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const { incidents } = useSelector(({ incident }) => incident);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedIncident, setSelectedIncident] = React.useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onOpenDrawer = (data) => {
    setSelectedIncident(data);
    setOpenDrawer(true);
  };

  const userActions = (data) => getActions();

  // ACTIONS
  const onEditIncident = (data) => {
    navigate("update-incident", { state: data });
  };

  const onMenuClick = async (menu, data) => {
    if (menu.action === "edit") {
      onEditIncident(data);
    } else if (menu.action === "delete") {
      try {
        dispatch(setLoading(true));
        await incidentApi.deleteRiskIncident(dispatch, { id: data.id });
        toast.success("Record deleted successfully");
        dispatch(fetchAllIncidents());
      } catch (error) {
        toast.error("An error occurred while deleting");
      } finally {
        dispatch(setLoading(false));
      }
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

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedIncident(null);
  };

  const actionIncidentOwners = ({ displayValue }) => {
    return displayValue?.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };

  const incidentActions = ({ displayValue }) => {
    return displayValue?.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };

  const convertDate = ({ displayValue, data }) => {
    let formattedDate = data.incidentDate;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };

  useEffect(() => {
    dispatch(fetchAllIncidents());
  }, []);

  return (
    <>
      <TopBar />
      <TemporaryDrawer
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        selectedIncident={selectedIncident}
      />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <DataGrid
            id="risks"
            height="80vh"
            columnAutoWidth={true}
            dataSource={incidents}
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
            <FilterPanel visible={true} />
            <SearchPanel visible={true} />
            <HeaderFilter visible={true} allowSearch={true} />
            <Column
              fixed="true"
              caption="Action"
              width={120}
              alignment={"center"}
              allowFiltering={false}
              cellRender={actionLink}
            />
            {/* <Column
              dataField="riskEvent"
              width={150}
              caption="Risk Event"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            /> */}
            <Column
              dataField="incidentTitle"
              width={200}
              caption="Incident Title"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="narration"
              minWidth={150}
              caption="Incident Narration"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="incidentDate"
              minWidth={150}
              caption="Incident Date"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={convertDate}
            />
            <Column
              dataField="riskCategoryControlActualCategoryControlName"
              minWidth={150}
              caption="Risk Category"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="lossTypeActualLossTypeName"
              minWidth={300}
              caption="Loss Type"
              allowHeaderFiltering={true}
              allowSearch={true}
              // cellRender={rootCauseFunc}
              allowFiltering={false}
            />
            <Column
              dataField="lossTypeQuantityTypeName"
              minWidth={200}
              caption="Loss Type Measure"
              // cellRender={riskImpactFunc}
            />
            <Column
              dataField="lossTypeQuantity"
              minWidth={200}
              alignment={"left"}
              caption="Loss Type Quantity"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="incidentActions"
              minWidth={300}
              caption="Incident Action"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={incidentActions}
            />
            <Column
              dataField="incidentOwners"
              minWidth={300}
              caption="Incident Owner"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={actionIncidentOwners}
            />
            <Column
              dataField="actionDate"
              minWidth={500}
              caption="Action Date"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={convertDate}
            />
            <Paging defaultPageSize={20} pageSize={20} />
            <Pager
              visible={true}
              displayMode={true}
              showPageSizeSelector={false}
              showInfo={true}
              showNavigationButtons={true}
            />
            <Toolbar>
              <Item location="before">
                <Typography variant="h5" color="primary" fontWeight={700}>
                  Risk Incident
                </Typography>
              </Item>
              <Item location="after">
                {/* <RoleBasedGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}> */}
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/create-incident"}
                >
                  <Button
                    variant="contained"
                    size={"small"}
                    // className={classes.btn}
                    // onClick={onAddUser}
                    color="primary"
                    // style={{ marginBottom: "10px" }}
                  >
                    <AddCircle /> Create Incident
                  </Button>
                </Link>

                {/* </RoleBasedGuard> */}
              </Item>
              {/* <Item location="after">
                <Button
                  variant="outlined"
                  size={"small"}
                  color="primary"
                  onClick={exportToExcel}
                >
                  <DownloadIcon /> Export to Excel
                </Button>
              </Item> */}
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
              <Item location="after" name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </PageContainer>
      </Container>
    </>
  );
};

export default IncidentTable;
