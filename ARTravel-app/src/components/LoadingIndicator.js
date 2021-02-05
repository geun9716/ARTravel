import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

const LoadingIndicator = () => {
  return <ActivityIndicator size='large' />;
};

export default LoadingIndicator;
