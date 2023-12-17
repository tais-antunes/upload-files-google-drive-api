import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // URL do seu servidor Node.js
});

export default api;
