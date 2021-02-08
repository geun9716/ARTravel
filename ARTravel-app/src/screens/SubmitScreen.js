import React, { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';

import Header from '../components/Header';
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
  const [categoryID, setCategoryID] = useState(1);

  const onPressSubmit = async () => {
    const formData = new FormData();

    Geolocation.getCurrentPosition(
      async (position) => {
        let { latitude, longitude } = position.coords;
        formData.append('images', {
          name: 'test.jpg',
          type: sourceImageInfo.type,
          uri: sourceImageInfo.image.uri,
        });

        formData.append('userID', '1');
        formData.append('categoryID', categoryID);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('content', content);

        console.log(formData);
        try {
          const { data } = await ApiClient.post('/post', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          navigation.navigate(routeNames.FEED);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        // See error code charts below.
        console.error(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
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
            <TextInput placeholder='사진에 대해서 알려주세요···' value={content} onChangeText={(text) => setContent(text)} />
            <View style={styles.categoryPaper}>
              <Text style={styles.categoryText}>추억과 관련된 3D 이모티콘을 골라주세요.</Text>
              <View style={styles.categoryContainer}>
                <EmojiCategory categoryID={1} onPress={() => setCategoryID(1)} />
                <EmojiCategory categoryID={2} onPress={() => setCategoryID(2)} />
                <EmojiCategory categoryID={3} onPress={() => setCategoryID(3)} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default SubmitScreen;
