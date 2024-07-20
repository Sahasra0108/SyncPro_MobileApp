import React, { useState, useEffect } from "react";
import { Text, Dimensions, View, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const [stockInResponse, stockOutResponse] = await Promise.all([
          axios.get(
            `http://10.0.2.2:8080/stock-in/getAll?itemGroup=${category}&year=${year}`
          ),
          axios.get(
            `http://10.0.2.2:8080/stock-out/getAll?itemGroup=${category}&year=${year}`
          ),
        ]);
        setStockIn(stockInResponse.data);
        setStockOut(stockOutResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, year]);

  const stockInByMonth = stockIn
    .map((stock) => ({
      date: stock.date,
      quantity: stock.inQty,
    }))
    .reduce((acc, si) => {
      const date = new Date(si.date);
      const month = date.toLocaleString("default", { month: "short" });
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
      const month = date.toLocaleString("default", { month: "short" });
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
  // Ensure that there is a value for each month, even if it is 0
  xLabels.forEach((label) => {
    sumByMonthSI[label] = sumByMonthSI[label] || 0;
    sumByMonthSO[label] = sumByMonthSO[label] || 0;
  });

  const data = {
    datasets: [
      {
        data: xLabels.map((label) => sumByMonthSI[label]),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: xLabels.map((label) => sumByMonthSO[label]),
        color: (opacity = 1) => `rgba(150, 65, 20, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Stock In", "Stock Out"],
  };

  return (
    <View>
     { stockIn.length === 0 && stockOut.length === 0 ? (
        <Text className="text-center m-10">No records found</Text>
      ) : (
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      )}
    </View>
  );
};

export default StockLineChart;
