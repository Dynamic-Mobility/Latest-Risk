// import React, { useEffect,useState } from "react";
// import { Grid, Box } from "@mui/material";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsMore from 'highcharts/highcharts-more';
// import SolidGauge from 'highcharts/modules/solid-gauge';
// import Exporting from 'highcharts/modules/exporting';
// import ExportData from 'highcharts/modules/export-data';

// HighchartsMore(Highcharts);
// SolidGauge(Highcharts);
// Exporting(Highcharts);
// ExportData(Highcharts);

// const Piechart = () => {
//   const [options, setOptions] = useState({
//     chart: {
//       type: "solidgauge",
//       height: "110%",
//     },
//     title: {
//       text: "Activity",
//       style: {
//         fontSize: "24px",
//       },
//     },
//     // Define the series data
//     series: [
//       {
//         name: "Move",
//         data: [
//           {
//             color: Highcharts.getOptions().colors[0],
//             radius: "112%",
//             innerRadius: "88%",
//             y: 80,
//           },
//         ],
//       },
//       {
//         name: "Exercise",
//         data: [
//           {
//             color: Highcharts.getOptions().colors[1],
//             radius: "87%",
//             innerRadius: "63%",
//             y: 65,
//           },
//         ],
//       },
//       {
//         name: "Stand",
//         data: [
//           {
//             color: Highcharts.getOptions().colors[2],
//             radius: "62%",
//             innerRadius: "38%",
//             y: 50,
//           },
//         ],
//       },
//     ],
//   });

//   return (
//     <>
//       <Grid>
//         <Box
//           sx={{
//             border: "1px solid black",
//             borderRadius: "12px",
//             py: 4,
//             px: 2,
//           }}
//         ></Box>
//         <HighchartsReact highcharts={Highcharts} options={options} />
//       </Grid>
//     </>
//   );
// };

// export default Piechart;

import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import { Box } from "@mui/material";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);
Exporting(Highcharts);
ExportData(Highcharts);

const ActivityGauge = () => {
  useEffect(() => {
    // Add icons on top of the circular shapes
    const renderIcons = function () {
      if (!this.series[0].icon) {
        this.series[0].icon = this.renderer
          .path(["M", -8, 0, "L", 8, 0, "M", 0, -8, "L", 8, 0, 0, 8])
          .attr({
            stroke: "#303030",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": 2,
            zIndex: 10,
          })
          .add(this.series[2].group);
      }
      this.series[0].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 -
          this.series[0].points[0].shapeArgs.innerR -
          (this.series[0].points[0].shapeArgs.r -
            this.series[0].points[0].shapeArgs.innerR) /
            2
      );

      if (!this.series[1].icon) {
        this.series[1].icon = this.renderer
          .path([
            "M",
            -8,
            0,
            "L",
            8,
            0,
            "M",
            0,
            -8,
            "L",
            8,
            0,
            0,
            8,
            "M",
            8,
            -8,
            "L",
            16,
            0,
            8,
            8,
          ])
          .attr({
            stroke: "#ffffff",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": 2,
            zIndex: 10,
          })
          .add(this.series[2].group);
      }
      this.series[1].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 -
          this.series[1].points[0].shapeArgs.innerR -
          (this.series[1].points[0].shapeArgs.r -
            this.series[1].points[0].shapeArgs.innerR) /
            2
      );

      if (!this.series[2].icon) {
        this.series[2].icon = this.renderer
          .path(["M", 0, 8, "L", 0, -8, "M", -8, 0, "L", 0, -8, 8, 0])
          .attr({
            stroke: "#303030",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": 2,
            zIndex: 10,
          })
          .add(this.series[2].group);
      }

      this.series[2].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 -
          this.series[2].points[0].shapeArgs.innerR -
          (this.series[2].points[0].shapeArgs.r -
            this.series[2].points[0].shapeArgs.innerR) /
            2
      );
    };

    // Define the chart options
    const options = {
      chart: {
        type: "solidgauge",
        height: "110%",
        events: {
          render: renderIcons,
        },
        backgroundColor: "transparent",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Compliance by Country",
        align: "left",
        style: {
          color: "black",
          fontSize: "20px",
        },
      },
      tooltip: {
        borderWidth: 0,
        backgroundColor: "none",
        shadow: false,
        style: {
          color: "silver",
          fontSize: "16px",
        },
        valueSuffix: "%",
        pointFormat:
          '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
          return {
            x: (this.chartWidth - labelWidth) / 2,
            y: this.chart.plotHeight / 2 + 15,
          };
        },
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [
          {
            // Track for Move
            outerRadius: "112%",
            innerRadius: "88%",
            backgroundColor: Highcharts.color("#2F5597").setOpacity(0.3).get(),
            borderWidth: 0,
          },
          {
            // Track for Exercise
            outerRadius: "87%",
            innerRadius: "63%",
            backgroundColor: Highcharts.color("#3D6DC3").setOpacity(0.3).get(),
            borderWidth: 0,
          },
          {
            // Track for Stand
            outerRadius: "62%",
            innerRadius: "38%",
            backgroundColor: Highcharts.color("#7698D4").setOpacity(0.3).get(),
            borderWidth: 0,
          },
        ],
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false,
          },
          linecap: "round",
          stickyTracking: false,
          rounded: true,
        },
      },
      series: [
        {
          name: "Move",
          data: [
            {
              color: "#2F5597",
              radius: "112%",
              innerRadius: "88%",
              y: 80,
            },
          ],
        },
        {
          name: "Exercise",
          data: [
            {
              color: "#3D6DC3",
              radius: "87%",
              innerRadius: "63%",
              y: 65,
            },
          ],
        },
        {
          name: "Stand",
          data: [
            {
              color: "#7698D4",
              radius: "62%",
              innerRadius: "38%",
              y: 50,
            },
          ],
        },
      ],
    };

    // Render the chart
    Highcharts.chart("container", options);
  }, []);

  return (
    <>
      <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',mt:4}}>
        <div id="container" style={{ height: "340px", width: "300px" }}></div>
      </Box>
    </>
  );
};

export default ActivityGauge;
