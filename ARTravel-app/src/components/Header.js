import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    color: Colors.black,
  },
  emptyView: {
    width: 20,
    height: 20,
  },
});

const Header = ({ left, title, right }) => {
  return (
    <View style={styles.container}>
      {left ? (
        left
      ) : (
        <View style={styles.emptyView}>
          <Text> </Text>
        </View>
      )}
      <Text style={styles.titleText}>{title}</Text>
      {right ? right : <View style={styles.emptyView}></View>}
    </View>
  );
};

export default Header;
