import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import Autocomplete from "react-native-autocomplete-input";

export default function Newticket(props) {
  const { onPress, title = "Create Ticket" } = props;
  const [ticket, setTicket] = useState({
    itemName: '',
    brand: '',
    model: '',
    topic: '',
    date: new Date().toISOString().split("T")[0],
    description: '',
  });

  const textInputTheme = {
    roundness: 10,
    colors: {
      primary: "transparent",
      underlineColor: "white",
    },
    underlineColorAndroid: "transparent",
  };

  const handleChange = (name, value) => {
    setTicket({ ...ticket, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://10.0.2.2:8080/ticket/add`, ticket);
      if (onPress) onPress();
    } catch (error) {
      console.error('Error creating new ticket:', error);
      Alert.alert("Error", "Failed to create new ticket. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.topic1}>New Ticket</Text>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={ticket.itemName}
          onChangeText={(text) => handleChange('itemName', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Item Brand</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={ticket.brand}
          onChangeText={(text) => handleChange('brand', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Item Model</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={ticket.model}
          onChangeText={(text) => handleChange('model', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Topic for Ticket</Text>
         
          <Picker
            selectedValue={ticket.topic}
            onValueChange={(itemValue) => handleChange('topic', itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Select Topic" value="" />
            <Picker.Item label="Network Issues" value="Network Issues" />
            <Picker.Item label="Hardware Issues" value="Hardware Issues" />
            <Picker.Item label="Software Issues" value="Software Issues" />
            <Picker.Item label="Security Issues" value="Security Issues" />
            <Picker.Item label="Delivery Issues" value="Delivery Issues" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        
        <Text style={styles.label}>Date</Text>
        <TextInput
          theme={textInputTheme}
          style={styles.input}
          value={ticket.date}
          onChangeText={(text) => handleChange('date', text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          theme={textInputTheme}
          style={[styles.input, { height: 100 }]}
          value={ticket.description}
          onChangeText={(text) => handleChange('description', text)}
          underlineColor="transparent"
          multiline
        />
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
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
  topic1: {
    fontSize: 30,
    paddingTop: 1,
    fontWeight: "bold",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingBottom: 100,
    paddingTop: 5,
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
  pickerContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
  },
  picker: {
    height: 45,
    width: "100%",
  },
});
