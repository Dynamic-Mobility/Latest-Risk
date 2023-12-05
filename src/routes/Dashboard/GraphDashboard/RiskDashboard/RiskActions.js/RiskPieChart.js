import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

const RiskPieChart = () => {
  const [options, setOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    credits:{
        enabled: false
    },
    title: {
      text: "Risk Actions by Control Category",
      align: "left",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Treat",
            y: 80,
            sliced: true,
            selected: true,
          },
          {
            name: "Tolerate",
            y: 10,
          },
          {
            name: "Terminate",
            y: 1,
          },
          {
            name: "Transfer",
            y: 9,
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

export default RiskPieChart;
