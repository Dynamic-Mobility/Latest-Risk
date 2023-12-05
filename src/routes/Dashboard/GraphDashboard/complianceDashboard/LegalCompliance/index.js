import React from "react";
import { Typography, Grid, Card, Box } from "@mui/material";
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
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ApiIcon from "@mui/icons-material/Api";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const LegalCompliance = () => {
  return (
    <>
      <Typography
        fontWeight={"bold"}
        fontSize={"22px"}
        sx={{ marginTop: 3, marginBottom: 1, color: "#355EA9" }}
      >
        Legal Compliance View
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[2]}`,
                  py: 4,
                  px: 2,
                  my: 2,
                  textAlign: "center",
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
                  <AssuredWorkloadIcon fontSize="large" />
                  <Typography fontWeight="bold">Overall Compliance</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[1]}`,
                  py: 4,
                  px: 2,
                  my: 2,
                  textAlign: "center",
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
                  <ApiIcon fontSize="large" />
                  <Typography fontWeight="bold">
                    No. of Legal Obligations
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  color: "white",
                  height: 100,
                  backgroundColor: `${backGroundColors[0]}`,
                  py: 4,
                  px: 2,
                  my: 2,
                  textAlign: "center",
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
                  <RoomPreferencesIcon fontSize="large" />
                  <Typography fontWeight="bold">
                    Penalties/Fines in Local Currency
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        fontWeight={"bold"}
        fontSize={"20px"}
        sx={{ color: "#3A3363", marginTop: 2, marginBottom: 2 }}
      >
        Pending Legal Cases Summary Report Table
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
          width={240}
          caption="Case Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          width={300}
          caption="Case Description"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="complianceStatus"
          width={240}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={complyAction}
        />
        <Column
          dataField="submissionDeadline"
          width={240}
          caption="Verdict"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={convertDate}
        />
        <Column
          dataField="approvalStatus"
          width={300}
          caption="Next Hearing Date and Action Taken"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          // cellRender={approveCompliance}
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

export default LegalCompliance;
