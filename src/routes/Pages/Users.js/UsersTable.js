import React, { useState } from "react";
import TopBar from "../../../@dmt/common/TopBar";
import Container from "@mui/material/Container";
import { Button, Chip, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { HEADER } from "../../../@dmt/constants/BreadCrumbs/HeaderMessages";
import PageContainer from "../../../@dmt/constants/BreadCrumbs/PageContainer";
import { DataGrid } from "devextreme-react";
import CmtDropdownMenu from "../../../@dmt/CmtDropdownMenu";
import { MoreHoriz } from "@mui/icons-material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";
import { getAccountStatus } from "../../../@dmt/Utils/commonHelper";
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
} from "devextreme-react/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsers } from "../../../Redux/features/Users";
import { useNavigate } from "react-router-dom";
import TemporaryDrawer from "./ViewUser";


const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: "/" },
  { label: HEADER.PROFILE_SETTINGS, link: "/profile-settings" },
  { label: HEADER.USERS_TABLE, isActive: true },
];

const UsersTable = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const { users } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOpenDrawer = (data) => {
    setSelectedUser(data);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
  };

  const getActions = (permissions) => {
    let actions = [{ action: "view", label: "View", icon: <Visibility /> }];
    actions.push({ action: "edit", label: "Edit", icon: <Edit /> });
    // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.UPDATE, permissions)) {
    // actions.push({ action: "asses", label: "Assess", icon: <AssessmentIcon /> });
    // }
    // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.DELETE, permissions)) {
    // actions.push({ action: "delete", label: "Delete", icon: <Delete /> });
    // }
    return actions;
  };

  const userActions = (data) => getActions();

  const onEditUser = (data) => {
    navigate("/users-table/update-user", { state: data });
  };

  const onMenuClick = (menu, data) => {
    if (menu.action === "edit") {
      onEditUser(data);
    } else if (menu.action === "view") {
      onOpenDrawer(data);
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

  function actionStatus({ data, displayValue }) {
    let status = getAccountStatus(displayValue);

    return (
      <Chip
        style={{ color: status.color, borderColor: status.color }}
        size={"small"}
        variant={"outlined"}
        label={status.label}
      />
    );
  }

  const viewDepartment = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => (
      <li key={index}>{value.departmentName}</li>
    ));
  };

  // filter active users
  let activeUsers = users.filter((user) => user.isActive === true);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f4f4f7",
          height: "100vh",
          paddingBottom: "10px",
        }}
      >
        <TopBar />
        <TemporaryDrawer
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          selectedUser={selectedUser}
        />
        <Container maxWidth="xl">
          <PageContainer breadcrumbs={breadcrumbs}>
            <Box sx={{my:4}}>
              <DataGrid
                id="users"
                columnAutoWidth={true}
                dataSource={activeUsers}
                showColumnLines={true}
                showRowLines={true}
                showBorders={true}
                height="80vh"
                allowColumnResizing={true}
                rowAlternationEnabled={true}
              >
                <FilterRow visible={true} />
                <FilterPanel visible={true} />
                <SearchPanel visible={true} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="id" key="id" visible={false} />
                <Column
                  caption="#"
                  width={50}
                  visible={false}
                  allowFiltering={false}
                  // cellRender={actionNumber}
                />
                <Column
                  caption="Action"
                  width={120}
                  alignment={"center"}
                  allowFiltering={false}
                  cellRender={actionLink}
                  fixed={"true"}
                />
                {/* <Column
              caption="Profile"
              width={100}
              allowFiltering={false}
              cellRender={profilePic}
            /> */}
                <Column
                  dataField="firstName"
                  minWidth={100}
                  caption="First Name"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="lastName"
                  minWidth={100}
                  caption="Last Name"
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
                  dataField="organization"
                  minWidth={100}
                  caption="Department"
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                  cellRender={viewDepartment}
                />
                <Column
                  dataField="isActive"
                  minWidth={100}
                  caption="Status"
                  cellRender={actionStatus}
                  allowHeaderFiltering={true}
                  allowSearch={true}
                  allowFiltering={false}
                />
                <Column
                  dataField="roleName"
                  minWidth={100}
                  caption="Role"
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
                    {/* <RoleBasedGuard permission={PERMISSIONS.USER.CREATE}> */}
                    <Link to={"/create-user"}>
                      <Button
                        variant="contained"
                        size={"small"}
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        <AddCircle /> Add User
                      </Button>
                    </Link>
                    {/* </RoleBasedGuard> */}
                  </Item>
                  {/* <Item location="before">
                <RoleBasedGuard permission={PERMISSIONS.USER.CREATE}>
                  <Button
                    variant="contained"
                    size={"small"}
                    className={classes.btn}
                    onClick={(e) => setOpenDialog(true)}
                    color="primary"
                    style={{ marginBottom: "10px" }}
                  >
                    <FileUpload /> Import Users
                  </Button>
                </RoleBasedGuard>
              </Item> */}
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

export default UsersTable;
