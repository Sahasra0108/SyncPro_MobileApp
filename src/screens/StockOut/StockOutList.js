import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

function StockOutList({ navigation }) {
  const [stockOut, setStockOut] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:8080/stock-out/getAll'
        );
        const data = response.data.map((stock) => ({
          id: stock.soutId,
          date: stock.date,
          quantity: stock.outQty,
          department: stock.department,
        }));
        setStockOut(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const from = 0;
  const to = stockOut.length;
  return (
    <View style={styles.container}>
      <Button
        title="Stock Out"
        onPress={() => navigation.navigate('StockOutForm')}
      />
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Ref. No:</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Quantity Out</DataTable.Title>
          <DataTable.Title>Department</DataTable.Title>
        </DataTable.Header>
        {stockOut.slice(from, to).map((stock) => (
          <DataTable.Row key={stock.id}>
            <DataTable.Cell>{stock.id}</DataTable.Cell>
            <DataTable.Cell>{stock.date}</DataTable.Cell>
            <DataTable.Cell>{stock.quantity}</DataTable.Cell>
            <DataTable.Cell>{stock.department}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

export default StockOutList;

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
