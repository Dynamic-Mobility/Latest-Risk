import React, { useState } from "react";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Grid, Box, Typography, Card } from "@mui/material";
import AppsOutageIcon from "@mui/icons-material/AppsOutage";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const DepartmentGraph = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "Compliance by Department",
      align: "left",
    },
    xAxis: {
      categories: [
        "Enterprise Compliance",
        "Statutory Compliance",
        "Legal Compliance",
        "Policies and Procedures Compliance",
      ],

      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      max:100,
      title: {
        text: "Percentage of Compliance",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1990",
        color: "#355EA9",
        data: [31, 72, 32, 21],
      },
      {
        name: "Year 2000",
        color: "#3D6DC3",
        data: [81, 84, 37, 26],
      },
      {
        name: "Year 2010",
        color: "#7698D4",
        data: [44, 94, 70, 35],
      },
      {
        name: "Year 2018",
        color: "#B9CAE9",
        data: [76, 10, 61, 74],
      },
    ],
  });
 
  return (
    <>
      <Grid container>
        <Typography
          fontWeight={"bold"}
          fontSize={"22px"}
          sx={{ color: "#355EA9" }}
        >
          Departmental Compliance View
        </Typography>
        <Box width="100%" sx={{ mt: 2 }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>

        <Box>
          <Typography
            fontWeight={"bold"}
            fontSize={"22px"}
            sx={{ color: "#355EA9", mt: 3 }}
          >
            Enterprise Compliance View
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item md={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
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
                      Overall Compliance
                    </Typography>
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
                      Policies and Procedures
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={4} xs={12}>
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
                    <Typography fontWeight="bold">Pending Actions</Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DepartmentGraph;
