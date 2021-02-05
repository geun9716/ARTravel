import React from 'react';
import { Text, StyleSheet } from 'react-native';

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
  return (
    <Screen style={styles.container}>
      <Text>Feed Screen</Text>
      <ViroARSceneExample/>
    </Screen>
  );
};

export default FeedScreen;
