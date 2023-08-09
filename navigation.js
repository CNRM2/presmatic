import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './screens/HomePage';
import SignUp from './screens/SignUpPage';
import Login from './screens/LoginPage';
import ConfigPage from './screens/ConfigPage';
import NewBudget from './screens/NewBudget';
import Tools from './screens/Tools';
import Icon from 'react-native-vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' options={{headerShown: false,tabBarHideOnKeyboard:true,tabBarIcon:({color,size}) => (<Ionicons name='home' color={color} size={30}/>),  }} component={HomePage} />
      <Tabs.Screen name='Herramientas' options={{headerShown: false,tabBarHideOnKeyboard:true, tabBarIcon:({color,size}) => (<Ionicons name='hammer' color={color} size={30}/> ),}} component={Tools}/>
      <Tabs.Screen name='Configuraciones' options={{ headerShown: false,tabBarHideOnKeyboard:true, tabBarIcon:({color,size}) => (<Ionicons name='settings' color={color} size={30}/> ),}} component={ConfigPage}/>
      
    </Tabs.Navigator >
  )
}
export default function navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="SignUp" options={{ headerShown: true, title:"", headerTransparent:true}} component={SignUp} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="NewBudget" options={{ headerShown: false}} component={NewBudget} />
        <Stack.Screen name="Home" options={{ headerShown:false}}  component={HomePage} />
        <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}



