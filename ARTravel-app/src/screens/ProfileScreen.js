import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import LoadingIndicator from '../components/LoadingIndicator';
import instance from '../modules/ApiClient';
import Header from '../components/Header';
import Colors from '../styles/Colors';
import { routeNames } from '../constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
  },
  headerButton: {
    padding: 5,
  },
  headerText: {
    color: Colors.black,
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const ProfileScreen = () => {
  const userId = 1;
  const navigation = useNavigation();

  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postList = [];
        const { data } = await instance.get(`/user/profile/${userId}`);
        console.log(data);
        for (i in data.userPost) {
          postList.push(data.userPost[i]);
        }
        setImageList(postList);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []); // 1회만 실행함을 의미

  return (
    <Screen style={styles.container}>
      <Header title={'내 피드'} />
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image source={{ uri: 'https://steemitimages.com/u/anpigon/avatar' }} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
        </View>
        <View style={{ flex: 3 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>홍길동</Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>Traveler</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'black' }}>50</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>남긴 AR</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'black' }}>336</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>받은 하트</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'black' }}>1061</Text>
              <Text style={{ fontSize: 10, color: 'gray' }}>보낸 하트</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            imageList.map((image, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routeNames.POST, {
                      postID: image.postID,
                    })
                  }
                  key={index}
                  style={{ width: width / 3, height: width / 3 }}
                >
                  <Image source={{ uri: image.imgPath }} style={{ flex: 1 }} />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;
