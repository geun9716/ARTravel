import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '../components/Button';
import { routeNames } from '../constants';
import Screen from '../components/Screen';
import Colors from '../styles/Colors';
import { userInfoState } from '../recoil/auth';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  viewContainer: {
    marginHorizontal: 30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryText,
  },
  button: {
    marginVertical: 15,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.primaryContrastText,
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
          <Text style={styles.titleText}>ARTravel</Text>
        </View>
        <Button style={styles.button} onPress={() => onPressButton(0)}>
          <Text style={styles.buttonText}>Login As User 1</Text>
        </Button>
        <Button style={styles.button} onPress={() => onPressButton(1)}>
          <Text style={styles.buttonText}>Login As User 2</Text>
        </Button>
      </View>
    </Screen>
  );
};

export default AuthScreen;
