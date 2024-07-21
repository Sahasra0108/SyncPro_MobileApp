import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import Timeline from "react-native-timeline-flatlist";
import axios from "axios";
import { Portal, Dialog, Paragraph, Provider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import BlockIcon from "react-native-vector-icons/MaterialIcons";
import DeleteIcon from "react-native-vector-icons/MaterialIcons";
import CheckCircleIcon from "react-native-vector-icons/MaterialIcons";
import CancelIcon from "react-native-vector-icons/MaterialIcons";
import LockIcon from "react-native-vector-icons/MaterialIcons";
import ReviewIcon from "react-native-vector-icons/MaterialIcons";
import UserIcon from "react-native-vector-icons/MaterialIcons";
import TicketIcon from "react-native-vector-icons/MaterialIcons";
import StockIcon from "react-native-vector-icons/MaterialIcons";
import InventoryIcon from "react-native-vector-icons/MaterialIcons";
import ReservationIcon from "react-native-vector-icons/MaterialIcons";
import LocalShippingIcon from "react-native-vector-icons/MaterialIcons";
import ItemIcon from "react-native-vector-icons/MaterialIcons";
import OrderIcon from "react-native-vector-icons/MaterialIcons";
import AdjustmentIcon from "react-native-vector-icons/MaterialIcons";
import ManageAccountsIcon from "react-native-vector-icons/MaterialIcons";
import TimelineDot from "react-native-vector-icons/MaterialIcons";

const UserActivityHistory = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [activityLogs, setActivityLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWord, setSelectedWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverContent, setPopoverContent] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [noActivities, setNoActivities] = useState(false);

  const userId = 1;

  useEffect(() => {
    if (userId) {
      fetchActivityLogs(userId);
    }
  }, [userId]);

  const fetchActivityLogs = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/user-activity-log/${userId}`
      );
      const logs = response.data.reverse();
      setActivityLogs(logs);
      filterLogs(new Date(), "");
    } catch (error) {
      console.error("Error fetching user activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
    filterLogs(currentDate, selectedWord);
  };

  const handleWordChange = (word) => {
    setSelectedWord(word);
    filterLogs(selectedDate, word);
  };

  const filterLogs = (date, word) => {
    let filtered = activityLogs;

    if (date) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.date);
        return (
          logDate.getDate() === date.getDate() &&
          logDate.getMonth() === date.getMonth() &&
          logDate.getFullYear() === date.getFullYear()
        );
      });
    }

    if (word) {
      filtered = filtered.filter((log) =>
        log.action.toLowerCase().includes(String(word).toLowerCase())
      );
    }
    if (!date && !word) {
      filtered = activityLogs;
    }

    setFilteredLogs(filtered);
    setNoActivities(filtered.length === 0);
    fetchData(filtered);
  };

  const detail = async (entityId, action) => {
    let popoverContent = "";

    try {
      if (action.includes("User") || action.includes("user")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/user/users/${entityId}`
        );
        popoverContent = `User Id: ${entityId}\nName:${response.data.firstName} ${response.data.lastName}\nRole: ${response.data.role}\nStatus: ${response.data.status}`;
      } else if (action.includes("ticket")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/ticket/tickets/${entityId}`
        );
        popoverContent = `Ticket ID:${entityId}\nStatus:${response.data.ticketStatus}\nItem Name:${response.data.itemId.itemName}\nItem Brand:${response.data.itemId.brand}\n`;
      } else if (action.includes("Stock In")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/stock-in/getById/${entityId}`
        );
        popoverContent = `StockIn ID:${entityId}\nLocation:${response.data.location}\nItem Name:${response.data.itemId.itemName}`;
      } else if (action.includes("Stock Out")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/stock-out/getById/${entityId}`
        );
        popoverContent = `Stock Out ID: ${entityId}\nDepartment:${response.data.department}\nItem Name:${response.data.itemId.itemName}\n`;
      } else if (action.includes("Reservation")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/ticket/tickets/${entityId}`
        );
        popoverContent = `Ticket ID ${entityId}\nStatus:${response.data.ticketStatus}\nTopic:${response.data.itemName}\nTopic:${response.data.itemBrand}\n`;
      } else if (action.includes("Request")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/reuest/getById/${entityId}`
        );
        popoverContent = `Request ID ${entityId}\nStatus:${response.data.reqStatus}\nReason:${response.data.reason}\nTopic:${response.data.itemId.itemName}\n`;
      } else if (action.includes("Item")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/inventory-item/getById/${entityId}`
        );
        popoverContent = `item Id ${entityId}\nStatus:${response.data.status}\nItem Name:${response.data.itemName}\nItem Brand:${response.data.brand}\n`;
      } else if (action.includes("Order") || action.includes("order")) {
        const response = await axios.get(
          `http://10.0.2.2:8080/orders/getById/${entityId}`
        );
        popoverContent = `Order Id ${entityId}\nStatus:${response.data.status}\nItem Name:${response.data.itemName}\nBrand Name:${response.data.brandname}\nVendor Name:${response.data.vendorName}\n`;
      } else if (
        action.includes("Adjustment") ||
        action.includes("adjustment")
      ) {
        const response = await axios.get(
          `http://10.0.2.2:8080/adjustment/getById/${entityId}`
        );
        popoverContent = `Adjustment Id: ${entityId}\nStatus:${response.data.status}\nTopic:${response.data.reason}\nitemId:${response.data.itemId}\n`;
      } else if (action.includes("Password")) {
        popoverContent = `Password succesfully changed`;
      } else if (action.includes("Profile")) {
        popoverContent = `Profile updated succesfully`;
      } else {
        popoverContent = `Details for action: ${action}`;
      }
    } catch (error) {
      popoverContent = `Data not Found`;
    }

    return popoverContent;
  };

  const getIcon = (action) => {
    switch (true) {
      case action.includes("inactive"):
        return <BlockIcon name="block" size={35} color="red" />;
      case action.includes("deleted"):
        return <DeleteIcon name="delete" size={35} color="red" />;
      case action.includes("approved") ||
        action.includes("accepted") ||
        action.includes("Completed"):
        return <CheckCircleIcon name="check-circle" size={35} color="green" />;
      case action.includes("rejected"):
        return <CancelIcon name="cancel" size={35} color="red" />;
      case action.includes("password") || action.includes("Password"):
        return <LockIcon name="lock" size={35} color="red" />;
      case action.includes("reviewed"):
        return <ReviewIcon name="rate-review" size={35} color="blue" />;
      case action.includes("User") || action.includes("user"):
        return <UserIcon name="person" size={35} color="green" />;
      case action.includes("ticket"):
        return (
          <TicketIcon name="confirmation-number" size={35} color="yellow" />
        );
      case action.includes("Stock In") || action.includes("Stock Out"):
        return <StockIcon name="store" size={35} color="purple" />;
      case action.includes("request"):
        return <InventoryIcon name="inventory" size={35} color="orange" />;
      case action.includes("Reservation"):
        return <ReservationIcon name="event-seat" size={35} color="yellow" />;
      case action.includes("delivered"):
        return (
          <LocalShippingIcon name="local-shipping" size={35} color="blue" />
        );
      case action.includes("item") || action.includes("Item"):
        return <ItemIcon name="category" size={35} color="blue" />;
      case action.includes("Order") || action.includes("order"):
        return <OrderIcon name="shopping-cart" size={35} color="green" />;
      case action.includes("Adjustment") || action.includes("adjustment"):
        return <AdjustmentIcon name="tune" size={35} color="blue" />;
      case action.includes("Profile"):
        return (
          <ManageAccountsIcon name="manage-accounts" size={35} color="purple" />
        );
      default:
        return <TimelineDot name="lens" size={35} color="red" />;
    }
  };

  const fetchData = async (logs) => {
    const timelineData = await Promise.all(
      logs.map(async (log) => {
        const { entityId, action, date } = log;
        let description = "";

        try {
          description = await detail(entityId, action);
        } catch (error) {
          console.error(
            `Error fetching details for ${action} with entityId ${entityId}:`,
            error
          );
          description = "Data not Found";
        }

        const logDate = new Date(date);
        const formattedDate = logDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        description = `${formattedDate}\n\n${description}`;

        return {
          time: log.time,
          title: log.action,
          description: description,
          icon: getIcon(log.action),
          entityId: log.entityId,
          action: log.action,
        };
      })
    );

    setTimelineData(timelineData);
  };

  const renderDetail = (rowData) => {
    const { title, description } = rowData;
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.descriptionContainer}>
          <Text style={styles.textDescription}>{description}</Text>
        </Text>
      </View>
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search by Activity"
            value={selectedWord}
            onChangeText={handleWordChange}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : noActivities ? (
          <Text style={styles.noActivitiesText}>No activities found.</Text>
        ) : (
          <Timeline
            data={timelineData}
            circleSize={40}
            circleColor="rgba(0,0,0,0)"
            innerCircle={"icon"}
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{ minWidth: 52 }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: "#007FFF",
              color: "white",
              padding: 5,
              borderRadius: 13,
              fontWeight: "bold",
            }}
            descriptionStyle={{ color: "gray" }}
            options={{
              style: { paddingTop: 5 },
            }}
            renderDetail={renderDetail}
          />
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  input: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    flex: 1,
    marginHorizontal: 5,
    width: "99%",
    height: 50,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "center",
    elevation: 5,
  },

  dateButton: {
    width: "99%",
    height: 50,

    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  dateText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 2,
    flexWrap: "wrap",
  },
  textDescription: {
    fontSize: 14,
    color: "gray",

    marginBottom: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  usertext: {
    alignSelf: "left",
  },
  noActivitiesText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserActivityHistory;
