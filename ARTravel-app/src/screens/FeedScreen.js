import React, { useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Image } from 'react-native';

import Screen from '../components/Screen';
import ViroARSceneExample from '../ViroExamples/ViroARSceneExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 40,
  },
});

const FeedScreen = ({ navigation }) => {
  useEffect(() => {
    const getPermission = async () => {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    };

    getPermission();
  }, []);

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/ARTravel.png')} />
      <ViroARSceneExample navigation={navigation} />
    </Screen>
  );
};

export default FeedScreen;
