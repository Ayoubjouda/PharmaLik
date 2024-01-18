import axios from 'axios';
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
console.log(process.env.EXPO_PUBLIC_API_URL);
export default api;
