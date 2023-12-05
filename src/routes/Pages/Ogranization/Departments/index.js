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
import { useSelector,useDispatch } from "react-redux";
import { fetchAllDepartments, fetchAllSubsidiaries } from "../../../../Redux/features/Subsidiaries";
import { useEffect } from "react";
import CreateDepartment from "./CreateDepartment";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, isActive: true },
];

const Department = () => {
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const { departments } = useSelector(( store ) => store.subsidiary);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllDepartments());
  },[])

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
              dataSource={departments}
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
              dataField="description"
              width={200}
              caption="Description"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />

            <Column
              dataField="departmentHead"
              minWidth={100}
              caption="Department Head"
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
                  Departments
                </Typography>
              </Item>
              <Item location="after">
                <RoleGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
                    <CreateDepartment />
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

export default Department;
