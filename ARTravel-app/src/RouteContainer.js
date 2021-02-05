import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { routeNames } from './constants';
import FeedScreen from './screens/FeedScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator
    initialRouteName={routeNames.AR}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === routeNames.POST) {
          iconName = !focused ? 'earth' : 'earth-outline';
        } else if (route.name === routeNames.AR) {
          iconName = !focused ? 'add-circle-outline' : 'add-circle';
        } else if (route.name === routeNames.PROFILE) {
          iconName = !focused ? 'person-circle-outline' : 'person-circle';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
    backBehavior='order'
  >
    <Tab.Screen name={routeNames.POST} component={PostScreen} />
    <Tab.Screen name={routeNames.FEED} component={FeedScreen} />
    <Tab.Screen name={routeNames.PROFILE} component={ProfileScreen} />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator initialRouteName={routeNames.AUTH} headerMode='none'>
    <Stack.Screen name={routeNames.AUTH} component={AuthScreen} />
    <Stack.Screen name={routeNames.MAIN_TAB} component={MainTab} />
  </Stack.Navigator>
);

const RouteContainer = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={routeNames.MAIN_STACK} headerMode='none'>
      <Stack.Screen name={routeNames.MAIN_STACK} component={MainStack} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RouteContainer;
