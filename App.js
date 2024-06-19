import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/stack";
import { View ,StyleSheet} from 'react-native';
import BottomTabs from './src/components/BottomNav';
import TopNav from './src/components/TopNav';
import ItemList from './src/screens/InventoryItem/ItemList';
import HomeScreen from './src/screens/HomeScreen';
 

const Stack = createNativeStackNavigator();
 
export default function App() {

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <TopNav/>
      <BottomTabs />
    </NavigationContainer>
    
    </SafeAreaProvider>
  );
}
//<Appbar.Action icon="menu" onPress={() => {}} />
//<Appbar.Content title="Title" />
 