import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

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
    <View style={styles.container}>
      <Text style={styles.title}>{itemDetails.itemName}</Text>
      <Image
        source={{ uri: `data:image/png;base64,${itemDetails.image}` }}
        style={styles.image}
      />
      <Text>Quantity: {itemDetails.quantity}</Text>
      <Text>Status: {itemDetails.status}</Text>
      <Text>Description: {itemDetails.description}</Text>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
});
