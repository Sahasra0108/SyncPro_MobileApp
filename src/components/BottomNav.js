import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/Profile";
import ItemList from "../screens/InventoryItem/ItemList";
import InRequestList from "../screens/InventoryRequest/InRequestList";
import InRequestDocument from "../screens/InventoryRequest/InRequestDocument";
import AdjustmentList from "../screens/Adjustment/AdjustmentList";
import ItemUsage from "../screens/Reports/Item Usage Report/ItemUsage";
import ItemDetails from "../screens/InventoryItem/ItemDetail";



const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//This is a comment
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#BCD6FE",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
};

function ProfileTabIcon() {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={require("../../assets/man.jpeg")}
        style={styles.profileImage}
      />
      <View style={styles.profileText}>
        <Text style={styles.profileName}>Femi John</Text>
        <Text style={styles.profileEmail}>femijohn@gmail.com</Text>
      </View>
    </View>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ItemList"
        component={ItemList}
        options={{ title: "All Items" }}
      />

<Stack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={{ title: "Item Details" }}
      />
      <Stack.Screen
        name="InRequestList"
        component={InRequestList}
        options={{ title: "All InRequests" }}

      />
      <Stack.Screen
        name="InRequestDocument"
        component={InRequestDocument}
        options={{ title: "Request Document" }}


      />

     <Stack.Screen
        name="ItemUsageAnalysis"
        component={ItemUsage}
        options={{ title: "Item Usage Analysis" }}

     />

      <Stack.Screen
        name="AdjustmentList"
        component={AdjustmentList}
        options={{ title: "All Adjustments" }}


      />
    </Stack.Navigator>
  );
}

function BottomNav() {
  return (
    <BottomTab.Navigator screenOptions={screenOptions}>
      <BottomTab.Screen
        name="Home"
        component={AdminStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={"black"} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <ProfileTabIcon />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNav;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    marginLeft: 10,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  profileEmail: {
    fontSize: 14,
    color: "black",
  },
});
