import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Button = ({ style, full, children, ...otherProps }) => {
  return (
    <TouchableOpacity {...otherProps} style={[styles.container, style, full && styles.full]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
