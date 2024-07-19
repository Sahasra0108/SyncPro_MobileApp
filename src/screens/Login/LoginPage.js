import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginService from './LoginService';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setErrorMessage('Invalid login details. Please try again.');
      return;
    }

    try {
      const userData = await LoginService.login(username, password);

      if (userData && userData.token) {
         await AsyncStorage.setItem('token', userData.token);
         await AsyncStorage.setItem('role', String(userData.role));
         await AsyncStorage.setItem('userId', String(userData.userId));
         await AsyncStorage.setItem('workSite', String(userData.workSite));

   // Navigate to BottomNav
        navigation.navigate('BottomNav');
             } else {
               setErrorMessage(userData.error);
             }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/inventory.jpg')}
          style={styles.image}
        />
      </View>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5F0FF',
    padding: 20,
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  errorContainer: {
    backgroundColor: '#FFCDD2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  errorText: {
    color: '#D32F2F',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
