import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from 'axios';

function InRequestDocument({ route, navigation }) {
  const { reqId } = route.params;
  const [inRequest, setInRequest] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
   const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8080/request/getById/${reqId}`);
        const request = response.data;
        const formattedUpdateDateTime = formatDateTime(request.updateDateTime);
        const formattedCreationDateTime = formatDateTime(request.creationDateTime);
        setInRequest({ ...request, formattedUpdateDateTime, formattedCreationDateTime });

        const userResponse = await axios.get(`http://10.0.2.2:8080/user/users/${request.userId}`);
        const user = userResponse.data;
        setUserDetails(user);

        const itemResponse = await axios.get(`http://10.0.2.2:8080/inventory-item/getById/${request.itemId}`);
        const item = itemResponse.data;
        setItemDetails(item);
      } catch (error) {
        setError("Failed to fetch data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDetails();
  }, [reqId]);

 const formatDateTime = (dateTimeArray) => {
     const date = new Date(Date.UTC(dateTimeArray[0], dateTimeArray[1] - 1, dateTimeArray[2], dateTimeArray[3], dateTimeArray[4], dateTimeArray[5]));
     const formattedDate = date.toLocaleDateString();
     const formattedTime = date.toLocaleTimeString();
     return { formattedDate, formattedTime };
 };

   const getAlertBackgroundColor = (status) => {
      switch (status) {
        case 'ACCEPTED':
          return '#008000'; // green
        case 'REJECTED':
          return '#8B0000'; // red
        case 'PENDING':
          return '#00008B'; // blue
        case 'SENT_TO_ADMIN':
          return '#FFD700'; // yellow
        case 'WANT_TO_RETURN_ITEM':
          return '#800080'; // purple
        default:
          return '#ffffff'; // white
      }
    };
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
            <Text style={styles.downloadText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.topCenteredContainer}>
            <Text style={styles.menuHeading}>INVENTORY REQUEST</Text>
          </View>
          <View style={styles.rowContainer}>
           <View style={[styles.alertContainer, { backgroundColor: getAlertBackgroundColor(inRequest?.reqStatus) }]}>
              <View style={styles.alert}>
                <Text style={styles.alertText}>{inRequest?.reqStatus}</Text>
                <Text style={styles.alertText}>{inRequest?.formattedUpdateDateTime.formattedDate}</Text>
                <Text style={styles.alertText}>{inRequest?.formattedUpdateDateTime.formattedTime}</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Ref.No:</Text>
                <Text style={styles.fetchData}>{inRequest?.reqId}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Created Date:</Text>
                <Text style={styles.fetchData}>{inRequest?.formattedCreationDateTime.formattedDate}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Created Time:</Text>
                <Text style={styles.fetchData}>{inRequest?.formattedCreationDateTime.formattedTime}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Department:</Text>
                <Text style={styles.fetchData}>{userDetails?.department}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Created By:</Text>
                <Text style={styles.fetchData}>{userDetails?.firstName}</Text>
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
            <View style={styles.tableRow}>
                <Text style={styles.tableRowText}>{itemDetails?.itemId}</Text>
                <Text style={styles.tableRowText}>{itemDetails?.itemName}</Text>
                <Text style={styles.tableRowText}>{inRequest?.quantity}</Text>
                <Text style={styles.tableRowText}>{itemDetails?.itemGroup}</Text>
              </View>
          </View>
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Reason</Text>
            <Text style={styles.reasonText}>{inRequest?.reason}</Text>
          </View>
          {inRequest?.description && (
            <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{inRequest?.description}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.fixedCloseButton}onPress={() => navigation.goBack()}>
        <Text style={styles.fixedCloseButtonText}>Close</Text>
        </TouchableOpacity>
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
    marginVertical: 8,
    alignItems: 'flex-end', // Align items to the end (right)
  },
  detailsRow: {
    flexDirection: 'row',
    marginVertical: 2,
    justifyContent: 'flex-end', // Align row content to the end (right)
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
    textAlign: 'left', // Align text to the right
  },
  fetchData: {
    width: '40%',
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
//  closeButton: {
//    backgroundColor: '#ffffff',
//    borderColor: '#007BFF',
//    borderWidth: 1,
//    padding: 10,
//    borderRadius: 5,
//    alignItems: 'center',
//    marginTop: 10,
//  },
//  closeButtonText: {
//    color: '#007BFF',
//    fontWeight: 'bold',
//  },
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
    fixedCloseButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    fixedCloseButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
});
