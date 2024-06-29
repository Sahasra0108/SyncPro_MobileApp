import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function InRequestDocument({ route }) {
  const { inRequest } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request ID: {inRequest.id}</Text>
      <Text style={styles.status}>Status: {inRequest.status}</Text>
      {/* Add more details as needed */}
    </View>
  );
}

export default InRequestDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
  },
});
