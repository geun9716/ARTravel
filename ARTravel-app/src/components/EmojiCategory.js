import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../styles/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.border,
  },
  image: {
    width: 64,
    height: 64,
  },
});

const EmojiCategory = ({ style, onPress, categoryID, isFocused }) => {
  const getSource = () => {
    if (categoryID === 1) {
      return require('../assets/images/bag.png');
    } else if (categoryID === 2) {
      return require('../assets/images/cam.png');
    } else if (categoryID === 3) {
      return require('../assets/images/heart.png');
    }
  };

  const source = getSource();

  return (
    <TouchableOpacity style={[style, styles.container, isFocused && styles.focused]} onPress={onPress}>
      <Image style={styles.image} source={source} />
    </TouchableOpacity>
  );
};

export default EmojiCategory;
