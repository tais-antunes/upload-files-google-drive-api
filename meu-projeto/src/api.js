import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // URL do seu servidor Node.js
});

api.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default api;
