import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";
import Button from "../../components/Button";
import ItemIcon from "../../../assets/items.png";
import UsersIcon from "../../../assets/users.png";
import StockInIcon from "../../../assets/stock-in.png";
import StockOutIcon from "../../../assets/stock-out.png";
import axios from "axios";
 
 
const AdminDashboard = ({navigation}) => {
  const [totItems, setTotItems] = useState([]);
  const [totUsers, setTotUsers] = useState([]);
    
  



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
        const response = await axios.get(
          "http://10.0.2.2:8080/user/count"
        );
        setTotUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const today=new Date().toISOString().split("T")[0];
  return (
    <SafeAreaView style={style.safeArea}>
    
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

      {/* menu list */}
      <View style={style.menuContainer}>
        <Text style={style.text}>Requests & Reservations</Text>
        <Button name="Requests" onPress={() => {}} />
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
        <Button name="Item" onPress={() => navigation.navigate('Item')} />
        <Button name="Adjustment" onPress={() => {}} />
        <Button name="Stock In" onPress={() => {}} />
        <Button name="Stock Out" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between text and icon
    alignItems: "center",
    padding:10,
    backgroundColor: "#3C8CEA",
    borderRadius: 15,
    
  },
  menuContainer: {
    alignItems: "center",
    backgroundColor: "#FFF2DC",
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    width: 380,
    height: 180,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 10, // Add margin for horizontal spacing
   
  },
  image: {
    width: 50,
    height: 50,
    //paddingHorizontal: 20,
    marginHorizontal: 22,
  },
  text:{
    fontWeight:"bold"
  }
});

export default AdminDashboard;
