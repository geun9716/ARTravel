import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Screen from '../components/Screen';

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
    </Screen>
  );
};

export default FeedScreen;
