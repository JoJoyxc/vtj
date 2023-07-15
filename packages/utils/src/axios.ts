import _axios from 'axios';
export * from 'axios';

const instance = _axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 60 * 1000
});

export default instance;
