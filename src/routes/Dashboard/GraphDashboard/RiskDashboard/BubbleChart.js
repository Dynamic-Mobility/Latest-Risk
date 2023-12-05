// import React, { useState, useEffect } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import highchartsMore from "highcharts/highcharts-more";
// import { Box } from "@mui/material";
// import { useSelector } from "react-redux";

// highchartsMore(Highcharts);

// const BubbleChart = () => {
//   const { criteriaResponse } = useSelector(({ riskDashboard }) => riskDashboard);

//   const [options, setOptions] = useState({
//     chart: {
//       type: "heatmap",
//     },
//     credits: {
//       enabled: false,
//     },
//     title: {
//       text: "Risk Matrix",
//     },
//     xAxis: {
//       categories: ["Rare", "Uncertain", "Certain", "Almost Certain"],
//       title: {
//         text: "Likelihood of Change",
//       },
//     },
//     yAxis: {
//       categories: ["Low", "Medium", "High", "Critical"],
//       title: {
//         text: "Severity",
//       },
//     },
//     colorAxis: {
//       min: 0,
//       stops: [
//         [0, "green"],
//         [0.25, "yellow"],
//         [0.5, "orange"],
//         [0.75, "red"],
//         [1, "red"],
//       ],
//       labels: {
//         enabled: false,
//       },
//     },
//     series: [
//       {
//         name: "Risk",
//         borderWidth: 1,
//         data: [
//           { x: 0, y: 0, value: 3, color: "green" },
//           { x: 0, y: 1, value: 2, color: "green" },
//           { x: 0, y: 2, value: 1, color: "green" },
//           { x: 0, y: 3, value: 0, color: "green" },
//           { x: 1, y: 0, value: 2, color: "green" },
//           { x: 1, y: 1, value: 4, color: "yellow" },
//           { x: 1, y: 2, value: 3, color: "yellow" },
//           { x: 1, y: 3, value: 1, color: "orange" },
//           { x: 2, y: 0, value: 1, color: "yellow" },
//           { x: 2, y: 1, value: 3, color: "yellow" },
//           { x: 2, y: 2, value: 4, color: "orange" },
//           { x: 2, y: 3, value: 2, color: "red" },
//           { x: 3, y: 0, value: 0, color: "orange" },
//           { x: 3, y: 1, value: 1, color: "orange" },
//           { x: 3, y: 2, value: 2, color: "red" },
//           { x: 3, y: 3, value: 3, color: "red" },
//         ],
//         dataLabels: {
//           enabled: true,
//           color: "#000",
//           style: {
//             textOutline: "none",
//           },
//           formatter: function () {
//             return this.point.value > 0 ? this.point.value : null;
//           },
//         },
//         tooltip: {
//           pointFormat: "Number of Risks: {point.value}",
//         },
//       },
//     ],
//   });

//   return (
//     <Box>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </Box>
//   );
// };

// export default BubbleChart;








import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsHeatmap from "highcharts/modules/heatmap";
import { Box } from "@mui/material";
import axios from "axios"; // You'll need to install Axios or use your preferred method for making API requests.

highchartsHeatmap(Highcharts);

const HeatmapChart = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  const options = {
    chart: {
      type: "heatmap",
    },
    title: {
      text: "Risk Heatmap",
    },
    xAxis: {
      categories: ["Likelihood 1", "Likelihood 2", "Likelihood 3", "Likelihood 4"],
      title: {
        text: "Likelihood",
      },
    },
    yAxis: {
      categories: ["Severity 1", "Severity 2", "Severity 3", "Severity 4"],
      title: {
        text: "Severity",
      },
    },
    colorAxis: {
      min: 1,
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[2],
    },
    series: [
      {
        borderWidth: 1,
        data: heatmapData,
        dataLabels: {
          enabled: true,
          color: "black",
        },
        tooltip: {
          pointFormat: "<b>Risk: {point.value}</b>",
        },
      },
    ],
  };

  useEffect(() => {
    // Fetch external data here (e.g., using Axios)
    axios.get("your_api_endpoint_here")
      .then((response) => {
        // Extract the data you need from the API response
        const newHeatmapData = response.data; // Replace with the correct data structure
        setHeatmapData(newHeatmapData); // Update the heatmap data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default HeatmapChart;






