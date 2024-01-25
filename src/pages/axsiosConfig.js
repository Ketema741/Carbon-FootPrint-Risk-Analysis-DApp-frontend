// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://dawitiscomming.pythonanywhere.com',
  headers: {
    'Content-Type': 'application/json',
    // Add other headers here
  },
  // Add other configuration options here
});

// Add interceptors or other customizations here

export default instance;
