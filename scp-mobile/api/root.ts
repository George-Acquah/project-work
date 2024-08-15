// Backend API
// export const BASE_URL = "http://192.168.8.121:3300";
export const BASE_URL = "https://smart-car-parking-api-dvxaj7fdra-uc.a.run.app/";


// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;
