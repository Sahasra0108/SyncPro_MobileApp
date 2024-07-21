import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

function StockInList({ navigation }) {
  const [stockIn, setStockIn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:8080/stock-in/getAll'
        );
        const data = response.data.map((stock) => ({
          id: stock.sinId,
          date: stock.date,
          quantity: stock.inQty,
          location: stock.location,
        }));
        setStockIn(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const from = 0;
  const to = stockIn.length;
  return (
    <View style={styles.container}>
      <Button
        title="Stock In"
        onPress={() => navigation.navigate('StockInForm')}
      />
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>StockIn ID</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>In Qty</DataTable.Title>
          <DataTable.Title>Location</DataTable.Title>
        </DataTable.Header>
        {stockIn.slice(from, to).map((stock) => (
          <DataTable.Row key={stock.id}>
            <DataTable.Cell>{stock.id}</DataTable.Cell>
            <DataTable.Cell>{stock.date}</DataTable.Cell>
            <DataTable.Cell>{stock.quantity}</DataTable.Cell>
            <DataTable.Cell>{stock.location}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

export default StockInList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  p: {
    fontSize: 20,
  },
});
