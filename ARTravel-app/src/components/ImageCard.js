import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import Colors from '../styles/Colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  image: {
    width: Math.floor(width / 4),
    height: Math.floor(width / 4),
    borderColor: Colors.white,
  },
});

const ImageCard = ({ onPress, style, source }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[style, styles.container]} onPress={onPress}>
      <Image resizeModes='cover' style={styles.image} source={source} />
    </TouchableOpacity>
  );
};

export default ImageCard;
