import React, { useEffect } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';

import Screen from '../components/Screen';
import ViroARSceneExample from '../ViroExamples/ViroARSceneExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const FeedScreen = () => {
  useEffect(() => {
    const getPermission = async () => {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    };

    getPermission();
  }, []);

  return (
    <Screen style={styles.container}>
      <ViroARSceneExample />
    </Screen>
  );
};

export default FeedScreen;
