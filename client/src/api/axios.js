import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to Express backend
  withCredentials: true,
});
export default api;