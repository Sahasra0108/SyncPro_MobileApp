import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdminDashboard from './Dashboard/AdminDashboard';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
       <AdminDashboard  />
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
