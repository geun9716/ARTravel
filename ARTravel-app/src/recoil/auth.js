import { atom } from 'recoil';

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    isLoggedIn: false,
    email: '',
    uid: '',
    password: '',
    nickName: '',
    introduce: '',
  },
});
