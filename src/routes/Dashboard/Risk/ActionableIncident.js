import React, { useState } from "react";
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
import { Typography, Box, Container } from "@mui/material";
import TopBar from "../../../@dmt/common/TopBar";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { fetchAllIncidents } from "../../../Redux/features/RiskIncident";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Chip } from "@mui/material";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.INCIDENT_DASHBOARD, link: "/incident-management" },
  { label: HEADER.ACTIONABLE_INCIDENT, isActive: true },
];

const ActionableIncident = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const dispatch = useDispatch();
  const { incidents } = useSelector(({ incident }) => incident);

  const incidentFunc = ({ data }) => {
    if (Array.isArray(data)) {
      return null;
    }
    return data?.incidentActions.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };

  const ownerFunc = ({ data }) => {
    if (Array.isArray(data)) {
      return null;
    }
    return data?.incidentOwners.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };

  const formatDate = ({ displayValue, data }) => {
    let formattedDate = data.incidentDate;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };

  const actionDate = ({ displayValue, data }) => {
    let formattedDate = data.actionDate;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };


  const statusFunc = ({ data }) => {
    const currentDate = new Date();
    const incidentDate = new Date(data?.incidentDate);

    if (incidentDate.getTime() < currentDate.getTime()) {
        // Incident date is in the past (not complied)
        return <Chip variant="outlined" color="error" label="Non Compliant" />;
    } else {
        // Incident date is in the future or today (complied)
        return <Chip variant="outlined" color="primary" label="Complied" />;
    }
};

  useEffect(() => {
    dispatch(fetchAllIncidents());
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Box sx={{ my: 3 }}>
              <DataGrid
                id="risks"
                height={"70vh"}
                columnAutoWidth={true}
                dataSource={incidents}
                showColumnLines={true}
                showRowLines={true}
                showBorders={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
              >
                {/* <FilterRow visible={true} /> */}
                {/* <FilterPanel visible={true} /> */}
                <SearchPanel visible={true} />
                {/* <HeaderFilter visible={true} allowSearch={true} /> */}
                {/* <Column
                  fixed={true}
                  fixedPosition="left"
                  caption="Action"
                  width={120}
                  alignment={"center"}
                  allowFiltering={false}
                    cellRender={actionLink}
                /> */}
                <Column
                  dataField="narration"
                  minWidth={100}
                  caption="Incident Narration"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="incidentDate"
                  minWidth={100}
                  caption="Incident Date"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={formatDate}
                />
                <Column
                  dataField="incidentActions"
                  minWidth={100}
                  caption="Incident Action"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={incidentFunc}
                />
                <Column
                  dataField="incidentOwners"
                  minWidth={100}
                  caption="Incident Owner"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={ownerFunc}
                />
                <Column
                  dataField="actionDate"
                  minWidth={100}
                  caption="Action Date"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={actionDate}
                />
                <Column
                  // dataField="incidentDate"
                  minWidth={100}
                  caption="Compliance Status"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={statusFunc}
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
                      Actionable Incident
                    </Typography>
                  </Item>
                  <Item location="after" name="columnChooserButton" />
                  <Item location="after" name="searchPanel" />
                </Toolbar>
              </DataGrid>
            </Box>
          </PageContainer>
        </Container>
      </Box>
    </>
  );
};

export default ActionableIncident;
