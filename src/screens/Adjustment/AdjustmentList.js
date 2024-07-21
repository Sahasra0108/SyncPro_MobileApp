import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

function AdjustmentList({ navigation }) {
  const [adj, setAdj] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:8080/adjustment/getAll'
        );
        const data = response.data.map((adjustment) => ({
          id: adjustment.adjId,
          date: adjustment.date,
          quantity: adjustment.adjustedQuantity,
          status: adjustment.status,
        }));
        setAdj(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const from = 0;
  const to = adj.length;
  return (
    <View style={styles.container}>
      <Button
        title="New Adjustment"
        onPress={() => navigation.navigate('AdjustmentForm')}
      />
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Adjustment ID</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Adjusted Qty</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>
        {adj.slice(from, to).map((adjustment) => (
          <DataTable.Row key={adjustment.id}>
            <DataTable.Cell>{adjustment.id}</DataTable.Cell>
            <DataTable.Cell>{adjustment.date}</DataTable.Cell>
            <DataTable.Cell>{adjustment.quantity}</DataTable.Cell>
            <DataTable.Cell>{adjustment.status}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}

export default AdjustmentList;

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
