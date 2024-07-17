import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity,ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

function InRequestsList() {
  const navigation = useNavigation();
  const [inRequests, setInRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const from = 0; // Adjust these values as needed for pagination
  const to = 10; // Adjust these values as needed for pagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:8080/request/getAll"
        );
        const data = response.data.map((inRequest) => ({
          id: inRequest.reqId,
          status: inRequest.reqStatus,
          updateDateTime: inRequest.updateDateTime
        }));

        // Sort data based on updateDateTime
        data.sort((a, b) => {
          const dateA = new Date(...a.updateDateTime);
          const dateB = new Date(...b.updateDateTime);
          return dateB - dateA; // Sort in descending order
        });

        setInRequests(data);
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
        <Text style={styles.title}>All Inventory Requests</Text>
      </View>
     <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.leftTitle}>
            Inventory Request No
          </DataTable.Title>
          <DataTable.Title style={styles.rightTitle}>Status</DataTable.Title>
        </DataTable.Header>
        {inRequests.slice(from, to).map((inRequest, index) => {
          let statusStyle = styles.boxPending;
          if (inRequest.status === "ACCEPTED") {
            statusStyle = styles.boxAccepted;
          } else if (inRequest.status === "REJECTED") {
            statusStyle = styles.boxRejected;
          }

          return (
            <TouchableOpacity
              key={inRequest.id}
              onPress={() => navigation.navigate("InRequestDocument", {reqId: inRequest.id})}
            >
              <DataTable.Row style={[styles.box, statusStyle]}>
                <DataTable.Cell style={styles.leftCell}>
                  <Text style={styles.boxText}>{from + index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.rightCell}>
                  <Text style={styles.boxText}>{inRequest.status + "  >"}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          );
        })}
      </DataTable>
     </ScrollView>
    </SafeAreaProvider>
  );
}

export default InRequestsList;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
scrollViewContent: {
  paddingBottom: 50,
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
    padding: 8,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boxPending: {
    backgroundColor: "#ADD8E6", // Light Blue
  },
  boxAccepted: {
    backgroundColor: "#90EE90", // Light Green
  },
  boxRejected: {
    backgroundColor: "#FF7F7F", // Light Red
  },
});
