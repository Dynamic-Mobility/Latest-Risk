import React from "react";
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
import { Typography } from "@mui/material";

const NonCompliance = () => {
  return (
    <>
      <Typography
        fontWeight={"bold"}
        fontSize={"20px"}
        sx={{ color: "#3A3363",my:2 }}
      >
        Non Compliance Summary Report Table
      </Typography>
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
          caption="Compliance Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          width={200}
          caption="Compliance Obligation"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          width={200}
          caption="Compliance Description"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="complianceStatus"
          width={200}
          caption="Penalty in Local Currency"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={complyAction}
        />
        <Column
          dataField="submissionDeadline"
          width={200}
          caption="Compliance Deadline"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={convertDate}
        />
        <Column
          dataField="approvalStatus"
          width={200}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={approveCompliance}
        />
        <Column
          dataField="authority"
          minWidth={100}
          caption="Reason for Non- Compliance and Action Taken"
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
      </DataGrid>
    </>
  );
};

export default NonCompliance;
