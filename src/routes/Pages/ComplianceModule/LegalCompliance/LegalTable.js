import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CmtDropdownMenu from "../../../../@dmt/CmtDropdownMenu";
import { MoreHoriz } from "@mui/icons-material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
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
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import TopBar from "../../../../@dmt/common/TopBar";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";

import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import RoleGuard from "../../../../@dmt/hoc/RoleGuard";
import { PERMISSIONS } from "../../../../PageRoutes/permissions";
import { validatePermission } from "../../../../@dmt/Utils/commonHelper";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.COMPLIANCE_MANAGEMENT, link: "/compliance-management" },
  { label: HEADER.LEGAL_COMPLIANCE, isActive: true },
];


const LegalComplianceTable = () => {
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);

  return (
    <>
      <TopBar />
      <>
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
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
                caption="Action"
                width={120}
                alignment={"center"}
                allowFiltering={false}
              />
              <Column
                dataField="title"
                width={150}
                caption="Case Title"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="description"
                width={200}
                caption="Case Description"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="complianceStatus"
                width={200}
                caption="Department"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="complianceStatus"
                width={200}
                caption="Section"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="complianceStatus"
                width={200}
                caption="Sub Section"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="complianceStatus"
                width={200}
                caption="Case Status"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="submissionDeadline"
                width={200}
                caption="Case Verdict"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="approvalStatus"
                width={200}
                caption="Next hearing Date"
                allowHeaderFiltering={true}
                allowSearch={true}
                allowFiltering={false}
              />
              <Column
                dataField="authority"
                minWidth={100}
                caption="Action Taken"
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
                    Legal Compliance
                  </Typography>
                </Item>
                <Item location="after">
                  <RoleGuard
                    permission={PERMISSIONS.STATUTORY_COMPLIANCE.CREATE}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/create-legal-compliance"}
                    >
                      <Button
                        variant="contained"
                        size={"small"}
                        // className={classes.btn}
                        // onClick={onAddUser}
                        color="primary"
                        // style={{ marginBottom: "10px" }}
                      >
                        <AddCircle /> Create Compliance(New)
                      </Button>
                    </Link>
                  </RoleGuard>
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
                <Item location="after" name="columnChooserButton" />
                {/* <Item location="after" name="searchPanel" /> */}
              </Toolbar>
            </DataGrid>
          </PageContainer>
        </Container>
      </>
    </>
  );
};

export default LegalComplianceTable;
