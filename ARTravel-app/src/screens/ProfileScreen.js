import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
} from "react-native";
import Screen from "../components/Screen";
import LoadingIndicator from "../components/LoadingIndicator";
const { width, height } = Dimensions.get("window");

import instance from "../modules/ApiClient";

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

const postList = [];
var selectImage;
const ProfileScreen = () => {
  const [imageList, setImageList] = useState([]);
  const userId = 1;

  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(`/user/profile/${userId}`, {
          timeout: 5000,
        });
        console.log(data.userPost[0].imgPath);
        for (i in data.userPost) {
          postList.push(data.userPost[i].imgPath);
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
      <View style={styles.header}>
        {isClicked ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setIsClicked(false);
              }}
              style={{ width: 20, height: 20 }}
            >
              <Text>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}> 포스트</Text>
          </View>
        ) : (
          <Text style={styles.headerText}> 내 피드</Text>
        )}
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
        </View>
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {isLoading ? (
            <LoadingIndicator />
          ) : isClicked ? (
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
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  김철수
                </Text>
                <Text> 좋아~</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  김영희
                </Text>
                <Text> 이쁘네 ㅎㅎ</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  김철수
                </Text>
                <Text> 좋아~</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  김영희
                </Text>
                <Text> 이쁘네 ㅎㅎ</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  김철수
                </Text>
                <Text> 좋아~</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  김영희
                </Text>
                <Text> 이쁘네 ㅎㅎ</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="댓글을 작성해주세요..."
                // backgroundColor="gray"
                selectionColor="gray"
              ></TextInput>
            </ScrollView>
          ) : (
            postList.map((image, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectImage = image;
                    setIsClicked(true);
                  }}
                  key={index}
                  style={{ width: width / 3, height: width / 3 }}
                >
                  <Image source={{ uri: image }} style={{ flex: 1 }} />
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
