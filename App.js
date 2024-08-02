import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SpecialDelivery from './screens/SpecialDelivery';
import SearchResultsScreen from './screens/SearchResultsScreen';
import AboutScreen from './screens/AboutScreen';
import DeleteAccountScreeen from './screens/DeleteAccountScreeen';
import CustomDrawerContent from './navigation/CustomDrawerContent';
import Payments from './screens/Payments';
import Payment from './screens/Payment';
import SearchResultsSpecial from './screens/SearchResultsSpecial';

// Drawer navigator
const Drawer = createDrawerNavigator();

function MyDrawer({ navigation, route }) {
  const { username } = route.params || {};

  return (
    <Drawer.Navigator
      initialRouteName="RydeMe"
      drawerContent={(props) => <CustomDrawerContent {...props} username={username} />}
      screenOptions={{ headerStyle: { backgroundColor: '#273b4a' }, headerTitleStyle: { color: "#fff" }, }}
    >
      <Drawer.Screen name="RydeMe">
        {(props) => <SpecialDelivery {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Delete Account" component={DeleteAccountScreeen} />
      <Drawer.Screen name="Sign out" component={SignInScreen} />
      <Drawer.Screen name="Special Delivery" component={SpecialDelivery} />
    </Drawer.Navigator>
  );
}

// Stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Special Delivery" component={MyDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="SearchResultsSpecial" component={SearchResultsSpecial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
