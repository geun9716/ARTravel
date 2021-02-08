import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { routeNames } from './constants';
import FeedScreen from './screens/FeedScreen';
import PickScreen from './screens/PickScreen';
import SubmitScreen from './screens/SubmitScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';
import PostScreen from './screens/PostScreen';
import Colors from './styles/Colors';
import { Image } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

const PostingStack = () => (
  <Stack.Navigator initialRouteName={routeNames.PICK} headerMode='none'>
    <Stack.Screen name={routeNames.PICK} component={PickScreen} />
    <Stack.Screen name={routeNames.SUBMIT} component={SubmitScreen} />
  </Stack.Navigator>
);

const MainTab = () => (
  <Tab.Navigator
    initialRouteName={routeNames.FEED}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === routeNames.POSTING) {
          // iconName = !focused ? 'add-circle-outline' : 'add-circle';
          return <Image style={styles.icon} source={require('./assets/images/posting.png')} />;
        } else if (route.name === routeNames.FEED) {
          // iconName = !focused ? 'earth' : 'earth-outline';
          return <Image style={styles.icon} source={require('./assets/images/feed.png')} />;
        } else if (route.name === routeNames.PROFILE) {
          // iconName = !focused ? 'person-circle-outline' : 'person-circle';
          // return <Ionicons name={iconName} size={size} color={color} />;
          return <Image style={styles.icon} source={require('./assets/images/profile.png')} />;
        }

        return;
      },
    })}
    tabBarOptions={{
      activeTintColor: Colors.prmary,
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
    backBehavior='order'
  >
    <Tab.Screen name={routeNames.POSTING} component={PostingStack} />
    <Tab.Screen name={routeNames.FEED} component={FeedScreen} />
    <Tab.Screen name={routeNames.PROFILE} component={ProfileScreen} />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator initialRouteName={routeNames.AUTH} headerMode='none'>
    <Stack.Screen name={routeNames.AUTH} component={AuthScreen} />
    <Stack.Screen name={routeNames.MAIN_TAB} component={MainTab} />
    <Stack.Screen name={routeNames.POST} component={PostScreen} />
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
