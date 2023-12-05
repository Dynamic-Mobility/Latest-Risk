import React, { useState } from "react";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Grid, Box, Container } from "@mui/material";

const Graph = () => {
  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
  }

  const [options, setOptions] = useState({
    chart: {
      type: "column",
      height: "500px",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "No. of Incidents",
      align: "left",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Percentage of Compliance",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>', // Display the actual value instead of "mm"
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        colors: ["red", "red", "red", "red"], // Add the desired colors here
      },
    },
    series: [
      {
        name: "Enterprise Compliance",
        color: "#355EA9", // Change the color for this series
        data: [
          49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
      {
        name: "Statutory Compliance",
        color: "#3D6DC3",
        data: [
          83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6,
          92.3,
        ],
      },
      {
        name: "Legal Compliance",
        color: "#7698D4",
        data: [
          48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
          51.2,
        ],
      },
      {
        name: "Policies and Procedures",
        data: [
          42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
          51.1,
        ],
      },
    ],
  });

  return (
    <>
      <Grid container>
        <Box width="100%">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </Grid>
    </>
  );
};

export default Graph;
