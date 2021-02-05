import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    color: Colors.black,
  },
});

const Header = ({ left, title, right }) => {
  return (
    <View style={styles.container}>
      {left}
      <Text style={styles.titleText}>{title}</Text>
      {right}
    </View>
  );
};

export default Header;
