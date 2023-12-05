import { Typography, Grid, Card, Box, Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsSolidGauge from "highcharts/modules/solid-gauge";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsExporting from "highcharts/modules/exporting";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ApiIcon from "@mui/icons-material/Api";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";

// Initialize the additional Highcharts modules
HighchartsMore(Highcharts);
highchartsSolidGauge(Highcharts);
HighchartsExporting(Highcharts);

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const StatutoryComplianceDashboard = () => {

  const originalData = [
    {
      name: "Percentage Compliance",
      color: "#7698D4",
      data: [46, 30, 70, 82],
    },
    {
      name: "Non Compliance",
      color: "#2F5597",
      data: [54, 70, 30, 18],
    },
  ];


    // Calculate the sum of each category
const categorySums = originalData[0].data.map((value, index) =>
originalData.reduce((sum, series) => sum + series.data[index], 0)
);

// Normalize the data
const normalizedData = originalData.map((series) => ({
...series,
data: series.data.map((value, index) => (value / categorySums[index]) * 100),
}));

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "None Compliance by Department",
      align: "left",
      style: {
        fontSize: "20px",
        color: "#3A3363",
      },
    },
    xAxis: {
      categories: ["Marketing", "Sales","IT","Operations"],
    },
    yAxis: {
      min: 0,
      max:100,
      title: {
        text: "Compliance Level",
      },
      labels: {
        format: "{value}%", // Display y-axis labels as percentages
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{y}%", // Display data labels as percentages
        },
      },
    },
    series: normalizedData
  });

  // // Calculate the total for each category
  // const totals = options.series.map((series) =>
  //   series.data.reduce((sum, value) => sum + value, 0)
  // );

  // // Convert data to percentages
  // options.series.forEach((series, seriesIndex) => {
  //   series.data = series.data.map((value, dataIndex) =>
  //     Math.round((value / totals[dataIndex]) * 100)
  //   );
  // });

  return (
    <>
      <Typography
        fontSize={22}
        fontWeight={"bold"}
        sx={{ my: 2, color: "#355EA9" }}
      >
        Statutory Compliance View
      </Typography>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container spacing={1}>
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
                    No. of Compliance Obligations
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
                    Penalties in Local Currency
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <Box sx={{ height: 300 }} my={4}>
                <HighchartsReact highcharts={Highcharts} options={options} />
              </Box>
            </Grid>
          </Grid>
      </Grid>
    </>
  );
};

export default StatutoryComplianceDashboard;
