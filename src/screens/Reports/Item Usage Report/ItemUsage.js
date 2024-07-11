import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import UsageBarChart from "./UsageBarChart";
import StockLineChart from "./StockLineChart";

const categoryList = [
  { value: "COMPUTERS_AND_LAPTOPS", name: "ComputerS & Laptops" },
  { value: "COMPUTER_ACCESSORIES", name: "Computer Accessories" },
  { value: "COMPUTER_HARDWARE", name: "Computer Hardware" },
  { value: "PRINTERS_AND_SCANNERS", name: "PrinterS & Scanners" },
  { value: "OFFICE_SUPPLIES", name: "Office Supplies" },
  { value: "FURNITURE", name: "Furniture" },
  { value: "OTHER", name: "Other" },
];

const currentYear = new Date().getFullYear();
const yearOptions = () => {
  const yearArray = [];
  for (let year = 2020; year <= currentYear; year++) {
    yearArray.push(year);
  }
  return yearArray;
};

const renderButtonForCategory = (selectedItem) => {
  return (
    <TouchableOpacity style={styles.customButton}>
      <Text style={styles.customButtonText}>
        {selectedItem ? selectedItem.name : "Select an item category"}
      </Text>
    </TouchableOpacity>
  );
};
const renderButtonForYear = (selectedItem) => {
  return (
    <TouchableOpacity style={styles.customButton}>
      <Text style={styles.customButtonText}>
        {selectedItem ? selectedItem : "Select a year"}
      </Text>
    </TouchableOpacity>
  );
};

const renderCategory = (category) => {
  return (
    <View style={styles.customItem}>
      <Text style={styles.customItemText}>{category.name}</Text>
    </View>
  );
};
const renderYear = (item) => {
  return (
    <View style={styles.customItem}>
      <Text style={styles.customItemText}>{item}</Text>
    </View>
  );
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
      <View style={styles.view}>
        <SelectDropdown
          data={categoryList}
          onSelect={(selectedItem) => {
            setCategory(selectedItem.value);
          }}
          renderButton={renderButtonForCategory}
          renderItem={renderCategory}
        />
        <SelectDropdown
          data={yearOptions()}
          onSelect={(selectedItem) => {
            setYear(selectedItem);
          }}
          renderButton={renderButtonForYear}
          renderItem={renderYear}
        />
        {/* <TouchableOpacity style={styles.customButton}>
          <Text style={styles.customButtonText}>
            Print
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.view}>
        <Text style={styles.heading}>
          USAGE ANALYSIS OF CATEGORY {category} {'\n'} (JAN-DEC) {'\n'}  {year} 
        </Text>
      </View>
      <View style={styles.view}>
        <UsageBarChart category={category} year={year}/>
      </View>
      <View style={styles.view}>
        <StockLineChart category={category} year={year}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    // alignItems:"stretch"
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
  },
  customButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: 160,
    height: 50,
    margin: 5,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
