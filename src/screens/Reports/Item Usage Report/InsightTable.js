import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const InsightTable = ({ category, year, isOpen }) => {
  const [tickets, setTickets] = useState([]);
  const [mostRequestedItem, setMostRequestedItem] = useState(null);
  const [open, setOpen] = useState(isOpen);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingMostRequested, setLoadingMostRequested] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/ticket/item?itemGroup=${category}&year=${year}`
        );
        const ticketList = response.data.map((ticket) => ({
          id: ticket.ticketId,
          itemName: ticket.itemId.itemName,
          brand: ticket.itemId.brand,
          details: [
            {
              id: ticket.ticketId,
              date: ticket.date,
              issue: ticket.topic,
              description: ticket.description,
            },
          ],
        }));
        setTickets(ticketList);
      } catch (error) {
        console.log(error);
        setTickets([]);
      } finally {
        setLoadingTickets(false);
      }
    };

    const fetchMostRequested = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/request/mostRequested?itemGroup=${category}&year=${year}`
        );
        const mostRequestedItemData = {
          id: response.data.item.itemId,
          itemName: response.data.item.itemName,
          brand: response.data.item.brand,
          count: response.data.count,
        };
        setMostRequestedItem(mostRequestedItemData);
      } catch (error) {
        console.log(error);
        setMostRequestedItem(null);
      } finally {
        setLoadingMostRequested(false);
      }
    };

    fetchTickets();
    fetchMostRequested();
  }, [category, year]);

  const renderNoRecords = (message) => (
    <Text style={styles.noRecords}>{message}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Most Frequently Maintained Item</Text>
      </View>
      {loadingTickets ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : tickets.length > 0 ? (
        <View style={styles.tableContainer}>
          <TouchableOpacity style={styles.row} onPress={() => setOpen(!open)}>
            <Text style={styles.cell}>{tickets[0].itemName}</Text>
            <Text style={styles.cell}>{tickets[0].brand}</Text>
            <Text style={styles.cell}>{tickets.length}</Text>
          </TouchableOpacity>
          {open && (
            <FlatList
              data={tickets[0].details}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.detailsRow}
                >
                  <Text style={styles.cell}>{item.id}</Text>
                  <Text style={styles.cell}>{new Date(item.date).toLocaleDateString()}</Text>
                  <Text style={styles.cell}>{item.issue}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ) : (
        renderNoRecords("No records found")
      )}

      <View style={styles.header}>
        <Text style={styles.headerText}>Most Requested Item</Text>
      </View>

      {loadingMostRequested ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : mostRequestedItem ? (
        <TouchableOpacity
          style={styles.row}
        >
          <Text style={styles.cell}>{mostRequestedItem.itemName}</Text>
          <Text style={styles.cell}>{mostRequestedItem.brand}</Text>
          <Text style={styles.cell}>{mostRequestedItem.count}</Text>
        </TouchableOpacity>
      ) : (
        renderNoRecords("No records found")
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 15,
    textAlign: 'center',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  noRecords: {
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default InsightTable;
