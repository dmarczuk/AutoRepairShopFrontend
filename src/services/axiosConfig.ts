import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
});

export default axiosInstance;