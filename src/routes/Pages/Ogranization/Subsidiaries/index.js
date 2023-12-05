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
import { AddCircle, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { PERMISSIONS } from "../../../../PageRoutes/permissions";
import CreateSubsidiary from "./CreateSubsidiary";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSubsidiaries } from "../../../../Redux/features/Subsidiaries";
import { useEffect } from "react";
import { validatePermission } from "../../../../@dmt/Utils/commonHelper";
import CmtDropdownMenu from "../../../../@dmt/CmtDropdownMenu";
import { toast } from 'react-toastify';
import EditSubsidiary from "./EditSubsidiary";

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, isActive: true },
];

const getActions = (permissions) => {
  let actions = [{ action: "edit", label: "Edit", icon: <Edit /> }];
  if (validatePermission(PERMISSIONS.RISK_UNIVERSE.DELETE, permissions)) {
    actions.push({ action: "delete", label: "Delete", icon: <Delete /> });
  }
  return actions;
};

const Subsidiary = () => {
  const [breadcrumbs, setbreadcrumbs] = useState(initialBreadcrumbs);
  const { subsidiaries } = useSelector((store) => store.subsidiary);
  const { userRole } = useSelector(({ role }) => role);
  const [open,setOpen] = useState(false)
  const [selectedRow,setSelectedRow] = useState({})
  const dispatch = useDispatch();
  const userActions = (data) => getActions(userRole?.permissions);


  const onMenuClick = async (menu, data) => {
    if (menu.action === "edit") {
      setOpen(true)
      setSelectedRow(data)
      // onEditRisk(data);
    } else if (menu.action === "delete") {
      try {
        // dispatch(setLoading(true));
        // await riskApi.deleteRiskUniverse(dispatch, { id: data.id });
        toast.success("Record deleted successfully");
        // dispatch(fetchAllRisks());
      } catch (error) {
        toast.error("An error occurred while deleting");
      } finally {
        // dispatch(setLoading(false));
      }
    } else if (menu.action === "view") {
      // onOpenDrawer(data);
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

  useEffect(() => {
    dispatch(fetchAllSubsidiaries());
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
            dataSource={subsidiaries}
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
              dataField="country"
              minWidth={100}
              caption="Country"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="city"
              minWidth={150}
              caption="City"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              fixed="true"
              caption="Action"
              width={120}
              alignment={"center"}
              allowFiltering={false}
              cellRender={actionLink}
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
                  Subsidiaries
                </Typography>
              </Item>
              <Item location="after">
                <RoleGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
                  <CreateSubsidiary />
                </RoleGuard>
              </Item>

              <Item location="after" name="columnChooserButton" />
              <Item location="after" name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </PageContainer>
      </Container>
      <EditSubsidiary {...{ open,setOpen,selectedRow}} />
    </>
  );
};

export default Subsidiary;
