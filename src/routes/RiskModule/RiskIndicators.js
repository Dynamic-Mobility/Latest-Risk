import React from "react";
import { Container, Typography } from "@mui/material";
import { dummyRisk } from "./dummyRiskData";
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
import { Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HeightIcon from "@mui/icons-material/Height";
import PageContainer from "../../@dmt/constants/BreadCrumbs/PageContainer";
import { fetchAllRiskIndicators } from "../../Redux/features/RiskUniverse";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RiskIndicatorComment from "./RiskIndicator-comment";
import CommentIcon from '@mui/icons-material/Comment';



const getActions = (permissions) => {
  let actions = [
    { action: "view", label: "View History", icon: <Visibility /> },
    { action: "comment", label: "Add Comment", icon: <CommentIcon /> },
  ];
  return actions;
};


// ACTIONS
const onEditRisk = () => {};

const onAssesRisk = () => {};

// RISK DATA FORMAT FUNCTIONS

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.RISK_DASHBOARD, link: "/risk-management" },
  { label: HEADER.RISK_INDICATOR, isActive: true },
];

const RiskIndicators = () => {
  const [breadcrumbs, setbreadcrumbs] = React.useState(initialBreadcrumbs);
  const { indicators } = useSelector(({ risk }) => risk);
  const [open,setOpen] = React.useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userActions = (data) => getActions();


  const onMenuClick = (menu, data) => {
    if (menu.action === "view") {
      navigate(`/risk-indicators/history`, {state: data });
    }else if(menu.action === 'comment'){
      setOpen(true)
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

  useEffect(() => {
    dispatch(fetchAllRiskIndicators());
  }, []);

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <DataGrid
            id="risks"
            height={"80vh"}
            columnAutoWidth={true}
            dataSource={indicators}
            showColumnLines={true}
            showRowLines={true}
            showBorders={true}
            allowColumnResizing={true}
            rowAlternationEnabled={true}
          >
            {/* <FilterRow visible={true} /> */}
            <StateStoring
              enabled={false}
              type="localStorage"
              storageKey="risks"
            />
            {/* <FilterPanel visible={true} /> */}
            <SearchPanel visible={true} />
            {/* <HeaderFilter visible={true} allowSearch={true} /> */}
            <Column
              fixed={true}
              fixedPosition="left"
              caption="Action"
              width={120}
              alignment={"center"}
              allowFiltering={false}
              cellRender={actionLink}
            />
            <Column
              dataField="riskUniverseTitle"
              minWidth={100}
              caption="Risk Title"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
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
              dataField="riskAppetiteAmount"
              minWidth={100}
              caption="Risk Appetite"
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
            <Column
              dataField="previousStatus"
              minWidth={100}
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
            <Column
              dataField="riskAppetiteDirection"
              minWidth={100}
              caption="Management Comments"
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
              <Item location="before">
                <Typography variant="h5" color="primary" fontWeight={700}>
                  Risk Indicators
                </Typography>
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
              <Item location="after" name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </PageContainer>
      </Container>
      <RiskIndicatorComment {...{ open,setOpen }} />
    </>
  );
};

export default RiskIndicators;
