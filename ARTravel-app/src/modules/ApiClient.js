import axios from 'axios';

const instance = axios.create({
  baseURL: 'http:/localhost:8080/api',
  headers: { 'X-Custom-Header': 'foobar' },
  timeout: 5000,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;
