import React, { useState, useEffect } from "react";
import { Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Deccember",
  ],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50, 26, 100, 80, 73, 25],
    },
  ],
};
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
          `http://10.0.2.2:8080/request/getAll?itemGroup=${category}&year=${year}`
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

  //   const requestsByMonth = requests
  //     .map((req) => ({
  //       date: req.date,
  //       status: req.reqStatus,
  //     }))
  //     .reduce((acc, rq) => {
  //       const date = new Date(rq.date);
  //       const month = date.toLocaleDateString("default", { month: "short" });
  //       acc[month] = acc[month] || [];
  //       if (rq.status === "accepted") {
  //         acc[month].push(rq);
  //       }
  //       return acc;
  //     }, {});
  //   console.log(requestsByMonth);

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
