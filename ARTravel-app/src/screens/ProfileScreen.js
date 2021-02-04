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

const ProfileScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>Profile Screen</Text>
    </Screen>
  );
};

export default ProfileScreen;
