import React, { useState, useEffect } from "react";
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

export default function Newticket(props) {
  const { onPress, title = "Create Ticket" } = props;
  const [ticket, setTicket] = useState({
    itemName: "",
    brand: "",
    model: "",
    topic: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:8080/inventory-item/getAll"
        );
        const uniqueItemNames = [
          ...new Set(response.data.map((item) => item.itemName)),
        ];
        const uniqueBrands = [
          ...new Set(response.data.map((item) => item.brand)),
        ];
        const uniqueModels = [
          ...new Set(response.data.map((item) => item.model)),
        ];

        setItemNameOptions(uniqueItemNames);
        setBrandOptions(uniqueBrands);
        setModelOptions(uniqueModels);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };
    fetchData();
  }, []);

  const textInputTheme = {
    roundness: 10,
    colors: {
      primary: "transparent",
      underlineColor: "white",
    },
    underlineColorAndroid: "transparent",
  };

  const validateField = (name, value) => {
    const validationErrors = {};

    if (name === "itemName" && !value) {
      validationErrors.itemName = "Item name is required";
    } else if (name === "brand" && !value) {
      validationErrors.brand = "Item brand is required";
    } else if (name === "model" && !value) {
      validationErrors.model = "Item model is required";
    } else if (name === "topic" && !value) {
      validationErrors.topic = "Topic is required";
    } else if (name === "date" && !value) {
      validationErrors.date = "Date is required";
    } else if (name === "description") {
      if (!value) {
        validationErrors.description = "Description is required";
      } else if (value.length < 10 || value.length > 200) {
        validationErrors.description =
          "Description must be between 10 and 200 characters";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));

    if (!validationErrors[name]) {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleBlur = (name, value) => {
    validateField(name, value);
  };

  const handleChange = (name, value) => {
    setTicket({ ...ticket, [name]: value });
    validateField(name, value);
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://10.0.2.2:8080/ticket/add`, ticket);
      if (onPress) onPress();
      Alert.alert("Success", "Succesfully created the ticket");
    } catch (error) {
      console.error("Error creating new ticket:", error);
      Alert.alert("Error", "Failed to create new ticket. Please try again.");
      const backendErrors = error.response?.data;
      setErrors(backendErrors);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.topic1}>New Ticket</Text>
        <Text style={styles.label}>Item Name</Text>
        {errors.itemName && (
          <Text style={styles.errorText}>{errors.itemName}</Text>
        )}
        <Picker
          selectedValue={ticket.itemName}
          style={styles.input}
          onValueChange={(itemValue) => handleChange("itemName", itemValue)}
          onBlur={() => handleBlur("itemName", ticket.itemName)}
        >
          <Picker.Item label="Select Item Name" value="" />
          {itemNameOptions.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <Text style={styles.label}>Item Brand</Text>
        {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}
        <Picker
          selectedValue={ticket.brand}
          style={styles.input}
          onValueChange={(itemValue) => handleChange("brand", itemValue)}
          onBlur={() => handleBlur("brand", ticket.brand)}
        >
          <Picker.Item label="Select Brand" value="" />
          {brandOptions.map((brand, index) => (
            <Picker.Item key={index} label={brand} value={brand} />
          ))}
        </Picker>
        <Text style={styles.label}>Item Model</Text>
        {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
        <Picker
          selectedValue={ticket.model}
          style={styles.input}
          onValueChange={(itemValue) => handleChange("model", itemValue)}
          onBlur={() => handleBlur("model", ticket.model)}
        >
          <Picker.Item label="Select Model" value="" />
          {modelOptions.map((model, index) => (
            <Picker.Item key={index} label={model} value={model} />
          ))}
        </Picker>
        <Text style={styles.label}>Topic for Ticket</Text>
        {errors.topic && <Text style={styles.errorText}>{errors.topic}</Text>}
        <Picker
          selectedValue={ticket.topic}
          style={styles.input}
          onValueChange={(itemValue) => handleChange("topic", itemValue)}
          onBlur={() => handleBlur("topic", ticket.topic)}
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
          onChangeText={(text) => handleChange("date", text)}
          underlineColor="transparent"
        />
        <Text style={styles.label}>Description</Text>
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
        <TextInput
          theme={textInputTheme}
          style={[styles.input, { height: 100 }]}
          value={ticket.description}
          onChangeText={(text) => handleChange("description", text)}
          onBlur={() => handleBlur("description", ticket.description)}
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
  scrollContent: {
    paddingHorizontal: 3,
    paddingBottom: 100,
    paddingTop: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
});
