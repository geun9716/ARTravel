import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import ImageCard from '../components/ImageCard';
import Screen from '../components/Screen';
import ApiClient from '../modules/ApiClient';
import Colors from '../styles/Colors';
import { routeNames } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 5,
  },
  imageContainer: {
    backgroundColor: Colors.defaultBackground,
  },
  image: {
    height: 360,
    resizeMode: 'contain',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerContent: {},
});

const PickScreen = () => {
  const [edges, setEdges] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const getAllPhoto = async () => {
      const { edges, page_info } = await CameraRoll.getPhotos({ first: 20, includes: ['location'] });
      setEdges(edges);
      console.log(edges);
    };

    getAllPhoto();
  }, []);

  const onPickPhoto = (index) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <Screen style={styles.container}>
      <Header
        left={<Icon style={styles.headerButton} name='close' size={20} onPress={() => navigation.navigate(routeNames.FEED)} />}
        title={'게시물 만들기'}
        right={
          <Icon
            style={styles.headerButton}
            name='arrow-forward'
            size={20}
            onPress={() =>
              navigation.navigate(routeNames.SUBMIT, {
                sourceImageInfo: edges[currentPhotoIndex].node,
              })
            }
          />
        }
      />
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: edges[currentPhotoIndex]?.node?.image?.uri ?? null,
          }}
          style={styles.image}
        />
      </View>
      <ScrollView>
        <View style={styles.pickerContainer}>
          {edges.map((edge, index) => (
            <ImageCard key={index} onPress={() => onPickPhoto(index)} style={styles.pickerContent} source={{ uri: edge.node.image.uri }} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default PickScreen;
