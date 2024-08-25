import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que la URL base sea correcta
});

export default api;
