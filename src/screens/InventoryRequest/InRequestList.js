import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
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
        }));
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
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.leftTitle}>
            Inventory Request No
          </DataTable.Title>
          <DataTable.Title style={styles.rightTitle}>Status</DataTable.Title>
        </DataTable.Header>
        {inRequests.slice(from, to).map((inRequest) => (
          <TouchableOpacity
            key={inRequest.id}
            onPress={() => navigation.navigate("InRequestDocument", { inRequest })}
          >
            <DataTable.Row style={styles.box}>
              <DataTable.Cell style={styles.leftCell}>
                <Text style={styles.boxText}>{inRequest.id}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.rightCell}>
                <Text style={styles.boxText}>{inRequest.status}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
    </SafeAreaProvider>
  );
}

export default InRequestsList;

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
});
