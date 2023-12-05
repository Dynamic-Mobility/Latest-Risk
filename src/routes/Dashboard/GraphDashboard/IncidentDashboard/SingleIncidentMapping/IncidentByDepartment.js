import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Typography } from "@mui/material";

const IncidentByDepartment = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Incidents by Department Vs Appetite Level 1",
    },
    subtitle: {
      text: 'Source: <a href="https://www.ssb.no/en/statbank/table/04231" target="_blank">SSB</a>',
    },
    xAxis: {
      type: "category",
      categories: ["Category 1", "Category 2", "Category 3"], // Add your x-axis categories here
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: "Amount",
      },
    },
    series: [
      {
        name: "Data Series",
        data: [10, 20, 30], // Add your data points here corresponding to the x-axis categories
      },
    ],
  });

  return (
    <Box my={2}>
      <Box>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </Box>
  );
};

export default IncidentByDepartment;
