// utils/axiosInstance.js
import axios from 'axios';

// const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const apiUrl = 'http://localhost:3008';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// ✅ Interceptor that checks current frontend route (via window.location.pathname)
axiosInstance.interceptors.request.use(
  (config) => {
    const currentPath = window.location.pathname;
    const isAdminPage = currentPath.startsWith('/admin');

    // console.log(localStorage.getItem('admin_token'),"adminn_token")

    const token = isAdminPage
      ? localStorage.getItem('admin_token')
      : localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
