import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-availability-backend.onrender.com',
});

export default api;
