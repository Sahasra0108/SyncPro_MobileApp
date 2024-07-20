import React, { useState, useEffect } from "react";
import { Text, Dimensions, ActivityIndicator, View } from "react-native";
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
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/request/filtered?itemGroup=${category}&year=${year}`
        );
        console.log("requests", response.data);
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

 

  const requestsByMonth = requests
    .filter((req) => req.reqStatus !== "REJECTED")
    .reduce((acc, rq) => {
      const [year, month] = rq.createdDateTime; // Extract year and month
      acc[month - 1] = acc[month - 1] || 0; // Month is 1-indexed
      acc[month - 1]++;
      return acc;
    }, {});
  console.log(requestsByMonth);

  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: xLabels,
    datasets: [
      {
        data: xLabels.map((_, index) => requestsByMonth[index] || 0),
        color: (opacity = 1) => `rgba(92, 153, 142, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : requestsByMonth.length === 0 ? (
        <Text className="text-center m-10">No records found</Text>
      ) : (
        <BarChart
          //style={graphStyle}
          data={data}
          width={screenWidth - 10}
          height={220}
          //yAxisLabel="$"
          chartConfig={chartConfig}
          //verticalLabelRotation={30}
          withInnerLines="true"
        />
      )}
    </View>
  );
};

export default UsageBarChart;
