import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Screen from "../components/Screen";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    flex: 1,
  },
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

const images = [
  "https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__480.jpg",
  "https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg",
  "https://cdn.pixabay.com/photo/2019/01/05/17/05/man-3915438__480.jpg",
  "https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__480.jpg",
  "https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg",
  "https://cdn.pixabay.com/photo/2018/12/25/21/45/crystal-ball-photography-3894871__480.jpg",
  "https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg",
  "https://cdn.pixabay.com/photo/2017/05/05/16/57/buzzard-2287699__480.jpg",
  "https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg",
  "https://cdn.pixabay.com/photo/2018/12/15/02/53/flower-3876195__480.jpg",
  "https://cdn.pixabay.com/photo/2018/12/16/18/12/open-fire-3879031__480.jpg",
  "https://cdn.pixabay.com/photo/2018/11/24/02/05/lichterkette-3834926__480.jpg",
  "https://cdn.pixabay.com/photo/2018/11/29/19/29/autumn-3846345__480.jpg",
];

const ProfileScreen = () => {
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    setImageList(images);
  }, []); // 1회만 실행함을 의미

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>내 피드</Text>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={{ uri: "https://steemitimages.com/u/anpigon/avatar" }}
            style={{ width: 75, height: 75, borderRadius: 37.5 }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "black" }}>홍길동</Text>
            <Text style={{ fontSize: 10, color: "gray" }}>Traveler</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "black" }}>50</Text>
              <Text style={{ fontSize: 10, color: "gray" }}>남긴 AR</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "black" }}>336</Text>
              <Text style={{ fontSize: 10, color: "gray" }}>받은 하트</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "black" }}>1061</Text>
              <Text style={{ fontSize: 10, color: "gray" }}>보낸 하트</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}></View>
        </View>
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {images.map((image, index) => {
            return (
              <View key={index} style={{ width: width / 3, height: width / 3 }}>
                <Image source={{ uri: image }} style={{ flex: 1 }} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Screen style={styles.container}></Screen>
    </View>
  );
};

export default ProfileScreen;
