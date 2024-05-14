import axios from 'axios';

//Backend API
export const BASE_URL = "http://192.168.8.121:3300";
// export const BASE_URL = "http://192.168.43.215:3300";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiWithCredential = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ["http://192.168.43.198:8081"],
  },
});

export default api;
