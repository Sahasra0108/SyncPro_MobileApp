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
import { TextInput } from "react-native-paper";
import axios from "axios";

export default function ProfileScreen(props) {
  const { userId = "4", onPress, title = "Save" } = props;
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

  const textInputTheme = {
    roundness: 10,
    colors: {
      primary: "transparent",
      underlineColor: "white",
    },
    underlineColorAndroid: "transparent",
  };

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

  const handleChange = (name, value) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://10.0.2.2:8080/user/update/${userId}`, userDetails); 
      if (onPress) onPress();
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert("Error", "Failed to update user details. Please try again.");
    }
  };

  return (
    
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.topic1}>Edit Profile</Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Department</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.department}
          onChangeText={(text) => handleChange('department', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Role</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.role}
          onChangeText={(text) => handleChange('role', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Date Of Birth</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.dateOfBirth}
          onChangeText={(text) => handleChange('dateOfBirth', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          theme={textInputTheme}
          style={[styles.input, { height: 70 }]}
          value={userDetails.address}
          onChangeText={(text) => handleChange('address', text)}
          underlineColor="transparent"
        />
        <Text style={styles.topic}>User Contact Info</Text>
        <Text style={styles.label}>Tel No</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.telNo}
          onChangeText={(text) => handleChange('telNo', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.mobileNo}
          onChangeText={(text) => handleChange('mobileNo', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={userDetails.email}
          onChangeText={(text) => handleChange('email', text)}
          underlineColor="transparent"
        />
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </ScrollView>
    </View>  
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: "98%",
    borderWidth: 2,
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderBottomColor: "transparent",
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    paddingTop: 10,
    alignSelf: "flex-start",
    color: "black",
    fontWeight: "bold",
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
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingBottom: 100,
    paddingTop:50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#007EF2",
    height: 45,
    width: "98%",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
