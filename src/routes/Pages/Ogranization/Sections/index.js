import React, { useState } from "react";
import TopBar from "../../../../@dmt/common/TopBar";
import PageContainer from "../../../../@dmt/constants/BreadCrumbs/PageContainer";
import { HEADER } from "../../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import { Button, Container, Typography } from "@mui/material";
import RoleGuard from "../../../../@dmt/hoc/RoleGuard";
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
import { PERMISSIONS } from "../../../../PageRoutes/permissions";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSections } from "../../../../Redux/features/Subsidiaries";
import { useEffect } from "react";
import CreateSection from "./CreateSection";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, isActive: true },
];

const Sections = () => {
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const { sections } = useSelector((store) => store.subsidiary);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSections());
  }, []);

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <PageContainer breadcrumbs={breadcrumbs}>
          <DataGrid
            className="shadow-2xl my-3"
            id="risks"
            height="75vh"
            columnAutoWidth={true}
            dataSource={sections}
            showColumnLines={true}
            showRowLines={true}
            showBorders={true}
            allowColumnResizing={true}
            rowAlternationEnabled={true}
          >
            <Column
              dataField="name"
              width={150}
              caption="Subsidiary Name"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="companyName"
              width={200}
              caption="Company Name"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />

            <Column
              dataField="departmentsName"
              minWidth={100}
              caption="Department Name"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="sectionHead"
              minWidth={150}
              caption="Section Head"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
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
                  Sections
                </Typography>
              </Item>
              <Item location="after">
                <RoleGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
                  <CreateSection />
                </RoleGuard>
              </Item>

              <Item location="after" name="columnChooserButton" />
              <Item location="after" name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </PageContainer>
      </Container>
    </>
  );
};

export default Sections;
