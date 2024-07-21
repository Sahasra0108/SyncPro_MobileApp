import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Button from "../../components/Button";
import ItemIcon from "../../../assets/items.png";
import UsersIcon from "../../../assets/users.png";
import StockInIcon from "../../../assets/stock-in.png";
import StockOutIcon from "../../../assets/stock-out.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AdminDashboard = () => {
  const [totItems, setTotItems] = useState([]);
  const [totUsers, setTotUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:8080/inventory-item/count"
        );
        setTotItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8080/user/count");
        setTotUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <SafeAreaView style={style.safeArea}>
      <ScrollView>
        <View>
          <Text>{today}</Text>
        </View>
        <View style={style.iconContainer}>
          <View style={style.textContainer}>
            <Image source={ItemIcon} style={style.image} />
            <Text style={style.text}>{totItems}</Text>
            <Text style={style.text}>All Items</Text>
          </View>
          <View style={style.textContainer}>
            <Image source={UsersIcon} style={style.image} />
            <Text style={style.text}>{totUsers}</Text>
            <Text style={style.text}>All Users</Text>
          </View>
          <View style={style.textContainer}>
            <Image source={StockInIcon} style={style.image} />
            <Text style={style.text}>{totItems}</Text>
            <Text style={style.text}>Stock in</Text>
          </View>
          <View style={style.textContainer}>
            <Image source={StockOutIcon} style={style.image} />
            <Text style={style.text}>{totItems}</Text>
            <Text style={style.text}>Stock out</Text>
          </View>
        </View>

        <View style={style.menuContainer}>
          <Text style={style.menuHeding}>Requests & Reservations</Text>
          <Button name="Requests" onPress={() => {}} />
          <Button name="External Reservations" onPress={() => {}} />
          <Button name="My Reservations" onPress={() => {}} />
          <Button name="Maintenance Ticket" onPress={() => {}} />
        </View>
        <View style={style.menuContainer}>
          <Text style={style.menuHeding}>Reports</Text>
          <Button
            name="View History"
            onPress={() => {
              console.log("pressed");
            }}
          />
          <Button name="Inventory Summary" onPress={() => {}} />
          <Button name="Stock Alert" onPress={() => {}} />
          <Button
            name="Item Usage Analysis"
            onPress={() => navigation.navigate("ItemUsageAnalysis")}
          />
        </View>
        <View style={style.menuContainer}>
          <Text style={style.menuHeding}>Inventory</Text>
          <Button name="Item" onPress={() => navigation.navigate("ItemList")} />
          <Button name="Adjustment"
          onPress={() => navigation.navigate("AdjustmentList")}
          />
          <Button name="Stock In" onPress={() => navigation.navigate("StockInList")}/>
          <Button name="Stock Out" onPress={() => navigation.navigate("StockOutList")} />
        </View>


      <View style={style.menuContainer}>
        <Text style={style.text}>Requests & Reservations</Text>
        <Button name="Requests" onPress={() => navigation.navigate("InRequestList")} />
        <Button name="External Reservations" onPress={() => {}} />
        <Button name="My Reservations" onPress={() => {}} />
        <Button name="Maintenance Ticket" onPress={() => {}} />
      </View>
      <View style={style.menuContainer}>
        <Text style={style.text}>Reports</Text>
        <Button
          name="View History"
          onPress={() => {
            console.log("pressed");
          }}
        />
        <Button name="Inventory Summary" onPress={() => {}} />
        <Button name="Stock Alert" onPress={() => {}} />
        <Button name="Item Usage Analysis" onPress={() => {}} />
      </View>
      <View style={style.menuContainer}>
        <Text style={style.text}>Inventory Item</Text>
        <Button name="Item" onPress={() => navigation.navigate("ItemList")} />
        <Button name="Adjustment" onPress={() => {}} />
        <Button name="Stock In" onPress={() => {}} />
        <Button name="Stock Out" onPress={() => {}} />
      </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 8,
    backgroundColor: "#3C8CEA",
    borderRadius: 15,
    width: screenWidth - 10,
  },
  menuContainer: {
    alignItems: "center",
    backgroundColor: "#FFF2DC",
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    width: screenWidth - 10,
    height: 280,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 22,
  },
  text:{
    fontSize:18
  },
  menuHeding: {
    fontWeight: "bold",
    fontSize:20
  },
});

export default AdminDashboard;
