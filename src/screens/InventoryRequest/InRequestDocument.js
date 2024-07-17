import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from 'axios';

function InRequestDocument({ route, navigation }) {
  const { reqId } = route.params;
  const [inRequest, setInRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8080/request/getById/${reqId}`);
        setInRequest(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDetails();
  }, [reqId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.topButtonContainer}>
          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={20} color="#ffffff" style={styles.downloadIcon} />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.topCenteredContainer}>
            <Text style={styles.menuHeading}>INVENTORY REQUEST</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.alertContainer}>
              <View style={styles.alert}>
                <Text style={styles.alertText}>{inRequest?.reqStatus}</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Ref.No:</Text>
                <Text style={styles.fetchData}>{inRequest?.reqId}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Created Date:</Text>
                <Text style={styles.fetchData}>{inRequest?.createdDate}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Created Time:</Text>
                <Text style={styles.fetchData}>{inRequest?.createdTime}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Department:</Text>
                <Text style={styles.fetchData}>{inRequest?.department}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Created By:</Text>
                <Text style={styles.fetchData}>{inRequest?.createdBy}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Emp.ID:</Text>
                <Text style={styles.fetchData}>{inRequest?.userId}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Item Id</Text>
              <Text style={styles.tableHeaderText}>Item Name</Text>
              <Text style={styles.tableHeaderText}>Requested Quantity</Text>
              <Text style={styles.tableHeaderText}>Item Group</Text>
            </View>
            {inRequest?.items?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableRowText}>{item.itemId}</Text>
                <Text style={styles.tableRowText}>{item.itemName}</Text>
                <Text style={styles.tableRowText}>{item.requestedQuantity}</Text>
                <Text style={styles.tableRowText}>{item.itemGroup}</Text>
              </View>
            ))}
          </View>
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Reason</Text>
            <Text style={styles.reasonText}>{inRequest?.reason}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{inRequest?.description}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

export default InRequestDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  menuContainer: {
    backgroundColor: '#E5E5E5',
    padding: 20,
    marginTop: 80,
  },
  topButtonContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  topCenteredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#00008B',
    padding: 10,
    borderRadius: 5,
  },
  downloadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  downloadIcon: {
    marginRight: 5,
  },
  downloadText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  alertContainer: {
    marginVertical: 5,
    alignItems: 'flex-start',
  },
  alert: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  alertText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'flex-end', // Align items to the end (right)
  },
  detailsRow: {
    flexDirection: 'row',
    marginVertical: 2,
    justifyContent: 'flex-end', // Align row content to the end (right)
  },
  label: {
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'left', // Align text to the right
  },
  fetchData: {
    width: '20%',
    textAlign: 'left', // Align text to the left
  },
  tableContainer: {
    marginVertical: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableRowText: {
    flex: 1,
  },
  reasonContainer: {
    marginVertical: 10,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reasonText: {
    fontSize: 16,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ffffff',
    borderColor: '#007BFF',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  menuHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
});
