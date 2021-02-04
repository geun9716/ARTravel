import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const Screen = ({ style, children }) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

export default Screen;
