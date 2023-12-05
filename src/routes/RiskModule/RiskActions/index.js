import React, { useEffect, useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import { Typography, Container } from "@mui/material";
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
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { Box,Chip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRisks } from "../../../Redux/features/RiskUniverse";
import NonCompliantDialog from "./None-compliant-dialog";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.RISK_ACTIONS, isActive: true },
];

const RiskActionsTable = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const { risks } = useSelector(({ risk }) => risk);
  const dispatch = useDispatch();

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

  const actionDateFunc = ({ data }) => {
    return data?.additionalControlActions.map((value, index) => (
      <Typography key={index}>{new Date(value?.actionDate).toLocaleDateString()}</Typography>
    ));
  };

  const statusFunc = ({ data, dateToRemove }) => {
    const currentDate = new Date();
    const dateAction = data?.additionalControlActions.map((value, index) => {
      return new Date(value.actionDate).toLocaleDateString();
    });
  
    const filteredDateAction = dateAction.filter(date => date !== dateToRemove);
  
  
    if (filteredDateAction.length > 0) {
      return <NonCompliantDialog data={data} />;
    } else if(filteredDateAction  < 0) {
      return <Chip variant="outlined" color="success" label="Comply Now" />;
    }
  };
  


  const actionFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => (
      <li key={index}>{value?.actionDesc}</li>
    ));
  };


  const actionOwnerFunc = ({ data }) => {
    // Check if data is an array
    if (Array.isArray(data)) {
      return null;
    }
  
    return (
      <ul>
        {data.additionalControlActions.map((value, index) => (
          <li key={index}>
            <ul>
              {value.actionOwner.map((owner) => (
                <li key={owner.id}>{owner.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
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
  

  useEffect(() => {
    dispatch(fetchAllRisks());
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f4f7", height: "100vh" }}>
        <TopBar />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Box sx={{ mt: 3 }}>
              <DataGrid
                id="risks"
                height={"70vh"}
                columnAutoWidth={true}
                dataSource={formattedData}
                showColumnLines={true}
                showRowLines={true}
                showBorders={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
              >
                <Paging defaultPageSize={20} pageSize={20} />
                <Pager
                  visible={true}
                  displayMode={true}
                  showPageSizeSelector={false}
                  showInfo={true}
                  showNavigationButtons={true}
                />
                <SearchPanel visible={true} />
                <Column
                  dataField="riskTitle"
                  minWidth={100}
                  caption="Risk Title"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="riskEvent"
                  minWidth={100}
                  caption="Risk Description"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="departmentName"
                  minWidth={100}
                  caption="Department"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="categoryName"
                  minWidth={100}
                  caption="Risk Category"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="additionalControlActions"
                  minWidth={100}
                  caption="Recommended Action"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={actionFunc}
                />

                <Column
                  dataField="residualRisk"
                  minWidth={100}
                  caption="Residual Risk Rating"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={residual}
                />
                <Column
                  dataField="additionalControlActions"
                  minWidth={100}
                  caption="Action Owner"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={actionOwnerFunc}
                />
                <Column
                  dataField="additionalControlActions"
                  minWidth={100}
                  caption="Action Date"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={actionDateFunc}
                />
                <Column
                  dataField="obligationStatus"
                  minWidth={100}
                  caption="Compliance Status"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={statusFunc}
                />
                <Column
                  dataField="previousStatus"
                  minWidth={100}
                  caption="Compliance Comments"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Scrolling rowRenderingMode="virtual" />
                <Toolbar>
                  <Item location="before">
                    <Typography variant="h5" color="primary" fontWeight={700}>
                      Risk Action Summary
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

export default RiskActionsTable;
