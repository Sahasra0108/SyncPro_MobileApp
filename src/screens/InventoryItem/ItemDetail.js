import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet,ScrollView } from "react-native";
import axios from "axios";


const ItemDetails = ({ route }) => {
  const { itemId } = route.params;
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/inventory-item/getById/${itemId}`
        );
        setItemDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{itemDetails.itemName}</Text>
      <Image
        source={{ uri: `data:image/png;base64,${itemDetails.image}` }}
        style={styles.image}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Item Group:</Text>
        <Text style={styles.detailValue}>{itemDetails.itemGroup}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Brand:</Text>
        <Text style={styles.detailValue}>{itemDetails.brand}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Model:</Text>
        <Text style={styles.detailValue}>{itemDetails.model}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Dimension:</Text>
        <Text style={styles.detailValue}>{itemDetails.dimension}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Weight:</Text>
        <Text style={styles.detailValue}>{itemDetails.weight}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Unit:</Text>
        <Text style={styles.detailValue}>{itemDetails.unit}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Quantity:</Text>
        <Text style={styles.detailValue}>{itemDetails.quantity}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Status:</Text>
        <Text style={styles.detailValue}>{itemDetails.status}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Description:</Text>
        <Text style={styles.description}>{itemDetails.description}</Text>
      </View>
    </ScrollView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  detailContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  detailTitle: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
  },
  description: {
    flex: 1,
    textAlign: "justify",
  },
});
