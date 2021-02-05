import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

import Screen from '../components/Screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PostScreen = () => {
  const onPressPost = () => {
    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     // alert(JSON.stringify(response));s
    //     console.log('response', JSON.stringify(response));
    //   }
    // });
  };

  return (
    <Screen style={styles.container}>
      <Text>Post Screen</Text>
      <TouchableOpacity onPress={onPressPost} />
    </Screen>
  );
};

export default PostScreen;
