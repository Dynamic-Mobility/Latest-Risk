import React, { useEffect, useState } from "react";
import {
  Column,
  ColumnChooser,
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
} from "devextreme-react/data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography,Container } from "@mui/material";
import { DataGrid } from "devextreme-react";
import { useSelector, useDispatch } from "react-redux";
import { PERMISSIONS } from "../../@dmt/constants/RoleConstants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { fetchIndicatorHistory } from "../../Redux/features/RiskUniverse";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HeightIcon from "@mui/icons-material/Height";
import { Chip } from "@mui/material";
import { HEADER } from "../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../@dmt/constants/BreadCrumbs/PageContainer";
import TopBar from "../../@dmt/common/TopBar";

const getActions = (permissions) => {
  let actions = [
    { action: "view", label: "View History", icon: <VisibilityIcon /> },
  ];
  return actions;
};

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.RISK_INDICATOR, link: "/risk-indicators" },
  { label: HEADER.RISK_INDICATOR_HISTORY, isActive: true },
];

const RiskIndicatorHistory = (props) => {
  const { indicatorHistory } = useSelector(({ risk }) => risk);
  const [indicatorDetails, setIndicatorDetails] = useState([]);
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const { userRole } = useSelector(({ auth }) => auth);
  const userActions = (data) => getActions(userRole?.permissions);
  const { risks } = props;


  const getRiskIndicatorHistory = async () => {
    await dispatch(fetchIndicatorHistory(location.state?.riskUniverseId));
    // await (dispatch,location?.state?.riskUniverseId)
  };

  useEffect(() => {
    getRiskIndicatorHistory();
  }, []);

  const checkIfCurrentGreat = ({ displayValue, data }) => {
    if (data?.currentStatus > data?.riskAppetiteAmount) {
      return <Chip variant="outlined" color="error" label={displayValue} />;
    } else {
      return <Chip variant="outlined" color="success" label={displayValue} />;
    }
  };

  const checkIfPreviousGreat = ({ displayValue, data }) => {
    if (data?.previousStatus > data?.riskAppetiteAmount) {
      return <Chip variant="outlined" color="error" label={displayValue} />;
    } else {
      return <Chip variant="outlined" color="success" label={displayValue} />;
    }
  };

  const checkDirection = ({ data }) => {
    if (data?.riskAppetiteDirection === "Negative") {
      return <ArrowDownwardIcon style={{ color: "red" }} />;
    } else if (data?.riskAppetiteDirection === "Positive") {
      return <ArrowUpwardIcon style={{ color: "green" }} />;
    } else if (data?.riskAppetiteDirection === "Stable") {
      return (
        <HeightIcon style={{ color: "orange", transform: "rotate(90deg)" }} />
      );
    }
  };

  const incidentTitle = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => (
      <li key={index}>{value?.incidentTitle}</li>
    ));
  };

  const incidentDesc = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => (
      <li key={index}>{value?.incidentDesc}</li>
    ));
  };

  const convertDate = ({ displayValue, data }) => {
    let formattedDate = data.incidentDate;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <DataGrid
            id="risk"
            columnAutoWidth={true}
            dataSource={indicatorHistory}
            showColumnLines={true}
            showRowLines={true}
            showBorders={true}
            height={"70vh"}
            allowColumnResizing={true}
            rowAlternationEnabled={true}
          >
            <FilterRow visible={true} />
            <FilterPanel visible={true} />
            <SearchPanel visible={true} />
            <ColumnChooser enabled={true} />
            <StateStoring
              enabled={false}
              type="localStorage"
              storageKey="storage"
            />
            <HeaderFilter visible={true} allowSearch={true} />
            {/* <Column dataField="id" caption="Risk ID" key="id" visible={true} /> */}
            <Column
              dataField="riskUniverseTitle"
              fixedPosition="left"
              caption="Incident Title"
              width={200}
              alignment={"center"}
              allowFiltering={false}
              //   cellRender={incidentTitle}
            />
            <Column
              dataField="incidentInfo"
              fixedPosition="left"
              caption="Incident Description"
              width={240}
              alignment={"center"}
              allowFiltering={false}
              cellRender={incidentDesc}
            />
            <Column
              dataField="incidentDate"
              minWidth={100}
              caption="Incident Date"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={convertDate}
            />
            {/* <Column
          dataField="riskUniverseTitle"
          minWidth={100}
          caption="Risk Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        /> */}
            <Column
              dataField="riskCategoryName"
              minWidth={100}
              caption="Risk Category"
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
              dataField="riskIndicator"
              minWidth={100}
              caption="Risk Indicator"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="riskAppetiteTypeName"
              minWidth={100}
              caption="Risk Appetite"
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
              dataField="previousStatus"
              minWidth={100}
              alignment={"center"}
              caption="Previous Status"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={checkIfPreviousGreat}
            />
            <Column
              dataField="currentStatus"
              minWidth={100}
              caption="Current Status"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={checkIfCurrentGreat}
            />
            <Column
              dataField="riskAppetiteDirection"
              minWidth={100}
              caption="Risk Direction"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              cellRender={checkDirection}
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
              <Item location="after" name="columnChooserButton" />
              <Item location="after" name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </PageContainer>
      </Container>
    </>
  );
};

export default RiskIndicatorHistory;
