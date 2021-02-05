import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://15.164.218.93/api',
  timeout: 5000,
});

export default instance;
