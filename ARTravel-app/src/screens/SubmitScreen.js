import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import ImageCard from '../components/ImageCard';
import Screen from '../components/Screen';
import ApiClient from '../modules/ApiClient';
import Colors from '../styles/Colors';
import { routeNames } from '../constants';
import EmojiCategory from '../components/EmojiCategory';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 5,
  },
  headerText: {
    color: Colors.black,
  },
  contentsContainer: {
    margin: 20,
  },
  imageContainer: {
    backgroundColor: Colors.defaultBackground,
  },
  image: {
    height: 360,
    resizeMode: 'contain',
  },
  contents: {
    flexGrow: 1,
  },
  categoryPaper: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.border,
  },
  categoryText: {
    marginVertical: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const SubmitScreen = ({ route }) => {
  const { sourceImageInfo } = route.params;
  console.log(sourceImageInfo);
  const navigation = useNavigation();

  const [content, setContent] = useState('');
  const [categoryID, setCategoryID] = useState(0);

  const onPressSubmit = () => {
    // axios
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return (
    <Screen style={styles.container}>
      <Header
        left={<Icon style={styles.headerButton} name='close' size={20} onPress={onPressGoBack} />}
        title={'게시물 만들기'}
        right={
          <TouchableOpacity style={styles.headerButton} onPress={onPressSubmit}>
            <Text style={styles.headerText}>완료</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.contentsContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: sourceImageInfo.image.uri,
            }}
            style={styles.image}
          />
        </View>
        <ScrollView>
          <View style={styles.contents}>
            <TextInput placeholder='사진에 대해서 알려주세요···' value={value} onChangeText={(text) => setContent(text)} />
            <View style={styles.categoryPaper}>
              <Text style={styles.categoryText}>추억과 관련된 3D 이모티콘을 골라주세요.</Text>
              <View style={styles.categoryContainer}>
                <EmojiCategory categoryID={0} onPress={() => setCategoryID(0)} />
                <EmojiCategory categoryID={1} onPress={() => setCategoryID(1)} />
                <EmojiCategory categoryID={2} onPress={() => setCategoryID(2)} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default SubmitScreen;
