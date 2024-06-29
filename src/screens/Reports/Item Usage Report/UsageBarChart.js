import React, { useState, useEffect } from "react";
import { Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";


const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(92, 153, 142, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const UsageBarChart = ({ category, year }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/request/filtered?itemGroup=${category}&year=${year}`
        );
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, year]);

  console.log(requests);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  
    const requestsByMonth = requests
    .filter(req => req.reqStatus === "PENDING")
    .reduce((acc, rq) => {
      const date = new Date(rq.date);
      const month = date.toLocaleString("default", { month: "short" });
      acc[month] = acc[month] || 0;
      acc[month]++;
      return acc;
    }, {});
    console.log(requestsByMonth);

    const xLabels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = {
      labels: xLabels,
      datasets: [
        {
          data: xLabels.map(month => requestsByMonth[month] || 0),
          color: (opacity = 1) => `rgba(92, 153, 142, ${opacity})`,
          strokeWidth: 2,
        }
      ],
    };
  return (
    <BarChart
      //style={graphStyle}
      data={data}
      width={screenWidth}
      height={220}
      //yAxisLabel="$"
      chartConfig={chartConfig}
      //verticalLabelRotation={30}
      withInnerLines="true"
    />
  );
};

export default UsageBarChart;
