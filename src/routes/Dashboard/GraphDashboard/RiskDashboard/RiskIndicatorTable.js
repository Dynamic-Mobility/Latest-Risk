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
  StateStoring,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import { Typography } from "@mui/material";


const RiskIndicatorTable = () => {
  return (
    <>
      <DataGrid
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
        {/* <FilterRow visible={true} /> */}
        <StateStoring enabled={false} type="localStorage" storageKey="risks" />
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
        //   cellRender={actionLink}
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
        //   cellRender={checkIfPreviousGreat}
        />
        <Column
          dataField="currentStatus"
          minWidth={100}
          caption="Current Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        //   cellRender={checkIfCurrentGreat}
        />
        <Column
          dataField="riskAppetiteDirection"
          minWidth={100}
          caption="Risk Direction"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        //   cellRender={checkDirection}
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
          <Item location="after" name="columnChooserButton" />
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default RiskIndicatorTable;
