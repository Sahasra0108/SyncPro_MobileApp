import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginService {
  static BASE_URL = "http://10.0.2.2:8080"

  static async login(email, password) {
    try {
      const response = await axios.post(`${LoginService.BASE_URL}/user/auth/login`, { email, password });
      if (response.data && response.data.token) {
       await AsyncStorage.setItem('token', response.data.token);
       await AsyncStorage.setItem('role', String(response.data.role));
       await AsyncStorage.setItem('userId', String(response.data.userId));
       await AsyncStorage.setItem('email', String(email));
       await AsyncStorage.setItem('workSite', String(response.data.workSite));
        return response.data;
      } else {
        return { error: 'Invalid response from server.' };
      }
    } catch (err) {
      throw err;
    }
  }

  static async getAuthToken() {
    return await AsyncStorage.getItem('token');
  }

  static async getUserId() {
    return await AsyncStorage.getItem('userId');
  }

  static async getEmail() {
    return await AsyncStorage.getItem('email');
  }

  static async getYourProfile() {
    try {
      const token = await LoginService.getAuthToken();
      const response = await axios.get(`${LoginService.BASE_URL}/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async logout() {
    const token = await LoginService.getAuthToken();
    const email = await LoginService.getEmail();
    if (!token || !email) {
      throw new Error("User is not logged in.");
    }

    try {
      const response = await axios.post(`${LoginService.BASE_URL}/user/auth/logout`, { email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('role');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('workSite');
      }
      return response.data;
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    }
  }

  static async isAuthenticated() {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }

  static async isReqHandler() {
    const role = await AsyncStorage.getItem('role');
    return role === 'REQUEST_HANDLER';
  }

  static async isAdmin() {
    const role = await AsyncStorage.getItem('role');
    return role === 'ADMIN';
  }

  static async isEmployee() {
    const role = await AsyncStorage.getItem('role');
    return role === 'EMPLOYEE';
  }

  static async returnUserID() {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  }

  static async isOnlineEmployee() {
    const workSite = await AsyncStorage.getItem('workSite');
    return workSite === 'ONLINE';
  }

  static async reqHandlerOnly() {
    const isAuthenticated = await LoginService.isAuthenticated();
    const isReqHandler = await LoginService.isReqHandler();
    return isAuthenticated && isReqHandler;
  }
}

export default LoginService;
