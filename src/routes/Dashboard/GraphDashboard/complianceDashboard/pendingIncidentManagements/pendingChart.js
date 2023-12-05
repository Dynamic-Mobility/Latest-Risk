import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PendingChart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        innerSize: "50%", // Adjust the size of the center hole (optional)
      },
    },
    series: [
      {
        name: "Data",
        colorByPoint: true,
        data: [
          {
            name: "Red",
            y: 30,
          },
          {
            name: "Blue",
            y: 20,
          },
          {
            name: "Yellow",
            y: 50,
          },
        ],
      },
    ],
  });
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default PendingChart;
