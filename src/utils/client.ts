import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default client;
