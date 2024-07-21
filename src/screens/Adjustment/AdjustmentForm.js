import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

const AdjustmentForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('reason', data.reason);
    formData.append('description', data.description);
    formData.append('adjustedQuantity', data.adjustedQuantity);
    formData.append('date', data.date);
    formData.append('itemId', data.itemId);
    formData.append('userId', data.userId);
    if (file) {
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });
    }

    try {
      const response = await axios.post('http://10.0.2.2:8080/adjustment/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        Alert.alert('Success', 'Adjustment created successfully');
        reset();
        setFile(null);
      } else {
        Alert.alert('Error', 'Failed to create adjustment');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create adjustment');
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setFile(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reason</Text>
      <Controller
        control={control}
        name="reason"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} />
        )}
      />

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} />
        )}
      />

      <Text style={styles.label}>Adjusted Quantity</Text>
      <Controller
        control={control}
        name="adjustedQuantity"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
        )}
      />

      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <Controller
        control={control}
        name="date"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} />
        )}
      />

      <Text style={styles.label}>Item ID</Text>
      <Controller
        control={control}
        name="itemId"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
        )}
      />

      <Text style={styles.label}>User ID</Text>
      <Controller
        control={control}
        name="userId"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="numeric" />
        )}
      />

      <Button title="Pick Image" onPress={pickImage} />
      {file && <Image source={{ uri: file.uri }} style={styles.image} />}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default AdjustmentForm;
