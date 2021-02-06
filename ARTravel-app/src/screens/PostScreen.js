import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Screen from "../components/Screen";
import Header from "../components/Header";
import Colors from "../styles/Colors";

const { width } = Dimensions.get("window");

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
    borderColor: "gray",
    borderWidth: 1,
  },
});

let selectImage;
const ProfileScreen = (route) => {
  // const [imageList, setImageList] = useState([]);
  selectImage = route.params.selectImage;
  console.log(route.params);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const { data } = await instance.get(`/user/profile/${userId}`);
    //     console.log(data.userPost[0].imgPath);
    //     for (i in data.userPost) {
    //       postList.push(data.userPost[i].imgPath);
    //     }
    //     setImageList(postList);
    //     setIsLoading(false);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // fetchData();
  }, []); // 1회만 실행함을 의미

  return (
    <Screen style={styles.container}>
      <Header
        title={"포스트"}
        left={
          <Icon
            onPress={() => setIsClicked(false)}
            style={styles.headerButton}
            name="close"
            size={20}
          />
        }
      />
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
        </View>
      </View>
      <ScrollView>
        <View style={{ width: width, height: width }}>
          <Image
            source={{
              uri: selectImage,
            }}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text>하트</Text>
          <Text> 10 likes</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>인생샷</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>김철수</Text>
          <Text> 좋아~</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>김영희</Text>
          <Text> 이쁘네 ㅎㅎ</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>김철수</Text>
          <Text> 좋아~</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>김영희</Text>
          <Text> 이쁘네 ㅎㅎ</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>김철수</Text>
          <Text> 좋아~</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>김영희</Text>
          <Text> 이쁘네 ㅎㅎ</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="댓글을 작성해주세요..."
          // backgroundColor="gray"
          selectionColor="gray"
        ></TextInput>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;
