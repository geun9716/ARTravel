import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRecoilState } from 'recoil';

import Button from '../components/Button';
import ApiClient from '../modules/ApiClient';
import { routeNames } from '../constants';
import Screen from '../components/Screen';
import Colors from '../styles/Colors';
import { userState } from '../recoil/user';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.defaultBackground,
  },
  viewContainer: {
    width: '60%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryText,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  divider: {
    flexGrow: 1,
    borderBottomWidth: 2,
    borderBottomColor: Colors.black,
  },
  dividerText: {
    paddingHorizontal: 10,
  },
  button: {
    marginVertical: 15,
    backgroundColor: Colors.white,
    elevation: 10,
  },
  buttonText: {
    color: Colors.primaryText,
  },
});

const AuthScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    if (userInfo.isLoggedIn) {
      navigation.navigate(routeNames.MAIN_TAB);
    }
  }, [userInfo]);

  const onPressLogin = async (no) => {
    // async get user
    const userInfo = no === 0 ? { userEmail: 'example.com', userPw: '1234' } : { userEmail: 'test@example.com', userPw: '1234' };
    console.log(userInfo);

    try {
      const { data } = await ApiClient.post('/user/login', userInfo);
      console.log(data);
      setUserInfo({ isLoggedIn: true, userId: data.userId });
    } catch (err) {
      console.log(err);
    }
    // const fetchedUserInfo = {
    //   isLoggedIn: true,
    //   email: '',
    //   uid: '',
    //   password: '',
    //   nickName: '',
    //   introduce: '',
    // };
    // setUserInfo(fetchedUserInfo);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/images/ARTravel.png')} />
          <Text style={styles.titleText}>로그인할 유저를 선택해주세요.</Text>
        </View>
        <Button style={styles.button} onPress={() => onPressLogin(0)}>
          <Text style={styles.buttonText}>Login As User 홍길동</Text>
        </Button>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>
        <Button style={styles.button} onPress={() => onPressLogin(1)}>
          <Text style={styles.buttonText}>Login As User 장발장</Text>
        </Button>
      </View>
    </Screen>
  );
};

export default AuthScreen;
