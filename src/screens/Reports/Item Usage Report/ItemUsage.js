import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import UsageBarChart from "./UsageBarChart";
import StockLineChart from "./StockLineChart";
import InsightTable from "./InsightTable";

const categoryList = [
  { value: "COMPUTERS_AND_LAPTOPS", label: "Computers & Laptops" },
  { value: "COMPUTER_ACCESSORIES", label: "Computer Accessories" },
  { value: "COMPUTER_HARDWARE", label: "Computer Hardware" },
  { value: "PRINTERS_AND_SCANNERS", label: "PrinterS & Scanners" },
  { value: "OFFICE_SUPPLIES", label: "Office Supplies" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "OTHER", label: "Other" },
];

const currentYear = new Date().getFullYear();
const yearOptions = () => {
  const yearArray = [];
  for (let year = 2020; year <= currentYear; year++) {
    yearArray.push({ label: year.toString(), value: year });
  }
  return yearArray;
};

export default UsageAnalysis = () => {
  const [category, setCategory] = useState("COMPUTERS_AND_LAPTOPS");
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    console.log("Selected Category:", category);
    console.log("Selected Year:", year);
  }, [category, year]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            value={category}
            items={categoryList}
            style={pickerSelectStyles.categoryPicker}
            //  placeholder={{ label: category.toString, value: category }}
          />
          <RNPickerSelect
            onValueChange={(value) => setYear(value)}
            value={year}
            items={yearOptions()}
            style={pickerSelectStyles.yearPicker}
            // placeholder={{ label: "2024", value: year }}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.heading}>
            USAGE ANALYSIS OF CATEGORY {category} {"\n"} (JAN-DEC) {"\n"} {year}
          </Text>
        </View>
        <View style={styles.container}>
          <UsageBarChart category={category} year={year} />
        </View>
        <View style={styles.container}>
          <StockLineChart category={category} year={year} />
        </View>
        <View style={styles.container}>
          <InsightTable category={category} year={year} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    marginBottom: 100,
  },
  scrollViewContainer: {
    flexGrow: 1,
   
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 2,
  },

  view: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 2,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 2,
    marginRight: 30,
  },

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  categoryPicker: {
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "gray",
      borderRadius: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      width: 260, // Increased width for category picker
      marginHorizontal: 2,
    },
  },

  yearPicker: {
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "gray",
      borderRadius: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      width: 120, // Increased width for category picker
      marginHorizontal: 2, // Adjusted margin for spacing
    },
  },
});
