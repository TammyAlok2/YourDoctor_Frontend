import axios from "axios";
const BASE_URL = 'http://localhost:5000' ;
     //http://localhost:5000 , https://your-lab-userpage-backend.onrender.com
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;