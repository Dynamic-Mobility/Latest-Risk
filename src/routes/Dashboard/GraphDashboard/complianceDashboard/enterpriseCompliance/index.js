import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_bullet from "highcharts/modules/bullet";
import { Grid, Card, Typography, Box } from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CompareIcon from "@mui/icons-material/Compare";
import PolicyIcon from "@mui/icons-material/Policy";
import BroadcastOnPersonalIcon from "@mui/icons-material/BroadcastOnPersonal";

HC_bullet(Highcharts);

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const EnterpriseDashboard = () => {
  const [options, setOptions] = React.useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Enterprise Compliance by Subtype",
    },
    xAxis: {
      categories: ["Overall Compliance", "Policies Compliance", "Procedures Compliance"],
    },
    yAxis: [
      {
        min: 0,
        max: 100,
        title: {
          text: "Compliance Percentage",
        },
      },
    ],
    legend: {
      shadow: false,
    },
    credits:{
      enabled: false,
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Compliance Appetite Level",
        color: "rgba(165,170,217,1)",
        data: [90, 73, 20],
        pointPadding: 0.3,
        pointPlacement: -0.2,
      },
      {
        name: "Actual Compliance",
        color: "rgba(126,86,134,.9)",
        data: [70, 90, 40],
        pointPadding: 0.4,
        pointPlacement: -0.2,
      },
    ],
  });
  return (
    <>
      <Grid container spacing={2} my={4}>
        <Grid item md={12} xs={12}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
      </Grid>
    </>
  );
};

export default EnterpriseDashboard;
