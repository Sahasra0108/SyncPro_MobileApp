import React, { useState, useEffect } from "react";
import { Text, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(92, 153, 142, ${opacity})`,
  barPercentage: 0.5,
};

const StockLineChart = ({ category, year }) => {
  const [stockIn, setStockIn] = useState([]);
  const [stockOut, setStockOut] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/stock-in/getAll?itemGroup=${category}&year=${year}`
        );
        setStockIn(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category, year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/stock-out/getAll?itemGroup=${category}&year=${year}`
        );
        setStockOut(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category, year]);

  //   if (stockIn.length === 0 && stockOut.length === 0) {
  //     return <Text className="text-center m-10">No records found</Text>;
  //   }

  const stockInByMonth = stockIn
    .map((stock) => ({
      date: stock.date,
      quantity: stock.inQty,
    }))
    .reduce((acc, si) => {
      const date = new Date(si.date);
      const month = date.toLocaleString("default", { month: "long" });
      acc[month] = acc[month] || [];
      acc[month].push(si.quantity);
      return acc;
    }, {});

  console.log(stockInByMonth);

  const stockOutByMonth = stockOut
    .map((stock) => ({
      date: stock.date,
      quantity: stock.outQty,
    }))
    .reduce((acc, so) => {
      const date = new Date(so.date);
      const month = date.toLocaleString("default", { month: "long" });
      acc[month] = acc[month] || [];
      acc[month].push(so.quantity);
      return acc;
    }, {});

  const sumByMonthSI = {};
  for (const month in stockInByMonth) {
    if (stockInByMonth.hasOwnProperty(month)) {
      const sum = stockInByMonth[month].reduce(
        (total, quantity) => total + quantity,
        0
      );
      sumByMonthSI[month] = sum;
    }
  }

  const sumByMonthSO = {};
  for (const month in stockOutByMonth) {
    if (stockOutByMonth.hasOwnProperty(month)) {
      const sum = stockOutByMonth[month].reduce(
        (total, quantity) => total + quantity,
        0
      );
      sumByMonthSO[month] = sum;
    }
  }

  const xLabels = [
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
    "December",
  ];

  // Ensure that there is a value for each month, even if it is 0
  xLabels.forEach((label) => {
    sumByMonthSI[label] = sumByMonthSI[label] || 0;
    sumByMonthSO[label] = sumByMonthSO[label] || 0;
  });

  const data = {
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50, 26, 200, 80, 73, 25],
        // data: {sumByMonthSI},
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [50, 150, 10, 60, 20, 43, 50, 50, 150, 5, 200, 80],
        // data: {sumByMonthSI},
        color: (opacity = 1) => `rgba(150, 65, 20, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Stock In","Stock Out"], // optional
  };

  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      bezier
    />
  );
};

export default StockLineChart;
