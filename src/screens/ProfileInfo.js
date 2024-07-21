import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import LoginService from "./Login/LoginService";

export default function ProfileScreen(props) {
  const { userId = "4", navigation } = props;
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    department: '',
    role: '',
    dateOfBirth: '',
    address: '',
    telNo: '',
    mobileNo: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://10.0.2.2:8080/user/users/1`)
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        Alert.alert("Error", "Failed to fetch user details. Please try again.");
      });
  }, [userId]);

  const handleLogout = async () => {
    try {
      await LoginService.logout();
      Alert.alert("Success", "You have been logged out.");
      navigation.navigate('LoginPage'); // Adjust the navigation target as needed
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile', { userId });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.topic1}>Profile Info</Text>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.info}>{userDetails.firstName}</Text>

          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.info}>{userDetails.lastName}</Text>

          <Text style={styles.label}>Department</Text>
          <Text style={styles.info}>{userDetails.department}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.info}>{userDetails.role}</Text>

          <Text style={styles.label}>Date Of Birth</Text>
          <Text style={styles.info}>{userDetails.dateOfBirth}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.info}>{userDetails.address}</Text>

          <Text style={styles.topic}>User Contact Info</Text>

          <Text style={styles.label}>Tel No</Text>
          <Text style={styles.info}>{userDetails.telNo}</Text>

          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.info}>{userDetails.mobileNo}</Text>

          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.info}>{userDetails.email}</Text>

          <Pressable style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
    paddingTop: 10,
    alignSelf: "flex-start",
    color: "black",
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
    color: "gray",
  },
  topic: {
    fontSize: 20,
    alignSelf: "flex-start",
    paddingTop: 15,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  topic1: {
    fontSize: 30,
    paddingTop: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 50,
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#007EF2",
    height: 45,
    width: "98%",
    alignSelf: "center",
  },
  editText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#FF3B30",
    height: 45,
    width: "98%",
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
