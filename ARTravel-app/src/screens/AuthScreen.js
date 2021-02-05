import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRecoilState } from 'recoil';

import Button from '../components/Button';
import { routeNames } from '../constants';
import Screen from '../components/Screen';
import Colors from '../styles/Colors';
import { userInfoState } from '../recoil/auth';
import Logo from '../assets/images/logo.svg';

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
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    if (userInfo.isLoggedIn) {
      navigation.navigate(routeNames.MAIN_TAB);
    }
  }, [userInfo]);

  const onPressButton = (no) => {
    // async get user
    const fetchedUserInfo = {
      isLoggedIn: true,
      email: '',
      uid: '',
      password: '',
      nickName: '',
      introduce: '',
    };
    setUserInfo(fetchedUserInfo);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/ARTravel.png')} />
          <Text style={styles.titleText}>로그인할 유저를 선택해주세요.</Text>
        </View>
        <Button style={styles.button} onPress={() => onPressButton(0)}>
          <Text style={styles.buttonText}>Login As User 1</Text>
        </Button>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>
        <Button style={styles.button} onPress={() => onPressButton(1)}>
          <Text style={styles.buttonText}>Login As User 2</Text>
        </Button>
      </View>
    </Screen>
  );
};

export default AuthScreen;
