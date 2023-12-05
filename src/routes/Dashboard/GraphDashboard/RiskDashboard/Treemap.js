import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import treemap from "highcharts/modules/treemap";

treemap(Highcharts);
const Treemap = () => {
  const [options, setOptions] = useState({
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "stripes",
        alternateStartingDirection: true,
        borderColor: "#fff",
        borderRadius: 6,
        borderWidth: 2,
        dataLabels: {
          style: {
            textOutline: "none",
          },
        },
        levels: [
          {
            level: 1,
            layoutAlgorithm: "sliceAndDice",
            dataLabels: {
              enabled: true,
              align: "left",
              verticalAlign: "top",
              style: {
                fontSize: "15px",
                fontWeight: "bold",
              },
            },
          },
        ],
        data: [
          {
            id: "A",
            name: "Internal Audit and Risk",
            color: "#50FFB1",
          },
          {
            id: "B",
            name: "Information Technology Department",
            color: "#F5FBEF",
          },
          {
            id: "C",
            name: "Supply Chain Management",
            color: "#A09FA8",
          },
          {
            id: "D",
            name: "Engineering Department",
            color: "#F5FBEF",
          },
          {
            name: "Open issues - 2nd and 3rd lines of defense",
            parent: "A",
            value: 70923,
          },
          {
            name: "Cyber Security Breach",
            parent: "B",
            value: 70923,
          },
          {
            name: "Supply chain Disruptions",
            parent: "C",
            value: 70923,
          },
          {
            name: "Equipment Failure",
            parent: "D",
            value: 70923,
          },
        ],
      },
    ],
    title: {
      text: "Risk Mapping by Category and Department",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    // tooltip: {
    //   useHTML: true,
    //   pointFormat:
    //     "The area of <b>{point.name}</b> is <b>{point.value} km<sup>2</sup></b>",
    // },
  });

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Treemap;
