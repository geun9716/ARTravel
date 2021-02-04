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

const PostScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>Post Screen</Text>
    </Screen>
  );
};

export default PostScreen;
