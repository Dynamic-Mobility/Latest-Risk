import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import HighchartsHeatmap from "highcharts/modules/heatmap"; // Import the heatmap module
import { Grid, Typography, Card } from "@mui/material";

// Initialize the heatmap module
HighchartsHeatmap(Highcharts);

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const backGroundColors = [
  ["#2F5597"],
  ["#355EA9"],
  ["#3D6DC3"],
  ["#7698D4"],
  ["#AABFE4"],
];

const IncidentCalender = () => {
  function getPointCategoryName(point, dimension) {
    var series = point.series,
      isY = dimension === "y",
      axis = series[isY ? "yAxis" : "xAxis"];
    return axis.categories[point[isY ? "y" : "x"]];
  }

  const [options, setOptions] = useState({
    chart: {
      type: "heatmap",
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Incident Actions Calender",
      align: "left",
      style: {
        fontSize: "20px",
        color: '#3A3363'
      },
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
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    yAxis: {
      categories: [
        "Department E",
        "Department D",
        "Department C",
        "Department B",
        "Department A",
      ],
      title: null,
      reversed: true,
    },

    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var ix = point.index + 1,
            xName = getPointCategoryName(point, "x"),
            yName = getPointCategoryName(point, "y"),
            val = point.value;
          return ix + ". " + xName + " sales " + yName + ", " + val + ".";
        },
      },
    },

    colorAxis: {
      min: 0,
      minColor: "#355EA9",
      maxColor: "#7698D4",
      // maxColor: Highcharts.getOptions().colors[0],
    },

    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
    },

    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          getPointCategoryName(this.point, "x") +
          "</b> sold <br><b>" +
          this.point.value +
          "</b> items on <br><b>" +
          getPointCategoryName(this.point, "y") +
          "</b>"
        );
      },
    },

    series: [
      {
        name: "Sales per employee",
        borderWidth: 1,
        data: [
          [0, 0, 10],
          [0, 1, 19],
          [0, 2, 8],
          [0, 3, 24],
          [0, 4, 67],
          [1, 0, 92],
          [1, 1, 58],
          [1, 2, 78],
          [1, 3, 117],
          [1, 4, 48],
          [2, 0, 35],
          [2, 1, 15],
          [2, 2, 123],
          [2, 3, 64],
          [2, 4, 52],
          [3, 0, 72],
          [3, 1, 132],
          [3, 2, 114],
          [3, 3, 19],
          [3, 4, 16],
          [4, 0, 38],
          [4, 1, 5],
          [4, 2, 8],
          [4, 3, 117],
          [4, 4, 115],
          [5, 0, 88],
          [5, 1, 32],
          [5, 2, 12],
          [5, 3, 6],
          [5, 4, 120],
          [6, 0, 13],
          [6, 1, 44],
          [6, 2, 88],
          [6, 3, 98],
          [6, 4, 96],
          [7, 0, 31],
          [7, 1, 1],
          [7, 2, 82],
          [7, 3, 32],
          [7, 4, 30],
          [8, 0, 85],
          [8, 1, 97],
          [8, 2, 123],
          [8, 3, 64],
          [8, 4, 84],
          [9, 0, 47],
          [9, 1, 114],
          [9, 2, 31],
          [9, 3, 48],
          [9, 4, 91],
        ],
        dataLabels: {
          enabled: true,
          color: "#355EA9",
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              labels: {
                formatter: function () {
                  return this.value.charAt(0);
                },
              },
            },
          },
        },
      ],
    },
  });
  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Grid>
    </Grid>
  );
};

export default IncidentCalender;
