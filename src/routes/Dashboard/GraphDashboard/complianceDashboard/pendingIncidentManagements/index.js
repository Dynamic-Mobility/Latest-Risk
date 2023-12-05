import React from "react";
import { Typography, Grid, Box, Card } from "@mui/material";
import {
  Column,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  Toolbar,
  DataGrid,
} from "devextreme-react/data-grid";
import PendingDataGrid from "./PendingDataGrid";
import AppsOutageIcon from "@mui/icons-material/AppsOutage";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const incidents = [
  "No. of Incidents",
  "No. of Incidents with Pending mitigation actions",
  "No. of Incidents with Resolved Actions",
];

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const PendingIncidentManagement = () => {
  return (
    <>
      <PendingDataGrid />
      <Typography
        fontWeight={"bold"}
        fontSize={20}
        sx={{ marginTop:4,marginBottom:3, color: "#3A3363" }}
      >
        Pending Incident Management/Audit Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[0]}`,
                  py: 4,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <AppsOutageIcon fontSize="large" />
                  <Typography fontWeight="bold">No. of Incidents</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[1]}`,
                  py: 4,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <AutoAwesomeMosaicIcon fontSize="large" />
                  <Typography fontWeight="bold">
                    No. of Incidents with Pending mitigation actions
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[2]}`,
                  py: 4,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <AssignmentTurnedInIcon fontSize="large" />
                  <Typography fontWeight="bold">
                    No. of Incidents with Resolved Actions
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[0]}`,
                  py: 4,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <AppsOutageIcon fontSize="large" />
                  <Typography fontWeight="bold">
                    Compliance Percentage
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Typography
            fontWeight={"bold"}
            fontSize={20}
            sx={{ color: "#3A3363",marginTop:4,marginBottom:4 }}
          >
            Pending Incident Management/Audit Actions Summary Table
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
              caption="Incident Title"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="description"
              width={200}
              caption="Incident Description"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
            />
            <Column
              dataField="complianceStatus"
              width={200}
              caption="Risk Rating"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              // cellRender={complyAction}
            />
            <Column
              dataField="submissionDeadline"
              width={200}
              caption="Risk Action"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              // cellRender={convertDate}
            />
            <Column
              dataField="approvalStatus"
              width={200}
              caption="Risk Action Deadline"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
              // cellRender={approveCompliance}
            />
            <Column
              dataField="authority"
              minWidth={100}
              caption="Action Owner(Department)"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={false}
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
          </DataGrid>
        </Grid>
      </Grid>
    </>
  );
};

export default PendingIncidentManagement;
