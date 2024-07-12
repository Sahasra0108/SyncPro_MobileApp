import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity,Pressable } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

function TicketList(props) {
  const navigation = useNavigation();
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const from = 0; // Adjust these values as needed for pagination
  const to = 10; // Adjust these values as needed for pagination
  const { title = "New ticket" } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/ticket/getAll`
        );
        const data = response.data.map((ticket) => ({
          id: ticket.ticketId,
          status: ticket.ticketStatus,
        }));
        setTicket(data);
      } catch (error) {
        setError("Failed to fetch data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <SafeAreaProvider>

      <View style={styles.header}>
        <Text style={styles.title}>All Issue Tickets</Text>
      </View>
      <Pressable style={styles.button}>
          <Text style={styles.text} onPress={() => navigation.navigate("Newticket")}>{title}</Text>
        </Pressable>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.leftTitle}>
            Issue Ticket No
          </DataTable.Title>
          <DataTable.Title style={styles.rightTitle}>Status</DataTable.Title>
        </DataTable.Header>
        {ticket.slice(from, to).map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            
          >
            <DataTable.Row style={styles.box}>
              <DataTable.Cell style={styles.leftCell}>
                <Text style={styles.boxText}>{ticket.id}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.rightCell}>
                <Text style={styles.boxText}>{ticket.status}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
    </SafeAreaProvider>
  );
}

export default TicketList;


const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  leftTitle: {
    flex: 1,
    justifyContent: "flex-start",
  },
  rightTitle: {
    flex: 1,
    justifyContent: "flex-end",
  },
  leftCell: {
    flex: 1,
    justifyContent: "flex-start",
  },
  rightCell: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    margin: 20,
  },
  box: {
    backgroundColor: "#ADD8E6", // Light blue color for the box
    padding: 8,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
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
});
