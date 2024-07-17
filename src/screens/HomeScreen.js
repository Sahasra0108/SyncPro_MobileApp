
import { SafeAreaProvider } from "react-native-safe-area-context";
import AdminDashboard from "./Dashboard/AdminDashboard";
import React from "react";
import { StyleSheet } from "react-native";
export default function HomeScreen({navigation}) {
  return (
    <SafeAreaProvider>
      <AdminDashboard navigation={navigation}/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
