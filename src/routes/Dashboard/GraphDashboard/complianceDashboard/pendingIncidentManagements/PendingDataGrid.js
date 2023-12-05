import React from "react";
import {
  Column,
  Item,
  Pager,
  Paging,
  Scrolling,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import { Typography } from "@mui/material";

const PendingDataGrid = () => {
  return (
    <>
      <Typography  fontWeight={"bold"} fontSize={"20px"} sx={{marginBottom:4,color: "#3A3363"}}>
        Policies and Procedures Summary Table
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
          caption="Policy Owner(Department)"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={approveCompliance}
        />
        <Column
          dataField="authority"
          minWidth={100}
          caption="Reason for Non-Compliance and Recommendation"
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
        {/* <Toolbar>
          <Item location="after" name="columnChooserButton" />
        </Toolbar> */}
      </DataGrid>
    </>
  );
};

export default PendingDataGrid;
