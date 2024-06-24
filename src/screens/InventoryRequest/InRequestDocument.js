import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function InRequestDocument({ route }) {
  const { inRequest } = route.params;

  return (
    <View style={styles.container}>

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
