import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './Screens/HomeScreen'
import WelcomeScreen from './Screens/WelcomeScreen'
import { apiCall } from './api/openAi'

const App = () => {
  useEffect(() => {
    apiCall('hello how are you')
  },[])
  const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Welcome'>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='Welcome' component={WelcomeScreen}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App