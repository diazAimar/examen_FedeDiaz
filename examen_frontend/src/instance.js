import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost/examen_backend/api',
});

export default apiInstance;
