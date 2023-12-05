import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import variablePie from "highcharts/modules/variable-pie";
import { useSelector,useDispatch } from "react-redux";
import { fetchAllLossTypes } from "../../../../Redux/features/Subsidiaries";


variablePie(Highcharts);
const RiskByLoss = () => {
  const { lossTypes } = useSelector(({ subsidiary }) => subsidiary);
  const dispatch = useDispatch();

  // let finalArray = [];

  // const mappedData = lossTypes.map((data)=>(
  //   finalArray.push({
  //     name: data.actualLossTypeName,
  //     y: data.id * 10000,
  //   z: data.id % 10,
  //   })
  // ))

  const [options, setOptions] = useState({
    chart: {
      type: "variablepie",
    },
    title: {
      text: "Risk by Potential Loss Category",
      align: "center",
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>'
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "20%",
        zMin: 0,
        name: "countries",
        borderRadius: 5,
        data: [
          {
            name: "Indirect Financial Loss",
            y: 505992,
            z: 92,
          },
          {
            name: "Opportunity Cost",
            y: 551695,
            z: 119,
          },
          {
            name: "Near Miss",
            y: 312679,
            z: 121,
          },
          {
            name: "Direct Financial Loss",
            y: 78865,
            z: 136,
          },
        ],
        colors: [
          "#4caefe",
          "#3dc3e8",
          "#2dd9db",
          "#1feeaf",
          "#0ff3a0",
          "#00e887",
          "#23e274",
        ],
      },
    ],
  });


  useEffect(() =>{
    dispatch(fetchAllLossTypes());
  },[])

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RiskByLoss;
