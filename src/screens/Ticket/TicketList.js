import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity,Pressable,ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

function TicketList(props) {
  const navigation = useNavigation();
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const from = 0; // Adjust these values as needed for pagination
  const to = 10; // Adjust these values as needed for pagination
  const { title = "New ticket" } = props;

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return styles.pending;
      case "COMPLETED":
        return styles.completed;
      case "IN PROGRESS":
        return styles.inProgress;
      case "REJECTED_A":
        return styles.rejected;
      case "ACCEPTED":
        return styles.accepted;
      case "SENT TO ADMIN":
        return styles.sentToAdmin;
      default:
        return styles.defaultStatus;
    }
  };

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <Pressable style={styles.button}>
          <Text style={styles.text} onPress={() => navigation.navigate("Newticket")}>{title}</Text>
        </Pressable>
      <DataTable style={styles.container}>
        <DataTable.Header>
          <DataTable.Title style={styles.leftTitle}>
          <Text style={styles.titleText}>Issue Ticket No</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.rightTitle}>
          <Text style={styles.titleText}>Status</Text>
          </DataTable.Title>
        </DataTable.Header>
        {ticket.slice(from, to).map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            
          >
          <View style={styles.box}>
            <DataTable.Row style={getStatusClass(ticket.status)}>
              <DataTable.Cell style={styles.leftCell}>
                <Text style={styles.boxText}>{ticket.id}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.rightCell}>
                <Text style={styles.boxText}>{ticket.status}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </View>
          </TouchableOpacity>
        ))}
      </DataTable>
      </ScrollView>
    </SafeAreaView>
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
    paddingRight:25
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
    borderRadius: 30,
    // "#ADD8E6", // Light blue color for the box
    padding: 8,
    borderRadius: 30,
    marginTop: 5,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#007EF2",
    height: 45,
    width: "95%",
    marginLeft:8
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  scrollContent: {
    paddingHorizontal:15,
    paddingBottom: 100,
    paddingTop: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pending: {
    backgroundColor: '#FFFF33',
    color: 'black',
    borderRadius: 30,
  },
  completed: {
    backgroundColor: '#90EE90',
    color: 'black',
    borderRadius: 30,
    
  
  },
  inProgress: {
    backgroundColor: '#ADD8E6',
    color: 'black',
    borderRadius: 30,
  },
  rejected: {
    backgroundColor: '#FF7F7F',
    color: 'black',
    borderRadius: 30,
  },
  accepted: {
    backgroundColor: '#90EE90',
    color: 'black',
    borderRadius: 30,
  },
  sentToAdmin: {
    backgroundColor: '#CBC3E3',
    color: 'black',
  },
  defaultStatus: {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 30,
  },
});
